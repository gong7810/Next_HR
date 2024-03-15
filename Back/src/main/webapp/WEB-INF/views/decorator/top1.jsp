<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script
	src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.noStyle.js"></script>
<link rel="stylesheet"
	href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css">
<link rel="stylesheet"
	href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css">
<link rel="stylesheet"
	href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-fresh.css">
<link rel="stylesheet"
	href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-material.css">
<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
<link href="css/sb-admin-2.min.css" rel="stylesheet">

<style>
#divTag1 {
	margin-left: 50px;
}

#divTag3 {
	margin-left: 800px;
}

font {
	font-family: '견고딕체'
}
</style>

<script type="text/javascript">
var dustList = [];

$(document).ready(function(){
  $("#home").click(function(){ location.href="<%=request.getContextPath()%>/main/view"; });
						
  								
  								$.ajax({
									url : "${pageContext.request.contextPath}/airPollution.do",
									dataType : "json",
									data : {
										method : "showDust"
									},
									async : false,
									success : function(data) {
										//console.log(data);
										$.each(data.list,
												function(index, item) {
													dustList.push(item);
											});
										var columnDefs = [ 
											{headerName : "측정일시",field : "dataTime"},
											{headerName : "시군구",field : "cityName"}, 
											{headerName : "미세먼지농도",field : "pm10Value"}, 
											{headerName : "초미세먼지농도",field : "pm25Value"}
											];
										var gridOptions = {
											columnDefs : columnDefs,
											rowData : dustList,
										};
										var eGridDiv = document.querySelector('#airPollutionGrid');
										new agGrid.Grid(eGridDiv, gridOptions);
										gridOptions.api.sizeColumnsToFit();
								
										
										/* $.ajax({
									url : "${pageContext.request.contextPath}/boxOffice.do",
									dataType : "json",
									data : {
										method : "showBoxOffice"
									},
									success : function(data) {
										//console.log(data);
										$.each(data.boxOfficeResult.dailyBoxOfficeList,
												function(index, id) {
													movieList.push(id);
											});
										var columnDefs = [ 
											{headerName : "순위",field : "rank"}, 
											{headerName : "제목",field : "movieNm"}, 
											{headerName : "개봉일",field : "openDt"}, 
											{headerName : "전날관객수",field : "audiCnt"},
											{headerName : "누적관객수",field : "audiAcc"}, 
											];
										var gridOptions = {
											columnDefs : columnDefs,
											rowData : movieList,
										};
										var eGridDiv = document.querySelector('#boxOfficeGrid');
										new agGrid.Grid(eGridDiv, gridOptions);
										gridOptions.api.sizeColumnsToFit();*/

									}
								});

					});
</script>

<br />
<br />
<div>
	<div style="float: left;" id="divTag1">
		<div id="airPollutionGrid" style="height: 120px; width: 500px"
			class="ag-theme-balham"></div>
	</div>

	<div style="float: top-center;" id="divTag3">
		<font style="font-size: 70px; font-weight: bold; color: white"
			id="home"> COMPANY</font><br /> <br />

	</div>

</div>  
