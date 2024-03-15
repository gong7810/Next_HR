<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>jQuery UI Tabs - Default functionality</title>


<script>
var empList = [];
var retirementSalaryList = [];


$(document).ready(function() {
	/* 부서명 검색/사원명 검색 탭 이동 */
	$("#tabs").tabs();
	
	$("#sel_dept").selectmenu(); //부서 검색하면 menu 나옴
	$("#tabs1").tabs();
	
	/* 부서명 검색, 이름 검색 이벤트 등록 */
	$("#btn_name_search").click(function() {
		makeEmpList("name", $("#txt_name").val()); //이름
	})
	$("#btn_dept_search").click(function() {
		makeEmpList("dept", $("#sel_dept").val()); //부서명
	})
	showEmpListDeptGrid();
	showEmpListNameGrid();
	showRetirementSalaryListGrid();
});

		/* 검색 함수 */
	function makeEmpList(grid, value) {
		
		console.log(grid+"    "+value);
		
		$.ajax({
			url : "${pageContext.request.contextPath}/empinfomgmt/emplist",
			data : {
				"value" : value				//전체부서/회계팀/인사팀/전산팀
			},
			dataType : "json",
			success : function(data) {
				if (data.errorCode < 0) { //erroe code는 컨트롤러에서 날려보냄
					var str = "내부 서버 오류가 발생했습니다\n";
					str += "관리자에게 문의하세요\n";
					str += "에러 위치 : " + $(this).attr("id");
					str += "에러 메시지 : " + data.errorMsg;
					alert(str);
					return; //function 빠져나감
				}
				
				empList = data.list; //만들어놓은 빈 배열에 list담음
				
				if (grid == "dept")
					showEmpListDeptGrid();
				else {
					showEmpListNameGrid();
				}
			},
			error : function(a, b, c) {
				alert(b);
			}
		});
	}

/* 부서별 사원 정보 그리드에 뿌리는 함수 */
function showEmpListDeptGrid() {
	var columnDefs = [ 
		{ headerName : "사원코드", field : "empCode" },
		{ headerName : "사원명", field : "empName", },
		{ headerName : "부서", field : "deptName"}, 
		{ headerName : "직급", field : "position" },

	];
	gridOptions = {
		//console.log(node.data.imgExtend);
		columnDefs : columnDefs,
		rowData : empList,
		onRowClicked : function(node) {
			var empCode = node.data.empCode;
			$.ajax({
				url:"${pageContext.request.contextPath}/salaryinfomgmt/retirement",
				data:{
					"empCode" : empCode
				},
				dataType : "json",
				success : function(data) {
					if (data.errorCode < 0) {
						var str = "내부 서버 오류가 발생했습니다\n";
						str += "관리자에게 문의하세요\n";
						str += "에러 위치 : "+ $(this).attr("id");
						str += "에러 메시지 : " + data.errorMsg;
						alert(str);
						return;
					}
					
					retirementSalaryList = data.retirementSalaryList;
						
					if(retirementSalaryList[0] == null){
						Swal.fire({
							icon:'warning',
							title:'@@@@',
							text:'조회한 사원은 재직기간이 1년 미만입니다.'
						});
						return;
					}
	
					showRetirementSalaryListGrid();
				}
			});
		}
	}
	$('#deptfindgrid').children().remove();
	var eGridDiv = document.querySelector('#deptfindgrid');
	new agGrid.Grid(eGridDiv, gridOptions);
	gridOptions.api.sizeColumnsToFit();
}

/* 이름으로 검색결과 그리드에 뿌리는 함수 */
function showEmpListNameGrid() {
	var columnDefs = [ 
		{ headerName : "사원코드", field : "empCode" , width:130}, 
		{ headerName : "사원명", field : "empName" , width:120}, 
		{ headerName : "부서", field : "deptName" , width:120}, 
		{ headerName : "직급", field : "position" , width:130}, 

	];
	gridOptions = {
		columnDefs : columnDefs,
		rowData : empList,
		onCellClicked : function(node) {
			console.log(node);
			var empCode = node.data.empCode
			$.ajax({
				url:"${pageContext.request.contextPath}/salaryinfomgmt/retirement",
				data:{
					"empCode" : empCode
				},
				dataType : "json",
				success : function(data) {
					if (data.errorCode < 0) {
						var str = "내부 서버 오류가 발생했습니다\n";
						str += "관리자에게 문의하세요\n";
						str += "에러 위치 : " + $(this).attr("id");
						str += "에러 메시지 : " + data.errorMsg;
						alert(str);
						return;
					}
					retirementSalaryList = data.retirementSalaryList;
					
					if(retirementSalaryList[0] == null){
						Swal.fire({
							icon:'warning',
							title:'@@@@',
							text:'조회한 사원은 재직기간이 1년 미만입니다.'
						});
						return;
					}
					
					showRetirementSalaryListGrid();
					
				}
			});
		}
	}
	$('#namefindgrid').children().remove();
	var eGridDiv = document.querySelector('#namefindgrid');
	new agGrid.Grid(eGridDiv, gridOptions);
	gridOptions.api.sizeColumnsToFit();
}
						

					
/*//////////////////////////////////////// 퇴직급여 그리드 띄우기//////////////////////////////////////////////*/

	 function showRetirementSalaryListGrid(){
		 var columnDefs = [
		      {headerName: "직급", field: "position" , width:"50px"},
		      {headerName: "사원이름", field: "empname" , width:"80px"},
		      {headerName: "사원번호", field: "empcode" , width:"70px"},
		      {headerName: "입사일", field: "hiredate" , width:"90px"},
		      {headerName: "정산일", field: "settlementdate" },
		      {headerName: "재직일수", field: "workingdate" , width:"60px"},
		      {headerName: "퇴직급여", field: "retirementsalary" , width:"80px"}
		 ];
		 
			gridOptions = {
					columnDefs: columnDefs,
					rowData: retirementSalaryList,
					defaultColDef: { editable: false, width: 100 },
					rowSelection: 'single', /* 'single' or 'multiple',*/
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
				        return {'text-align': 'left'};
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
				    }
			};   
			
		 	$('#retirementSalaryList_grid').children().remove(); /* 자식노드를 지워서 중복생성 방지 */
			var eGridDiv = document.querySelector('#retirementSalaryList_grid');
			new agGrid.Grid(eGridDiv, gridOptions); /* 새로 생성 */
			
	}
											
				


</script>

</head>
<body>
	<!-- 왼쪽창 -->
	<div id="tabs" class="twobox wow fadeInDown" >
		<ul>
			<li><a href="#tabs-11">부서명 검색</a></li>
			<li><a href="#tabs-1">사원명 검색</a></li>
		</ul>
		<!-- 부서명검색 탭 -->
		<div id="tabs-11">
			<select id="sel_dept">
				<option value="전체부서">전체부서</option>
				<option value="회계팀">회계팀</option>
				<option value="인사팀">인사팀</option>
				<option value="전산팀">전산팀</option>
				<option value="보안팀">보안팀</option>
			</select>
			<button id="btn_dept_search"
				class="ui-button ui-widget ui-corner-all">검색</button>
			<br /> <br />
			<div id="deptfindgrid" style="height: 250px;" class="ag-theme-balham"></div>
		</div>
		<!-- 사원명 검색탭 -->
		<div id="tabs-1">
			<input type="text" id="txt_name"
				class="ui-button ui-widget ui-corner-all">
			<button id="btn_name_search"
				class="ui-button ui-widget ui-corner-all">검색</button>
			<br /> <br />
			<div id="namefindgrid" style="height: 250px;" class="ag-theme-balham"></div>
		</div>

	</div>

	<!-- 오른쪽 창 -->
	<div id="tabs1" class="twobox wow fadeInDown">
		<!-- 기본정보 -->
		<div id="tabs-0" align="left">
			<ul>
				<li><a href="#tabs-11">퇴직급여</a></li>
			</ul>
			<!-- 상세정보박스1 -->
			<div id="divEmpInfo" style="height: 350px;" >
				<br />
				<table>
					<div id="retirementSalaryList_grid" style="height: 300px;" class="ag-theme-balham"></div>
				</table>
			</div>
		</div>


	</div>

</body>
</html>