import { ReactElement } from 'react';
import { Grid, TableBody, TableContainer, Table } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Layout from 'layout';
import Page from 'components/hr/Page';
import MainCard from 'components/hr/MainCard';
import { gridSpacing } from 'store/constant';
import MySelect from 'components/hr/salary/organisms/MySelect';
import { FullTimeSalaryEntity } from '../types/types';
import ColumnProps from '../types/types';
import { Button, CardContent, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SubCard from 'ui-component/cards/SubCard';
import MyButton from 'components/hr/salary/atoms/MyButton';
import GridItem from 'components/Grid/GridItem';
import BoardList from './BoardList';
import Buttons from 'components/hr/salary/molecules/Buttons';

// assets
// import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
// import ContentCutTwoToneIcon from '@mui/icons-material/ContentCutTwoTone';
// import LinkIcon from '@mui/icons-material/Link';

// ==============================|| TABLE - BASIC ||============================== //

//columns information
const columns: ColumnProps[] = [
  { id: 'number', label: '', minWidth: 100, align: 'center', editable: true },
  { id: 'title', label: '제목', minWidth: 100, align: 'center', editable: true },
  { id: 'name', label: '작성자', minWidth: 100, align: 'center', editable: true },
  { id: 'date', label: '작성일', minWidth: 100, align: 'center', editable: true },
  { id: 'file', label: '첨부파일', minWidth: 100, align: 'center', editable: true }
];

function BoardWrite() {
  // 부서 selector 띄우기
  useEffect(() => {
    Axios.get('http://localhost:9101/foudinfomgmt/deptlist')
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

  const [selectDeptTitle, setSelectDeptTitle] = useState(selectDeptData.dept[0].value);

  const [selectEmpCode, setSelectEmpCode] = useState(selectEmpData.emp[0].value);

  const [rowData, setRowData] = useState<FullTimeSalaryEntity[]>([]);

  // 부서명 , 사원명 change될시
  const selectHandleChange = (e: any, NewValue: any) => {
    console.log('체인지!!!!!!!!!!!!!');
    console.log(e);
    const selectValue = NewValue.value;
    setSelectDeptTitle(selectValue);
    console.log('!!!!!!!!' + NewValue.value);

    console.log(selectDeptData);

    // 사원명
    Axios.get('http://localhost:9101/empinfomgmt/emplist', {
      params: {
        value: selectValue
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
    setSelectEmpCode(selectCode);
    console.log(e);
    console.log('사원코드~~~!!!' + selectCode);
    console.log(selectCode);

    // 실수령액 조회
    Axios.get('http://localhost:9101/salaryinfomgmt/salary/empcode', {
      params: {
        empName: selectCode
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
  const clickEvent = () => {
    setPageValue(1);
  };

  const [pageValue, setPageValue] = useState(0);

  return (
    <>
      {pageValue == 0 && (
        <MainCard
          content={false}
          title="자료실 글쓰기"
          secondary={
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                <MyButton variant="contained" color="#D1B2FF" onClick={clickEvent} className="button" inputText="목록" />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                <MyButton variant="contained" color="#5F00FF" onClick={0} className="button" inputText="저장" />
              </Grid>
            </Grid>
          }
        >
          <Grid item xs={12}>
            <SubCard title="제목">
              <TextField
                multiline
                rows={1}
                fullWidth
                label="제목을 입력하세요"
                // onChange={(e) => setText2(e.target.value)}
                // value={text2}
                sx={{ mb: gridSpacing }}
              />
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            <SubCard title="내용">
              <TextField
                multiline
                rows={6}
                fullWidth
                label="내용을 입력하세요"
                // onChange={(e) => setText2(e.target.value)}
                sx={{ mb: gridSpacing }}
              />
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            <SubCard title="첨부파일">
              <TextField
                multiline
                rows={1}
                fullWidth
                label="첨부파일 추가 "
                // onChange={0=0}
                sx={{ mb: gridSpacing }}
              />
            </SubCard>
          </Grid>
        </MainCard>
      )}
      {pageValue == 1 && <BoardList />}
    </>
  );
}

export default BoardWrite;
