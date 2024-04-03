import React, { ReactElement, useEffect, useState } from 'react';
import { Grid, Stack, TextField, Divider, Button, Select, Box, FormControl, MenuItem, CircularProgress, InputLabel } from '@mui/material';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { restAttdTO } from '../types/types';
import { useDispatch, useSelector } from 'store';
import { attdActions } from 'store/redux-saga/reducer/attendance/attendanceReducer';
import Swal from 'sweetalert2';

const Columns: GridColDef[] = [
  {
    headerName: '사원코드',
    field: 'empCode',
    width: 150,
    headerAlign: 'center',
    align: 'center'
  },
  { headerName: '근태유형', field: 'attdType', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '신청일자', field: 'requestDate', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '시작일', field: 'startDate', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '종료일', field: 'endDate', width: 150, headerAlign: 'center', align: 'center' },
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
  { headerName: '사유', field: 'cause', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '승인여부', field: 'approvalStatus', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '권한레벨', field: 'authority', hide: true }
];

const RestAttdApprovalPage = () => {
  const dispatch = useDispatch();
  // 부서
  const [deptName, setDeptName] = useState('');
  // 부서코드
  const [deptCode, setDeptCode] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  // 종료일
  const [endDate, setEndDate] = useState('');

  const [selectRowData, setSelectRowData] = useState<restAttdTO[]>([]);

  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [authCheck, setAuthCheck] = useState(false); // 근태외 수리 권한체크

  const attdRestList = useSelector((state: any) => state.attdReducer.restAttdList);

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 3) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
  }, []);

  // 근태외 관리 조회
  const getRestAttdList = () => {
    dispatch(attdActions.getRestAttdListRequest({ deptCode, startDate, endDate }));

    setSelectRowData([]);
  };

  useEffect(() => {
    const rows = attdRestList.map((item: any, index: any) => {
      return {
        ...item,
        id: index
      };
    });

    setRows(rows);
  }, [attdRestList]);

  // 근태외 승인/취소
  const handleUpdateExcusedAttd = async (sendData: any) => {
    try {
      await dispatch(attdActions.approvalRestAttdRequest(sendData));

      console.log('데이터 업데이트 완료');
      setSelectRowData([]);
    } catch (error) {
      console.error('데이터 업데이트 오류:', error);
    }
  };

  // 근태외 승인
  const recognitionBtn = async () => {
    if (authCheck) {
      if (selectRowData.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: '행을 선택하세요.'
        });
        return;
      }

      console.log(selectRowData);

      const authLevel = localStorage.getItem('authLevel') as string;
      for (let i = 0; i < selectRowData.length; i++) {
        if (parseInt(selectRowData[i].authority.slice(-1)) >= parseInt(authLevel.slice(-1))) {
          Swal.fire({
            icon: 'warning',
            text: `'${localStorage.getItem('position')}'이상 직급의 근태는 수리할 수 없습니다.`
          });
          return;
        }
      }

      const takenData = selectRowData.map((item) => ({
        ...item,
        approvalStatus: '승인'
      }));

      await handleUpdateExcusedAttd(takenData);

      Swal.fire({
        icon: 'success',
        title: '승인이 완료되었습니다.'
      });
      await dispatch(attdActions.getRestAttdListRequest({ deptCode, startDate, endDate }));
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  // 근태외 승인취소
  const recognitionCancelBtn = async () => {
    if (authCheck) {
      if (selectRowData.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: '승인 취소할 신청을 선택하세요.'
        });
        return;
      }

      const authLevel = localStorage.getItem('authLevel') as string;
      for (let i = 0; i < selectRowData.length; i++) {
        if (parseInt(selectRowData[i].authority.slice(-1)) >= parseInt(authLevel.slice(-1))) {
          Swal.fire({
            icon: 'warning',
            text: `'${localStorage.getItem('position')}'이상 직급의 근태는 수리할 수 없습니다.`
          });
          return;
        }
      }

      const takenData = selectRowData.map((item) => ({
        ...item,
        approvalStatus: ''
      }));

      await handleUpdateExcusedAttd(takenData);

      Swal.fire({
        icon: 'info',
        title: '승인이 취소되었습니다.'
      });
      await dispatch(attdActions.getRestAttdListRequest({ deptCode, startDate, endDate }));
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  // 근태외 삭제
  const deleteRestAttd = async () => {
    if (selectRowData.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '삭제할 신청을 선택하세요.'
      });
      return;
    } else {
      const checkEmpCode = localStorage.getItem('empCode');
      for (let i = 0; i < selectRowData.length; i++) {
        if (selectRowData[i].empCode !== checkEmpCode) {
          Swal.fire({
            icon: 'warning',
            text: '본인의 근태신청만 삭제할 수 있습니다.'
          });
          return;
        }
      }
      await dispatch(attdActions.romoveRestAttdRequest({ selectRowData }));

      Swal.fire({
        icon: 'success',
        title: '삭제되었습니다.'
      });
      await dispatch(attdActions.getRestAttdListRequest({ deptCode, startDate, endDate }));
    }
  };

  return (
    <Page title="근태외 승인관리">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard
            title="근태외 승인관리"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="contained" onClick={recognitionBtn}>
                  승인완료
                </Button>
                <Button variant="contained" onClick={recognitionCancelBtn}>
                  승인취소
                </Button>
                <Button variant="contained" onClick={deleteRestAttd}>
                  삭제
                </Button>
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
                          name="조회부서"
                          onChange={(event: any) => {
                            setDeptName(event.target.value);
                            if (event.target.value === '회계팀') {
                              setDeptCode('DEP000');
                            } else if (event.target.value === '인사팀') {
                              setDeptCode('DEP001');
                            } else if (event.target.value === '전산팀') {
                              setDeptCode('DEP002');
                            } else if (event.target.value === '보안팀') {
                              setDeptCode('DEP003');
                            } else if (event.target.value === '개발팀') {
                              setDeptCode('DEP004');
                            }
                          }}
                        >
                          <MenuItem value={'회계팀'}>회계팀</MenuItem>
                          <MenuItem value={'인사팀'}>인사팀</MenuItem>
                          <MenuItem value={'전산팀'}>전산팀</MenuItem>
                          <MenuItem value={'보안팀'}>보안팀</MenuItem>
                          <MenuItem value={'개발팀'}>개발팀</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="시작일"
                      name="시작일"
                      type={'date'}
                      onChange={(event: any) => {
                        setStartDate(event.target.value);
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="종료일"
                      name="종료일"
                      type={'date'}
                      onChange={(event: any) => {
                        setEndDate(event.target.value);
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                      <Button variant="contained" onClick={() => getRestAttdList()}>
                        조회
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Box sx={{ height: 400, width: '100%' }}>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </div>
              ) : (
                <DataGrid
                  sx={{ textAlign: 'center' }}
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
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
};

RestAttdApprovalPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RestAttdApprovalPage;
