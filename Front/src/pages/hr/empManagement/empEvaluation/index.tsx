import { ReactElement } from 'react';
import { Grid } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import Layout from 'layout';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import { gridSpacing } from 'store/constant';
import classes from '../../../../styles/hr/empmanagement/empevaluation.module.css';
import { useRouter } from 'next/router';
import EmpEvaluationStandard from './EmpEvaluationStandardModal';
import { empEvalAction } from '../slices/empEvalReducer';
import { useDispatch } from 'react-redux';
import { EvalEmpInfo, EvalEmpInfoEntity } from '../types/empManagementTypes';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';

// ==============================|| TABLE - BASIC ||============================== //

// 리팩토링은 현재 프로젝트를 확실하게 사용하게 된다는 사실이 확인되면은 진행할예정
// 타입 지정은 순차적으로 진행
function EmpEvaluation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const empListRef = useRef<HTMLSelectElement>(null);
  const empBreakRef = useRef<HTMLSelectElement>(null);
  const certificationRef = useRef<HTMLSelectElement>(null);
  const hourOfcompanyEducationRef = useRef<HTMLSelectElement>(null);
  const schoolCertificateRef = useRef<HTMLSelectElement>(null);
  const validationForPromotionRef = useRef<HTMLSelectElement>(null);
  const [empList, setEmpList] = useState<EvalEmpInfoEntity[]>([]);
  // 등급 산출을 하지 않고는 결과 상신버튼을 클릭할수 없게 하기 위한 State
  const [isValid, setIsValid] = useState<boolean>(false);
  const [empInfo, setEmpInfo] = useState<EvalEmpInfo>({
    empName: '',
    empCode: '',
    ability: '',
    achievement: '',
    approvalStatus: '',
    attitude: '',
    deptName: '',
    durationOfTraining: '',
    grade: '',
    position: '',
    numberOfCertificate: '',
    applyDay: ''
  });
  const [resultInput, setResultInput] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // 최종값을 계산하기 위한 ref
  const score = useRef<any>(0);

  // 현재 페이지가 로드 되면은 데이터를 가지고 온다.

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const getEmpList = async () => {
      const url = new URL('http://localhost:9101/empinfomgmt/evaluation/list');
      url.searchParams.append('token', localStorage.getItem('access') as string);
      url.searchParams.append('authLevel', localStorage.getItem('authLevel') as string);

      const obj = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };

      try {
        setIsValid(false);
        const response = await fetch(url, obj).then((res) => {
          console.log(res);
          return res;
        });
        console.log('resposne : ', response);
        const empList = await response.json();
        // state에 값을 넘겨주고
        setEmpList(empList);
        // isValid값을 변경해준다.
        setIsValid(true);
        console.log(empList);
      } catch (err) {
        console.log(err);
        setIsValid(false);
      }
    };
    getEmpList();
    console.log('getEmpList function has been called.');
  }, []);

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 3) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        title: '접근 권한이 없습니다.'
      });
    }
  }, []);

  // 선택한 데이터가 유효한지 검사하는 로직
  const dataValidationCheck = () => {
    // 등급 산출 버튼을 클릭할 때마다 score의 값을 초기화 시킴
    // select가 바뀌었을때 기존의 score값에 값이 누적되지 않고,
    // 새롭개 갱신되게 하기 위함.
    score.current *= 0;

    // ref로 들어온 데이터들을 숫자타입으로 변환
    const empref = Number(empListRef.current?.value);
    const breakref = Number(empBreakRef.current?.value);
    const certificationref = Number(certificationRef.current?.value);
    const hourOfcompanyEducationref = Number(hourOfcompanyEducationRef.current?.value);
    const schoolCertificateref = Number(schoolCertificateRef.current?.value);
    const validationForPromotionref = Number(validationForPromotionRef.current?.value);

    console.log(typeof breakref);

    if (empref === -1) {
      window.alert('사원을 선택해 주세요.');

      return;
    } else if (breakref === -1) {
      window.alert('연차/병가 사용일수를 선택해 주세요');
      return;
    } else if (certificationref === -1) {
      window.alert('자격증 개수를 선택해 주세요.');
      return;
    } else if (hourOfcompanyEducationref === -1) {
      window.alert('연수 시간을 선택해 주세요.');
      return;
    } else if (schoolCertificateref === -1) {
      window.alert('학위 정보를 선택해 주세요.');
      return;
    } else if (validationForPromotionref === -1) {
      window.alert('고과 결격사유 유무 여부를 선택해 주세요.');
      return;
    }

    // 연차 및 병가사용일수에 따른 점수를 부여하는 if문
    if (breakref === 0) score.current += 10;
    else if (breakref === 1) score.current += 6;
    else if (breakref === 2) score.current += 2;

    //자격증에 개수에 따라 점수를 부여하는 if문
    if (certificationref === 0) score.current += 0;
    else if (certificationref === 1) score.current += 2;
    else if (certificationref === 2) score.current += 3;
    else if (certificationref === 3) score.current += 5;
    else if (certificationref === 4) score.current += 10;

    // 연수 참여 시간에 따라 점수를 부여하는 if문
    if (hourOfcompanyEducationref === 0) score.current += 0;
    else if (hourOfcompanyEducationref === 1) score.current += 8;
    else if (hourOfcompanyEducationref === 2) score.current += 9;
    else if (hourOfcompanyEducationref === 3) score.current += 10;

    // 학위에 따라 점수를 부여하는 if문
    if (schoolCertificateref === 0) score.current += 8;
    else if (schoolCertificateref === 1) score.current += 9;
    else if (schoolCertificateref === 2) score.current += 10;
    else if (schoolCertificateref === 3) score.current += 10;

    // 고과 결격 사유 유무에 따라 점수를 부여하는 if문
    if (validationForPromotionref === 0) score.current += 0;
    else score.current -= 40;

    console.log('score : ', score);
    console.log(breakref, certificationref, hourOfcompanyEducationref, schoolCertificateref, validationForPromotionref);
    // setCalculteState(true);
    console.log(score);
    // 결과상신 버튼을 활성화 시킨다.
    setIsDisabled(false);
  };

  const calculateGrade = () => {
    const empref = Number(empListRef.current?.value);
    const breakref = Number(empBreakRef.current?.value);
    const certificationref = Number(certificationRef.current?.value);
    const hourOfcompanyEducationref = Number(hourOfcompanyEducationRef.current?.value);
    const schoolCertificateref = Number(schoolCertificateRef.current?.value);
    const validationForPromotionref = Number(validationForPromotionRef.current?.value);

    // 등급산출 버튼을 누른뒤  각각의 select가 선택되지 않았으면
    // 결과를 보여주는 input에 '' 빈문자열을 할당.
    if (
      empref === -1 ||
      breakref === -1 ||
      certificationref === -1 ||
      hourOfcompanyEducationref === -1 ||
      schoolCertificateref === -1 ||
      validationForPromotionref === -1
    ) {
      setResultInput('');
    } else {
      if (score.current >= 35) setResultInput('S');
      else if (score.current >= 20) setResultInput('A');
      else if (score.current >= 10) setResultInput('B');
      else setResultInput('C');
      return;
    }
  };

  const sendDataHandler = () => {
    try {
      const emp = empList.filter((emp: any) => emp.empCode === empListRef.current?.value);
      console.log(emp[0]);

      const data = {
        empName: emp[0].empName,
        empCode: emp[0].empCode,
        ability: '',
        achievement: '',
        approvalStatus: '대기',
        attitude: '',
        deptName: emp[0].deptName,
        durationOfTraining: '',
        grade: resultInput,
        position: emp[0].position,
        numberOfCertificate: '',
        applyDay: ''
      };

      setEmpInfo(data);
      console.log('data is : ', data);
      dispatch(empEvalAction.EMP_EVAL_REQUSTED(data));
    } catch (err) {
      console.log('err from onChangHandler : ', err);
    }
  };

  const onClickHandler = (identifier: any) => {
    if (identifier === '등급산출') {
      // 아래의 ref들은 값이 다 들어오기 때문에 에러 처리를 해주지 않아도 된다. ---> 아래의 컴포넌트의 select에서 들어오는 값들이다.
      console.log(
        identifier,
        'emp is : ',
        empListRef.current?.value,
        empBreakRef.current?.value,
        certificationRef.current?.value,
        hourOfcompanyEducationRef.current?.value,
        schoolCertificateRef.current?.value,
        validationForPromotionRef.current?.value
      );
      // 데이터가 유효한지 검증하는 함수 호출;
      dataValidationCheck();
      calculateGrade();
    } else if (identifier === '결과상신') {
      console.log(identifier);

      sendDataHandler();

      try {
        console.log(score);
        console.log(empInfo);
      } catch (err) {
        console.log(' catched err : ', err);
      }
      setIsDisabled(true);
      router.reload();
    }
  };

  return (
    <Page title="인사고과 등록">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard className={classes.main_card} content={false} title="인사고과 등록">
              <div className={classes.main}>
                <div className={classes.info_modal}>{<EmpEvaluationStandard />}</div>
                <div className={classes.first_div}>
                  <div style={{ width: '890px', margin: 'auto', marginBottom: '20px' }}>
                    {' '}
                    <div
                      style={{
                        display: 'inline-block',
                        marginBottom: '3px',
                        transform: 'translateX(-150px)'
                      }}
                    >
                      사원 선택
                    </div>{' '}
                    <div style={{ display: 'inline-block', transform: 'translateX(200px)' }}>연차/병가 사용일수 선택</div>{' '}
                  </div>
                  <select defaultValue={'-1'} name="emp" ref={empListRef} className={classes.empList_select}>
                    <option value="-1" className={classes.option} disabled hidden selected>
                      사원을 선택해 주세요
                    </option>
                    {isValid &&
                      empList.map((emp: any) => (
                        <option value={emp.empCode} key={emp.empCode}>
                          {emp.empName}
                        </option>
                      ))}
                  </select>

                  <select ref={empBreakRef} name="empBreak" className={classes.empBreak_select}>
                    <option value="-1" disabled hidden selected>
                      연차/병가 사용일수
                    </option>
                    <option value="0">합산 5일 이하</option>
                    <option value="1">합산 5일초과, 10일 이하</option>
                    <option value="2">합산 10일 이상</option>
                  </select>
                </div>
                <div className={classes.second_div}>
                  <div style={{ width: '890px', margin: 'auto' }}>
                    {' '}
                    <div style={{ display: 'inline-block', marginBottom: '3px', transform: 'translateX(-190px)' }}>자격증</div>{' '}
                    <div style={{ display: 'inline-block', transform: 'translateX(200px)' }}>연수이수시간</div>{' '}
                  </div>

                  <br />
                  <select name="certificate" ref={certificationRef} className={classes.empCertification_select}>
                    <option value="-1" disabled hidden selected>
                      관련자격증개수
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4개 이상</option>
                  </select>

                  <select ref={hourOfcompanyEducationRef} className={classes.hourofcompanyeducation_select}>
                    <option value="-1" disabled hidden selected>
                      연수이수시간
                    </option>
                    <option value="0">8시간 미만</option>
                    <option value="1">8시간 이상, 15시간 미만</option>
                    <option value="2">15시간 이상, 30시간 미만</option>
                    <option value="3">30시간 이상</option>
                  </select>
                </div>
                <div className={classes.third_div}>
                  <div style={{ width: '890px', margin: 'auto', marginBottom: '20px' }}>
                    {' '}
                    <div style={{ display: 'inline-block', marginBottom: '3px', transform: 'translateX(-160px)' }}>학위선택</div>{' '}
                    <div style={{ display: 'inline-block', transform: 'translateX(200px)' }}>고과 결격사유 유무 선택</div>{' '}
                  </div>
                  <select ref={schoolCertificateRef} className={classes.schoolCertificate_select}>
                    <option value="-1" disabled hidden selected>
                      학위등록
                    </option>
                    <option value="0">대학 미졸업</option>
                    <option value="1">학사</option>
                    <option value="2">석사</option>
                    <option value="3">박사</option>
                  </select>
                  <select ref={validationForPromotionRef} className={classes.validationForPromotion_select}>
                    <option value="-1" disabled hidden selected>
                      고과 결격사유 유무
                    </option>
                    <option value="0">해당사항 없음</option>
                    <option value="1">해당사항 있음</option>
                  </select>
                </div>
                <div className={classes.result_input_div}>
                  <div style={{ width: '890px', margin: 'auto', marginTop: '20px', marginBottom: '20px' }}>
                    {' '}
                    <div style={{ display: 'inline-block', marginBottom: '3px' }}>예상 등급</div>{' '}
                  </div>
                  <p
                    style={{
                      marginTop: '-20px',
                      fontSize: '50px',
                      height: '50px',
                      width: '50px',
                      display: 'inline-block',
                      color: 'orange'
                    }}
                  >
                    {resultInput}
                  </p>
                </div>

                <div className={classes.button_div}>
                  <button
                    onClick={(e) => {
                      onClickHandler(e.currentTarget.innerHTML);
                    }}
                    className={classes.calculate_button}
                  >
                    등급산출
                  </button>
                  <button
                    onClick={(e) => {
                      onClickHandler(e.currentTarget.innerHTML);
                    }}
                    className={classes.result_button}
                    disabled={isDisabled}
                  >
                    결과상신
                  </button>
                </div>
              </div>
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

EmpEvaluation.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EmpEvaluation;
