import Layout from 'layout';
import React, { ReactElement, useEffect, useState } from 'react';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import {
  Alert,
  Button,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { gridSpacing } from 'store/constant';
import { AnnualLeaveMgtTO, retirementSalaryTO } from '../types/types';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { RootState, useDispatch } from 'store';
import { salActions } from 'store/redux-saga/reducer/salary/salaryReducer';
import { useSelector } from 'react-redux';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';

const SeverancePayRegistPage = () => {
  const dispatch = useDispatch();
  const rawList = useSelector((state: RootState) => state.salReducer.empList);

  const [empList, setEmpList] = useState<AnnualLeaveMgtTO[]>([]);
  const [hireDate, setHireDate] = useState<string>('');
  const [severanceType, setSeveranceType] = useState<string>('');
  const [empCode, setEmpCode] = useState<string>('');
  const [workDays, setWorkDays] = useState(0);
  const [severancePay, setSeverancePay] = useState<string>('');
  const [retireDate, setRetireDate] = useState<string>('');
  const [requestDate, setRequestDate] = useState<string>('');
  const [selectedEmpCode, setSelectedEmpCode] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedWork, setSelectedWork] = useState(0);

  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 4) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        text: `접근권한이 없습니다.`
      });
    }
  }, []);

  const reset = () => {
    setHireDate('');
    setRetireDate('');
    setSeverancePay('');
  };

  // 사원리스트 세팅
  useEffect(() => {
    dispatch(salActions.getEmpListRequest());

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    setRequestDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    setEmpList(rawList);
  }, [rawList]);

  const empLists = empList.map((e) => {
    console.log('등록 :', empCode);
    return (
      <MenuItem value={e.empCode} key={e.empCode}>
        {e.empName}
      </MenuItem>
    );
  });

  useEffect(() => {
    if (selectedEmpCode && selectedDate) {
      const hireDate = new Date(selectedEmpCode.hireDate);
      const retireDate = new Date(selectedDate);

      const workDays = Math.abs((retireDate.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24));
      setSelectedWork(workDays);
    }
  }, [selectedEmpCode, selectedDate]);

  const handleWorkDaysChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  // 구분 세팅
  const severanceTypeSetting = (e: any) => {
    console.log(severanceType, requestDate);
    setEmpCode(e.target.value);
    setSeveranceType('퇴직금');
  };

  const severancePayRegist = () => {
    const retirementSalaryTO: retirementSalaryTO = {
      hireDate,
      severanceType,
      empCode,
      workDays: false,
      severancePay,
      retireDate
    };
    console.log('등록 :', retirementSalaryTO);

    dispatch(salActions.registSeverancePayRequest(retirementSalaryTO));

    setSnackBarVisible(true);

    reset();
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarVisible(false);
  };

  return (
    <Page title="퇴직금 등록">
      {authCheck ? (
        <MainCard title="퇴직금 등록" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">직원명</InputLabel>
                    <Select
                      label="직원명"
                      onChange={(e: any) => {
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
                    value={retireDate}
                    label="퇴직일"
                    type={'date'}
                    onChange={(e: any) => {
                      setRetireDate(String(e.target.value));
                    }}
                    defaultValue="xxxx-xx-xx"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item>
                  <TextField
                    fullWidth
                    value={workDays}
                    label="재직일수"
                    type={'text'}
                    onChange={(e: any) => handleWorkDaysChange(e)}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ minWidth: 60 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">구분</InputLabel>
                    <Select label="구분" onChange={(e: any) => severanceTypeSetting(e)}>
                      <MenuItem value={'퇴직금'}>퇴직금</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Divider />
              <CardActions>
                <Grid container justifyContent="space-between" spacing={0}>
                  <Grid item>
                    <AnimateButton>
                      <Button variant="contained" size="large" onClick={() => severancePayRegist()}>
                        등록
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Grid>
          </CardContent>
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarVisible}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert severity="success">등록완료</Alert>
      </Snackbar>
    </Page>
  );
};

SeverancePayRegistPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SeverancePayRegistPage;
