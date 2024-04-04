import { ReactElement, useEffect } from 'react';
import { Grid, InputLabel, TextField, FormControl, Select, MenuItem, Avatar, Button, Stack, Typography } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import React, { useState, useRef } from 'react';
import Layout from 'layout';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import { useDispatch } from 'react-redux';
import { registerEmpAction } from '../slices/registerEmpReducer';
import { sendData } from '../types/empManagementTypes';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';

function RegisterEmp() {
  const dispatch = useDispatch();

  const empNameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const detailAddressRef = useRef<HTMLInputElement>(null);
  const postNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [dept, setDept] = useState<number | string>(-1);
  const [gender, setGender] = useState<number | string>(-1);
  const [lastSchool, setLastSchool] = useState<number | string>(-1);
  const [position, setPosition] = useState<number | string>(-1);
  const [salaryStep, setSalaryStep] = useState<number | string>(-1);
  const [occupation, setOccupation] = useState<number | string>(-1);
  const [employment, setEmployment] = useState<number | string>(-1);

  const Avatar1 = '/assets/images/users/emp_img_1.avif';

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 2) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        title: '접근 권한이 없습니다.'
      });
    }
  }, []);

  const deptChangeHandler = (value: string) => {
    setDept(value);
    console.log(value);
  };

  const genderChangeHandler = (value: string | number) => {
    setGender(value);
    console.log(value);
  };

  const lastSchoolChangeHandler = (value: string | number) => {
    setLastSchool(value);
    console.log(value);
  };

  const positionChangeHandler = (value: string | number) => {
    setPosition(value);
    console.log(value);
  };

  const salaryStepChangeHandler = (value: string | number) => {
    setSalaryStep(value);
    console.log(value);
  };

  const occupationChangeHandler = (value: string | number) => {
    setOccupation(value);
    console.log(value);
  };

  const employmentChangeHandler = (value: string | number) => {
    setEmployment(value);
    console.log(value);
  };

  // 백엔드에 보낼 데이터를
  const sendEmpData = async (value: sendData) => {
    //넘겨받은 값들을 아래에 할당

    const data = {
      empName: empNameRef.current?.value,
      deptCode: dept,
      birthDate: birthDateRef.current?.value,
      gender: value.gender, // value로 넘겨받은 값을 사용
      mobileNumber: mobileNumberRef.current?.value,
      address: addressRef.current?.value,
      detailAddress: detailAddressRef.current?.value,
      postNumber: postNumberRef.current?.value,
      email: emailRef.current?.value,
      lastSchool: value.lastSchool, // value로 넘겨받은 값을 사용
      position: position,
      hobong: salaryStep,
      occupation: value.occupation, // value로 넘겨받은 값을 사용
      employment: value.employment // value로 넘겨받은 값을 사용
    };

    console.log('data : ', data);

    dispatch(registerEmpAction.REGISTER_EMP_REQUSTED(data));
    // router.reload();
  };

  // 등록 버튼을 클릭하면은 유효성 검사를 진행한뒤 값들이 유효하면은 백엔드로 데이터를 전송
  // ---> 유효성 검사는 입력된 모든 값들에 진행되는것이 아닌 특정 값들에 대해서만
  //      유효성 검사를 합니다(DB의 제약조건과 비교해 보세요).
  const onClickHandler = () => {
    const bool = confirm('등록하시겠습니까?');
    if (!bool) return;
    console.log('dept is :', dept);
    const empNameref = empNameRef.current?.value;
    const birthDateref = birthDateRef.current?.value;
    const mobileNumberref = mobileNumberRef.current?.value;
    const addressref = addressRef.current?.value;
    const detailAddressref = detailAddressRef.current?.value;
    const postNumberref = postNumberRef.current?.value;
    const emailref = emailRef.current?.value;

    if (empNameref?.trim().length === 0 || empNameref === null) {
      alert('사원명을 입력해 주세요.');
      return;
    } else if (Number(dept) === -1) {
      alert('부서를 선택해 주세요.');
      return;
    } else if (Number(gender) === -1) {
      alert('성별을 선택해 주세요.');
      return;
    } else if (Number(lastSchool) === -1) {
      alert('최종학력을 선택해 주세요.');
      return;
    } else if (Number(position) === -1) {
      alert('직급을 선택해 주세요.');
      return;
    } else if (emailref?.trim().length === 0 || !emailref?.includes('@') || emailref === null) {
      alert('올바른 이메일을 입력해 주세요.');
      return;
    } else if (Number(salaryStep) === -1) {
      alert('호봉을 선택해 주세요.');
      return;
    } else if (Number(occupation) === -1) {
      alert('직종을 선택해 주세요.');
      return;
    } else if (Number(employment) === -1) {
      alert('고용형태를 선택해 주세요.');
      return;
    }

    // 여기서 select에서 선택된 값에 따라 state에 값을 할당
    // ---> 여기서 할당된 값을 아래에서 호출하는 함수에 넘겨준다.
    const sendData = {
      gender: '',
      lastSchool: '',
      occupation: '',
      employment: ''
    };

    if (Number(gender) === 0) {
      sendData.gender = '남';
    } else {
      sendData.gender = '여';
    }

    console.log('sendData.gender', sendData.gender);

    if (Number(lastSchool) === 0) {
      sendData.lastSchool = '대학미졸업';
    } else if (Number(lastSchool) === 1) {
      sendData.lastSchool = '전문대';
    } else if (Number(lastSchool) === 2) {
      sendData.lastSchool = '학사';
    } else if (Number(lastSchool) === 3) {
      sendData.lastSchool = '석사';
    } else if (Number(lastSchool) === 4) {
      sendData.lastSchool = '박사';
    }

    console.log('lastSchool', lastSchool);

    if (Number(occupation) === 0) {
      sendData.occupation = '생산직';
    } else if (Number(occupation) === 1) {
      sendData.occupation = '사무직';
    }

    console.log('occupation : ', occupation);

    if (Number(employment) === 0) {
      sendData.employment = '정규직';
    } else if (Number(employment) === 1) {
      sendData.employment = '계약직';
    }

    console.log('sendData : ', sendData);

    sendEmpData(sendData);

    console.log(empNameref, birthDateref, mobileNumberref, addressref, detailAddressref, postNumberref, emailref);
    console.log(dept, gender, lastSchool, position, salaryStep, occupation, employment);
  };

  return (
    <Page title="사원 등록">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard content={false} title="사원 등록">
              <Grid mt={3} mb={3} ml={3} pt={3} pl={3} pr={3} container width={1300} spacing={3}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={6} pr={1} md={1.5}>
                    <Grid container xs={8} spacing={2} md={18}>
                      <Grid item xs={10} md={16}>
                        <Avatar alt="User 1" src={Avatar1} sx={{ width: 100, height: 100, margin: 'auto' }} />
                      </Grid>

                      <Grid item xs={12} width={30}>
                        <AnimateButton>
                          <Button sx={{ width: '120px' }} variant="contained" size="small">
                            사진등록
                          </Button>
                        </AnimateButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/*여기가 사원 사진을 넣을수 있는 곳이다.*/}
                  <Grid item sm={6} md={8}>
                    <SubCard title="사원정보">
                      <Grid container spacing={gridSpacing}>
                        <Grid item md={6} xs={12}>
                          <InputLabel>사원명</InputLabel>
                          <TextField id="outlined-basic1" inputRef={empNameRef} fullWidth />
                        </Grid>
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
                          <InputLabel>생일</InputLabel>
                          <TextField id="outlined-basic14" inputRef={birthDateRef} fullWidth type="date" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel>성별</InputLabel>
                          <FormControl fullWidth>
                            <Select defaultValue="-1" onChange={(e) => genderChangeHandler(e.target.value)}>
                              <MenuItem value={0}>남</MenuItem>
                              <MenuItem value={1}>여</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputLabel>휴대폰 번호</InputLabel>
                          <TextField id="outlined-basic5" inputRef={mobileNumberRef} fullWidth defaultValue="010-1234-1234" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputLabel>주소</InputLabel>
                          <TextField id="outlined-basic6" inputRef={addressRef} fullWidth />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputLabel>세부주소</InputLabel>
                          <TextField id="outlined-basic7" inputRef={detailAddressRef} fullWidth />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputLabel>우편번호</InputLabel>
                          <TextField id="outlined-basic8" inputRef={postNumberRef} fullWidth />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <InputLabel>이메일</InputLabel>
                          <TextField id="outlined-basic9" inputRef={emailRef} fullWidth defaultValue="aaa@aaa.com" type="email" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel>최종학력</InputLabel>
                          <FormControl fullWidth>
                            <Select defaultValue="-1" onChange={(e) => lastSchoolChangeHandler(e.target.value)}>
                              <MenuItem value={0}>대학 미졸업</MenuItem>
                              <MenuItem value={1}>전문대</MenuItem>
                              <MenuItem value={2}>학사</MenuItem>
                              <MenuItem value={3}>석사</MenuItem>
                              <MenuItem value={4}>박사</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputLabel>직급</InputLabel>
                          <FormControl fullWidth>
                            <Select defaultValue="-1" onChange={(e) => positionChangeHandler(e.target.value)}>
                              <MenuItem value={'POS000'}>인턴</MenuItem>
                              <MenuItem value={'POS001'}>사원</MenuItem>
                              <MenuItem value={'POS002'}>대리</MenuItem>
                              <MenuItem value={'POS003'}>팀장</MenuItem>
                              <MenuItem value={'POS004'}>부장</MenuItem>
                              <MenuItem value={'POS005'}>상무</MenuItem>
                              <MenuItem value={'POS006'}>대표이사</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <InputLabel>호봉</InputLabel>
                          <FormControl fullWidth>
                            <Select defaultValue="-1" onChange={(e) => salaryStepChangeHandler(e.target.value)}>
                              <MenuItem value={3}>3호봉</MenuItem>
                              <MenuItem value={4}>4호봉</MenuItem>
                              <MenuItem value={5}>5호봉</MenuItem>
                              <MenuItem value={6}>6호봉</MenuItem>
                              <MenuItem value={7}>7호봉</MenuItem>
                              <MenuItem value={8}>8호봉</MenuItem>
                              <MenuItem value={9}>9호봉</MenuItem>
                              <MenuItem value={10}>10호봉</MenuItem>
                              <MenuItem value={11}>11호봉</MenuItem>
                              <MenuItem value={12}>12호봉</MenuItem>
                              <MenuItem value={13}>12호봉 이상</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel>직종</InputLabel>
                          <FormControl fullWidth>
                            <Select defaultValue="-1" onChange={(e) => occupationChangeHandler(e.target.value)}>
                              <MenuItem value={0}>생산직</MenuItem>
                              <MenuItem value={1}>사무직</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel>고용형태</InputLabel>
                          <FormControl fullWidth>
                            <Select defaultValue="-1" onChange={(e) => employmentChangeHandler(e.target.value)}>
                              <MenuItem value={0}>정규직</MenuItem>
                              <MenuItem value={1}>계약직</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <Stack direction="row">
                            <AnimateButton>
                              <Button
                                sx={{ width: '100px' }}
                                onClick={() => {
                                  onClickHandler();
                                }}
                                variant="contained"
                              >
                                등록
                              </Button>
                            </AnimateButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </SubCard>
                  </Grid>
                </Grid>
              </Grid>
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

RegisterEmp.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RegisterEmp;
