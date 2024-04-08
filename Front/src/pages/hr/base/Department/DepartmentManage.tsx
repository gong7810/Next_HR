import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Grid, Table, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { ColumnProps, DepTO } from '../types/types';
import axios from 'axios';
import Swal from 'sweetalert2';

export const deptListGrid: ColumnProps[] = [
  // 칼럼정의
  {
    label: '부서코드', //label은 페이지에 뜨는 이름 id는 백이랑 연결되는 이름.
    id: 'deptCode'
  },
  {
    label: '부서명',
    id: 'deptName'
  },
  {
    label: '부서번호',
    id: 'deptTel'
  }
];

// ==============================|| TABLE - BASIC ||============================== //

function DepartmentManageCopy() {
  const [deptList, setDeptList] = useState<DepTO[]>([]);
  const [selRow, setSelRow] = useState(null);

  const [newRow, setNewRow] = useState<DepTO>({
    deptCode: '',
    deptName: '',
    deptTel: '',
    status: 'insert'
  });

  const [authCheck, setAuthCheck] = useState(false); // 추가수정삭제 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 2) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
    }
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:9101/hr/foudinfomgmt/deptlist', {
        params: {
          token: localStorage.getItem('access')
        }
      })
      .then(({ data }) => {
        console.log('포맷팅된 부서 목록: ', data);
        setDeptList(data.list);
        console.log('포맷팅된 휴일 목록: ', data.list);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 에러 발생: ', error);
      });
  }, []);

  const newDeptCode1 = () => {
    const lastDeptCode = deptList[deptList.length - 1].deptCode;
    const lastNumber = parseInt(lastDeptCode.slice(3), 10);
    const newNumber = lastNumber + 1;
    return `DEP${newNumber.toString().padStart(3, '0')}`;
  };

  const addRow = () => {
    if (authCheck) {
      const newDeptCode = newDeptCode1();
      console.log('새코드', newDeptCode);

      // newRow를 복사한 다음 deptCode를 설정합니다.
      const updatedNewRow = { ...newRow, deptCode: newDeptCode };

      // setNewRow를 사용하여 복사본을 상태로 설정합니다.
      setNewRow(updatedNewRow);

      // 이제 업데이트된 newRow를 deptList에 추가합니다.
      setDeptList([...deptList, updatedNewRow]);
      // setShowTextFields(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  const selectRow = (rowData: any) => {
    if (authCheck) {
      setSelRow(rowData); // 선택한 행의 데이터를 상태에 저장
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  const addData = () => {
    if (authCheck) {
      const sendData1 = newRow;
      console.log('새로운', sendData1);
      if (sendData1.status === 'insert') {
        // const sendData = JSON.stringify([sendData1]);
        const sendData = [sendData1];
        // console.log('타임', sendData);
        axios
          .put('http://localhost:9101/hr/foudinfomgmt/deptlist', sendData, {
            params: {
              token: localStorage.getItem('access')
            }
          })
          .then((response: any) => {
            alert('등록완료');
            window.location.reload();
          })
          .catch((error) => {
            console.error('데이터를 백엔드로 보내는 중에 오류 발생: ', error);
          });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  const deleteData = () => {
    if (authCheck) {
      if (selRow) {
        // 선택한 행의 데이터를 삭제하기 전에 status를 'delete'로 변경
        selRow.status = 'delete';
        console.log(`삭제할껀디`, selRow);
        const confirmDelete = window.confirm('삭제하시겠습니까?'); //따로선언할것 없이 window.confirm을 사용하면 확인,취소가 만들어짐.(true/false 반환)
        if (confirmDelete) {
          // 선택한 행을 업데이트하고 나머지 행을 포함한 리스트로 업데이트
          const delData = deptList.filter((row: any) => row !== selRow);
          setDeptList(delData);
          const sendData = [selRow];
          axios
            .put('http://localhost:9101/hr/foudinfomgmt/deptlist', sendData, {
              params: {
                token: localStorage.getItem('access')
              }
            })
            .then((response) => {
              alert('삭제완료');
              // window.location.reload();
            })
            .catch((error) => {
              console.error('데이터를 백엔드로 보내는 중에 오류 발생: ', error);
            });
          // 선택한 행 초기화
          setSelRow(null);
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  const modifyData = () => {
    if (authCheck) {
      if (selRow) {
        selRow.status = 'update';
        const confirmDelete = window.confirm('수정하시겠습니까?'); //따로선언할것 없이 window.confirm을 사용하면 확인,취소가 만들어짐.(true/false 반환)
        if (selRow.status === 'update') {
          if (confirmDelete) {
            const updateList = { ...selRow };
            const sendData = [updateList];
            console.log('수정', sendData);
            axios
              .put('http://localhost:9101/hr/foudinfomgmt/deptlist', sendData, {
                params: {
                  token: localStorage.getItem('access')
                }
              })
              .then((response) => {
                alert('수정완료');
                window.location.reload();
              })
              .catch((error) => {
                console.error('데이터를 백엔드로 보내는 중에 오류 발생: ', error);
              });
            // 선택한 행 초기화
            setSelRow(null);
          }
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '권한이 없습니다.'
      });
    }
  };

  const handleCellChange = (event: any, index: any, field: any) => {
    const updatedData = [...deptList];
    updatedData[index][field] = event.target.value;
    setDeptList(updatedData);
  };

  return (
    <Page title="부서정보 관리">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard
            content={false}
            title="부서정보 관리"
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="contained" color="primary" onClick={addRow}>
                  추가
                </Button>
                <Button variant="contained" color="primary" onClick={addData}>
                  저장
                </Button>
                <Button variant="contained" color="primary" onClick={deleteData}>
                  삭제
                </Button>
                <Button variant="contained" color="primary" onClick={modifyData}>
                  수정
                </Button>
              </Stack>
            }
          >
            <TableContainer>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {deptListGrid.map((column: any) => (
                      <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth }}>
                        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{column.label}</div>
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
                  {deptList.map((row: any, index: any) => (
                    <TableRow onDoubleClick={() => selectRow(row)} key={index} className={row === selRow ? 'selected' : ''}>
                      {selRow == row ? (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>{row.deptCode}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField value={row.deptName} onChange={() => handleCellChange(event, index, 'deptName')} />
                          </TableCell>
                          <TableCell style={{ textAlign: 'center' }}>
                            <TextField value={row.deptTel} onChange={() => handleCellChange(event, index, 'deptTel')} />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell style={{ textAlign: 'center' }}>{row.deptCode}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.deptName}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{row.deptTel}</TableCell>
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
