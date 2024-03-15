import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Autocomplete, TextField, Button, Checkbox, Select, MenuItem } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { ColumnProps, HolidayTO, WorkTimeTO } from '../types/types';
import axios from 'axios';
import { GridRowEditStartReasons } from '@mui/x-data-grid';
import { rows } from 'components/forms/tables/GridTable';
import ClipLoader from "react-spinners/ClipLoader";
import { every } from 'lodash';
import { apply } from 'redux-saga/effects';





export const workTimeGrid:ColumnProps[] = [
  // 칼럼정의
  {
    label: "연도", //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: "applyYear",
 
  },
  {
    label: "출근시간",
    id: "attendTime",
 
  },
  {
    label: "점심시작시간",
    id: "lunchStartTime",
 
  },
  {
    label: "점심마감시간",
    id: "lunchEndTime",
    
  },
  {
    label: "퇴근시간",
    id: "quitTime",
 
  },
  {
    label: "저녁시작시간",
    id: "dinnerStartTime",
 
  }, 
  {
    label: "저녁마감시간",
    id: "dinnerEndTime",

  },
  { 
    label: "연장근무마감시간", 
    id: "overEndTime", 
  },
  {
    label: "야근마감시간",
    id: "nightEndTime",
 
  },
];

function WorkTimePage()  {
  const [workTime,setWorkTime]=useState<WorkTimeTO[]>([]);
//그리드 아이디값
  const gridId = workTimeGrid.map(column => column.id);
  const [selRow,setSelRow]=useState(null);
  const[loading,setLoading]=useState(false);

  const [showTextFields, setShowTextFields] = useState(false);

  const [editableRow, setEditableRow] = useState(null);


  

  const [newRow, setNewRow] = useState<WorkTimeTO>({
    applyYear:'',
    attendTime: '',
    lunchStartTime: '',
    lunchEndTime: '',
    quitTime: '',
    dinnerStartTime: '',
    dinnerEndTime: '',
    overEndTime: '',
    nightEndTime: '',
    status:'insert',
    showTextFields:true,
  });

  function formatTime(data: WorkTimeTO[]) {
    const formattedData = data.map((item) => {
      // 각각의 시간 필드에 대해 4자리 숫자를 12시간 형식으로 변경
      item.attendTime = formatTo12HourTime(item.attendTime);
      item.quitTime = formatTo12HourTime(item.quitTime);
      item.lunchStartTime = formatTo12HourTime(item.lunchStartTime);
      item.lunchEndTime = formatTo12HourTime(item.lunchEndTime);
      item.dinnerStartTime = formatTo12HourTime(item.dinnerStartTime);
      item.dinnerEndTime = formatTo12HourTime(item.dinnerEndTime);
      item.overEndTime = formatTo12HourTime(item.overEndTime);
      item.nightEndTime = formatTo12HourTime(item.nightEndTime);
      // 그 외의 필드도 동일한 방식으로 변환
      return item;
    });
    console.log("변환된 데이터", formattedData);
    setWorkTime(formattedData); // 변경된 데이터로 업데이트
  }

  function formatTo12HourTime(time: string) {
    if (time === "2500") {
      return "01:00";
    } 
    else if(time === "900"){
      return "09:00"
    }
    else if (time.length === 4) {
      const hour = time.slice(0, 2);
      const minute = time.slice(2);
      const formattedTime = `${hour}:${minute}`;
      return formattedTime;
    }

    return time; // 변환할 수 없는 형식은 그대로 반환
  }


  const findWorkTime=()=>{
      setLoading(true)
      axios.get("http://localhost:9101/foudinfomgmt/basetime")
      .then(({ data }) => {
        setWorkTime(data.list);
        console.log('기준기준', data);
        console.log('기기기기', data.list);

        console.log("길이",workTime.length)
        formatTime(data.list)
        setLoading(false)
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 에러 발생: ", error);
      });
  }


  const addRow = () => {
    setShowTextFields(true);

    // 기존 workTime 배열에서 마지막 행을 가져와서 해당 연도를 추출합니다.
    const lastWorkYear = workTime[workTime.length - 1].applyYear;
    
    // 현재 연도를 정수로 변환하고 +1 합니다.
    const newApplyYear = parseInt(lastWorkYear, 10) + 1;

    // 새로운 행을 생성하고 연도를 업데이트합니다.
    const newRowWithYear = { ...newRow, applyYear: newApplyYear.toString() };

    // 기존 workTime 배열에 새로운 행을 추가합니다.
    setWorkTime([...workTime, newRowWithYear]);
  }



  // const addRow=()=>{
  //   setShowTextFields(true); // showTextFields 값을 true로 설정
  //   setWorkTime([...workTime, newRow]);
  // }



  const textChange = (fieldName: string, value: string) => {
    const updatedRow = { ...newRow, [fieldName]: value };
    setNewRow(updatedRow);
  }

  const addData=()=>{
    const newApplyYear = workTime[workTime.length - 1].applyYear;
    const newRowWithYear = { ...newRow, applyYear: newApplyYear };
  
    // 그리고 `sendData1`을 생성합니다.
    const sendData1 = newRowWithYear;
  
    console.log("타임", sendData1);
  if (sendData1.status === 'insert') {
    const sendData =JSON.stringify(sendData1);
    console.log("타임", sendData);
    
    axios.post("http://localhost:9101/foudinfomgmt/basetime", sendData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      alert('등록완료');
      window.location.reload();
    })
    .catch((error) => {
      console.error("데이터를 백엔드로 보내는 중에 오류 발생: ", error);
    });
  }
  }

  const selectRow=(rowData:any)=>{
    setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
    console.log('선택한 행의 데이터:', rowData);
  }

  const deleteData=()=>{
    if (selRow) {
      // 선택한 행의 데이터를 삭제하기 전에 status를 'delete'로 변경
      selRow.status = 'delete';
      console.log(`삭제할껀디`, selRow);
      const confirmDelete = window.confirm('삭제하시겠습니까?'); //따로선언할것 없이 window.confirm을 사용하면 확인,취소가 만들어짐.(true/false 반환)
      if(confirmDelete){
      // 선택한 행을 업데이트하고 나머지 행을 포함한 리스트로 업데이트
      const delData = workTime.filter((row: any) => row !== selRow);
      setWorkTime(delData);
      axios.post("http://localhost:9101/foudinfomgmt/react-deleteBasetime", selRow, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        alert('삭제완료');
        window.location.reload();

      })
      .catch((error) => {
        console.error("데이터를 백엔드로 보내는 중에 오류 발생: ", error);
      });
      // 선택한 행 초기화
      setSelRow(null);


    }}
  }


    
  return (
    <Page title="기준근무 시간관리">
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard
          content={false}
          title="기준근무 시간관리"
          secondary={
            <Stack direction="row" spacing={2} alignItems="center">
              <SecondaryAction link="https://next.material-ui.com/components/tables/" />
              <Button variant="contained" color="primary" onClick={findWorkTime}>조회</Button>
              <Button variant="contained" color="primary" onClick={addRow}>추가</Button>
              <Button variant="contained" color="primary" onClick={addData}>저장</Button>
              <Button variant="contained" color="primary" onClick={deleteData}>삭제</Button>
              <Button variant="contained" color="primary" >수정</Button>
            </Stack>
          }
        >
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead >
                <TableRow >
                  {workTimeGrid.map((column: any) => (
                    <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth }}>
                      <div style={{fontWeight: 'bold',textAlign: 'center'}}>
                      {column.label}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {loading ?(
          <div className="loader-container">
          <ClipLoader
            color='red'
            loading={loading}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>):
              (<TableBody>
                  {workTime.map((row, rowIndex) => (
                    <TableRow 
                    onClick={() => selectRow(row)} // 행을 클릭하면 선택한 행을 설정
                    className={row === selRow ? 'selected' : ''} key={rowIndex}>
                      {gridId.map((id: string) => (
                      <TableCell key={id} sx={{ py: 3 ,textAlign: 'center'}}>
                        {showTextFields && rowIndex === workTime.length - 1 && id !== "applyYear" ? (
                        <Select
                        value={newRow[id as keyof typeof newRow]}
                        label="시간"
                        onChange={(e) => textChange(id, e.target.value)}
                      >
                            {Array.from({ length: 17 }, (_, i) => {
                              const hour = i + 9; // 9부터 시작하여 25까지
                              const time1 = hour < 10 ? `0${hour}00` : `${hour}00`;
                              const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                              return <MenuItem key={time} value={time1}>{time}</MenuItem>;
                            })}
                          </Select>
                        ) : (
                          editableRow === row ? (
                            <TextField
                              value={row[id as keyof typeof row]}
                              // onChange={handleTextFieldChange}
                            />
                          ) : (
                            id === "applyYear" ? row[id as keyof typeof row] : row[id as keyof typeof row]
                          )
                        )}
                      </TableCell>
                    ))}
                    </TableRow>
                  ))}
              </TableBody>)}
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  </Page>
  );
}

WorkTimePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WorkTimePage;


