import { ReactElement, useState, useEffect } from 'react';
// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import { empAppointmentManagementAction } from '../slices/empAppointmentManagementReducer';
// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CSVExport from '../../../forms/tables/tbl-exports';
import EmpAppointmentResult from '../empAppointmentResult';
import classes from '../../../../styles/hr/empmanagement/empappointmentmanagement.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { EmpAppointmentManagementInfoEntity } from '../types/empManagementTypes';
// table data

// ==============================|| TABLE - BASIC ||============================== //

function EmpAppointmentManagement() {
  const dispatch = useDispatch();
  const empList = useSelector((state: any) =>
    state.empManagement.empAppointmentManagement.empList !== undefined ? state.empManagement.empAppointmentManagement.empList : []
  );
  const fetchStatus = useSelector((state: any) => state.empManagement.empAppointmentManagement.fetchStatus);
  // const empList = [{ hosu: 'test hosu', empCode: 'test empCode', requestDate: 'test date', approvalStatus: 'test approval status' }];

  const [selectedEmp, setSelectedEmp] = useState<EmpAppointmentManagementInfoEntity[]>([]);

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) === 5) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
  }, []);

  useEffect(() => {
    dispatch(empAppointmentManagementAction.EMP_APPOINTMENT_FETCH_REQUESTED());
  }, [dispatch, fetchStatus]); // 백단으로부터 응답을 받으면 사원고과 결과가 반영된 DB의 결과를 가지고옴

  // 체크박스에 onChange이벤트가 발생할 때마다,
  // 체크박스의 체크유무와 해당 row의 정보를
  // 가지고오는 함수
  const onCheckedChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    console.log('checked value is : ', e.target.checked);
    if (checked === true) {
      console.log('destructed value is : ', checked, value);

      // 체크된 체크박스의 row에 있는 empCode와 같은 사원의 정보를 반환하는 코드

      const emp = empList.filter((data: any) => data.hosu === value); // 1개의 emp code가 반환 되므로
      setSelectedEmp([...selectedEmp, emp[0]]);
    } else {
      console.log('this is not checked', value);
      const emp = selectedEmp.filter((data: any) => data.hosu !== value); // 체크 해제된 사원을 제외한 사원들의 정보로 업데이트
      setSelectedEmp(emp);
    }
  };

  // 사원을 선택하지 않으면 경고창을 띄우고 return,
  // 사원 선택후 누른 버튼에 따라서 다른 메서드를 호출
  const onClickHandler = (value: string) => {
    console.log('selectedEmp is :', selectedEmp);
    if (selectedEmp.length === 0) {
      alert('사원을 선택해 주세요.');
      return;
    }

    if (value === 'approve') {
      const bool = confirm('승인 하시겠습니까?');
      if (bool) {
        dispatch(empAppointmentManagementAction.MODIFY_APPROVED_EMP_APPOINTMENT(selectedEmp));
        console.log('selected emp is :', selectedEmp);
        setSelectedEmp([]);
      } else {
        return;
      } // approve if 문의 끝
    } else {
      const bool = confirm('반려하시겠습니까?');
      if (bool) {
        console.log('reject');
        console.log('rejected empList', selectedEmp);
        dispatch(empAppointmentManagementAction.MODIFY_REJECTED_EMP_APPOINTMENT(selectedEmp));

        setSelectedEmp([]);
      } else {
        return;
      } // reject if문의 끝
    }

    console.log('clicked value is : ', value);
  };

  return (
    <Page title="인사발령 관리">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          {authCheck ? (
            <MainCard
              content={false}
              title="인사발령 관리"
              secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                  <button
                    value="reject"
                    onClick={(e: any) => {
                      onClickHandler(e.currentTarget.value);
                    }}
                    className={classes.button}
                  >
                    반려
                  </button>
                  <button
                    value="approve"
                    onClick={(e: any) => {
                      onClickHandler(e.currentTarget.value);
                    }}
                    className={classes.button}
                  >
                    승인
                  </button>

                  <CSVExport data={'empList'} filename={'basic-table.csv'} header={'header'} />
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
                      <TableCell sx={{ pl: 5 }}>호수</TableCell>
                      <TableCell>사원번호</TableCell>
                      <TableCell>변경전</TableCell>
                      <TableCell>변경후</TableCell>
                      <TableCell sx={{ pr: 3 }}>결재상태</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {empList.length !== 0 ? (
                      empList.map((emp: EmpAppointmentManagementInfoEntity) => (
                        <TableRow hover key={emp.hosu}>
                          <TableCell sx={{ pl: 3 }} padding="checkbox">
                            <Checkbox
                              value={emp.hosu}
                              color="primary"
                              onChange={(e: any) => {
                                onCheckedChangeHandler(e);
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ pl: 3 }} component="th" scope="row">
                            {emp.hosu}
                          </TableCell>
                          <TableCell>{emp.empCode}</TableCell>
                          <TableCell>{emp.beforeChange}</TableCell>
                          <TableCell>{emp.afterChange}</TableCell>
                          <TableCell sx={{ pr: 3 }}>{emp.approvalStatus}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>{'인사발령 내역이 없습니다.'}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          ) : (
            <div></div>
          )}
          <EmpAppointmentResult />
        </Grid>
      </Grid>
    </Page>
  );
}

EmpAppointmentManagement.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EmpAppointmentManagement;
