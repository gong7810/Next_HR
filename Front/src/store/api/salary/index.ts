import axios from 'axios';

export const baseSalarySearch = async () => {
  try {
    let response = await axios.get('http://localhost:9101/hr/salarystdinfomgmt/base-salary', {
      params: {
        token: localStorage.getItem('access')
      }
    });
    return response;
  } catch (e) {
    return e;
  }
};

//axios.get('/salaryinfomgmt/salary');

// export const baseSalaryUpdate = (action) =>
//   axios.post('/salarystdinfomgmt/base-salary', { sendData: action.payload }, { headers: { 'Content-Type': 'application/json' } });
//=====급여조회 => 월별급여조회=====
// export const searchMonthSalary = () => {
//   return axios.get('/salaryinfomgmt/salary/list');
// };

//============월급여 마감==============
// export const salaryListSaga =
// (action) =>
// axios({
//   method: "get",
//   url: "/salaryinfomgmt/salary/empcode",
//   params: {
//     empCode: action.payload.emp,
//     applyYearMonth: action.payload.date,
//   },
// });

// export const closeSalary = (action) =>
//   axios({
//     headers: { 'Content-Type': 'application/json' },
//     method: 'post',
//     url: '/salaryinfomgmt/salary/empcode',
//     data: {
//       empcode1: action.payload.empcode1
//     }
//   });

// export const salaryAwardUpdate = (action) =>
//   axios.post(
//     'http://localhost:9101/salaryinfomgmt/salaryAward-manage',
//     {},
//     {
//       params: {
//         empCode: action.payload.empCode
//       }
//     }
//   );
