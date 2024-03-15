import React, { useState, useEffect, useCallback } from 'react';
import HrAppBar from 'erp/hr/util/HrAppBar';
import * as types from '../../saga/BaseSalarySaga';
import { useDispatch, useSelector } from 'react-redux';

import MyGrid from 'erp/hr/util/MyGrid';
import Icon from '@material-ui/core/Icon';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import columnDefinition from './columnDefinition';
import axios from 'axios';
import { FormControl } from '@material-ui/core';
import MySelect from 'erp/hr/util/MySelect';
import MainCard from 'template/ui-component/cards/MainCard';
import { Grid, Button } from '@mui/material';
import SimpleModal from 'util/LogiUtil/SimpleModal';
import MyDialog from 'util/LogiUtil/MyDialog';
import BoardDialog from './BoardDialog';
import UpBoardDialog from './UpBoardDialog';
//-- 64 정준혁 2020-12-01
const BoardContainer = () => {
  const [update, setupdate] = useState([]);
  const [openCompanyUpDialog, setOpenCompanyUpDialog] = useState(false);
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [gridEvent, setGridEvent] = useState();
  const dataDispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const data = useSelector((state) => state.RootReducers.hr.salary.baseSalaryList);

  const [maintitle, settitle] = useState([]);
  const [content, setcontent] = useState([]);

  /*  useEffect(() => {
       console.log("언제?");
        dataDispatch({ type: types.board_list });
    }, [dataDispatch]);
    */

  const updateDispatch = useDispatch();

  const createNewRowData = () => {
    let newData = {
      workPlaceCode: 'BRC-01',
      deptName: '부서명 입력',
      positionCode: '입력하지 마세요',
      positionName: '직급명 입력',
      baseSalary: '0000',
      hobongRatio: '인상율 입력',
      status: 'insert'
    };
    return newData;
  };

  // 시작과 동시에 전체부서

  const saveBoard = useCallback(() => {
    // console.log('title 상태값='+title)
    console.log('content 상태값=' + content);
    //Axios.post('http://localhost:8282/hr/salary/board', { params: { title,content }, })

    axios
      .post('http://localhost:9101/hr/salary/board', {
        title: maintitle,
        content: content
      })
      .then((response) => {
        //console.log(response.errorMsg);
        console.log('성민게시판 디비 성공 값은 위에');
        //   console.log(response.data);
        //   console.log("성민2");
        //   console.log(response.data.baseInsureList);

        //   dispatch({
        //   type: 'insureList',
        //   payload: response.data.baseInsureList
        // });
        //dispatch(insureList(response.data));

        setOpenCompanyDialog(false);
        axios
          .get('http://localhost:9101/hr/base/boardList')
          .then((response) => {
            console.log(response.data + '뿡');
            roadingdata(response);
            console.log(response.data.list + '어케 들어옴');
            console.log('제목=' + response.data);
          })
          .catch((e) => {
            alert('데이터 불러오기 실패');
          });
      })
      .catch((e) => {
        alert('글 등록이 불가능해요');
        console.log('post실패했어요');
      });
  });

  const upBoard = useCallback(() => {
    /*     
   console.log('전 title 상태값='+title)
        console.log('전 content 상태값='+content)
      console.log('update 상태값='+update)
      console.log('update 상태값='+JSON.stringify(update))
        console.log('title 상태값='+title)
        console.log('content 상태값='+content)
        */
    //Axios.post('http://localhost:8282/hr/salary/board', { params: { title,content }, })

    axios
      .patch('http://localhost:9101/hr/salary/board', {
        title: maintitle,
        content: content
      })
      .then((response) => {
        //console.log(response.errorMsg);
        console.log('성민게시판 디비 성공 값은 위에');
        //   console.log(response.data);
        //   console.log("성민2");
        //   console.log(response.data.baseInsureList);

        //   dispatch({
        //   type: 'insureList',
        //   payload: response.data.baseInsureList
        // });
        //dispatch(insureList(response.data));
        setOpenCompanyUpDialog(false);
        axios
          .get('http://localhost:9101/hr/base/boardList')
          .then((response) => {
            console.log(response.data + '뿡');
            roadingdata(response);
            console.log(response.data.list + '어케 들어옴');
            console.log('제목=' + response.data);
          })
          .catch((e) => {
            alert('데이터 불러오기 실패');
          });
      })
      .catch((e) => {
        alert('글 등록이 불가능해요');
        console.log('post실패했어요');
      });
  });

  /* const saveBoard = () => {
        console.log('title 상태값='+maintitle)
        console.log('content 상태값='+content)
        //Axios.post('http://localhost:8282/hr/salary/board', { params: { title,content }, }
        axios.post(
          'http://localhost:8282/hr/salary/board',
          {
          'title':maintitle, 
          'content':content
      }
          )
        .then(response => {
            //console.log(response.errorMsg);
            console.log("성민게시판 디비 성공 값은 위에");
          //   console.log(response.data);
          //   console.log("성민2");
          //   console.log(response.data.baseInsureList);
  
         //   dispatch({
             //   type: 'insureList',
             //   payload: response.data.baseInsureList
           // });
            //dispatch(insureList(response.data));
  
            setOpenCompanyDialog(false);
           
        })
        .catch(e => {
            alert("글 등록이 불가능해요");
            console.log('post실패했어요');
        });
  };

  */
  function roadingdata(response) {
    setRowData(response.data.list);
  }
  useEffect(() => {
    // if (selectDeptTitle !== 'ALL') {
    //     setRowData(data);
    //     return;
    // } else {
    axios
      .get('http://localhost:9101/hr/base/boardList')
      .then((response) => {
        console.log(response.data + '뿡');
        setRowData(response.data.list);
        console.log(response.data.list + '어케 들어옴');
        console.log('제목=' + response.data);
      })
      .catch((e) => {
        alert('데이터 불러오기 실패');
      });
  }, []);

  const onAddRow = (e) => {
    settitle([]);
    setcontent([]);
    console.log('등록모달');
    console.log('type=' + e.type);
    // const newItem = createNewRowData();
    // gridEvent.updateRowData({ add: [newItem] });

    setOpenCompanyDialog(true);
  };

  const handleChangeTitle = useCallback((e) => {
    if (e.target.id === 'first') settitle(e.target.value);
    else setcontent(e.target.value);
  });

  const updateRow = (props) => {
    console.log('수정모달');
    // const newItem = createNewRowData();
    // gridEvent.updateRowData({ add: [newItem] });

    // setupdate(props.data);
    settitle(props.data.title);
    setcontent(props.data.name);
    setOpenCompanyUpDialog(true);

    //props.data ? settitle(props.data.title) : null;
    //console.log("zz="+JSON.stringify(update));
  };

  const onGridReady = (event) => {
    event.api.sizeColumnsToFit();
    setGridEvent(event.api);
  };

  const onRemoveSelected = () => {
    console.log('성민삭제');
    var selectedData = gridEvent.getSelectedRows();
    selectedData[0].status = 'delete';
    gridEvent.updateRowData({ remove: selectedData });
    updateDispatch({
      type: types.UPDATE_BASE_SALARY_REQUEST,
      payload: selectedData
    });
  };
  const close = () => {
    setOpenCompanyDialog(false);
    setOpenCompanyUpDialog(false);
  };

  function onCellEditingStopped(row) {
    if (row.data.status !== 'insert') {
      row.data.status = 'update';
    } else {
      if (row.data.deptName === '부서명 입력' || row.data.positionName === '직급명 입력' || row.data.hobongRatio === '인상율 입력') {
        return;
      }
    }

    updateDispatch({
      type: types.UPDATE_BASE_SALARY_REQUEST,
      payload: [row.data]
    });

    const close = () => {
      setOpenCompanyDialog(false);
    };
  }

  return (
    <>
      <MainCard
        content={false}
        title="게시판"
        secondary={
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            {/* <FormControl style={{ minWidth: "250px" }}>
                <MySelect
                    selectName={'부서'}   // 부서
                    selectValue={selectDeptTitle}  // 초기값 전체부서
                    selectonChange={selectHandleChange}
                    menuItemMap={selectData.dept} />
            </FormControl> */}
            <Button id="bb" variant="contained" color="secondary" onClick={onAddRow} startIcon={<Icon className="fa fa-plus-circle" />}>
              추가
            </Button>
            <Button variant="contained" color="secondary" onClick={onRemoveSelected} startIcon={<DeleteOutlinedIcon />}>
              삭제
            </Button>
          </Grid>
        }
      ></MainCard>
      <MyGrid
        updateRow={updateRow}
        setOpenCompanyDialog={setOpenCompanyDialog}
        paginationAutoPageSize={true}
        pagination={true}
        rowData={rowData}
        onGridReady={onGridReady}
        onCellEditingStopped={onCellEditingStopped}
        columnDefinition={columnDefinition}
        style={{
          height: '100%',
          width: '100%'
        }}
      />

      <MyDialog id="aa" open={openCompanyDialog} close={close} title={'글 등록'}>
        <BoardDialog
          setOpenCompanyDialog={setOpenCompanyDialog}
          maintitle={maintitle}
          saveBoard={saveBoard}
          content={content}
          handleChangeTitle={handleChangeTitle}
        />
      </MyDialog>

      <MyDialog open={openCompanyUpDialog} close={close} title={'글 수정'}>
        <UpBoardDialog
          updateRow={updateRow}
          upBoard={upBoard}
          content={content}
          maintitle={maintitle}
          update={update}
          handleChangeTitle={handleChangeTitle}
        />
      </MyDialog>
    </>
  );
};

export default BoardContainer;
