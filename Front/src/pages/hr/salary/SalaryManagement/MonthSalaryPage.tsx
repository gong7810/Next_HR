import { ReactElement } from 'react';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Layout from 'layout';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import { gridSpacing } from 'store/constant';
import MySelect from 'components/hr/salary/organisms/MySelect';
import { FullTimeSalaryEntity } from '../types/types';
import ColumnProps from '../types/types';
import MyTable from 'components/hr/salary/organisms/MyTable';

// ==============================|| TABLE - BASIC ||============================== //

//columns information
const columns: ColumnProps[] = [
  { id: 'empCode', label: '사원번호', minWidth: 100, align: 'center' },
  { id: 'basicSalary', label: '기본급', minWidth: 100, align: 'center' },
  { id: 'positionSalary', label: '직책수당', minWidth: 100, align: 'center' },
  { id: 'familySalary', label: '가족수당', minWidth: 100, align: 'center' },
  { id: 'mealSalary', label: '식대', minWidth: 100, align: 'center' },
  { id: 'benefit', label: '성과급', minWidth: 100, align: 'center' },
  { id: 'totalExtSal', label: '수당 합계', minWidth: 100, align: 'center' },
  { id: 'totalDeduction', label: '공제액 합계', minWidth: 100, align: 'center' },
  { id: 'realSalary', label: '실지급액', minWidth: 100, align: 'center' }
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

  const [rowData, setRowData] = useState<FullTimeSalaryEntity[]>([]);

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
    console.log('사원코드~~~!!!' + selectCode);
    console.log(selectCode);

    // 실수령액 조회
    Axios.get('http://localhost:9101/hr/salaryinfomgmt/salary/empcode', {
      params: {
        empName: selectCode,
        token: localStorage.getItem('access')
      }
    }).then((response) => {
      console.log('response ' + response);
      console.log('response ' + response.data);
      console.log('response ' + response.data.fullTimeSalaryList[0]);
      console.log('response ' + response.data.fullTimeSalaryList[0].empCode);

      setRowData(response.data.fullTimeSalaryList[0]);
    });

    console.log('rowData' + rowData);
  };

  return (
    <Page title="급여조회">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} title="급여조회">
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
