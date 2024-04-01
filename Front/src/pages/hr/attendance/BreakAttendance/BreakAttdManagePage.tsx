import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Button, Divider, Grid, Stack, TextField } from '@mui/material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { gridSpacing } from 'store/constant';

// assets
import { breakAttdTO } from '../types/types';
import { useDispatch, useSelector } from 'store';
import { attdActions } from 'store/redux-saga/reducer/attendance/attendanceReducer';

// ==============================|| AUTOCOMPLETE ||============================== //

const Columns: GridColDef[] = [
  { headerName: '연차일렬번호', field: 'restAttdNo', width: 200, headerAlign: 'center', align: 'center' },
  {
    headerName: '사원명',
    field: 'empName',
    width: 150,
    headerAlign: 'center',
    align: 'center'
  },
  { headerName: '부서코드', field: 'deptCode', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '근태유형', field: 'attdType', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '시작날짜', field: 'startDate', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '종료날짜', field: 'endDate', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '사유', field: 'cause', width: 250, headerAlign: 'center', align: 'center' },
  { headerName: '승인상태', field: 'approvalStatus', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '남은연차', field: 'remainBreakAttd', width: 150, headerAlign: 'center', align: 'center' }
];

const BreakAttendanceManagePage = () => {
  const dispatch = useDispatch();
  const breakAttdList = useSelector((state) => state.attdReducer.breakAttdList);

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  const [selectedRow, setSelectRow] = useState<breakAttdTO[]>([]);
  const [selectMonth, setSelectMonth] = useState('');

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 3) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      alert('접근 권한이 없습니다.');
    }
  }, []);

  useEffect(() => {
    const rows = breakAttdList.map((item: any, index: any) => {
      return {
        ...item,
        id: index
      };
    });

    setRows(rows);
  }, [breakAttdList]);

  // 연차 내역 조회
  const getBreakAttdList = () => {
    dispatch(attdActions.getBreakAttdListRequest(selectMonth));
  };

  // 연차 승인/반려
  const handleUpdateExcusedAttd = (sendData: any) => {
    try {
      dispatch(attdActions.approvalBreakAttdRequest(sendData));

      console.log('데이터 업데이트 완료');
      setSelectRow([]);
    } catch (error) {
      console.error('데이터 업데이트 오류:', error);
    }
  };

  // 연차 승인
  const recognitionBtn = () => {
    if (selectedRow.length === 0) {
      alert('행을 선택하세요!');
      return;
    }

    console.log(selectedRow);

    const takenData = selectedRow.map((item) => ({
      ...item,
      approvalStatus: '승인'
    }));

    handleUpdateExcusedAttd(takenData);

    alert('승인이 완료되었습니다.');
    dispatch(attdActions.getBreakAttdListRequest(selectMonth));
  };

  // 연차 반려
  const recognitionRejectBtn = () => {
    if (selectedRow.length === 0) {
      alert('반려할 신청을 선택하세요!');
      return;
    }

    const takenData = selectedRow.map((item) => ({
      ...item,
      approvalStatus: '반려'
    }));

    handleUpdateExcusedAttd(takenData);

    alert('연차 신청이 반려되었습니다.');
    dispatch(attdActions.getBreakAttdListRequest(selectMonth));
  };

  // 연차 취소
  const recognitionCancelBtn = () => {
    if (selectedRow.length === 0) {
      alert('승인취소할 신청을 선택하세요!');
      return;
    }

    const takenData = selectedRow.map((item) => ({
      ...item,
      approvalStatus: ''
    }));

    handleUpdateExcusedAttd(takenData);

    alert('승인이 취소되었습니다.');
    dispatch(attdActions.getBreakAttdListRequest(selectMonth));
  };

  // 연차 신청 삭제
  const deleteRestAttd = () => {
    if (selectedRow.length === 0) {
      alert('삭제할 신청을 선택하세요!');
      return;
    } else {
      dispatch(attdActions.romoveBreakAttdRequest({ selectedRow }));

      alert('삭제되었습니다.');
      dispatch(attdActions.getBreakAttdListRequest(selectMonth));
    }
  };

  return (
    <Page title="연차관리">
      {authCheck ? (
        <MainCard
          title="연차관리"
          secondary={
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" onClick={recognitionBtn}>
                승인완료
              </Button>
              <Button variant="contained" onClick={recognitionRejectBtn}>
                반려
              </Button>
              <Button variant="contained" onClick={recognitionCancelBtn}>
                취소
              </Button>
              <Button variant="contained" onClick={deleteRestAttd}>
                삭제
              </Button>
            </Stack>
          }
        >
          <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="column" spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="조회년월"
                    type={'month'}
                    onChange={(event: any) => {
                      setSelectMonth(event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <Button variant="contained" onClick={getBreakAttdList}>
                    연차 내역 조회
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              sx={{ textAlign: 'center', width: '100%' }}
              rows={rows}
              columns={Columns}
              pageSize={10}
              checkboxSelection
              onSelectionModelChange={(newSelection) => {
                const selectedRows = rows.filter((row) => newSelection.includes(row.id));
                setSelectRow(selectedRows);

                console.log('선택된 행의 데이터:', selectedRows);
              }}
            />
          </div>
        </MainCard>
      ) : (
        <MainCard
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DoDisturbIcon style={{ color: 'red', marginRight: '8px' }} /> {/* 아이콘을 title 옆에 추가합니다. */}
              접근 권한 없음
            </div>
          }
          style={{ textAlign: 'center' }}
        />
      )}
    </Page>
  );
};

BreakAttendanceManagePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BreakAttendanceManagePage;
