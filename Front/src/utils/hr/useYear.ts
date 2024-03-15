import { useState, useEffect } from 'react';

export default function useYear() {
  interface Years {
    value: string;
    label: string;
  }

  const [selectedyear, setselectedyear] = useState<Years | any>([
    {
      value: '',
      label: ''
    }
  ]);

  const thisYear = new Date().getFullYear();
  const lastYear = new Date().getFullYear() - 1;

  let years: any = [];

  useEffect(() => {
    years.push({
      value: thisYear,
      label: thisYear + '년 '
    });

    years.push({
      value: lastYear,
      label: lastYear + '년 '
    });

    setselectedyear(years);
  }, []);

  return { selectedyear };
}
