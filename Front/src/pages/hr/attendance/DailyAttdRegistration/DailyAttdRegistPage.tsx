import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Stack,
  TableContainer,
  Table,
  TextField,
  Button,
  TableBody,
  TableCell,
  TableHead,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableRow
} from '@mui/material';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DailyAttendInsertModal from './DailyAttendInsertModal';
import { dailyAttdEntity } from 'pages/hr/attendance/types/types';
import { dailyAttendAction } from 'store/redux-saga/reducer/attendance/DailyAttendReducer';
import Swal from 'sweetalert2';

function DailyAttendRegist() {
  const [insertModal, setInsertModal] = useState<boolean>(false);
  const [modifyModal, setModifyModal] = useState<boolean>(false);
  const [selectedEmp, setSelectedEmp] = useState<dailyAttdEntity[]>([]);

  const dispatch = useDispatch();

  const dayAttdlist = useSelector((state: any) => (state.dailyAttend.dayAttdlist !== undefined ? state.dailyAttend.dayAttdlist : []));

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 3) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
  }, []);

  // 부서
  const [deptName, setDeptName] = useState('');
  // 부서코드
  const [deptCode, setDeptCode] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  // 종료일
  const [endDate, setEndDate] = useState('');

  const onToggleInsertHandler = () => {
    setInsertModal((data) => !data);
  };

  const onClickHandler = (identifier: string) => {
    if (identifier === 'mod') {
      if (selectedEmp.length === 0) {
        alert('사원을 선택해 주세요');
        return;
      } else if (selectedEmp.length > 1) {
        alert('사원 수정은 한번에 한명씩 가능합니다.');
        return;
      }
      setModifyModal(true);
      return;
    } else if (identifier === 'insert') {
      setInsertModal(true);
      return;
    }
  };

  const onSearchClickHandler = () => {
    if (authCheck) {
      console.log('시작일: ' + startDate);
      console.log('완료일: ' + endDate);
      const data = {
        deptCode: deptCode,
        startDate: startDate,
        endDate: endDate,
        type: 'less',
        authLevel: localStorage.getItem('authLevel')
      };
      dispatch(dailyAttendAction.DAILY_ATTEND_SEARCH_FETCH_REQUESTED(data));
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  return (
    <Page title="일근태 등록">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="일근태 등록"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  {/* <Button className={classes.button} onClick={onCheckAllHandler} sx={{ width: '200' }}>
                  전체 선택
                  </Button> */}
                  <Box sx={{ minWidth: 120, marginBottom: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">조회부서</InputLabel>
                      <Select
                        value={deptName}
                        label="조회부서"
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
                    label="근태조회시작일"
                    name="근태조회시작일"
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
                    label="근태조회종료일"
                    name="근태조회종료일"
                    type={'date'}
                    onChange={(event) => {
                      setEndDate(event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* 
                {modifyModal && <DailyAttendModifyModal toggle={onToggleModifyHandler} emp={selectedEmp} />}
                <Button className={classes.button} onClick={() => onClickHandler('mod')} sx={{ width: '200'}}>
                  일근태 수정
                </Button> 
                */}

                {insertModal && <DailyAttendInsertModal toggle={onToggleInsertHandler} />}
                <Button variant="contained" onClick={() => onSearchClickHandler()} sx={{ width: '200' }}>
                  조회
                </Button>
                <Button variant="contained" onClick={() => onClickHandler('insert')} style={{ width: '200' }}>
                  등록
                </Button>
              </Stack>
            }
          >
            {/* 아래의 코드도 리펙터링을 하자 */}
            {/* table */}
            <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      borderTop: '1px solid black',
                      borderBottom: '3px solid black',
                      marginBottom: '3px',
                      backgroundColor: '#E8D9FF'
                    }}
                  >
                    <TableCell>사원명</TableCell>
                    <TableCell>부서명</TableCell>
                    <TableCell>출근시간</TableCell>
                    <TableCell>퇴근시간</TableCell>
                    <TableCell>근무시간</TableCell>
                    <TableCell>연장근무시간</TableCell>
                    <TableCell>심야근무시간</TableCell>
                    <TableCell>외출시간</TableCell>
                    <TableCell>조퇴시간</TableCell>
                    <TableCell>지각여부</TableCell>
                    <TableCell>마감여부</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dayAttdlist.length !== 0 ? (
                    dayAttdlist.map((emp: dailyAttdEntity) => (
                      <TableRow hover key={emp.empName}>
                        {/* <TableCell sx={{ pl: 3 }} component="th" scope="row">
                          <Checkbox
                            value={emp.empName}
                            color="primary"
                            onChange={(e) => {
                              onCheckedChangeHandler(e);
                            }}
                          />
                        </TableCell> */}
                        <TableCell>{emp.empName}</TableCell>
                        <TableCell>{emp.deptName}</TableCell>
                        <TableCell>{emp.attendTime}</TableCell>
                        <TableCell>{emp.leaveTime}</TableCell>
                        <TableCell>{emp.workHour}</TableCell>
                        <TableCell>{emp.overWorkHour}</TableCell>
                        <TableCell>{emp.nightWorkHour}</TableCell>
                        <TableCell>{emp.briefLeaveTime}</TableCell>
                        <TableCell>{emp.earlyLeaveTime}</TableCell>
                        <TableCell>{emp.latenessStatus}</TableCell>
                        <TableCell>{emp.finalizeStatus}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableCell colSpan={11} align="center">
                      <p>사원 정보가 없습니다.</p>
                    </TableCell>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
}

DailyAttendRegist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DailyAttendRegist;
