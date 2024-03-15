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
import {ColumnProps,DepTO,HolidayTO} from '../types/types';
import axios, { Axios } from 'axios';
import AddHoliday from 'components/hr/base/templates/AddHoliday';
import { useDispatch } from 'react-redux';
import { count } from 'console';
import { add } from 'lodash';


export const deptListGrid:ColumnProps[] = [
  // 칼럼정의
  {
    label: "부서코드", //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: "deptCode",
 
  },
  {
    label: "부서명",
    id: "deptName",
    
  },
  {
    label: "부서번호",
    id: "deptTel",

  },  
]; 






// ==============================|| TABLE - BASIC ||============================== //

function DepartmentManageCopy() {



    const [deptList, setDeptList] = useState<DepTO[]>([]);
    const [selRow,setSelRow]=useState(null);


    const [newRow,setNewRow]=useState<DepTO>({
    deptCode:'',
    deptName:'',
    deptTel:'',
    status:'insert',
    })



    useEffect(() => {
        axios.get("http://localhost:9101/foudinfomgmt/deptlist")
          .then(({ data }) => {
            console.log("포맷팅된 부서 목록: ", data);
            setDeptList(data.list);
            console.log("포맷팅된 휴일 목록: ", data.list);
          })
          .catch((error) => {
            console.error("데이터를 불러오는 중 에러 발생: ", error);
          });
      }, []);
      
      const newDeptCode1=()=>{
      const lastDeptCode=deptList[deptList.length -1].deptCode;
      const lastNumber=parseInt(lastDeptCode.slice(3),10)
      const newNumber=lastNumber+1;
      return `DEP${newNumber.toString().padStart(3, '0')}`;
      }

      const addRow=()=>{
        // const newDeptCode = newDeptCode1();
        // console.log("새코드",newDeptCode)
        // setNewRow({...newRow,deptCode:newDeptCode})
        // console.log("새코드",newRow)
        // setDeptList([...deptList, newRow]);
        // setShowTextFields(true);

        const newDeptCode = newDeptCode1();
        console.log("새코드", newDeptCode);
      
        // newRow를 복사한 다음 deptCode를 설정합니다.
        const updatedNewRow = { ...newRow, deptCode: newDeptCode };
      
        // setNewRow를 사용하여 복사본을 상태로 설정합니다.
        setNewRow(updatedNewRow);
      
        // 이제 업데이트된 newRow를 deptList에 추가합니다.
        setDeptList([...deptList, updatedNewRow]);
        // setShowTextFields(true);
      }

      const selectRow=(rowData:any)=>{
        setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
        console.log('선택한 행의 데이터:', rowData);
        console.log('선택한 행의 데이터2:', selRow);
      }


      const addData=()=>{
        const sendData1 =newRow;
        console.log("새로우",sendData1)
        if (sendData1.status === 'insert') {
          const sendData = JSON.stringify([sendData1]);
          console.log("타임", sendData);
          axios.put("http://localhost:9101/foudinfomgmt/deptlist", sendData, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            alert('등록완료');
            window.location.reload();
          })
          .catch((error) => {
            console.error("데이터를 백엔드로 보내는 중에 오류 발생: ", error);
          });
        }
      }

      const deleteData=()=>{
        if (selRow) {
          // 선택한 행의 데이터를 삭제하기 전에 status를 'delete'로 변경
          selRow.status = 'delete';
          console.log(`삭제할껀디`, selRow);
          const confirmDelete = window.confirm('삭제하시겠습니까?'); //따로선언할것 없이 window.confirm을 사용하면 확인,취소가 만들어짐.(true/false 반환)
          if(confirmDelete){
          // 선택한 행을 업데이트하고 나머지 행을 포함한 리스트로 업데이트
          const delData = deptList.filter((row: any) => row !== selRow);
          setDeptList(delData);
          const sendData=selRow
          axios.put("http://localhost:9101/foudinfomgmt/deptlist", [sendData], {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            alert('삭제완료');
            window.location.reload();
    
          })
          .catch((error) => {
            console.error("데이터를 백엔드로 보내는 중에 오류 발생: ", error);
          });
          // 선택한 행 초기화
          setSelRow(null);
    
    
        }}
      }

      const modifyData=()=>{
        if(selRow){
          selRow.status='update';
          const confirmDelete = window.confirm('수정하시겠습니까?'); //따로선언할것 없이 window.confirm을 사용하면 확인,취소가 만들어짐.(true/false 반환)
          if(selRow.status==='update'){
          if(confirmDelete){
            const updateList = { ...selRow };
            const sendData = updateList;
            console.log("수정",sendData)
          axios.put("http://localhost:9101/foudinfomgmt/deptlist", [sendData], {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            alert('수정완료');
            window.location.reload();
    
          })
          .catch((error) => {
            console.error("데이터를 백엔드로 보내는 중에 오류 발생: ", error);
          });
          // 선택한 행 초기화
          setSelRow(null);
    
    
        }}}
      }

      const handleCellChange = (event:any,index:any,field:any) => {
        const updatedData = [...deptList];
        updatedData[index][field] = event.target.value;
        setDeptList(updatedData);
      };

      return (
        <Page title="부서정보관리">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <MainCard
                content={false}
                title="부서정보관리"
                secondary={
                  <Stack direction="row" spacing={2} alignItems="center">
                    <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                    <Button variant="contained" color="primary" onClick={addRow}>추가</Button>
                    <Button variant="contained" color="primary" onClick={addData}>저장</Button>
                    <Button variant="contained" color="primary" onClick={deleteData}>삭제</Button>
                    <Button variant="contained" color="primary" onClick={modifyData}>수정</Button>
                  </Stack>
                }
              >
                <TableContainer>
                  <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow >
                        {deptListGrid.map((column: any) => (
                          <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth }}>
                            <div style={{fontWeight:'bold',textAlign:'center'}}>
                            {column.label}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                  {/* {deptList.map((row, index) => (
                   <TableRow>
                    <TableCell>{row.deptCode}</TableCell>
                    <TableCell>{row.deptName}</TableCell>
                    <TableCell>{row.deptTel}</TableCell>
                  </TableRow>
                      ))} */}
                      {deptList.map((row, index) => (
                      <TableRow onDoubleClick={() => selectRow(row)} key={index}
                      className={row === selRow ? 'selected' : ''} 
                      >
                      {selRow==row ?(
                        <>
                        <TableCell style={{textAlign:'center'}}>{row.deptCode}</TableCell>
                        <TableCell style={{textAlign:'center'}}>
                        <TextField value={row.deptName} onChange={()=>handleCellChange(event,index,'deptName')} />
                      </TableCell>
                      <TableCell style={{textAlign:'center'}}>
                        <TextField value={row.deptTel} onChange={()=>handleCellChange(event,index,'deptTel')} />
                      </TableCell>
                        </>
                    ) : (
                      <>
                    <TableCell style={{textAlign:'center'}} >{row.deptCode}</TableCell>
                    <TableCell style={{textAlign:'center'}}>{row.deptName}</TableCell>
                    <TableCell style={{textAlign:'center'}}>{row.deptTel}</TableCell>
                      </>
                    )}
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

DepartmentManageCopy.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DepartmentManageCopy;
