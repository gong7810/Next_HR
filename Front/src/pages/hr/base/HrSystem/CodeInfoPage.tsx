import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from '@mui/material';

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
    label: 'DETAIL CODE', //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: 'detailCodeNumber'
  },
  {
    label: 'CODE',
    id: 'codeNumber'
  },
  {
    label: '상세코드',
    id: 'detailCodeName'
  },
  {
    label: '사용현황',
    id: 'detailCodeNameusing'
  }
];

function CodeInfoPage() {
  const dispatch = useDispatch();
  const [selRow, setSelRow] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const codeList = useSelector((state: RootState) => state.baseReducer.codeList);
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

  // 조회
  const selectData = () => {
    dispatch(baseActions.getCodeListRequest());
  };

  const selectRow = (rowData: any) => {
    setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
    console.log('선택한 행의 데이터:', rowData);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="코드 관리">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              title="코드 관리"
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
                    {(rowsPerPage > 0 ? codeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : codeList).map(
                      (row: any, index: any) => (
                        <TableRow key={index} onClick={() => selectRow(row)} className={row === selRow ? 'selected' : ''}>
                          <TableCell style={{ textAlign: 'center' }}>{row.detailCodeNumber}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.codeNumber}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.detailCodeName}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.detailCodeNameusing}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={codeList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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

CodeInfoPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CodeInfoPage;
