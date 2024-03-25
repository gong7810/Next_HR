import React, {useState, useRef } from 'react';
import { gridSpacing } from 'store/constant';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { dailyAttendAction } from 'store/redux-saga/reducer/attendance/DailyAttendReducer';
import { useTheme } from '@mui/material/styles';

// 코드가 긴 관계로 각각의 입력값에 따른 유효성 검사 로직은 작성하지 않았습니다.
export default function DailyAttendModal(props: { toggle: () => void}) {
  console.log("props  : " + props);
  const dispatch = useDispatch();
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const existingCodesRef = useRef<string[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null);

  //const empNameRef = useRef<HTMLInputElement>(null);
  const attendTimeRef = useRef<HTMLInputElement>(null);
  const briefLeaveTimeRef = useRef<HTMLInputElement>(null);
  const earlyLeaveTimeRef = useRef<HTMLInputElement>(null);
  const leaveTimeRef = useRef<HTMLInputElement>(null);
  const workHourRef = useRef<HTMLInputElement>(null);
  const overWorkHourRef = useRef<HTMLInputElement>(null);
  const nightWorkHourRef = useRef<HTMLInputElement>(null);


  const empList = useSelector((state: any) =>
  state.dailyAttend.empList !== undefined ? state.dailyAttend.empList : []
  );

  const theme = useTheme();
  
  function generateUniqueSixDigitCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code;
    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
    } while (existingCodesRef.current.includes(code)); // 생성된 코드가 이미 사용된 코드인지 확인
    existingCodesRef.current.push(code); // 새로 생성된 코드를 추가
    return code;
  }

  // 모달은 항상 열려있음
  // ---> 부모 컴포넌트의 state를 통해서 보여주거나, 보여주지 않게 할수 있음
  const [open, setOpen] = React.useState(true);
  const [empCode, setEmpCode] = useState<number | string>(-1);
  const [deptCode, setDeptCode] = useState<number | string>(-1);
  const [latenessStatus, setLatenessStatus] = useState<number | string>(-1); 

  //부서 선택함
  const deptChangeHandler = (value: string) => {
    setDeptCode(value);
    console.log(value);
    dispatch(dailyAttendAction.DAILY_ATTEND_SEARCH_EMPLIST_FETCH_REQUESTED(value));
  };

  //사원 선택함
  const empChangeHandler = (value: string) => {
    setEmpCode(value);
    console.log(value);
  };

  //지각여부
  const latenessStatusChangeHandler = (value: string | number) => {
    setLatenessStatus(value);
    console.log(value);
  };


  //추가 버튼 누름
  const handleSave = () => {
  
    //onst empName = empNameRef.current?.value;

    if (Number(empCode) === -1) {
      alert('사원명을 입력해 주세요.');
      return;
    } else if (Number(deptCode) === -1) {
      alert('부서를 선택해 주세요.');
      return;
    } else if (Number(latenessStatus) === -1) {
      alert('지각여부를 선택해 주세요.');
      return;
    }

    const sixDigitCode: string = generateUniqueSixDigitCode();
    const attendTime = attendTimeRef.current?.value;
    const briefLeaveTime = briefLeaveTimeRef.current?.value;
    const earlyLeaveTime = earlyLeaveTimeRef.current?.value;
    const leaveTime = leaveTimeRef.current?.value;
    const workHour = workHourRef.current?.value;
    const overWorkHour = overWorkHourRef.current?.value;
    const nightWorkHour = nightWorkHourRef.current?.value;

    // const info = {
    //   empName: empName,
    //   deptCode: dept
    // }

    // 여기서 사원명과 부서코드를 받아서 이 두 정보로 사원코드 받아오기
    // dispatch(dailyAttendAction.DAILY_ATTEND_SEARCH_EMPCODE_FETCH_REQUESTED(info));
   

    //empCode, gender는 넘어온 값을 그대로 사용한다.
    const data = {
      dayAttdCode: sixDigitCode,
      empCode: empCode,
      refDay: formattedDate,
      attendTime: attendTime,
      leaveTime: leaveTime, 
      briefLeaveTime: briefLeaveTime,
      workHour: workHour,
      latenessStatus: Number(latenessStatus) === 0 ? 'N' : 'Y',
      overWorkHour: overWorkHour,
      nightWorkHour: nightWorkHour,
      finalizeStatus: 'N',
      earlyLeaveTime: earlyLeaveTime,
      deptCode: deptCode

    };
    console.log('data is :', data);

    // 여기서 reducer로 dispatch
    dispatch(dailyAttendAction.DAILY_ATTEND_INSERT_FETCH_REQUESTED(data));

    //dispatch를 하고나서 모달이 보이지 않게한다
    props.toggle();
  };

  const handleClose = () => {
    props.toggle();
  };

  const empNameClickHandler = () => {
    console.log("empList: " + empList);
    if(Number(deptCode) === -1){
      alert('부서를 먼저 선택해주세요.');
    }
  };
  const empLists = empList.map((item: any) => {
    return (
      <MenuItem value = {item.empCode} key = {item.empCode}>
        {item.empName}
      </MenuItem>
    );
  })

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        sx={{ border: '5px solid black', marginBottom: '20px', margin: 'auto' }}
        scroll={'paper'}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        {open && (
          <>
            <Box>
              <DialogTitle id="form-dialog-title">일근태 추가</DialogTitle>
              <DialogContent>
                <Grid container spacing="auto" item xs>
                  <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>부서</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            defaultValue="-1"
                            onChange={(e) => {
                              deptChangeHandler(e.target.value);
                            }}
                          >
                            <MenuItem value={'DEP000'}>회계팀</MenuItem>
                            <MenuItem value={'DEP001'}>인사팀</MenuItem>
                            <MenuItem value={'DEP002'}>전산팀</MenuItem>
                            <MenuItem value={'DEP003'}>보안팀</MenuItem>
                            <MenuItem value={'DEP004'}>개발팀</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                      <InputLabel>사원명</InputLabel>
                      <FormControl fullWidth>
                          <Select
                            defaultValue="-1"
                            ref={selectRef}
                            onChange={(e) => {
                              empChangeHandler(String(e.target.value));
                            }}
                            onClick={() => empNameClickHandler()}
                          >
                          {empLists}
                         </Select>
                        </FormControl>
                     </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>출근시간</InputLabel>
                      <TextField id="outlined-basic2" inputRef={attendTimeRef} defaultValue="09:00" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>지각여부</InputLabel>
                        <FormControl fullWidth>
                          <Select defaultValue="-1" onChange={(e) => latenessStatusChangeHandler(e.target.value)}>
                            <MenuItem value={0}>N</MenuItem>
                            <MenuItem value={1}>Y</MenuItem>
                          </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>외출시간</InputLabel>
                      <TextField id="outlined-basic3" inputRef={briefLeaveTimeRef} placeholder="00:00" fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>조퇴시간</InputLabel>
                      <TextField id="outlined-basic4" inputRef={earlyLeaveTimeRef} placeholder="00:00" fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>퇴근시간</InputLabel>
                      <TextField id= "outlined-basic5" inputRef={leaveTimeRef} defaultValue="18:00" fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>근무시간</InputLabel>
                      <TextField id="outlined-basic6" inputRef={workHourRef} defaultValue="8" fullWidth>시간</TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>연장근무시간</InputLabel>
                      <TextField id="outlined-basic7" inputRef={overWorkHourRef} defaultValue="0" fullWidth >시간</TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>심야근무시간</InputLabel>
                      <TextField id="outlined-basic8" inputRef={nightWorkHourRef} defaultValue="0" fullWidth>시간</TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ pr: 2.5, transform: 'translateX(-80px)' }}>
                <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                  취소
                </Button>
                <Button variant="contained" size="small" onClick={handleSave}>
                  추가
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
}
