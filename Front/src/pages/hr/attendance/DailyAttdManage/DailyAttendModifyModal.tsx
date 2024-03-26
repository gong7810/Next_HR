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
import { dailyAttdEntity } from 'pages/hr/attendance/types/types';
import { useDispatch } from 'react-redux';
import { dailyAttendAction } from 'store/redux-saga/reducer/attendance/DailyAttendReducer';;
import { useTheme } from '@mui/material/styles';

// 코드가 긴 관계로 각각의 입력값에 따른 유효성 검사 로직은 작성하지 않았습니다.
export default function DailyAttendModal(props: { toggle: () => void; emp: dailyAttdEntity[] }) {
  console.log("props  : " + props);
  const dispatch = useDispatch();

  const attendTimeRef = useRef<HTMLInputElement>(null);
  const briefLeaveTimeRef = useRef<HTMLInputElement>(null);
  const earlyLeaveTimeRef = useRef<HTMLInputElement>(null);
  const leaveTimeRef = useRef<HTMLInputElement>(null);
  const workHourRef = useRef<HTMLInputElement>(null);
  const overWorkHourRef = useRef<HTMLInputElement>(null);
  const nightWorkHourRef = useRef<HTMLInputElement>(null);
  
  
  const theme = useTheme();

  let latenessStatusValue: number = 0;
  let deptNameCode: string = '';
 
  
  const { empName, deptName, attendTime, leaveTime, workHour, overWorkHour, nightWorkHour, briefLeaveTime, earlyLeaveTime, latenessStatus, finalizeStatus } = props.emp[0];

  if(latenessStatus == 'Y'){
    latenessStatusValue = 1;
  }

  switch (deptName) {
    case "회계팀":
      deptNameCode = 'DEP000';
      break;
    case "인사팀":
      deptNameCode = 'DEP001';
      break;
    case "전산팀":
      deptNameCode = 'DEP002';
      break;
    case "보안팀":
      deptNameCode = 'DEP003';
      break;
    case "개발팀":
      deptNameCode = 'DEP004';
      break;
  }



  // 모달은 항상 열려있음
  // ---> 부모 컴포넌트의 state를 통해서 보여주거나, 보여주지 않게 할수 있음
  const [open, setOpen] = React.useState(true);
  const [newLatenessStatus, setLatenessStatus] = useState<number | string>(latenessStatusValue); 


  //지각여부
  const latenessStatusChangeHandler = (value: string | number) => {
    setLatenessStatus(value);
    console.log(value);
  };


  //수정 버튼 누름
  const handleSave = () => {

    const attendTime = attendTimeRef.current?.value;
    const briefLeaveTime = briefLeaveTimeRef.current?.value;
    const earlyLeaveTime = earlyLeaveTimeRef.current?.value;
    const leaveTime = leaveTimeRef.current?.value;
    const workHour = workHourRef.current?.value;
    const overWorkHour = overWorkHourRef.current?.value;
    const nightWorkHour = nightWorkHourRef.current?.value;

     
     if (Number(newLatenessStatus) === -1 && latenessStatus === null) {
      alert('지각여부를 선택해 주세요.');
      return;
    }
    

    //empCode, gender는 넘어온 값을 그대로 사용한다.
    const data = {
      empName: empName,
      deptCode: deptNameCode,
      attendTime: attendTime,
      leaveTime: leaveTime,
      briefLeaveTime: briefLeaveTime,
      workHour: workHour,
      latenessStatus: Number(newLatenessStatus) === 0 ? 'N' : 'Y',
      overWorkHour: overWorkHour,
      nightWorkHour: nightWorkHour,
      earlyLeaveTime: earlyLeaveTime
      
    };
    console.log('data is :', data);

    // 여기서 reducer로 dispatch
    dispatch(dailyAttendAction.DAILY_ATTEND_MODIFY_FETCH_REQUESTED(data));

    //dispatch를 하고나서 모달이 보이지 않게한다
    props.toggle();
  };

  const handleClose = () => {
    props.toggle();
  };


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
              <DialogTitle id="form-dialog-title">일근태 수정</DialogTitle>
              <DialogContent>
                <Grid container spacing="auto" item xs>
                  <Grid container spacing={gridSpacing}>
                    <Grid item md={6} xs={12}>
                      <InputLabel>사원명</InputLabel>
                      <TextField id="outlined-basic1" defaultValue={empName} fullWidth disabled/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>부서명</InputLabel>
                      <TextField id="outlined-basic2" defaultValue={deptName} fullWidth disabled/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>출근시간</InputLabel>
                      <TextField id="outlined-basic3" inputRef={attendTimeRef} defaultValue={attendTime} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>퇴근시간</InputLabel>
                      <TextField id= "outlined-basic5" inputRef={leaveTimeRef} defaultValue={leaveTime} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>근무시간</InputLabel>
                      <TextField id="outlined-basic6" inputRef={workHourRef} defaultValue={workHour} fullWidth>시간</TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>연장근무시간</InputLabel>
                      <TextField id="outlined-basic7" inputRef={overWorkHourRef} defaultValue={overWorkHour} fullWidth >시간</TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>심야근무시간</InputLabel>
                      <TextField id="outlined-basic8" inputRef={nightWorkHourRef} defaultValue={nightWorkHour} fullWidth>시간</TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>외출시간</InputLabel>
                      <TextField id="outlined-basic3" inputRef={briefLeaveTimeRef} defaultValue={briefLeaveTime} placeholder={"00:00"} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>조퇴시간</InputLabel>
                      <TextField id="outlined-basic4" inputRef={earlyLeaveTimeRef} defaultValue={earlyLeaveTime} placeholder="00:00" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>지각여부</InputLabel>
                        <FormControl fullWidth>
                          <Select defaultValue={latenessStatusValue} onChange={(e) => latenessStatusChangeHandler(e.target.value)}>
                            <MenuItem value={0}>N</MenuItem>
                            <MenuItem value={1}>Y</MenuItem>
                          </Select>
                        </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ pr: 2.5, transform: 'translateX(-80px)' }}>
                <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                  취소
                </Button>
                <Button variant="contained" size="small" onClick={handleSave}>
                  수정
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
}
