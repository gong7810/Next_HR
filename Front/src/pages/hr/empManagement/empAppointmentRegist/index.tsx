import { ReactElement, useState, useEffect, useRef } from 'react';

// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import CSVExport from '../../../forms/tables/tbl-exports';
import classes from '../../../../styles/hr/empmanagement/registerempappointment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { empAppointmentAction } from '../slices/empAppointmentRegistReducer';

import EmpAppoinementModal from './EmpAppoinementModal';
import { EmpAppointmentInfoEntity } from '../types/empManagementTypes';

import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';

const selectData: { deptCode: string; deptName: string }[] = [
  { deptCode: '000000', deptName: '전체부서' },
  { deptCode: 'DEP000', deptName: '회계팀' },
  { deptCode: 'DEP001', deptName: '인사팀' },
  { deptCode: 'DEP002', deptName: '전산팀' },
  { deptCode: 'DEP003', deptName: '보안팀' },
  { deptCode: 'DEP004', deptName: '개발팀' }
];

// ==============================|| TABLE - BASIC ||============================== //

function RegisterEmpAppointment() {
  const dispatch = useDispatch();
  const empList = useSelector((state: any) =>
    state.empManagement.empInfo.empList !== undefined ? state.empManagement.empAppointment.empList : []
  );
  const fetchStatus = useSelector((state: any) => state.empManagement.empAppointment.fetchStatus);
  const [selectedEmp, setSelectedEmp] = useState<EmpAppointmentInfoEntity[]>([]);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 4) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        title: '접근 권한이 없습니다.'
      });
    }
  }, []);

  useEffect(() => {
    dispatch(empAppointmentAction.EMP_FETCH_REQUESTED(''));
    console.log(selectRef.current?.value);
  }, [fetchStatus, dispatch]);

  const onChangeHandler = (value: any) => {
    const refValue = selectRef.current?.value;
    console.log('value from event : ', value);
    console.log('selectRef : ', refValue);
    dispatch(empAppointmentAction.EMP_FETCH_REQUESTED(refValue));
  };

  const onCheckedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log('this is checked checkbox :', value, checked);

    if (checked === true) {
      const emp = empList.filter((data: any) => data.empCode === value); // 조건에 해당하는 데이터의 배열을 반환
      setSelectedEmp([...selectedEmp, emp[0]]); // 해당하는 직원은 1명 뿐이므로 첫번째 인덱스에 있다.
    } else if (checked === false) {
      const emp = selectedEmp.filter((data) => data.empCode !== value);
      console.log('emp is :', emp);
      setSelectedEmp(emp); // 조건에 해당하는 결과가 없으면은 빈배열을 반환할거 같다
    }
  };

  const onClickHandler = (identifier: string) => {
    if (selectedEmp.length === 0) {
      alert('사원을 선택해 주세요');
      setSelectedEmp([]);
      return;
    }
    if (identifier === 'appointment') {
      if (selectedEmp.length > 1) {
        alert('사원 인사발령은 한번에 한명씩 가능합니다.');
        return;
      }
      setIsValid(true); // 인사발령 모달을 연다.
      console.log(identifier);
      return;
    } else {
    }

    console.log('selectedEmp is : ', selectedEmp);
  };

  const onToggleHandler = () => {
    setIsValid((data) => !data);
  };

  return (
    <Page title="인사발령 등록">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {isValid && <EmpAppoinementModal emp={selectedEmp} toggle={onToggleHandler} />}
            <MainCard
              content={false}
              title="인사발령 등록"
              secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                  <button className={classes.button} onClick={() => onClickHandler('appointment')}>
                    인사발령등록
                  </button>
                  <div>
                    <select
                      ref={selectRef}
                      onChange={(e) => {
                        onChangeHandler(e.target.value);
                      }}
                      className={classes.select}
                    >
                      {selectData?.map((data: any) => (
                        <option key={data.deptCode} className={classes.option} value={data.deptCode}>
                          {data.deptName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <CSVExport data={empList} filename={'basic-table.csv'} header={'header'} />
                </Stack>
              }
            >
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
                      <TableCell>사원번호</TableCell>
                      <TableCell>사원명</TableCell>
                      <TableCell>직급코드</TableCell>
                      <TableCell>이메일</TableCell>
                      <TableCell>휴대폰번호</TableCell>
                      <TableCell>성별</TableCell>
                      <TableCell sx={{ pr: 3 }}>주소</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {empList.length !== 0 ? (
                      empList.map((emp: EmpAppointmentInfoEntity) => (
                        <TableRow hover key={emp.empCode}>
                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            <Checkbox
                              value={emp.empCode}
                              color="primary"
                              onChange={(e) => {
                                onCheckedChangeHandler(e);
                              }}
                            />
                          </TableCell>
                          <TableCell>{emp.empCode}</TableCell>
                          <TableCell>{emp.empName}</TableCell>
                          <TableCell>{emp.positionCode}</TableCell>
                          <TableCell>{emp.email}</TableCell>
                          <TableCell>{emp.mobileNumber}</TableCell>
                          <TableCell>{emp.gender}</TableCell>
                          <TableCell sx={{ pr: 3 }}>{emp.address}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>{'조회된 결과가 없습니다.'}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
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

RegisterEmpAppointment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RegisterEmpAppointment;
