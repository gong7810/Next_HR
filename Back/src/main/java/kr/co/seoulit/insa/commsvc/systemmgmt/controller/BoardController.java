package kr.co.seoulit.insa.commsvc.systemmgmt.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import kr.co.seoulit.insa.commsvc.systemmgmt.service.SystemMgmtService;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.BoardTO;
import kr.co.seoulit.insa.commsvc.systemmgmt.to.ListFormTO;
import kr.co.seoulit.insa.sys.util.BoardFile;
import kr.co.seoulit.insa.sys.util.BoardFileUploadUtil;

@RequestMapping("/systemmgmt/*")
@RestController
public class BoardController {
	
	@Autowired
	private SystemMgmtService systemMgmtService;	
	private MultipartFile reportFile;
	
	@PostMapping("board")
	public ModelAndView registBoard(HttpServletRequest request, HttpServletResponse response){
		
		ModelAndView modelAndView = new ModelAndView();		
        BoardTO board=new BoardTO();
        
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;
        
		reportFile = multipartRequest.getFile("uploadFile");
		
        String fileName=reportFile.getName();
        
        
		if ((fileName != null) && (reportFile.getSize() > 0)) {
			BoardFile boardFile = null;
			try {
				boardFile = BoardFileUploadUtil.doFileUpload(reportFile);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			board.addBoardFile(boardFile);
		}
			
			try {
				
			board.setName(request.getParameter("name"));
			board.setContent(request.getParameter("content"));
			board.setTitle(request.getParameter("title"));
			board.setBoard_seq(Integer.parseInt(request.getParameter("board_seq")));
			board.setReg_date(request.getParameter("reg_date"));
			
			systemMgmtService.addBoard(board);
			
			modelAndView.addObject("errorMsg", "게시글이 등록되었습니다.");
			modelAndView.addObject("errorCode",0);
			modelAndView.setViewName("redirect:" + "/comm/listBoard/view");
			
		}catch (Exception e){
			modelAndView.addObject("errorMsg", e.getMessage());
			modelAndView.addObject("errorCode",0);		
        }
		return modelAndView;
	}
	
	
	@GetMapping("listboard")
	public ModelMap findBoardList(HttpServletRequest request, HttpServletResponse response) {
		ModelMap map = new ModelMap();
		ArrayList<BoardTO> list=null;
		ListFormTO boardList = null;
		int pagenum, sr, er, dbCount, selectValue;
		
		try {
			pagenum=1;
			if(request.getParameter("pn")!=null){
				pagenum=Integer.parseInt(request.getParameter("pn"));
			}
			selectValue=Integer.parseInt(request.getParameter("selectValue"));
			boardList=new ListFormTO();
			dbCount=systemMgmtService.getRowCount();
			boardList.setRowsize(selectValue);
			boardList.setDbcount(dbCount);
			boardList.setPagenum(pagenum);
			sr=boardList.getStartrow();
			er=boardList.getEndrow();
			list=systemMgmtService.getBoardList(sr,er);
			boardList.setList(list);
					
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			map.put("boardlist", list);
			map.put("board", boardList);

		}catch (DataAccessException dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());	
		}
		return map;
	}

	
	@GetMapping("detail-board")
	public ModelMap findDetailBoardList(HttpServletRequest request, HttpServletResponse response) {
		ModelMap map = new ModelMap();
		int board_seq;
		String sessionId=null;
		
		try {

			board_seq=Integer.parseInt(request.getParameter("board_seq"));
			sessionId=(String)request.getSession().getAttribute("id");
			BoardTO board = systemMgmtService.getBoard(sessionId,board_seq);
			
			map.put("errorMsg", "success");
			map.put("errorCode", 0);
			map.put("board", board);

		} catch (DataAccessException dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
	
	@DeleteMapping("detail-board")
	public ModelMap removeBoard(HttpServletRequest request, HttpServletResponse response) {
		
		ModelMap map = new ModelMap();

		try {
			int board_seq=Integer.parseInt(request.getParameter("board_seq"));
			systemMgmtService.removeBoard(board_seq);		
			map.put("errorMsg", "게시글이 삭제되었습니다");
			map.put("errorCode", 0);
			
		} catch (DataAccessException dae) {
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", dae.getMessage());
		}
		return map;
	}
	
	@GetMapping("detail-board/file")
	public ModelMap downloadFile(HttpServletRequest request, HttpServletResponse response){
		OutputStream servletoutputstream = null;
		ModelMap map = new ModelMap();
		
		response.setCharacterEncoding("utf-8");		
		String tempFileName = request.getParameter("tempFileName");
		String fileName = request.getParameter("fileName");
		
		
		try {
			String filePath="C:/upload/"+tempFileName;
			java.io.File tempFile = new java.io.File(filePath);
			int filesize = (int) tempFile.length();		
			response.setContentType("application/octet-stream");
			response.setHeader("Content-disposition", "attachment;filename=" + "" + new String(fileName.getBytes(),"iso-8859-1"));
			response.setHeader("Content-Transper-Encoding","binary");
			response.setContentLength(filesize);

			servletoutputstream = response.getOutputStream();
			dumpFile(tempFile, servletoutputstream);
			servletoutputstream.flush();


		}catch (Exception e){
			map.clear();
			map.put("errorCode", -1);
			map.put("errorMsg", e.getMessage());			
        }
		return map;
	}
	
	private void dumpFile(File realFile, OutputStream outputstream) {
		byte readByte[] = new byte[4096];
		try {
			BufferedInputStream bufferedinputstream = new BufferedInputStream(new FileInputStream(realFile));
			int i;
			while ((i = bufferedinputstream.read(readByte, 0, 4096)) != -1)
				outputstream.write(readByte, 0, i);		
				outputstream.close();
				bufferedinputstream.close();
		} catch (Exception _ex) {
			_ex.printStackTrace();
		}
	}
	
}
