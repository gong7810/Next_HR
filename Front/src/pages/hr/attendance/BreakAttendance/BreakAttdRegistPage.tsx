import React, { ReactElement, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import moment from 'moment';
import { AnnualLeaveMgtTO, restAttdTO } from '../types/types';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from 'store';
import { attdActions } from 'store/redux-saga/reducer/attendance/attendanceReducer';

// ==============================|| PROFILE 2 ||============================== //

const BreakAttendancePage = () => {
  const dispatch = useDispatch();
  const rawList = useSelector((state: RootState) => state.attdReducer.empList);

  // 당일 날짜
  const today = moment().format('YYYY-MM-DD');

  // 사원코드
  const [empCode, setEmpCode] = useState('');
  // 연차 구분 코드
  const [attdCode, setAttdCode] = useState('');
  // 연차 구분 이름
  const [attdType, setAttdType] = useState('');
  // 시작일
  const [startDate, setStartDate] = useState('');
  // 종료일
  const [endDate, setEndDate] = useState('');
  // 일수
  const [numberOfDays, setNumberOfDays] = useState(0);
  // 사유
  const [cause, setCause] = useState('');
  // 시작 시간
  const [startTime, setStartTime] = useState('');
  // 종료 시간
  const [endTime, setEndTime] = useState('');

  // 사원리스트
  const [empList, setEmpList] = useState<AnnualLeaveMgtTO[]>([]);

  useEffect(() => {
    dispatch(attdActions.getEmpListRequest());
  }, []);

  useEffect(() => {
    setEmpList(rawList);
  }, [rawList]);

  const empLists = empList.map((e) => {
    return (
      <MenuItem value={e.empCode} key={e.empCode}>
        {e.empName}
      </MenuItem>
    );
  });
  const insertEXAttd = () => {
    // 유효성 검사
    if (!attdType) {
      alert('근태구분을 선택 해주세요.');
      return;
    }
    if (!startDate) {
      alert('시작일을 선택 해주세요.');
      return;
    }
    if (!endDate) {
      alert('종료일을 선택 해주세요.');
      return;
    }
    if (!startTime) {
      alert('시작시간을 선택 해주세요.');
      return;
    }
    if (!endTime) {
      alert('종료시간을 선택 해주세요.');
      return;
    }
    if (!numberOfDays) {
      alert('일수계산을 진행 해주세요.');
      return;
    }
    if (!cause) {
      alert('사유를 작성 해주세요.');
      return;
    }

    const restAttdTO: restAttdTO = {
      empCode,
      attdCode,
      attdType,
      requestDate: today,
      startDate,
      endDate,
      startTime: startTime.replace(/:/g, ''),
      endTime: endTime.replace(/:/g, ''),
      cause
    };

    dispatch(attdActions.registBreakAttdRequest(restAttdTO));

    alert('신청이 완료 되었습니다.');
    window.location.reload();
  };

  /* 일수 계산 함수  */
  function calculateNumberOfDays() {
    const startMs = Number(new Date(startDate).getTime());
    const endMs = Number(new Date(endDate).getTime());
    if (attdType === '오전반차' || attdType === '오후반차') setNumberOfDays(0.5);
    else setNumberOfDays((endMs - startMs) / (1000 * 60 * 60 * 24) + 1);
  }

  //사원코드 임시등록
  // sessionStorage.setItem('empCodeInfo_token', 'A490073');
  // sessionStorage.setItem('empNameInfo_token', '락창카이');

  // const empCodeInfo = sessionStorage.getItem('empCodeInfo_token');
  // const empNameInfo = sessionStorage.getItem('empNameInfo_token');

  return (
    <Page title="연차신청">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard title="연차신청" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <CardContent>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar alt="User 1" src="/assets/images/users/avatar-7.png" sx={{ height: 80, width: 80 }} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple type="file" />
                              </Stack>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="caption">
                                <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                                Image size Limit should be 125kb Max.
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">연차구분</InputLabel>
                          <Select
                            id="연차구분"
                            value={attdType}
                            label="atdType"
                            onChange={(event) => {
                              setAttdType(event.target.value);
                              if (event.target.value === '오전반차') {
                                setAttdCode('ASC006');
                              } else if (event.target.value === '오후반차') {
                                setAttdCode('ASC007');
                              } else if (event.target.value === '연차') {
                                setAttdCode('ASC005');
                              }
                            }}
                          >
                            <MenuItem value={'오전반차'}>오전반차</MenuItem>
                            <MenuItem value={'오후반차'}>오후반차</MenuItem>
                            <MenuItem value={'연차'}>연차</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">신청자</InputLabel>
                          <Select
                            label="신청자"
                            onChange={(e) => {
                              setEmpCode(String(e.target.value));
                            }}
                          >
                            {empLists}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="시작날짜"
                          type={'date'}
                          onChange={(event) => {
                            setStartDate(event.target.value);
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="종료날짜"
                          type={'date'}
                          onChange={(event) => {
                            setEndDate(event.target.value);
                          }}
                          defaultValue="xxxx-xx-xx"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={startTime}
                            label="시작시간"
                            type={'time'}
                            onChange={(e: any) => {
                              setStartTime(e.target.value);
                            }}
                            defaultValue="xx-xx"
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={endTime}
                            label="종료시간"
                            type={'time'}
                            onChange={(e: any) => {
                              setEndTime(e.target.value);
                            }}
                            defaultValue="xxxx-xx-xx"
                            InputLabelProps={{ shrink: true }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="일수" value={numberOfDays} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="사유"
                        onChange={(event) => {
                          setCause(event.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
            <Divider />
            <CardActions>
              <Grid container justifyContent="space-between" spacing={0}>
                <Grid item>
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={calculateNumberOfDays}>
                      일수계산
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item>
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={insertEXAttd}>
                      등록
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </CardActions>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
};

BreakAttendancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BreakAttendancePage;
