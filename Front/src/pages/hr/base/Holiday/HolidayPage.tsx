import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GridTable, { rows as Data, columns } from 'components/forms/tables/GridTable';
import { ColumnProps, HolidayTO } from '../types/types';
import axios, { Axios } from 'axios';
import AddHoliday from 'components/hr/base/templates/AddHoliday';
import { useDispatch, useSelector } from 'react-redux';
import { getHoliday, requestHoliday } from 'store/slices/hr/base/holiday';

// table data
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

// const top100Films = [s
//   { label: 'The Dark Knight', id: 1 },
//   { label: 'Control with Control', id: 2 },
//   { label: 'Combo with Solo', id: 3 },
//   { label: 'The Dark', id: 4 },
//   { label: 'Fight Club', id: 5 },
//   { label: 'demo@company.com', id: 6 },
//   { label: 'Pulp Fiction', id: 7 }
// ];

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
  // {
  //   label: "holidayCode",
  //   id: "holidayCode",

  // },
  // {
  //   label: "상태",
  //   id: "status",

  // }
];

// ==============================|| TABLE - BASIC ||============================== //

function HolidayPage() {
  const dispatch = useDispatch();

  const { holidayList } = useSelector((state: any) => state.holidayList);
  console.log('홀리', holidayList);
  const [selRow, setSelRow] = useState(null);

  useEffect(() => {
    dispatch(requestHoliday());
  }, [dispatch]);

  const selectRow = (rowData: any) => {
    setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
    console.log('선택한 행의 데이터:', rowData);
  };

  return (
    <Page title="휴일정보">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} title="휴일정보">
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
                  {holidayList?.holidayList?.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => selectRow(row)} // 행을 클릭하면 선택한 행을 설정
                      className={row === selRow ? 'selected' : ''}
                    >
                      <TableCell sx={{ py: 3, textAlign: 'center' }}>{row.applyDay}</TableCell>
                      <TableCell sx={{ py: 3, textAlign: 'center' }}>{row.holidayName}</TableCell>
                      <TableCell sx={{ py: 3, textAlign: 'center' }}>{row.note}</TableCell>
                      {/* <TableCell>{row.holidayCode}</TableCell>
                          <TableCell>{row.status}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      {/* <AddHoliday selRow={selRow} setSelRow={setSelRow} holidayList={holidayList} /> */}
    </Page>
  );
}

HolidayPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HolidayPage;
