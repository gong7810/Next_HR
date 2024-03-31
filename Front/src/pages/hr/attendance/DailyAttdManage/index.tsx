import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Stack,
  TableContainer,
  Table,
  Checkbox,
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
import produce from 'immer';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import DailyAttendModifyModal from './DailyAttendModifyModal';
import FinalizeModal from './FinalizeModal';
import { dailyAttdEntity } from 'pages/hr/attendance/types/types';
import { dailyAttendAction } from 'store/redux-saga/reducer/attendance/DailyAttendReducer';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
function DailyAttend() {
  const [handleOk, setHandleOk] = useState<boolean>(false);
  const [modifyModal, setModifyModal] = useState<boolean>(false);
  const [finalizeModal, setFinalizeModal] = useState<boolean>(false);
  const [selectedEmp, setSelectedEmp] = useState<dailyAttdEntity[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  const dispatch = useDispatch();

  const dayAttdlist = useSelector((state: any) => (state.dailyAttend.dayAttdlist !== undefined ? state.dailyAttend.dayAttdlist : []));

  const selectRef = useRef<HTMLSelectElement>(null);

  // 부서
  const [deptName, setDeptName] = useState('');
  // 부서코드
  const [deptCode, setDeptCode] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  // 종료일
  const [endDate, setEndDate] = useState('');

  const onToggleModifyHandler = () => {
    setModifyModal((data) => !data);
  };

  const onToggleFinalizeHandler = () => {
    setFinalizeModal((data) => !data);
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
    } else if (identifier === 'finalize') {
      setFinalizeModal(true);
      if (handleOk) {
        dispatch(dailyAttendAction.DAILY_ATTEND_FINALIZE_FETCH_REQUESTED(selectedEmp));
        dispatch(dailyAttendAction.CLEAR_ATTD_LIST(dayAttdlist));
      }
    }
  };

  const onSearchClickHandler = () => {
    console.log('시작일: ' + startDate);
    console.log('완료일: ' + endDate);
    const data = {
      deptCode: deptCode,
      startDate: startDate,
      endDate: endDate
    };

    dispatch(dailyAttendAction.DAILY_ATTEND_SEARCH_FETCH_REQUESTED(data));
  };

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
    console.log('selectedEmp: ', selectedEmp);
  }, [selectedEmp]);

  useEffect(() => {
    console.log('dayAttdlist 상태 바뀜!!');
    const updatedCheckedItems: { [key: string]: boolean } = {};
    dayAttdlist.forEach((emp: dailyAttdEntity) => {
      updatedCheckedItems[emp.empName] = false;
    });
    setCheckedItems(updatedCheckedItems);
  }, [dayAttdlist]);

  const onCheckedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log('체크가 해제 또는 선택됨.');
    console.log('체크 상태 :', checked, value);
    setCheckedItems((prevState) => ({
      ...prevState,
      [value]: checked
    }));

    if (checked === true) {
      console.log('체크가 선택됨.');
      console.log('체크 상태 :', checked, value);
      const emp = dayAttdlist.filter((data: any) => data.empName === value); // 조건에 해당하는 데이터의 배열을 반환
      setSelectedEmp((prevSelectedEmp) =>
        produce(prevSelectedEmp, (draft) => {
          draft.push(emp[0]);
        })
      );
    } else if (checked === false) {
      console.log('체크가 해제됨.');
      console.log('체크 상태 :', checked, value);
      setSelectedEmp((prevSelectedEmp) =>
        produce(prevSelectedEmp, (draft) => {
          draft.splice(
            draft.findIndex((data) => data.empName === value),
            1
          );
        })
      );
    }
  };

  const onCheckAllHandler = () => {
    // const allCheckboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    // allCheckboxes.forEach((checkbox: HTMLInputElement) => {
    //   checkbox.checked = true;
    // });
    const updatedCheckedItems: { [key: string]: boolean } = {};
    dayAttdlist.forEach((emp: dailyAttdEntity) => {
      updatedCheckedItems[emp.empName] = true;
    });
    setCheckedItems(updatedCheckedItems);
    // selectedEmp 배열을 초기화하고 dayAttdlist 배열의 모든 요소

    setSelectedEmp([...dayAttdlist]);
  };
  return (
    <Page title="일근태관리">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              title="일근태관리"
              secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                  <Grid container direction="column" alignItems="center" justifyContent="flex-start">
                    <Button variant="contained" color="primary" onClick={onCheckAllHandler}>
                      전체 사원 선택
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ minWidth: 120, marginBottom: 1 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">조회부서</InputLabel>
                        <Select
                          value={deptName}
                          label="조회부서"
                          onChange={(event) => {
                            setDeptName(event.target.value);
                            if (event.target.value === '인사팀') {
                              setDeptCode('DEP001');
                            } else if (event.target.value === '전산팀') {
                              setDeptCode('DEP002');
                            } else if (event.target.value === '회계팀') {
                              setDeptCode('DEP000');
                            } else if (event.target.value === '보안팀') {
                              setDeptCode('DEP003');
                            } else if (event.target.value === '개발팀') {
                              setDeptCode('DEP004');
                            }
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
                      fullWidth
                      label="근태조회시작일"
                      name="근태조회시작일"
                      type={'date'}
                      onChange={(event) => {
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

                  <Button variant="contained" color="primary" onClick={() => onSearchClickHandler()}>
                    조회
                  </Button>

                  {modifyModal && <DailyAttendModifyModal toggle={onToggleModifyHandler} emp={selectedEmp} />}
                  <Button variant="contained" color="primary" onClick={() => onClickHandler('mod')}>
                    수정
                  </Button>

                  {finalizeModal && <FinalizeModal toggle={onToggleFinalizeHandler} setHandleOk={setHandleOk} />}
                  <Button variant="contained" color="primary" onClick={() => onClickHandler('finalize')}>
                    마감
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
                      <TableCell sx={{ pl: 3 }}></TableCell>
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
                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            <Checkbox
                              value={emp.empName}
                              checked={checkedItems[emp.empName] || false}
                              color="primary"
                              onChange={(e) => {
                                onCheckedChangeHandler(e);
                              }}
                            />
                          </TableCell>
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
}

DailyAttend.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DailyAttend;
