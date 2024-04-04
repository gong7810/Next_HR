import { ReactElement, useState } from 'react';

// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ColumnProps } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';

import { getPosition1 } from 'store/slices/hr/base/position';

export const positionGrid: ColumnProps[] = [
  // 칼럼정의
  {
    label: '직급코드', //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: 'positionCode'
  },
  {
    label: '직급',
    id: 'position'
  },
  {
    label: '기본급',
    id: 'basesalary'
  },
  {
    label: '호봉인상률',
    id: 'hobongratio'
  }
];

// ==============================|| TABLE - BASIC ||============================== //

function PositionPage() {
  const dispatch = useDispatch();
  const [selRow, setSelRow] = useState(null);
  const { positionList } = useSelector((state: any) => state.positionList.positionList);

  const selectRow = (rowData: any) => {
    setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
    console.log('선택한 행의 데이터:', rowData);
  };

  const selectData = () => {
    dispatch(getPosition1());
  };

  return (
    <Page title="직급정보 관리">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="직급정보 관리"
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
                    {positionGrid.map((column: any) => (
                      <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth }}>
                        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{column.label}</div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {positionList?.map((row: any, index: any) => (
                    <TableRow
                      key={index}
                      onClick={() => selectRow(row)} // 행을 클릭하면 선택한 행을 설정
                      className={row === selRow ? 'selected' : ''}
                    >
                      <TableCell style={{ textAlign: 'center' }}>{row.positionCode}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{row.position}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{row.basesalary}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{row.hobongratio}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Page>
  );
}

PositionPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PositionPage;
