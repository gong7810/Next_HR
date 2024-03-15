<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>휴일근무신청</title>
<style>
	section {
	padding: 10px 0;
}

#tabs {
	background: #333333;
	color: #eee;
	background-color: rgba(051, 051, 051, 0.8);
}

#tabs h6.section-title {
	color: #eee;
}

#tabs .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
	color: #f3f3f3;
	background-color: transparent;
	border-color: transparent transparent #f3f3f3;
	border-bottom: 4px solid !important;
	font-size: 10px;
	font-weight: bold;
}

#tabs .nav-tabs .nav-link {
	border: 1px solid transparent;
	border-top-left-radius: .25rem;
	border-top-right-radius: .25rem;
	color: #eee;
	font-size: 20px;
}
</style>
<script>
	var empCode = "${sessionScope.code}";
	var startTime = 0;
	var endTime = 0;
	var holidayList=[];
	var holidayworkList = [];
	var requestDate = getDay();
	$(document).ready(function() {
		$("#holidaywork_tabs").tabs();
		findHolidayList(); //공휴일 가지고옴
		showholidayworkListGrid();
        
		
		
		
		$("#holidaywork_startT").timepicker({
			step: 5,            
			timeFormat: "H:i",    
			minTime: "00:00",
			maxTime: "23:55"	
		});
		
		$("#holidaywork_endT").timepicker({
			step: 5,            
			timeFormat: "H:i",    
			minTime: "00:00",
			maxTime: "23:55"	
		});
		
		
		
		$("#search_startD").click(getDatePicker($("#search_startD")));
		$("#search_endD").click(getDatePicker($("#search_endD")));
		
		$("#search_holidayworkList_Btn").click(findholidayworkList); // 조회버튼
		
		
		$("#delete_holidaywork_Btn").click(function(){ // 초과근무 삭제버튼
			var flag = confirm("선택한 휴일근무신청을 정말 삭제하시겠습니까?");
			if(flag)
				removeholidayworkList();
		});
		
		
		$("#holidaywork_startD").click(getDatePicker($("#holidaywork_startD")));
		
		$("#holidaywork_startD").change(function(){ // 근태외신청 시작일
			holidaycheck($("#holidaywork_startD").val());//함수호출하여 공휴일여부 확인
			$("#holidaywork_endD").val($("#holidaywork_startD").val());
		
				
		}); 
		
		
		$("#holidaywork_endD").click(getDatePicker($("#holidaywork_endD")));
		$("#holidaywork_endD").change(function(){ // 근태외신청 종료일
			holidaycheck($("#holidaywork_endD").val());//함수호출하여 공휴일여부 확인
			$("#holidaywork_startD").val($("#holidaywork_endD").val());
		}); 
		
		$("#btn_regist").click(registholidaywork);
		
		/* 사용자 기본 정보 넣기 */
		$("#holidaywork_emp").val("${sessionScope.id}");
		$("#holidaywork_dept").val("${sessionScope.dept}");
		$("#holidaywork_position").val("${sessionScope.position}");
	})
	
	
	
	/* 오늘 날자를 RRRR-MM-DD 형식으로 리턴하는 함수 */
	function getDay(){
	    var today = new Date();
	    var rrrr = today.getFullYear();
	    var mm = today.getMonth()+1;
	    var dd = today.getDate();
	    var searchDay = rrrr+"-"+mm+"-"+dd;
	    console.log(searchDay);
		return searchDay;
	}
	
	
	

	/* 휴일근무목록 조회버튼  */
	function findholidayworkList(){
		var startVar = $("#search_startD").val(); // 조회 시작일 
		var endVar = $("#search_endD").val(); // 조회 종료일 
		var code = $("#selectholidayworkTypeCode").val(); //  근태코드 
		
		$.ajax({
			url:"${pageContext.request.contextPath}/attendance/excusedAttendance.do",
			data:{
				"method" : "findRestAttdList",
				"empCode" : empCode,
				"startDate" : startVar,
				"endDate" : endVar,
				"code":code
			},
			dataType:"json",
			success : function(data){
				if(data.errorCode < 0){
					var str = "내부 서버 오류가 발생했습니다\n";
					str += "관리자에게 문의하세요\n";
					str += "에러 위치 : " + $(this).attr("id");
					str += "에러 메시지 : " + data.errorMsg;
					alert(str);
					return;
				}

				holidayworkList = data.restAttdList;

				/* 시간형태변경포문부분 */
				for(var index in holidayworkList){
					console.log(holidayworkList[index].startTime);
					console.log(holidayworkList[index].endTime);
					holidayworkList[index].startTime = getRealTime(holidayworkList[index].startTime);
					holidayworkList[index].endTime = getRealTime(holidayworkList[index].endTime);
				} 

				showholidayworkListGrid();
			}
		});
	}
	
	
	
	/* 휴일근무목록 그리드 띄우는 함수 */
    function showholidayworkListGrid(){
    	var columnDefs = [
	  	      {headerName: "사원코드", field: "empCode",hide:true },
	  	      {headerName: "일련번호", field: "restAttdCode",hide:true },
	  	      {headerName: "근태구분코드", field: "restTypeCode",hide:true},
	  	      {headerName: "근태구분명", field: "restTypeName",checkboxSelection: true},
	  	      {headerName: "신청일자", field: "requestDate"},
	  	      {headerName: "시작일", field: "startDate"},
	  	      {headerName: "종료일", field: "endDate"},
	  	      {headerName: "일수", field: "numberOfDays"},
	  	      {headerName: "시작시간", field: "startTime"},
	  	      {headerName: "종료시간", field: "endTime"},
	  	      {headerName: "사유", field: "cause"},
	  	      {headerName: "승인여부", field: "applovalStatus"},
	  	      {headerName: "반려사유", field: "rejectCause"}
	  	];    
	  	gridOptions = {
	  			columnDefs: columnDefs,
	  			rowData: holidayworkList,
	  			defaultColDef: { editable: false, width: 250 },
	  			rowSelection: 'multiple', /* 'single' or 'multiple',*/
	  			enableColResize: true,
	  			enableSorting: true,
	  			enableFilter: true,
	  			enableRangeSelection: true,
	  			suppressRowClickSelection: false,
	  			animateRows: true,
	  			suppressHorizontalScroll: true,
	  			localeText: {noRowsToShow: '조회 결과가 없습니다.'},
	  			getRowStyle: function (param) {
	  		        if (param.node.rowPinned) {
	  		            return {'font-weight': 'bold', background: '#dddddd'};
	  		        }
	  		        return {'text-align': 'center'};
	  		    },
	  		    getRowHeight: function(param) {
	  		        if (param.node.rowPinned) {
	  		            return 30;
	  		        }
	  		        return 24;
	  		    },
	  		    // GRID READY 이벤트, 사이즈 자동조정 
	  		    onGridReady: function (event) {
	  		        event.api.sizeColumnsToFit();
	  		    },
	  		    // 창 크기 변경 되었을 때 이벤트 
	  		    onGridSizeChanged: function(event) {
	  		        event.api.sizeColumnsToFit();
	  		    },
	  		    onCellEditingStarted: function (event) {
	  		        console.log('cellEditingStarted');
	  		    }, 
	  	};   
	  	$('#holidayworkList_grid').children().remove();	 
	  	var eGridDiv = document.querySelector('#holidayworkList_grid');
	  	new agGrid.Grid(eGridDiv, gridOptions);	
	   }
	 
	
	
	/* 숫자로 되있는 시간을 시간형태로  */  //dao에서 초과근무고 2일이면 시간을 뺴서 온다 
	function getRealTime(time){
		var hour = Math.floor(time/100);
		if(hour>24) hour+=24;    
		var min = time-(Math.floor(time/100)*100);
		if(min.toString().length==1) min="0"+min; //분이 1자리라면 앞에0을 붙임
		if(min==0) min="00";
		return hour + ":" + min;
	}
	
	/* 삭제버튼 눌렀을 때 실행되는 함수 */
    function removeholidayworkList(){
		var selectedRowData=gridOptions.api.getSelectedRows();
	  if(selectedRowData.length===0){
		  alert("삭제할 행을 선택해주세요");
		  return;
	  }
		
		var sendData = JSON.stringify(selectedRowData); //삭제할 목록들이 담긴 배열
    
		
		$.ajax({
			url : "${pageContext.request.contextPath}/attendance/excusedAttendance.do",
			data : { "method" : "removeRestAttdList", "sendData" : sendData },
			dataType : "json",
			success : function(data) {
				if(data.errorCode < 0){
					alert("정상적으로 삭제되지 않았습니다");
				} else {
					alert("삭제되었습니다");
				}
				location.reload();
			}
		});
    }
	
	
	
	
	
	
	 //공휴일 테이블에서 공휴일 받아오는 함수
	function findHolidayList(){  //findHolidayList
	    startStr = $("#holidaywork_startD").val();
		endStr = $("#holidaywork_endD").val();
	  
			$.ajax({ //경조사 및 연차라면 주말, 공휴일을 제외한 계산일수를 반환하는 함수 사용
				url:"${pageContext.request.contextPath}/foudinfomgmt/holidayList.do",
				data:{
					"method" : "findHolidayList"
				},
				dataType:"json",
				success : function(data){
					if(data.errorCode < 0){
						var str = "내부 서버 오류가 발생했습니다\n";
						str += "관리자에게 문의하세요\n";
						str += "에러 위치 : " + $(this).attr("id");
						str += "에러 메시지 : " + data.errorMsg;
						alert(str);
						return;
					}
					holidayList=data.holidayList;
					
				}
			});
			
		
			
		
	}
	function holidaycheck(day){
		console.log(day.replaceAll("/","-"))
		var str1=day.replaceAll("/","-");
		var sss=holidayList.map(item=>item.applyDay)
		console.log(sss.includes(str1))
		var week = ['일', '월', '화', '수', '목', '금', '토'];

		var dayOfWeek = week[new Date(day).getDay()];
		

	
		if(dayOfWeek=="토" || dayOfWeek=="일" || sss.includes(str1)){
			$("#holidaywork_day").val("Y");
			}else{
			  alert("공휴일이 아닙니다")
			  $("#holidaywork_day").val("N");
			}
		
			
		
	
	}
	
	

	
	/* 달력띄우기 */
	function getDatePicker($Obj) {
		$Obj.datepicker({
			defaultDate : "d",
			changeMonth : true,
			changeYear : true,
			dateFormat : "yy/mm/dd",
			dayNamesMin : [ "일", "월", "화", "수", "목", "금", "토" ],
			monthNamesShort : [ "1", "2", "3", "4", "5", "6", "7", "8", "9",
					"10", "11", "12" ],
			yearRange : "1980:2022"
		});
	}
	
	
	/* timePicker시간을 변경하는 함수 */
	function convertTimePicker(){
		startTime = $("#holidaywork_startT").val().replace(":","");
		endTime = $("#holidaywork_endT").val().replace(":","");
	    
 		if($("#holidaywork_endT").val().substring(0,2) < 09){ // 즉 출근시간 전일떄  즉 다음날로 이어질떄 
			endTime = Number(endTime)+2400; // 종료시간  02:20 입력시 -> 2620
 		
 		console.log(endTime);
		
	}
	}
	/* 신청 버튼  */
	function registholidaywork(){
		if($("#holidaywork_day").val()==='N'){

	          Swal.fire({
						  icon: 'error',
						  title: '날짜확인',
					      text : "신청일은공휴일이아닙니다!"
						});
	
		  return;
		}
		convertTimePicker();
		var holidayworkList = {
				"empCode" : empCode,
				"restTypeCode" : $("#selectholidayworkCode").val(),
				"restTypeName" : $("#selectholidaywork").val(),
				"requestDate" : requestDate,
				"startDate" : $("#holidaywork_startD").val(),
				"endDate" : $("#holidaywork_endD").val(),
				"cause" : $("#holidaywork_cause").val(),
				"applovalStatus" : '승인대기',
				"startTime" : startTime,
				"endTime" : endTime
				
			};
		
		  console.log(holidayworkList);
		var sendData = JSON.stringify(holidayworkList);  // array-like 객체를 String 문자열로 바꿔서 네트워크 통신
		
		$.ajax({
			url : "${pageContext.request.contextPath}/attendance/excusedAttendance.do",
			data : {
				"method" : "registRestAttd",
				"sendData" : sendData
			},
			dataType : "json",
			success : function(data) {
				if(data.errorCode < 0){
					alert("신청을 실패했습니다");
				} else {
					alert("신청되었습니다");
				}
				location.reload();
			}
		});
	}
	
</script>
</head>
<body>
<br>
<br>
<br>
<br>
<br>
	<section id="tabs" class="wow fadeInDown" style="width:1050px; text-align: center;">
	<div class="container">
		<nav>
			<div class="nav nav-tabs" id="nav-tab" role="tablist">
				<a class="nav-item nav-link active" data-toggle="tab" href="#holidayworkAttd_tab" role="tab" aria-controls="nav-home" aria-selected="true">휴일근무 신청</a> 
				<a class="nav-item nav-link" data-toggle="tab" href="#holidayworkSerach_tab" role="tab" aria-controls="nav-profile" aria-selected="false">휴일근무 조회</a>
			</div>
		</nav>
	</div>

	<div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
		<div class="tab-pane fade show active" id="holidayworkAttd_tab" role="tabpanel" aria-labelledby="nav-home-tab">
			<font>휴일근무 구분 </font><input id="selectholidaywork"	class="ui-button ui-widget ui-corner-all" value="휴일근무" readonly>    <!-- 고정시켜둠 -->
				<input type="hidden" id="selectholidayworkCode" name="holidayworkCode"  value="DAC007">  <!-- 초과근무코드 DAC007 -->
			<hr>
			<table style="margin : auto;">
				<tr>
					<td><font>신청자 </font></td>
					<td><input id="holidaywork_emp"	class="ui-button ui-widget ui-corner-all" readonly></td>
				</tr>
				<tr><td><h3> </h3></td></tr>
				<tr>
					<td><font>부서 </font></td>
					<td><input id="holidaywork_dept"	class="ui-button ui-widget ui-corner-all" readonly></td>
					
					<td><font>직급</font></td>
					<td><input id="holidaywork_position"	class="ui-button ui-widget ui-corner-all" readonly></td>
				</tr>
				<tr><td><h3> </h3></td></tr>
				
				<tr><form>
					<td><font>시작일</font></td>
					<td><input id="holidaywork_startD" class="ui-button ui-widget ui-corner-all" readonly></td>
				
					<td><font>종료일</font></td>
					<td><input id="holidaywork_endD"	class="ui-button ui-widget ui-corner-all" readonly ></td>
				</tr>
				<tr><td><h3> </h3></td></tr>
				<tr>
					<td><font>시작시간</font></td>
					<td><input id="holidaywork_startT" class="ui-button ui-widget ui-corner-all" name="timePicker1" placeholder="시간선택" ></td>
				
					<td><font>종료시간</font></td>
					<td><input id="holidaywork_endT"	class="ui-button ui-widget ui-corner-all" name="timePicker2" placeholder="시간선택"></td>
				</tr>
				<tr><td><h3> </h3></td></tr>
				<tr>
					<td><font>공휴일여부</font></td>
					<td><input id="holidaywork_day" class="ui-button ui-widget ui-corner-all" readonly></td>
					<td><font>증명서</font></td>
					<td><input id="holidaywork_certi" class="ui-button ui-widget ui-corner-all" readonly></td>
				</tr>
				<tr><td><h3> </h3></td></tr>
				<tr>
					<td><font>사유</font></td>
					<td colspan="3" ><input id="holidaywork_cause" style="width:490px" class="ui-button ui-widget ui-corner-all" ></td>
				</tr>
			</table>
			<hr>
			<input type="button" class="ui-button ui-widget ui-corner-all" id="btn_regist" value="신청">
			<input type="reset" class="ui-button ui-widget ui-corner-all" value="취소">
			</form>

		</div>

		<div class="tab-pane fade" id="holidayworkSerach_tab" role="tabpanel" aria-labelledby="nav-profile-tab" style="width:1050px;">
		<table style="margin : auto;">
		<tr><td colspan="2"><center><h3>조회범위 선택</h3></center></td></tr>
		<tr><td><h3>구분</h3></td><td><input id="selectholidayworkType" class="ui-button ui-widget ui-corner-all" readonly value="휴일근무">
			<input type="hidden" id="selectholidayworkTypeCode" value='DAC007'>
		</td></tr>
		<tr>
			<td>
				<input type=text class="ui-button ui-widget ui-corner-all" id="search_startD" readonly>~
			</td>
			<td>
				<input type=text class="ui-button ui-widget ui-corner-all" id="search_endD" readonly>
			</td>
		</tr>
		<tr><td><h3> </h3></td></tr>
		<tr>
			<td colspan="2">
				<center>
				<button class="ui-button ui-widget ui-corner-all" id="search_holidayworkList_Btn">조회하기</button>
				<button class="ui-button ui-widget ui-corner-all" id="delete_holidaywork_Btn">삭제하기</button>
				</center>
			</td>
		</tr>
		</table>
		<hr>
		<div id="holidayworkList_grid" style="height: 230px; width:1000px; margin : auto;" class="ag-theme-balham"></div>
		<div id="holidayworkList_pager"></div>
		
		</div>
	</div>
	</section>
</body>
</html>