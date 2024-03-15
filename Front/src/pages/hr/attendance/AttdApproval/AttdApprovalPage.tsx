import React, { ReactElement, useState } from 'react';
import { Grid, Stack, TextField, Divider, Button, Select, Box, FormControl, InputLabel, MenuItem, CircularProgress } from '@mui/material';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RestAttdTO } from '../types/types';
import axios from 'axios';

const Columns: GridColDef[] = [
  { headerName: '사원명', field: 'empName', width: 150, headerAlign: 'center', align: 'center' , headerCheckboxSelection: true, checkboxSelection: true },
  { headerName: '근태구분명', field: 'restTypeName', width: 150, headerAlign: 'center', align: 'center'  },
  { headerName: '일수', field: 'numberOfDays', width: 150, headerAlign: 'center', align: 'center'  },
  { headerName: '신청일자', field: 'requestDate', width: 150, headerAlign: 'center', align: 'center'  },
  { headerName: '시작일', field: 'startDate', width: 150, headerAlign: 'center', align: 'center'  },
  { headerName: '종료일', field: 'endDate', width: 150, headerAlign: 'center', align: 'center'  },
  { 
    headerName: '시작시간', 
    field: 'startTime', 
    width: 150, 
    headerAlign: 'center', 
    align: 'center',
    valueFormatter: (params) => {
      return params.value ? `${params.value}` : ''; // null 체크 후 반환
    }
  },
  { 
    headerName: '종료시간', 
    field: 'endTime', 
    width: 150, 
    headerAlign: 'center', 
    align: 'center',
    valueFormatter: (params) => {
      return params.value ? `${params.value}` : ''; // null 체크 후 반환
    }
  },
  { headerName: '사유', field: 'cause', width: 150, headerAlign: 'center', align: 'center'  },
  { headerName: '승인여부', field: 'applovalStatus', width: 150, headerAlign: 'center', align: 'center'  },
];

const AttdApprovalPage = () => {
  // 부서
  const [deptName, setDeptName] = useState('');
  // 부서코드
  const [deptCode, setDeptCode] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  // 종료일
  const [endDate, setEndDate] = useState('');

  const [selectRowData, setSelectRowData] = useState<RestAttdTO[]>([]);
  
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleSearchExcusedAttd = async (deptCode: any, startDate: any, endDate: any) => {
    setLoading(true); 
  
    try {
      const response = await axios.get('http://localhost:9101/attdappvl/attnd-approval', {
        params: {
          deptCode: deptCode,
          startDate: startDate,
          endDate: endDate
        }
      });
  
      console.log('응답 데이터:', response.data);
  
      const updatedRows = response.data.restAttdList.map((item: any, index: any) => {
        console.log('startTime:', item.startTime);
        console.log('endTime:', item.endTime);
  
        const formatTime = (time: number) => {
          const hours = Math.floor(time / 100);
          const minutes = time % 100;
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }
  
        return { 
          ...item, 
          id: index,
          startTime: formatTime(item.startTime),
          endTime: formatTime(item.endTime)
        }; 
      });
  
      setRows(updatedRows); 
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    } finally {
      setLoading(false); 
    }
  }  
  
  const handleUpdateExcusedAttd = async (sendData: any) => {
    try {
      await axios.put('http://localhost:9101/attdappvl/react-attnd-approval', {
        sendData: sendData
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('데이터 업데이트 완료');
      setSelectRowData([]);
      handleSearchExcusedAttd(deptCode, startDate, endDate);
    } catch (error) {
      console.error('데이터 업데이트 오류:', error);
    }
  }

  const searchBtn = () => {
    handleSearchExcusedAttd(deptCode, startDate, endDate);
  }

  const recognitionBtn = async () => {
    if (selectRowData.length === 0) {
      alert('승인할 신청을 선택하세요!');
      return;
    }

    console.log(selectRowData)

    const takenData = selectRowData.map(item => ({
      ...item,
      applovalStatus: '승인완료'
    }));

    await handleUpdateExcusedAttd(takenData);

    alert("승인이 완료 되었습니다.");
  }

  const recognitionCancelBtn = async () => {
    if (selectRowData.length === 0) {
      alert('승인 취소할 신청을 선택하세요!');
      return;
    }

    const takenData = selectRowData.map(item => ({
      ...item,
      applovalStatus: '승인취소'
    }));

    await handleUpdateExcusedAttd(takenData);

    alert('승인이 취소되었습니다.');
  }

  return (
    <Page title="근태외 승인관리">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard
            title="근태외 승인관리"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="contained" onClick={recognitionBtn}>승인완료</Button>
                <Button variant="contained" onClick={recognitionCancelBtn}>승인취소</Button>
              </Stack>
            }
          >
            <Grid item xs={12}>
              <SubCard>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">조회부서</InputLabel>
                        <Select
                          value={deptName}
                          label="조회부서"
                          onChange={(event) => {
                            setDeptName(event.target.value);
                            if (event.target.value === '인사팀') { setDeptCode('DEP001'); }
                            else if (event.target.value === '전산팀') { setDeptCode('DEP002'); }
                            else if (event.target.value === '회계팀') { setDeptCode('DEP000'); }
                            else if (event.target.value === '보안팀') { setDeptCode('DEP003'); }
                            else if (event.target.value === '개발팀') { setDeptCode('DEP004'); }
                          }}
                        >
                          <MenuItem value={'인사팀'}>인사팀</MenuItem>
                          <MenuItem value={'전산팀'}>전산팀</MenuItem>
                          <MenuItem value={'회계팀'}>회계팀</MenuItem>
                          <MenuItem value={'보안팀'}>보안팀</MenuItem>
                          <MenuItem value={'개발팀'}>개발팀</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth label="시작일"
                      name="시작일"
                      type={'date'}
                      onChange={(event) => { setStartDate(event.target.value) }}
                      InputLabelProps={{ shrink: true, }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth label="종료일"
                      name="종료일"
                      type={'date'}
                      onChange={(event) => { setEndDate(event.target.value) }}
                      InputLabelProps={{ shrink: true, }}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                      <Button variant="contained" onClick={searchBtn}>조회하기</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </div>
              ) : (
                <DataGrid sx={{ textAlign: 'center' }}
                  rows={rows}
                  columns={Columns}
                  pageSize={5}
                  checkboxSelection
                  onSelectionModelChange={(newSelection) => {
                    const selectedRows = rows.filter((row) => newSelection.includes(row.id));
                    setSelectRowData(selectedRows);

                    console.log('선택된 행의 데이터:', selectedRows);
                  }}
                />
              )}
            </div>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
}

AttdApprovalPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AttdApprovalPage;
