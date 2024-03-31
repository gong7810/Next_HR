import { ReactElement, useState, useEffect } from 'react';
// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import CSVExport from '../../../forms/tables/tbl-exports';
import EmpEvaluationResult from '../empEvaluationResult/index';
import classes from '../../../../styles/hr/empmanagement/empevaluationmanagement.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { empEvalManagementAction } from '../slices/empEvalManagementReducer';
import { EmpEvalManagementInfoEntity } from '../types/empManagementTypes';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

// table data

// ==============================|| TABLE - BASIC ||============================== //

function EmpEvaluationManagement() {
  const dispatch = useDispatch();
  const empList = useSelector((state: any) =>
    state.empManagement.empEvalManagement.empList === undefined ? [] : state.empManagement.empEvalManagement.empList
  ); //가끔씩 undefined에러가 발생해서 여기서 undefined여부를 체크
  const fetchStatus = useSelector((state: any) => state.empManagement.empEvalManagement.fetchStatus);

  const [selectedEmp, setSelectedEmp] = useState<EmpEvalManagementInfoEntity[]>([]);
  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 3) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      alert('접근 권한이 없습니다.');
    }
  }, []);

  useEffect(() => {
    console.log('<<<<<<<<<<< useEffect called.');
    dispatch(empEvalManagementAction.EMP_EVAL_FETCH_REQUESTED()); // action을 호출하는 것이므로 "()"를 뒤에 붙여 주어야 한다.
    console.log('dispatched succeed');
    // console.log(checkedCheckBox.current.value);
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

      const emp = empList.filter((data: any) => data.empCode === value); // 1개의 emp code가 반환 되므로
      setSelectedEmp([...selectedEmp, emp[0]]);
    } else {
      console.log('this is not checked', value);
      const emp = selectedEmp.filter((data: any) => data.empCode !== value); // 체크 해제된 사원을 제외한 사원들의 정보로 업데이트
      setSelectedEmp(emp);
    }
  };

  // 사원을 선택하지 않으면 경고창을 띄우고 return,
  // 사원 선택후 누른 버튼에 따라서 다른 메서드를 호출
  const onClickHandler = (value: any) => {
    console.log('selectedEmp is :', selectedEmp);
    if (selectedEmp.length === 0) {
      alert('사원을 선택해 주세요.');
      return;
    }

    if (value === 'del') {
      const bool = confirm('삭제 하시겠습니까?');
      if (bool) {
        console.log('selected values : ', selectedEmp);
        dispatch(empEvalManagementAction.DELETE_EMP_EVAL(selectedEmp));
        setSelectedEmp([]);
      } else {
        return;
      } // delete if 문의 끝
    } else if (value === 'approve') {
      const bool = confirm('승인 하시겠습니까?');
      if (bool) {
        console.log('selected approved values : ', selectedEmp);

        dispatch(empEvalManagementAction.MODIFY_APPROVED_EMP_EVAL(selectedEmp));
        setSelectedEmp([]);
        return;
      } else {
        return;
      } // approve if 문의 끝
    } else {
      const bool = confirm('반려하시겠습니까?');
      if (bool) {
        console.log('reject');
        console.log('rejected empList', selectedEmp);
        dispatch(empEvalManagementAction.MODIFY_REJECTED_EMP_EVAL(selectedEmp));
        setSelectedEmp([]);
      } else {
        return;
      }
    }

    console.log('clicked value is : ', value);
  };

  return (
    <Page title="사원고과 승인관리">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              title="사원고과 승인관리"
              secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                  <button
                    value="del"
                    onClick={(e) => {
                      onClickHandler(e.currentTarget.value);
                    }}
                    className={classes.button}
                  >
                    삭제
                  </button>
                  <button
                    value="approve"
                    onClick={(e) => {
                      onClickHandler(e.currentTarget.value);
                    }}
                    className={classes.button}
                  >
                    승인
                  </button>
                  <button
                    value="reject"
                    onClick={(e) => {
                      onClickHandler(e.currentTarget.value);
                    }}
                    className={classes.button}
                  >
                    반려
                  </button>

                  <CSVExport data={'empList'} filename={'basic-table.csv'} header={'header'} />
                  <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                </Stack>
              }
            >
              {/* 아래의 코드도 리펙터링을 하자 */}
              {/* table */}
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
                      <TableCell sx={{ pl: 3 }}>사원번호</TableCell>
                      <TableCell>사원명</TableCell>
                      <TableCell>임용일</TableCell>
                      <TableCell>부서</TableCell>
                      <TableCell>직급명</TableCell>
                      <TableCell>승인여부</TableCell>
                      <TableCell sx={{ pr: 3 }}>등급</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {empList.length !== 0 ? (
                      empList.map((emp: EmpEvalManagementInfoEntity) => (
                        <TableRow hover key={emp.empCode}>
                          <TableCell sx={{ pl: 3 }} padding="checkbox">
                            <Checkbox
                              value={emp.empCode}
                              color="primary"
                              onChange={(e) => {
                                onCheckedChangeHandler(e);
                              }}
                            />
                          </TableCell>

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
            <EmpEvaluationResult />
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

EmpEvaluationManagement.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EmpEvaluationManagement;
