<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>일근태기록/조회</title>
<style type="text/css">
/* Tabs*/
section .section-title {
	text-align: center;
	color: #007b5e;
	text-transform: uppercase;
}

#tabs {
	background: #333333;
	color: #eee;
	background-color: rgba(051, 051, 051, 0.8);
}

#tabs h6.section-title {
	color: #eee;
}

font {
	width: 80px;
}

input[type=text]:not (#timePicker ) {
	width: 180px;
	height: 10px;
}

#clock {
	margin: auto;
	font-family: 'Digital Dismay';
	src: url('Digital Dismay.otf');
	font-weight: normal;
	font-style: normal;
	color: #ffffff;
	color: #daf6ff;
	text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 20px
		rgba(153, 153, 153, 0);
}
</style>

<script>
	var empCode = "${sessionScope.code}"; // 로그인 후 존재하는 세션값 ( 세션이 말소 되면 얘도 같이 사라짐 )
	var currentHours = 0; // 시계의 시간
	var currentMinute = 0; // 시계의 분
	var amPm; // 시계의 AM,PM
	var conversionDate = 0; // timePicker의 :를 제거하고 자정 이후의 시간을 변환한 값	
	var dayAttdList = []; // 근태목록
	var holidayList = []; // 휴일목록
	var isHoliday = false; // 휴일여부
	var isEarlyOut = false; // 조퇴여부
	var restTypeCode = []; // 근태외코드	
	var earlyOutTime = 0; // 조퇴시간
	var leaveTime = []; // 외출

	$(document).ready(function() {
		var today = $.datepicker.formatDate($.datepicker.ATOM, new Date()); // 바로 오늘 날짜 뜨게
		$("#applyDay").val(today); // 적용일자 

		printClock(); // 시계표시함수 호출
		findDayAttdList("today"); // 시작하자마자 오늘 날짜의 근태목록을 조회목록 grid에 띄움

		$("#timePicker").button().css({
			width : "105px",
			height : "30px"
		}); //"시간선택"버튼
		$(".small_Btn").button(); // button 화 시킵니다 

		getDatePicker($("#applyDay")); // 적용일자

		$("#attdTypeName").click(function() { // 근태구분 입력창
			getCode("CO-09", "attdTypeName", "attdTypeCode");
		});

		$("#registDayAttd_Btn").click(registDayAttd); // 기록하기 버튼  
		$("#delete_dayAttd_Btn").click(removeDayAttdList); // 삭제 버튼 

		$("#timePicker").click(function() { //시간선택 누르면 나오는 리스트를 조정함!
			$(this).timepicker({
				step : 5, //시간간격 : 5분
				timeFormat : "H:i", //시간:분 으로표시
				minTime : "00:00am",
				maxTime : "23:55pm"
			});
		})

		$("#timeCheck_Btn").click(function() { // 현시각기록 버튼 눌렀을때 시계기록 눌렀을 때 시계시간, clock 넘기기  16:45:40 PM
			var checkHours = $("#clock").text().split(" ")[0].substring(0, 2); // 16:45:40 PM 일때 16 추출
			var checkMinute = $("#clock").text().split(" ")[0].substring(3, 5); // 16:45:40 PM 일때 45 추출
			registDayAttd("Clock", checkHours + checkMinute); // 1645
		})

		$("#applyDay").change(function() { // 적용일자가 변경되는 이벤트가 발생했을 때 , 그 해당일자에 맞는 일근태 목록을 가지고 옴
			findDayAttdList("applyDay");
		});
	});

	function printClock() { // 시간선택 텍스트박스 누르면 뜨는거
		var clock = $("#clock"); // 출력할 장소 선택 => id가 clock인 div태그
		var currentDate = new Date(); // 현재시간을 괄호처럼 표시 (Wed Jul 14 2021 19:42:02 GMT+0900 (대한민국 표준시))
		var calendar = currentDate.getFullYear() + "-"
				+ (currentDate.getMonth() + 1) + "-" + currentDate.getDate(); //현재년월일을 괄호처럼 표시(2021-7-14)
		amPm = 'aM'; // 초기값은 AM
		currentHours = addZeros(currentDate.getHours(), 2); //현시간
		currentMinute = addZeros(currentDate.getMinutes(), 2); //현분
		var currentSeconds = addZeros(currentDate.getSeconds(), 2); //현초

		if (currentHours >= 12) { // 현시간이 12보다 클 때는 PM으로 변경
			amPm = 'pM';
			currentHours = addZeros(currentDate.getHours(), 2);
			currentMinute = addZeros(currentDate.getMinutes(), 2);
			var currentSeconds = addZeros(currentDate.getSeconds(), 2);
		}

		currentSeconds = '<span style="font-size:30px">' + currentSeconds
				+ '</span>';

		clock.html(currentHours + ":" + currentMinute + ":" + currentSeconds
				+ " <span style='font-size:30px;'>" + amPm + "</span>"); //시간를 출력해 줌
		setTimeout(printClock, 1000);
	}

	function addZeros(num, digit) { // 시계 자릿수 맞춰주기 // 9시 일경우 09시로 만들어줌 
		var zero = '';
		num = num.toString();
		if (num.length < digit) {
			for (i = 0; i < digit - num.length; i++) {
				zero += '0';
			}
		}
		return zero + num;
	}

	/* 일근태목록 조회 함수 */
	function findDayAttdList(check) { //일근태기록/조회 페이지를 열면 바로 실행되며, check는 "today"가 됩니다.
		var searchDay = "";

		if (check == "today") { // 해당 함수를 부를때에 today라는 글자가 변수로 넘어오면 오늘 날짜를 searchDay변수에 담아 ajax실행
			var today = new Date();
			var rrrr = today.getFullYear();
			var mm = today.getMonth() + 1;
			var dd = today.getDate();
			searchDay = rrrr + "-" + mm + "-" + dd;
		} else if (check == "applyDay") { // #applyDay의 값이 바뀔때 #applyDay의 해당 날짜를 받아와서 searchDay변수에 담는다. // 새로 추가함
			searchDay = $("#applyDay").val();
		}
				    $.ajax({
					url : "${pageContext.request.contextPath}/attdmgmt/daily-attnd",
					data : {
						"empCode" : empCode,
						"applyDay" : searchDay
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

						dayAttdList = data.dayAttdList;
						
						for ( var index in dayAttdList) {
							console.log(dayAttdList[index].time);
							console.log(dayAttdList[index].applyDay);
							dayAttdList[index].applyDay = getRealDay(
									dayAttdList[index].time,
									dayAttdList[index].applyDay); //실제일자. 24시가 넘어가면 하루를 넘어간것으로 인식하고 표시함. 29일 새벽 1시에 출근하면 30일에 출근했다고 표시하는 식으로.
							dayAttdList[index].time = getRealTime(dayAttdList[index].time); //실제시간. 24시가 넘어가면 0시부터 시작함.
						}

						showDayAttdListGrid(); //data에 있던 값을 데리고감
					}
				});
	}

	/* 일근태목록 정보를 그리드에 뿌려주는 함수 */
	function showDayAttdListGrid() {
		var columnDefs = [ {
			headerName : "사원코드",
			field : "empCode",
			hide : true
		}, {
			headerName : "일련번호",
			field : "dayAttdCode",
			hide : true
		}, {
			headerName : "적용일",
			field : "applyDay",
			checkboxSelection : true
		},//
		{
			headerName : "근태구분코드",
			field : "attdTypeCode",
			hide : true
		}, {
			headerName : "근태구분명",
			field : "attdTypeName"
		},//
		{
			headerName : "시작",
			field : "time"
		} //
		];
		gridOptions = {
			columnDefs : columnDefs,
			rowData : dayAttdList,
			defaultColDef : {
				editable : false,
				width : 100,
				sortable : true,
				resizable : true,
				filter : true
			},
			rowSelection : 'multiple', /* 'single' or 'multiple',*/
			rowHeight : 24,
			enableRangeSelection : true,
			suppressRowClickSelection : false,
			animateRows : true,
			suppressHorizontalScroll : true,
			localeText : {
				noRowsToShow : '조회 결과가 없습니다.'
			}, // 데이터가 없을 때 뿌려지는 글	
			getRowStyle : function(param) {
				if (param.node.rowPinned) {
					return {
						'font-weight' : 'bold',
						background : '#dddddd'
					};
				}
				return {
					'text-align' : 'center'
				};
			},
			getRowHeight : function(param) {
				if (param.node.rowPinned) {
					return 30;
				}
				return 24;
			},
			// GRID READY 이벤트, 사이즈 자동조정 
			onGridReady : function(event) {
				event.api.sizeColumnsToFit();
			},
			// 창 크기 변경 되었을 때 이벤트 
			onGridSizeChanged : function(event) {
				event.api.sizeColumnsToFit();
			}
		};
		$('#dayAttdList_grid').children().remove();
		var eGridDiv = document.querySelector('#dayAttdList_grid');
		new agGrid.Grid(eGridDiv, gridOptions);
	}

	/* 0000단위인 시간을 00:00(실제시간)으로 변환하는 함수 */
	function getRealTime(time) {
		var hour = Math.floor(time / 100);
		if (hour >= 24) {
			hour -= 24; // 데이터 베이스에 넘길때는 25시로 받고나서 grid에 표시하는건 1시로
		}
		var min = time - (Math.floor(time / 100) * 100);
		if (min.toString().length == 1)
			min = "0" + min; // 분이 1자리라면 앞에 0을 붙임
		if (min == 0)
			min = "00";
		return hour + ":" + min;
	}

	/* 2400시 이상일때 날짜를 다음날로 출력해줌*/
	function getRealDay(time, applyDay) {
		var hour = Math.floor(time / 100);
		var date = new Date(applyDay + '/00:00:00');
		if (hour >= 24) {
			console.log(date.setDate(date.getDate()));
			date.setDate(date.getDate() + 1)
			applyDay = date.getFullYear() + '/'
					+ ('0' + (date.getMonth() + 1)).slice(-2) + '/'
					+ ('0' + date.getDate()).slice(-2);
		}
		return applyDay;
	}

	/* timePicker시간을 변경하는 함수. timePicker의 값에서 : 을 제거합니다. */
	function convertTimePicker() {
		conversionDate = $("#timePicker").val().replace(":", "");

		if (conversionDate.indexOf("00") == 0) {
			conversionDate = $("#timePicker").val().replace(":", "").replace(
					"00", "24"); //00이 들어가면 :를 ""(공백으로) 대체할 뿐만 아니라 24로 대체합니다.
		}
	}

	/* 삭제버튼 눌렀을 때 실행되는 함수 */
	function removeDayAttdList() {
		var selectedRowData = gridOptions.api.getSelectedRows(); //그리드에서 선택한 행
		var sendData = JSON.stringify(selectedRowData); // 그리드에서 선택한 행을 JsonObject화 한것.

		if (selectedRowData == "") {
			alert("삭제할 항목을 선택하세요.");
		} else {
			$
					.ajax({
						type : "DELETE",
						url : "${pageContext.request.contextPath}/attdmgmt/daily-attnd",
						data : {
							"sendData" : sendData
						},
						dataType : "json",
						success : function(data) {
							if (data.errorCode < 0) {
								alert("정상적으로 삭제되지 않았습니다");
							} else {
								alert("삭제되었습니다");
							}
							location.reload();
						}
					});
		}
	}

	/* 일근태기록 함수 */
	function registDayAttd(clock, clockTime) { // "clock", 22시 20분의 경우 2220과 같은 숫자값이 들어옵니다.
		var clockCheck = clock; // timepicker(시간선택 텍스트창)로 기록할것인지 시계(현시각 보여주는 시계)로 기록할것인지 여부를 가릴 변수     
		var today = new Date($("#applyDay").val()); // 적용일자 텍스트창에서 요일을 가져오기위한 Date객체
		var dayAttd = {}; // 데이터를 날릴 json 을 담을 json 객체 

		if ($("#applyDay").val().trim() == "") {
			alert("적용일을 입력해 주세요");
			return;
		}

		if ($("#attdTypeName").val().trim() == "") {
			alert("근태구분을 입력해 주세요");
			return;
		}

		convertTimePicker(); // 전역변수 conversionDate에 timePicker선택한 시간을 변환 	
		console.log("timePicker에서 변환한 conversionDate= " + conversionDate);

		/* 날릴 데이터 셋팅 */
		if (clockCheck == "Clock") { // 현시각기록 버튼 클릭이었으면 매개변수로 "Clock"이 넘어옴.  dayAttd 세팅
			dayAttd = {
				"empCode" : empCode,
				applyDay : $("#applyDay").val(), // 적용일자 
				attdTypeCode : $("#attdTypeCode").val(), // 근태코드 
				attdTypeName : $("#attdTypeName").val(), // 근태명 
				time : clockTime
			// 현시각 기록버튼을 눌렀을 때 clock 섹션에서 가져온 시간 값
			};

		} else {

			if (conversionDate == "") {
				alert("시간을 입력해 주세요");
				return;
			}

			dayAttd = { // 기록하기를 눌렀을 때의 경우
				"empCode" : empCode,
				applyDay : $("#applyDay").val(),
				attdTypeCode : $("#attdTypeCode").val(),
				attdTypeName : $("#attdTypeName").val(),
				time : conversionDate
			// 전역변수 conversionDate 사용
			};
		}

		var sendData = JSON.stringify(dayAttd); // 나온 JSON데이터를 문자열로 변형 시킵니다 

					$.ajax({
					type : "POST",
					url : "${pageContext.request.contextPath}/attdmgmt/daily-attnd",
					data : {
						"sendData" : sendData
					},
					dataType : "json",
					success : function(data) {
						if (data.errorCode < 0) {
							alert(data.errorMsg);
						} else {
							alert("기록되었습니다");
						}

						console.log("컨트롤러에서 출력한 데이터의 에러메세지= " + data.errorMsg);
						console.log("컨트롤러에서 출력한 데이터의 에러코드= " + data.errorCode);
						findDayAttdList("applyDay");
						location.reload();
					}
				});
	}

	/* 날짜 조회창 함수 */
	function getDatePicker($Obj, maxDate) {
		$Obj.datepicker({
			changeMonth : true,
			changeYear : true,
			showMonthAfterYear : true,
			dateFormat : "yy-mm-dd",
			dayNamesMin : [ "일", "월", "화", "수", "목", "금", "토" ],
			monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월",
					"9월", "10월", "11월", "12월" ],
			yearRange : "2000:2050",
			maxDate : (maxDate != null ? "+100Y" : maxDate)
		});
	}

	function getCode(code, inputText, inputCode) {
		option = "width=220; height=200px; left=300px; top=300px; titlebar=no; toolbar=no,status=no,menubar=no,resizable=no, location=no";
		window.open(
				"${pageContext.request.contextPath}/comm/codeWindow/view?code="
						+ code + "&inputText=" + inputText + "&inputCode="
						+ inputCode, "newwins", option);
	}
</script>

</head>
<body>
	<table>
		<colgroup>
			<col width="60%">
			<col width="40%">
		<colgroup>
		<tr>
			<td>
				<section id="tabs"
					style="width: 95% !important; height: 450px; text-align: center"
					class="wow fadeInDown">
					<div class="container">
						<h6 class="section-title h3" style="">일근태기록</h6>
						<hr style="background-color: white; height: 1px;">
						<div
							style="width: 300px; height: 60px; font-size: 30px; text-align: center;"
							id="clock"></div>
						<table style="width: 60%; margin: auto;">
							<colgroup>
								<col width="50%">
								<col width="50%">
							<colgroup>
							<tr>
								<td>적용일자</td>
								<td><input type=text id="applyDay" readonly></td>
							</tr>
							<tr>
								<td>근태구분</td>
								<td><input type=text id="attdTypeName" readonly> <input
									type=hidden id="attdTypeCode"></td>
							</tr>
							<tr>
								<td>시각</td>
								<td><input type="text" name="timePicker" placeholder="시간선택"
									id="timePicker" size="10"> <input type="button"
									id="registDayAttd_Btn" class="small_Btn" value="기록하기" /></td>
							</tr>
							<tr>
								<td></td>
								<td><input type="button" id="timeCheck_Btn"
									class="small_Btn" value="현시각기록" /></td>
							</tr>
						</table>
						<br />
					</div>
				</section>
			</td>

			<td>
				<section id="tabs" style="width: 100% !important; height: 450px;"
					class="wow fadeInDown">
					<div class="container">
						<h6 class="section-title h3" style="">일근태조회</h6>
						<hr style="background-color: white; height: 1px;">
						<center>
							<button class="small_Btn" id="delete_dayAttd_Btn"
								style="align: center;">삭제하기</button>
						</center>
						<br />
						<div id="dayAttdList_grid"
							style="height: 280px; width: 420px align:center;"
							class="ag-theme-balham"></div>
					</div>
				</section>
			</td>
		</tr>
	</table>
</body>
</html>
