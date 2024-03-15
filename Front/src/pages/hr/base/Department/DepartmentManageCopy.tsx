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
import { DataGrid } from '@mui/x-data-grid';


export const deptListGrid= [
  // 칼럼정의
  {
    headerName: "부서코드", //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    field: "deptCode",
    width: 500, headerAlign: 'center', align: 'center', headerCheckboxSelection: true, checkboxSelection: true 
 
  },
  {
    headerName: "부서명",
    field: "deptName",
    width: 500, headerAlign: 'center', align: 'center', headerCheckboxSelection: true, checkboxSelection: true ,editable:true
    
  },
  {
    headerName: "부서번호",
    field: "deptTel",
     width: 500, headerAlign: 'center', align: 'center', headerCheckboxSelection: true, checkboxSelection: true ,editable:true

  },  
]; 






// ==============================|| TABLE - BASIC ||============================== //

function DepartmentManage() {



    const [deptList, setDeptList] = useState<DepTO[]>([]);
    const [selRow,setSelRow]=useState([]);
    const [editRowId, setEditRowId] = useState(null);



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
            const updatedRows = data.list.map((item:any, index:any) => {
              return { ...item, id: index }; // 각 항목에 고유한 id 추가
            });
            setDeptList(updatedRows);
            console.log('업데이트된 행:', updatedRows);
            console.log("포맷팅된 휴일 목록: ", data.list);
          })
          .catch((error) => {
            console.error("데이터를 불러오는 중 에러 발생: ", error);
          });
      }, []);

      // useEffect(() => {
      //   console.log("newRow1", newRow);
      // }, [newRow]);
      
      const newDeptCode1=()=>{
      const lastDeptCode=deptList[deptList.length -1].deptCode;
      const lastNumber=parseInt(lastDeptCode.slice(3),10)
      const newNumber=lastNumber+1;
      return `DEP${newNumber.toString().padStart(3, '0')}`;
      }

      const addRow = () => {
        const newDeptCode = newDeptCode1();
        const newId = deptList.length;
        const updatedNewRow = { ...newRow, deptCode: newDeptCode, id: newId };
    
        // newRow 상태 업데이트
        setNewRow(updatedNewRow);
      }
    
      // newRow 상태가 업데이트될 때 실행할 동작
      useEffect(() => {
        console.log("newRow", newRow); // 업데이트된 newRow 확인
    
        // 이제 newRow가 업데이트되었으므로, updatedNewRow를 deptList에 추가합니다
        setDeptList((prevDeptList) => [...prevDeptList, newRow]);
      }, [newRow]
      );

      useEffect(() => {
        console.log("deptList updated:", deptList);
      }, [deptList]);
      console.log("dept",deptList);
    


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
          console.log(selRow)
          selRow[0].status = 'delete';
          console.log(`삭제할껀디`, selRow[0]);
          const confirmDelete = window.confirm('삭제하시겠습니까?'); //따로선언할것 없이 window.confirm을 사용하면 확인,취소가 만들어짐.(true/false 반환)
          if(confirmDelete){
          // 선택한 행을 업데이트하고 나머지 행을 포함한 리스트로 업데이트
          const delData = deptList.filter((row: any) => row !== selRow);
          setDeptList(delData);
          const sendData=selRow
          axios.put("http://localhost:9101/foudinfomgmt/deptlist", sendData, {
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

      const modifyData=(newModify:any)=>{
        if(selRow){
          console.log(selRow)
          selRow.status = 'update';
          console.log(`삭제할껀디`, selRow[0]);
          const confirmDelete = window.confirm('수정하시겠습니까?'); //따로선언할것 없이 window.confirm을 사용하면 확인,취소가 만들어짐.(true/false 반환)
          if(selRow.status==='update'){
          if(confirmDelete){
            const updateList = { ...selRow};
            console.log(`updateList`, updateList);
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


      const inputValue=(e)=>{
        console.log("e",e)
        if (e.field === 'deptName' || e.field === 'deptTel') {
          // field가 'deptName' 또는 'deptTel' 경우에만 처리합니다.
          const updatedData = [...deptList];
          updatedData[e.id][e.field] = e.props.value;
          // updatedData[e.id].status='update';

          console.log("deptList[e.id]",deptList[e.id])
          const newModify=deptList[e.id]
          setSelRow(newModify);

          setDeptList(updatedData);
          console.log("deptList",deptList)
          // setSelRow(e.id)
        }
        }

        const onSelectionModelChange = (ids) => {
          // ids에 선택한 행의 ID 배열이 전달됩니다.
          const selectedRows = deptList.filter((row) => ids.includes(row.id));
          setSelRow(selectedRows);
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
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                  rows={deptList}
                  columns={deptListGrid}
                       pageSize={10}
                  checkboxSelection
                  onEditCellPropsChange={inputValue}
                  onSelectionModelChange={onSelectionModelChange}

                />
            </div>
              </MainCard>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Page>
  );
}

DepartmentManage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DepartmentManage;