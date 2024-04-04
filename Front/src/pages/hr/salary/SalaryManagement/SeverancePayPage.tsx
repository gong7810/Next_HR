import Layout from 'layout';
import React, { ReactElement, useEffect, useState } from 'react';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import {
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AnnualLeaveMgtTO, retirementSalaryTO } from '../types/types';
import { RootState, useDispatch } from 'store';
import { salActions } from 'store/redux-saga/reducer/salary/salaryReducer';
import { useSelector } from 'react-redux';

const Columns: GridColDef[] = [
  {
    headerName: '신청일',
    field: 'applyDate',
    width: 150,
    headerAlign: 'center',
    align: 'center'
  },
  { headerName: '구분', field: 'severanceType', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '사원명', field: 'empName', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '근속기간', field: 'workDays', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '입사일', field: 'hireDate', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '퇴사일', field: 'retireDate', width: 150, headerAlign: 'center', align: 'center' },
  { headerName: '차인지금액', field: 'realSeverancePay', width: 150, headerAlign: 'center', align: 'center' }
];

const SeverancePayPage = () => {
  const dispatch = useDispatch();
  const rawList = useSelector((state: RootState) => state.salReducer.deptList);
  const rawList2 = useSelector((state: RootState) => state.salReducer.empList);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [deptCode, setDeptCode] = useState<string>('');
  const [empCode, setEmpCode] = useState<string>('');
  const [selectRowData, setSelectRowData] = useState<retirementSalaryTO[]>([]);
  const [rows, setRows] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empList, setEmpList] = useState<AnnualLeaveMgtTO[]>([]);

  const severancePayList = useSelector((state: RootState) => state.salReducer.severancePayList);

  //부서 조회
  useEffect(() => {
    dispatch(salActions.getDeptListRequest());
  }, []);

  useEffect(() => {
    setDeptList(rawList);
  }, [rawList]);

  const deptLists = deptList.map((e: any) => {
    return (
      <MenuItem value={e.deptCode} key={e.deptCode}>
        {e.deptName}
      </MenuItem>
    );
  });

  //사원 조회
  useEffect(() => {
    dispatch(salActions.getEmpListRequest(deptCode));
  }, [deptCode]);

  useEffect(() => {
    setEmpList(rawList2);
  }, [rawList2]);

  const empLists = empList.map((e: any) => {
    return (
      <MenuItem value={e.empCode} key={e.empCode}>
        {e.empName}
      </MenuItem>
    );
  });

  // 퇴직금 조회
  const getSeverancePayList = () => {
    dispatch(salActions.getSeverancePayListRequest(empCode));

    setSelectRowData([]);
  };

  useEffect(() => {
    const rows = severancePayList.map((item: any, index: any) => {
      return {
        ...item,
        id: index
      };
    });

    setRows(rows);
  }, [severancePayList]);

  return (
    <Page title="퇴직금 조회">
      <MainCard title="퇴직금 조회" secondary={<Stack direction="row" spacing={2} alignItems="center"></Stack>}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ minWidth: 120, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">부서선택</InputLabel>
                <Select
                  label="부서선택"
                  onChange={(e: any) => {
                    setDeptCode(String(e.target.value));
                  }}
                >
                  {deptLists}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">직원선택</InputLabel>
              <Select
                label="직원선택"
                onChange={(e: any) => {
                  setEmpCode(String(e.target.value));
                }}
              >
                {empLists}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={getSeverancePayList}>
                조회
              </Button>
              <Button variant="contained" style={{ marginLeft: 15 }} onClick={getSeverancePayList}>
                삭제
              </Button>
              {/* <Button variant="contained" onClick={deleteRestAttd}>
                삭제
              </Button> */}
            </Grid>
          </Grid>
        </Grid>

        <div style={{ height: 400, width: '100%' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              sx={{ textAlign: 'center' }}
              rows={rows}
              columns={Columns}
              pageSize={5}
              checkboxSelection
              onSelectionModelChange={(newSelection) => {
                const selectedRows = rows.filter((row: any) => newSelection.includes(row.id));
                setSelectRowData(selectedRows);
                console.log('선택된 행의 데이터:', selectedRows);
              }}
            />
          )}
        </div>
      </MainCard>
    </Page>
  );
};

SeverancePayPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SeverancePayPage;
