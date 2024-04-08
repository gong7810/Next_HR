import { ReactElement } from 'react';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Layout from 'layout';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import { gridSpacing } from 'store/constant';
import MySelect from 'components/hr/salary/organisms/MySelect';
//import { FullTimeSalaryEntity } from '../../../../types/hr/salary/types';
import ColumnProps from '../types/types';
import MyTable from 'components/hr/salary/organisms/MyTable';
import { TableContainer, Table, TableBody, TableCell, Stack, Select, MenuItem } from '@mui/material';
import MyTableHead from 'components/hr/salary/molecules/MyTableHead';
import Buttons from 'components/hr/salary/molecules/Buttons';
import { SalaryBonusTO } from '../types/types';
import { formatNumber } from 'utils/hr/lib';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';

// ==============================|| TABLE - BASIC ||============================== //

//columns information : 사원조회
const columnsSelect: ColumnProps[] = [
  { id: 'empCode', label: '사원코드', minWidth: 100, align: 'center' },
  { id: 'empName', label: '사원명', minWidth: 100, align: 'center' },
  { id: 'deptCode', label: '부서', minWidth: 100, align: 'center' },
  { id: 'position', label: '직급', minWidth: 100, align: 'center' },
  { id: 'hobong', label: '호봉', minWidth: 100, align: 'center' },
  { id: 'baseSalary', label: '기본급', minWidth: 100, align: 'center' },
  { id: 'grade', label: '등급', minWidth: 100, align: 'center' },
  { id: 'benefit', label: '성과급', minWidth: 100, align: 'center' }
];
//columns information : 사원조회
const columnsSave: ColumnProps[] = [
  { id: 'grade', label: '등급', minWidth: 100, align: 'center' },
  { id: 'benefit', label: '성과급', minWidth: 100, align: 'center' }
];

function TableBasic() {
  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 4) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        text: `접근권한이 없습니다.`
      });
    }
  }, []);

  // 부서 selector 띄우기
  useEffect(() => {
    Axios.get('http://localhost:9101/hr/foudinfomgmt/deptlist', {
      params: {
        token: localStorage.getItem('access')
      }
    })
      .then(({ data }) => {
        console.log(data);
        const dataList = data.list.map((e: any) => {
          return {
            label: e.deptName,
            value: e.deptCode
          };
        });
        setSelectDeptData({
          // dept: dataList
          ...selectDeptData,
          dept: [...selectDeptData.dept, ...dataList]
        });
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const [selectDeptData, setSelectDeptData] = useState({
    dept: [{ label: '부서 선택', value: 'ALL' }]
  });

  const [selectEmpData, setSelectEmpData] = useState({
    emp: [{ label: '사원 선택', value: 'ALL' }]
  });

  // const [selectDeptTitle, setSelectDeptTitle] = useState(selectDeptData.dept[0].value);
  // const [selectEmpCode, setSelectEmpCode] = useState(selectEmpData.emp[0].value);

  const [rowData, setRowData] = useState<SalaryBonusTO | any>({
    empCode: '',
    empName: '',
    deptCode: '',
    position: '',
    baseSalary: '',
    benefit: '',
    grade: '',
    hobong: ''
  });

  // 부서명 , 사원명 change될시-----------------------------------------------------
  const selectHandleChange = (e: any, NewValue: any) => {
    console.log('체인지!!!!!!!!!!!!!');
    console.log(e);
    const selectValue = NewValue.value;
    // setSelectDeptTitle(selectValue);
    console.log('!!!!!!!!' + NewValue.value);

    console.log(selectDeptData);

    // 사원명------------------------------------------------------------------------
    Axios.get('http://localhost:9101/hr/empinfomgmt/emplist', {
      params: {
        value: selectValue,
        authLevel: localStorage.getItem('authLevel'),
        token: localStorage.getItem('access')
      }
    })
      .then((response) => {
        console.log('response.data!!!!!!');
        console.log(response.data);
        console.log(response.data.list);
        const empList = response.data.list.map((e: any) => {
          return {
            label: e.empName,
            value: e.empCode
          };
        });

        setSelectEmpData({
          emp: empList
        });
      })
      .catch(() => {
        alert('해당부서에는 사원이 존재하지 않습니다');
        window.location.reload();
      });
  };

  // 사원명을 change했을 경우---------------------------------------------------
  const selectSearchEmpChange = (e: any, NewValue: any) => {
    const selectCode = NewValue.value;
    // setSelectEmpCode(selectCode);
    console.log(e);
    console.log('사원명~~~!!!');
    console.log(selectCode);

    // 사원별 성과급 조회
    Axios.get('http://localhost:9101/hr/salaryinfomgmt/awards', {
      params: {
        empName: selectCode,
        token: localStorage.getItem('access')
      }
    }).then((response) => {
      console.log('response ' + response.data);
      setRowData(response.data.List[0]);
      setBaseSalary(response.data.List[0].baseSalary);
    });

    console.log(rowData);
  };

  //수정 버튼 눌렀을 때 등급 등록하는 테이블 생성---------------------------
  const [updateValue, setUpdateValue] = useState(0);
  const update = () => {
    setUpdateValue(1);
    setRowData({
      empCode: rowData.empCode,
      empName: rowData.empName,
      deptCode: rowData.deptCode,
      position: rowData.position,
      baseSalary: rowData.baseSalary,
      hobong: rowData.hobong,
      benefit: '',
      grade: ''
    });
  };

  //성과급계산 버튼 눌렀을때 성과급이 계산되어 출력-----------------------

  // 기본급
  const [baseSalary, setBaseSalary] = useState<number | string | any>();
  // 고과 등급
  const [empEvalGrade, setEmpEvalGrade] = useState<string>('');
  // 성과금
  const [benefit, setBenefit] = useState<number | string>('0');

  const benefitCal = () => {
    // baseSalayCal();

    if (empEvalGrade === 'S') setBenefit(baseSalary * 3);
    else if (empEvalGrade === 'A') setBenefit(baseSalary * 2);
    else if (empEvalGrade === 'B') setBenefit(baseSalary);
    else if (empEvalGrade === 'C') setBenefit(baseSalary * 0);
  };

  //등록 버튼 눌렀을때 db에 데이터 보냄
  const updateBenefit = () => {
    setRowData({
      empCode: rowData.empCode,
      empName: rowData.empName,
      deptCode: rowData.deptCode,
      position: rowData.position,
      baseSalary: rowData.baseSalary,
      hobong: rowData.hobong,
      benefit: benefit,
      grade: empEvalGrade
    });
    //db에 보냄
    Axios.post(
      'http://localhost:9101/hr/salaryinfomgmt/salaryAward-manage',
      {
        empCode: rowData.empCode,
        grade: empEvalGrade
      },
      {
        params: {
          token: localStorage.getItem('access')
        }
      }
    )
      .then((response) => {
        alert('성과급 등록 완료');
        window.location.reload();
      })
      .catch(() => {
        alert('성과급 등록 실패');
        window.location.reload();
      });
  };

  //버튼생성
  interface MyButtonProps {
    variant: 'text' | 'contained' | 'outlined' | undefined;
    color: string;
    onClick: any;
    className: string;
    inputText: string;
  }

  const buttonsInfo: MyButtonProps[] = [
    {
      variant: 'contained',
      color: '#5F00FF',
      onClick: update,
      className: 'button',
      inputText: '수정'
    },
    {
      variant: 'contained',
      color: '#D1B2FF',
      onClick: benefitCal,
      className: 'button',
      inputText: '성과급계산'
    },
    {
      variant: 'contained',
      color: '#5F00FF',
      onClick: updateBenefit,
      className: 'button',
      inputText: '등록'
    }
  ];

  return (
    <Page title="성과급 등록">
      {authCheck ? (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard content={false} title="사원 조회">
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                    <Grid item>
                      <MySelect
                        deptName={selectDeptData.dept}
                        empName={selectEmpData.emp}
                        selectHandleChange={selectHandleChange}
                        selectSearchEmpChange={selectSearchEmpChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ margin: 2 }}>
                <MyTable columns={columnsSelect} rowData={rowData} />
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard content={false} title="성과급 등록">
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                    <Grid item>
                      <Buttons buttonsInfo={buttonsInfo} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ margin: 2 }}>
                {updateValue == 1 && (
                  <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                      <MyTableHead columns={columnsSave} />
                      <TableBody>
                        <TableCell>
                          <Stack>
                            <Select
                              onChange={(e: any) => {
                                setEmpEvalGrade(e.target.value);
                              }}
                            >
                              <MenuItem value={'S'}>S</MenuItem>
                              <MenuItem value={'A'}>A</MenuItem>
                              <MenuItem value={'B'}>B</MenuItem>
                              <MenuItem value={'C'}>C</MenuItem>
                            </Select>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{formatNumber(benefit)}</TableCell>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            </MainCard>
          </Grid>
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

TableBasic.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TableBasic;
