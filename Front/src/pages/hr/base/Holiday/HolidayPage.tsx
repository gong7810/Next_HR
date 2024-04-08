import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ColumnProps } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { requestHoliday } from 'store/slices/hr/base/holiday';
import AddHoliday from 'components/hr/base/templates/AddHoliday';

export const holidayGrid: ColumnProps[] = [
  // 칼럼정의
  {
    label: '일자', //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: 'applyDay'
  },
  {
    label: '휴일명',
    id: 'holidayName'
  },
  {
    label: '비고',
    id: 'note'
  }
];

// ==============================|| TABLE - BASIC ||============================== //

function HolidayPage() {
  const dispatch = useDispatch();

  const { holidayList } = useSelector((state: any) => state.holidayList);
  const [selRow, setSelRow] = useState(null);
  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 4) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
  }, []);

  useEffect(() => {
    dispatch(requestHoliday());
  }, [dispatch]);

  const selectRow = (rowData: any) => {
    setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
    console.log('선택한 행의 데이터:', rowData);
  };

  return (
    <Page title="휴일정보 관리">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} title="휴일정보 관리">
            <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#E8D9FF' }}>
                  <TableRow>
                    {holidayGrid.map((column: any) => (
                      <TableCell
                        sx={{ py: 3, textAlign: 'center' }}
                        key={column.id}
                        style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: 16 }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holidayList?.holidayList?.map((row: any, index: any) => (
                    <TableRow
                      key={index}
                      onClick={() => selectRow(row)} // 행을 클릭하면 선택한 행을 설정
                      className={row === selRow ? 'selected' : ''}
                    >
                      <TableCell sx={{ py: 3, textAlign: 'center' }}>{row.applyDay}</TableCell>
                      <TableCell sx={{ py: 3, textAlign: 'center' }}>{row.holidayName}</TableCell>
                      <TableCell sx={{ py: 3, textAlign: 'center' }}>{row.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      {/* 휴일정보는 상무 이상만이 등록 수정 삭제 가능 */}
      {authCheck ? <AddHoliday selRow={selRow} setSelRow={setSelRow} holidayList={holidayList} /> : <div></div>}
    </Page>
  );
}

HolidayPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HolidayPage;
