import React, { useEffect, useState, useRef } from 'react';
import { gridSpacing } from 'store/constant';
// material-ui
import { useTheme } from '@mui/material/styles';
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

import { useDispatch } from 'react-redux';
import { empInfoAction } from '../slices/empInfoReducer';
import { ModifyEmpInfoEntity } from '../types/empManagementTypes';

// 코드가 긴 관계로 각각의 입력값에 따른 유효성 검사 로직은 작성하지 않았습니다.
export default function EmpModifyModal(props: { toggle: () => void; emp: ModifyEmpInfoEntity[] }) {
  const empNameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const detailAddressRef = useRef<HTMLInputElement>(null);
  const postNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [lastSchoolState, setLastSchool] = useState<number | string>(-1);

  const dispatch = useDispatch();
  const theme = useTheme();
  // 모달은 항상 열려있음
  // ---> 부모 컴포넌트의 state를 통해서 보여주거나, 보여주지 않게 할수 있음
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    if (props.emp.length < 2) {
      console.log('this is valid value');
      console.log(props.emp[0]);
    } else {
      console.log('this is not valid value');
    }
  }, [props]);

  const lastSchoolChangeHandler = (value: string | number) => {
    setLastSchool(value);
    console.log(value);
  };

  const { empCode, empName, birthdate, gender, mobileNumber, address, detailAddress, postNumber, email, lastSchool } = props.emp[0];

  let lastSchoolValue = '';

  switch (lastSchoolState) {
    case 0:
      lastSchoolValue = '대학미졸업';
      break;
    case 1:
      lastSchoolValue = '전문대';
      break;
    case 2:
      lastSchoolValue = '학사';
      break;
    case 3:
      lastSchoolValue = '석사';
      break;
    case 4:
      lastSchoolValue = '박사';
      break;
  }

  const handleSave = () => {
    console.log(lastSchoolState, lastSchool);

    if (lastSchoolState === -1) {
      alert('최종학력을 선택해 주세요.');
      return;
    }

    const empNameref = empNameRef.current?.value;
    const birthDateref = birthDateRef.current?.value;
    const mobileNumberref = mobileNumberRef.current?.value;
    const addressref = addressRef.current?.value;
    const detailAddressref = detailAddressRef.current?.value;
    const postNumberref = postNumberRef.current?.value;
    const emailref = emailRef.current?.value;

    //empCode, gender는 넘어온 값을 그대로 사용한다.
    const data = {
      empCode: empCode,
      empName: empNameref,
      birthdate: birthDateref,
      gender: gender,
      mobileNumber: mobileNumberref,
      address: addressref,
      detailAddress: detailAddressref,
      postNumber: postNumberref,
      email: emailref,
      lastSchool: lastSchoolValue,
      status: 'update'
    };
    console.log('data is :', data);
    // 여기서 reducer로 dispatch
    dispatch(empInfoAction.EMP_UPDATE_REQUESTED(data));

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
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {open && (
          <>
            <Box>
              <DialogTitle id="form-dialog-title">사원 정보 수정</DialogTitle>
              <DialogContent>
                <Grid container style={{ margin: 'auto', width: '1000px' }}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item md={6} xs={12}>
                      <InputLabel>사원명</InputLabel>
                      <TextField value={empName} aria-readonly={true} id="outlined-basic1" inputRef={empNameRef} fullWidth />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <InputLabel>생일</InputLabel>
                      <TextField id="outlined-basic14" inputRef={birthDateRef} fullWidth defaultValue={new Date(birthdate)} type="date" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>성별</InputLabel>
                      <TextField value={gender} aria-readonly={true} id="outlined-basic1" fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>휴대폰 번호</InputLabel>
                      <TextField id="outlined-basic5" inputRef={mobileNumberRef} fullWidth defaultValue={mobileNumber} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>주소</InputLabel>
                      <TextField id="outlined-basic6" inputRef={addressRef} defaultValue={address} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>세부주소</InputLabel>
                      <TextField id="outlined-basic7" inputRef={detailAddressRef} defaultValue={detailAddress} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>우편번호</InputLabel>
                      <TextField id="outlined-basic8" inputRef={postNumberRef} defaultValue={postNumber} fullWidth />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel>이메일</InputLabel>
                      <TextField id="outlined-basic9" inputRef={emailRef} fullWidth defaultValue={email} type="email" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>최종학력</InputLabel>
                      <FormControl fullWidth>
                        <Select defaultValue={''} onChange={(e) => lastSchoolChangeHandler(e.target.value)}>
                          <MenuItem hidden disabled value={lastSchool}>
                            <em>{'이전 최종학력 ' + lastSchool}</em>
                          </MenuItem>
                          <MenuItem value={0}>대학 미졸업</MenuItem>
                          <MenuItem value={1}>전문대</MenuItem>
                          <MenuItem value={2}>학사</MenuItem>
                          <MenuItem value={3}>석사</MenuItem>
                          <MenuItem value={4}>박사</MenuItem>
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
                  저장
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
}
