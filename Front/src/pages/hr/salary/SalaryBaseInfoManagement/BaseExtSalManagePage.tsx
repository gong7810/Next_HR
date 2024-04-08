import React, { ReactElement, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import Axios from 'axios';
import ColumnProps from '../types/types';
import { BaseExtSalTO } from '../types/types';
import MyMgtTable from 'components/hr/salary/organisms/MyMgtTable';
import { Grid } from '@mui/material';

// ==============================|| TABLE - STICKY HEADER ||============================== //

//columns information
const columns: ColumnProps[] = [
  { id: 'extSalCode', label: '초과수당 코드', minWidth: 100, align: 'center' },
  { id: 'extSalName', label: '초과수당명', minWidth: 100, align: 'center' },
  { id: 'ratio', label: '초과수당 배수', minWidth: 100, align: 'center', editable: true }
];

function StickyHeadTable() {
  useEffect(() => {
    Axios.get('http://localhost:9101/hr/salarystdinfomgmt/over-sal', {
      params: {
        token: localStorage.getItem('access')
      }
    })
      .then((response) => {
        setRowData(response.data.baseExtSalList);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const [rowData, setRowData] = useState<BaseExtSalTO[]>([]);

  return (
    <Page title="초과수당 관리">
      <MainCard content={false} title="초과수당 관리">
        <Grid sx={{ margin: 2 }}>
          <MyMgtTable columns={columns} rowData={rowData} />
        </Grid>
      </MainCard>
    </Page>
  );
}

StickyHeadTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default StickyHeadTable;
