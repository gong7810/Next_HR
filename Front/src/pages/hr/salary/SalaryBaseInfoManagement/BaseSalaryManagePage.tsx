/* eslint-disable */

import React, { ReactElement, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { BaseSalaryTO } from '../types/types';
import ColumnProps from '../types/types';
import MyMgtTable from 'components/hr/salary/organisms/MyMgtTable';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_BASE_SALARY } from 'store/slices/hr/salary/BaseSalary';
import { Grid } from '@mui/material';
import MyButton from 'components/hr/salary/atoms/MyButton';
import { gridSpacing } from 'store/constant';
import ClipLoader from 'react-spinners/ClipLoader';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Swal from 'sweetalert2';

// ==============================|| TABLE - STICKY HEADER ||============================== //

//columns information
const columns: ColumnProps[] = [
  { id: 'positionCode', label: '직급코드', minWidth: 100, align: 'center', editable: true },
  { id: 'position', label: '직급명', minWidth: 100, align: 'center', editable: true },
  { id: 'baseSalary', label: '기본급', minWidth: 100, align: 'center', editable: true },
  { id: 'hobongRatio', label: '호봉인상율', minWidth: 100, align: 'center', editable: true }
];

function StickyHeadTable() {
  let dispatch = useDispatch();
  let state: any = useSelector((state) => {
    return state;
  });

  const [rowData, setRowData] = useState<BaseSalaryTO[]>([]);
  const [status, setStatus] = useState(false);

  const [authCheck, setAuthCheck] = useState(false); // 페이지 접근 권한체크

  useEffect(() => {
    const level = localStorage.getItem('authLevel') as string;
    if (level && parseInt(level.slice(-1)) >= 2) {
      setAuthCheck(true);
    } else {
      setAuthCheck(false);
      Swal.fire({
        icon: 'error',
        text: `'대리'직급부터 열람이 가능합니다.`
      });
    }
  }, []);

  useEffect(() => {
    dispatch(REQUEST_BASE_SALARY());

    if (status == true) {
      if (state.baseSalary.isDone == true) setRowData([...state.baseSalary.baseSalaryList]);
      else alert(state.baseSalary.error);
    }
  }, [status]);

  return (
    <Page title="급여기준 관리">
      {authCheck ? (
        <MainCard content={false} title="급여기준 관리">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <MyButton
                    variant="contained"
                    color="#5F00FF"
                    onClick={() => {
                      setStatus(true);
                    }}
                    className="button"
                    inputText="조회하기"
                  />
                </Grid>
              </Grid>
              <Grid sx={{ margin: 2 }}>{status && state.baseSalary.isDone && <MyMgtTable columns={columns} rowData={rowData} />}</Grid>
            </Grid>
          </Grid>
        </MainCard>
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
      <Grid container justifyContent="center" alignItems="center">
        <ClipLoader color="red" loading={state.baseSalary.isLoading} size={150} aria-label="Loading Spinner" data-testid="loader" />
      </Grid>
    </Page>
  );
}

StickyHeadTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default StickyHeadTable;
