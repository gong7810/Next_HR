import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Paper from '@mui/material/Paper';

import MySocialInsureTable from 'components/hr/salary/organisms/MySocialInsureTable';

// ===========================================================

interface MySocialInsureProps {
  insureName: string;
  //dataTest: Row[];
  columns: string[];
  values: string[];
}

const MySocialInsure = ({ insureName, columns, values }: MySocialInsureProps) => {
  return (
    <MainCard content={false} title={insureName}>
      <MySocialInsureTable component={Paper} insureName={insureName} align="center" columns={columns} values={values} />
      {/* <MySocialInsureTable component={Paper} insureName={insureName} align="center" rowData={dataTest} columns={columns} values={values} /> */}
    </MainCard>
  );
};

export default MySocialInsure;
