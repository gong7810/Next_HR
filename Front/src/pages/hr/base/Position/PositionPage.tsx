import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Autocomplete, TextField, Button, Checkbox } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import GridTable, { rows as Data, columns } from 'components/forms/tables/GridTable';
import {ColumnProps,HolidayTO, PositionTO} from '../types/types';
import axios, { Axios } from 'axios';
import AddHoliday from 'components/hr/base/templates/AddHoliday';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAaaaRecord } from 'dns';

import { deletePosition, deletePosition1, getPosition, getPosition1 } from 'store/slices/hr/base/position';

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

export const positionGrid:ColumnProps[] = [
  // 칼럼정의
  {
    label: "직급코드", //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: "positionCode",
 
  },
  {
    label: "직급",
    id: "position",
    
  },
  {
    label: "기본급",
    id: "basesalary",
 
  },
  { 
    label: "호봉인상률", 
    id: "hobongratio", 
   
  }  
];






// ==============================|| TABLE - BASIC ||============================== //

function PositionPage() {

  const dispatch=useDispatch();
  const [selRow,setSelRow]=useState(null);
    // const [positionList, setPositionList] = useState<PositionTO[]>([]);
    const {positionList} = useSelector((state:any) => state.positionList.positionList);
    console.log("사가포지션11111",positionList)
   

    const selectRow=(rowData:any)=>{
      setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
      console.log('선택한 행의 데이터:', rowData);
    }
    


    const selectData=()=>{
      dispatch(getPosition1())
    }


    const deleteData = () => {
      if (selRow) {
        const updatedSelRow1 = { ...selRow, status: 'delete' }; // 객체를 복제하고 status를 변경
        console.log('삭제', updatedSelRow1);
        
        // 배열에서 해당 항목을 제외하고 새로운 배열을 생성
        const updatedPositionList = positionList?.positionList?.filter(item => item.positionCode !== updatedSelRow1.positionCode);
        console.log("삭제가될까",updatedPositionList)
        const confirmDelete = window.confirm('삭제하시겠습니까?');
        if (confirmDelete) {
          try {
            // Redux 액션을 디스패치하여 데이터를 백엔드로 보냅니다.
            dispatch(deletePosition1(updatedSelRow1));
            setSelRow(null); // 선택한 행 초기화
          } catch (err) {
            console.log(err);
          }
        }
      }
    }



  
      return (
        <Page title="직급정보관리">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <MainCard
                content={false}
                title="직급정보관리"
                secondary={
                  <Stack direction="row" spacing={2} alignItems="center">
                    <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                    <Button variant="contained" color="primary" onClick={selectData}>조회</Button>
                    <Button variant="contained" color="primary" onClick={deleteData}>삭제</Button>
                  </Stack>
                }
              >
                <TableContainer>
                  <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow >
                        {positionGrid.map((column: any) => (
                          <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth}}>
                            <div style={{textAlign:'center',fontWeight:'bold'}}>
                            {column.label}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {positionList.map((row, index) => (
                         <TableRow
                         key={index}
                         onClick={() => selectRow(row)} // 행을 클릭하면 선택한 행을 설정
                         className={row === selRow ? 'selected' : ''}
                         >
                          <TableCell>{row.positionCode}</TableCell>
                          <TableCell>{row.position}</TableCell>
                          <TableCell>{row.basesalary}</TableCell>
                          <TableCell>{row.hobongratio}</TableCell>
                        </TableRow>
                      ))} */}
                           {positionList?.map((row, index) => (
                            <TableRow
                              key={index}
                              onClick={() => selectRow(row)} // 행을 클릭하면 선택한 행을 설정
                              className={row === selRow ? 'selected' : ''}
                            >
                              <TableCell style={{textAlign:'center'}}>{row.positionCode}</TableCell>
                              <TableCell style={{textAlign:'center'}}>{row.position}</TableCell>
                              <TableCell style={{textAlign:'center'}}>{row.basesalary}</TableCell>
                              <TableCell style={{textAlign:'center'}}>{row.hobongratio}</TableCell>
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
