// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

// table columns
export const columns = [
  // 칼럼정의
  {
    headerName: '사원명',
    field: 'empName',
    key: 'empName',
    width: 300,
    headerAlign: 'center',
    align: 'center',
    headerCheckboxSelection: true,
    checkboxSelection: true
  },
  { headerName: '사용일자', field: 'applyYearMonth', key: 'applyYearMonth', width: 300, headerAlign: 'center', align: 'center' },
  { headerName: '남은연차', field: 'remainBreakAttd', key: 'remainingHoliday', width: 300, headerAlign: 'center', align: 'center' }
];

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

export default function TableDataGrid({ Selected, data }: { Selected: any; data: any }) {
  const theme = useTheme();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      // 데이터가 들어올 때 applyYearMonth 값을 수정
      const modifiedData = data.map((item: { applyYearMonth: string; }) => {
        if (item.applyYearMonth) {
          // 원래 데이터가 "20231" 형식이라면 "2023년 1월"로 변경
          const year = item.applyYearMonth.substring(0, 4);
          const month = item.applyYearMonth.substring(4);
          item.applyYearMonth = `${year}년 ${month}월`;
        }
        return item;
      });

      setRows(modifiedData);
    }
  }, [data]);

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
        '& .MuiDataGrid-root': {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200',
            display: 'flex',
            alignItems: 'center', // 텍스트 가운데 정렬
            justifyContent: 'center' // 텍스트 가운데 정렬
          },
          '& .MuiDataGrid-columnsContainer': {
            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200',
            backgroundColor: '#E8D9FF'
          },
          '& .MuiDataGrid-columnSeparator': {
            color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200',
            backgroundColor: '#E8D9FF'
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            backgroundColor: '#E8D9FF'
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize: 16
          }
        }
      }}
    >
      <DataGrid rows={rows} columns={columns} getRowId={(row) => row.empName} pageSize={5} rowsPerPageOptions={[5]} />
    </Box>
  );
}
