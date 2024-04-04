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

  useEffect(() => {
    dispatch(REQUEST_BASE_SALARY());

    if (status == true) {
      if (state.baseSalary.isDone == true) setRowData([...state.baseSalary.baseSalaryList]);
      else alert(state.baseSalary.error);
    }
  }, [status]);

  return (
    <Page title="급여기준관리">
      <MainCard content={false} title="급여기준관리">
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
