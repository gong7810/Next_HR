import moment from 'moment';

export const formatNumber = (params: number | string | null | undefined): any => {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  let num;
  if (params === undefined || params === null) {
    num = params; //원본 : num = number;
  } else if (typeof params === 'string') {
    num = parseInt(params)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } else if (typeof params === 'number') {
    num = params.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return num;
};
export const thisYear = () => {
  const thisYear = new Date().getFullYear();
  const beforeYear = new Date().getFullYear() - 1;
  let months = [];
  for (var j = beforeYear; j <= thisYear; j++) {
    if (j < thisYear) {
      for (var i = 1; i < 13; i++) {
        months.push({
          value: beforeYear + '-' + i,
          key: beforeYear + '년 ' + i + '월'
        });
      }
    }
    if (j === thisYear) {
      for (var i = 1; i < 13; i++) {
        months.push({
          value: thisYear + '-' + i,
          key: thisYear + '년 ' + i + '월'
        });
      }
    }
  }

  return months;
};

export const today = moment(new Date()).format('yyyy-MM-DD');
