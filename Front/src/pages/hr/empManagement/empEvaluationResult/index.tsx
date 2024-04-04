import { ReactElement, useEffect, useRef } from 'react';
// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import CSVExport from '../../../forms/tables/tbl-exports';
import classes from '../../../../styles/hr/empmanagement/empevaluationresult.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { empEvalResultAction } from '../slices/empEvalResultReducer';
import { EmpEvalResultInfoEntity } from '../types/empManagementTypes';

const selectData: { selectCode: string; selectValue: string }[] = [
  { selectCode: '0', selectValue: '대기' },
  { selectCode: '1', selectValue: '반려' },
  { selectCode: '2', selectValue: '승인' }
];

// ==============================|| TABLE - BASIC ||============================== //

function EmpEvaluationResult() {
  const dispatch = useDispatch();
  const emp = useSelector((state: any) =>
    state.empManagement.empEvalResult.empList === undefined ? [] : state.empManagement.empEvalResult.empList
  ); // undefined가 뜨면은 undefined라는 에러가 발생하기 때문에 undefined일때 빈배열을 반환하게함

  // 사원고과 관리의 fetch 상태가 바뀌면 갱신된 사원고과 정보를 가지고 온다.
  // ---> 여기서 사용하는 fetchStatus는 empEvalManagementReducer에 있는 state임.
  const empManagementFetchStatus = useSelector((state: any) => state.empManagement.empEvalManagement.fetchStatus);
  const selectRef = useRef<any>('01');

  useEffect(() => {
    dispatch(empEvalResultAction.EMP_EVAL_RESULT_FETCH_REQUESTED());

    console.log(selectRef.current.value);
  }, [dispatch, empManagementFetchStatus]); // fetchStatus는 empEvalManagementReducer에 있습니다.

  const onChangeHandler = (value: any) => {
    console.log('value : ', value);
    if (value === '-1') {
      return;
    }
    dispatch(empEvalResultAction.EMP_EVAL_RESULT_FETCH_REQUESTED_BY_APPROVAL_CONDITION(value));
  };

  return (
    <Page title="사원고과 결과조회">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="사원고과 결과조회"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <div>
                  <select
                    ref={selectRef}
                    onChange={(e) => {
                      onChangeHandler(e.target.value);
                    }}
                    className={classes.select}
                  >
                    <option value="-1" disabled hidden selected>
                      승인상태선택
                    </option>
                    {selectData?.map((data: any) => (
                      <option key={data.selectCode} className={classes.option} value={data.selectValue}>
                        {data.selectValue}
                      </option>
                    ))}
                  </select>
                </div>
                <CSVExport data={'empList'} filename={'basic-table.csv'} header={'header'} />
              </Stack>
            }
          >
            <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{ borderTop: '1px solid black', borderBottom: '3px solid black', marginBottom: '3px', backgroundColor: '#E8D9FF' }}
                  >
                    <TableCell sx={{ pl: 3 }}></TableCell>
                    <TableCell sx={{ pl: 3 }}>사원번호</TableCell>
                    <TableCell>사원명</TableCell>
                    <TableCell>임용일</TableCell>
                    <TableCell>부서</TableCell>
                    <TableCell>휴대폰번호</TableCell>
                    <TableCell>결재상태</TableCell>
                    <TableCell sx={{ pr: 3 }}>등급</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {emp.length !== 0 ? (
                    emp.map((emp: EmpEvalResultInfoEntity) => (
                      <TableRow hover key={emp.empCode}>
                        <TableCell sx={{ pl: 3 }} padding="checkbox"></TableCell>

                        <TableCell sx={{ pl: 3 }} component="th" scope="row">
                          {emp.empCode}
                        </TableCell>
                        <TableCell>{emp.empName}</TableCell>
                        <TableCell>{emp.applyDay}</TableCell>
                        <TableCell>{emp.deptName}</TableCell>
                        <TableCell>{emp.position}</TableCell>
                        <TableCell>{emp.approvalStatus}</TableCell>
                        <TableCell sx={{ pr: 3 }}>{emp.grade}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>{'사원 고과 결과가 없습니다.'}</TableCell>
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
    </Page>
  );
}

EmpEvaluationResult.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EmpEvaluationResult;
