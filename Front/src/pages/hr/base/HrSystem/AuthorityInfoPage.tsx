import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ColumnProps } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';

import { baseActions } from 'store/redux-saga/reducer/base/baseReducer';
import { RootState } from 'store';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';

export const authGrid: ColumnProps[] = [
  {
    label: '직급코드', //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: 'positionCode'
  },
  {
    label: '직급',
    id: 'position'
  },
  {
    label: '권한 레벨',
    id: 'authLevel'
  }
];

function AuthorityInfoPage() {
  const dispatch = useDispatch();
  const [selRow, setSelRow] = useState(null);
  const authList = useSelector((state: RootState) => state.baseReducer.authList);
  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 2) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        text: `'대리'직급부터 열람이 가능합니다.`
      });
    }
  }, []);

  const selectRow = (rowData: any) => {
    setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
    console.log('선택한 행의 데이터:', rowData);
  };

  const selectData = () => {
    dispatch(baseActions.getAuthListRequest());
  };

  return (
    <Page title="권한 관리">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              title="권한 관리"
              secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button variant="contained" color="primary" onClick={selectData}>
                    조회
                  </Button>
                </Stack>
              }
            >
              <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {authGrid.map((column: any) => (
                        <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth }}>
                          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{column.label}</div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {authList?.map((row: any, index: any) => (
                      <TableRow
                        key={index}
                        onClick={() => selectRow(row)} // 행을 클릭하면 선택한 행을 설정
                        className={row === selRow ? 'selected' : ''}
                      >
                        <TableCell style={{ textAlign: 'center' }}>{row.positionCode}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{row.position}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{row.authLevel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>
          <Grid item xs={12}></Grid>
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

AuthorityInfoPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AuthorityInfoPage;
