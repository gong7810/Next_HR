import { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import MySelect from 'components/hr/salary/organisms/MySelect';
import Layout from 'layout';
import Page from 'components/hr/Page';
import Axios from 'axios';
import MainCard from 'components/hr/MainCard';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import ColumnProps from '../types/types';
import { SalaryBonusTO } from '../types/types';
import MyTable from 'components/hr/salary/organisms/MyTable';

// ==============================|| TABLE - BASIC ||============================== //

//columns information
const columns: ColumnProps[] = [
  { id: 'empCode', label: '사원코드', minWidth: 100, align: 'center' },
  { id: 'empName', label: '사원명', minWidth: 100, align: 'center' },
  { id: 'deptCode', label: '부서', minWidth: 100, align: 'center' },
  { id: 'position', label: '직급', minWidth: 100, align: 'center' },
  { id: 'hobong', label: '호봉', minWidth: 100, align: 'center' },
  { id: 'grade', label: '등급', minWidth: 100, align: 'center' },
  { id: 'baseSalary', label: '기본급', minWidth: 100, align: 'center' },
  { id: 'benefit', label: '성과급', minWidth: 100, align: 'center' }
];

function TableBasic() {
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

  // 부서명 , 사원명 change될시
  const selectHandleChange = (e: any, NewValue: any) => {
    console.log('체인지!!!!!!!!!!!!!');
    console.log(e);
    const selectValue = NewValue.value;

    console.log('!!!!!!!!' + NewValue.value);

    console.log(selectDeptData);

    // 사원명
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

  // 사원명을 change했을 경우
  const selectSearchEmpChange = (e: any, NewValue: any) => {
    const selectCode = NewValue.value;

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
    });

    console.log(rowData);
  };

  return (
    <Page title="성과급조회">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} title="성과급조회">
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
              <MyTable columns={columns} rowData={rowData} />
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
}

TableBasic.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TableBasic;
