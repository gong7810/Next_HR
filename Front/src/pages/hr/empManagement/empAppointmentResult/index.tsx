import { ReactElement, useEffect } from 'react';
// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CSVExport from '../../../forms/tables/tbl-exports';

import { useDispatch, useSelector } from 'react-redux';
import { empAppointmentResultAction } from '../slices/empAppointmentResultReducer';
import { EmpAppointmentResultInfoEntity } from '../types/empManagementTypes';

// ==============================|| TABLE - BASIC ||============================== //

function EmpAppointmentResult() {
  const dispatch = useDispatch();
  const empList = useSelector((state: any) =>
    state.empManagement.empAppointmentResult.empList === undefined ? [] : state.empManagement.empAppointmentResult.empList
  ); // undefined가 뜨면은 undefined라는 에러가 발생하기 때문에 undefined일때 빈배열을 반환하게함

  // 사원고과 관리의 fetch 상태가 바뀌면 갱신된 사원고과 정보를 가지고 온다.
  // ---> 여기서 사용하는 fetchStatus는 empEvalManagementReducer에 있는 state임.
  const empAppointmentFetchStatus = useSelector((state: any) => state.empManagement.empAppointmentManagement.fetchStatus);

  useEffect(() => {
    console.log('useEffect at empAppointmentResult called');
    dispatch(empAppointmentResultAction.EMP_APPOINTMENT_RESULT());
  }, [dispatch, empAppointmentFetchStatus]); // fetchStatus는 empAppointmentManagementReducer에 있습니다.

  return (
    <Page title="인사발령 결과조회">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="인사발령 결과조회"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <CSVExport data={'empList'} filename={'basic-table.csv'} header={'header'} />
              </Stack>
            }
          >
            {/* 아래의 코드도 리펙터링을 하자 */}
            {/* table */}
            <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{ borderTop: '1px solid black', borderBottom: '3px solid black', marginBottom: '3px', backgroundColor: '#E8D9FF' }}
                  >
                    <TableCell sx={{ pl: 13 }}>호수</TableCell>

                    <TableCell>사원번호</TableCell>
                    <TableCell>변경전</TableCell>
                    <TableCell>변경후</TableCell>
                    <TableCell sx={{ pr: 3 }}>결재상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empList.length !== 0 ? (
                    empList.map((emp: EmpAppointmentResultInfoEntity) => (
                      <TableRow hover key={emp.hosu}>
                        <TableCell sx={{ pl: 11 }}>{emp.hosu}</TableCell>
                        <TableCell>{emp.empCode}</TableCell>
                        <TableCell>{emp.beforeChange}</TableCell>
                        <TableCell>{emp.afterChange}</TableCell>
                        <TableCell sx={{ pr: 3 }}>{emp.approvalStatus}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell sx={{ pl: 10 }}></TableCell>
                      <TableCell></TableCell>
                      <TableCell>{'인사발령 결과가 없습니다.'}</TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{ pr: 3 }}></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
}

EmpAppointmentResult.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EmpAppointmentResult;
