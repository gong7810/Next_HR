import hrApi from '../intercepter';

const EMPLIST_URL = 'empinfomgmt/empreallist';
const REST_ATTD_URL = 'attendance/restAttd';
const BREAK_ATTD_URL = 'attendance/breakAttd';

// 사원 조회
export const getEmplist = async () => {
  try {
    return await hrApi.get(EMPLIST_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 승인관리 조회
export const getRestAttdList = async (params: any) => {
  try {
    return await hrApi.get(REST_ATTD_URL, {
      params: {
        deptCode: params.deptCode,
        startDate: params.startDate,
        endDate: params.endDate,
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 신청
export const insertRestAttd = async (body: any) => {
  try {
    return await hrApi.post(REST_ATTD_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 승인/취소
export const updateRestAttd = async (body: any) => {
  try {
    console.log(body);
    return await hrApi.put(
      REST_ATTD_URL,
      { data: body },
      {
        params: {
          token: localStorage.getItem('access')
        }
      }
    ); // map 형식으로
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 삭제
export const deleteRestAttd = async (body: any) => {
  try {
    return await hrApi.delete(REST_ATTD_URL, {
      data: body,
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 내역 조회
export const getBreakAttdList = async (param: string) => {
  try {
    return await hrApi.get(BREAK_ATTD_URL, {
      params: {
        selectMonth: param,
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 신청
export const insertBreaKAttd = async (body: any) => {
  try {
    return await hrApi.post(BREAK_ATTD_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 승인 / 반려 / 취소
export const updateBreakAttd = async (body: any) => {
  try {
    return await hrApi.put(
      BREAK_ATTD_URL,
      { data: body },
      {
        params: {
          token: localStorage.getItem('access')
        }
      }
    ); // map 형식으로
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 삭제
export const deleteBreakAttd = async (body: any) => {
  try {
    return await hrApi.delete(BREAK_ATTD_URL, {
      data: body,
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

//일근태등록
export const registerDailyAttend = async (body: any) => {
  try {
    return await hrApi.post('attdmgmt/daily-attnd', body);
  } catch (error: any) {
    console.log(error);
  }
};

//일근태조회
export const searchDailyAttend = async (body: any) => {
  try {
      return await hrApi.post('attdmgmt/searchDailyAttnd', { data: body });
    } catch (error: any) {
      console.log(error);
    }
  };
<<<<<<< HEAD
  
=======

  let response;
  try {
    response = await fetch(url, obj);
  } catch (err) {
    console.log('Error occurred during fetch:', err);
    return { dayAttdlist: [], errorMsg: 'failed', errorCode: 0 };
  }

  if (!response.ok) {
    console.log('Network response was not ok: ' + response.status);
    return { dayAttdlist: [], errorMsg: 'failed', errorCode: 0 };
  }

  try {
    const data = await response.json();
    console.log('data form api is : ', data.list);
    return { dayAttdlist: data.list, errorMsg: 'succeeded', errorCode: 1 };
  } catch (err) {
    console.log('error from api.getEmpList  : ');
    return { dayAttdlist: [], errorMsg: 'failed', errorCode: 0 }; // 에러가 나면은 빈배열을 반환해서 사원정보 페이지에서 사용할수 있게한다.
  }
};
>>>>>>> f7ca05a4beacfd05ef0595890ddc2b2a373dd943

//일근태 수정
export const modifyDailyAttend = async (body: any) => {
  try {
      return await hrApi.put('attdmgmt/updateDailyAttd', body);
    } catch (error: any) {
      console.log(error);
    }
  };

//일근태 추가할 때 사용자가 입력한 사원명과 부서코드를 이용해 사원코드 얻어오기
<<<<<<< HEAD
export const fetchEmpList = async (param: string) => {
  try {
   return await hrApi.get('empinfomgmt/emplist', {
     params: {
       value : param
     }
   });
 } catch (error: any) {
   console.log(error);
 }
=======
const fetchEmpList = async (data: any) => {
  console.log('data.payload at api', data.payload); // payload로 값을 받을수 있다.
  const url = 'http://localhost:9101/hr/empinfomgmt/emplist?value=' + data.payload;
  const obj = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  let response;
  try {
    response = await fetch(url, obj);
  } catch (err) {
    console.log('Error occurred during fetch:', err);
    return { empList: [], errorMsg: 'failed', errorCode: 0 };
  }

  if (!response.ok) {
    console.log('Network response was not ok: ' + response.status);
    return { empList: [], errorMsg: 'failed', errorCode: 0 };
  }

  try {
    const data = await response.json();
    console.log('data form api is : ', data.list);
    return { empList: data.list, errorMsg: 'succeeded', errorCode: 1 };
  } catch (err) {
    console.log('error from api.getEmpList  : ');
    return { empList: [], errorMsg: 'failed', errorCode: 0 }; // 에러가 나면은 빈배열을 반환해서 사원정보 페이지에서 사용할수 있게한다.
  }
>>>>>>> f7ca05a4beacfd05ef0595890ddc2b2a373dd943
};


//일근태 마감
export const finalizeDailyAttend = async (body: any) => {
  try {
      return await hrApi.put('attdmgmt/finalizeDailyAttd', body);
    } catch (error: any) {
      console.log(error);
    }
};

<<<<<<< HEAD

=======
export { registerDailyAttend, searchDailyAttend, modifyDailyAttend, fetchEmpList, finalizeDailyAttend };
>>>>>>> f7ca05a4beacfd05ef0595890ddc2b2a373dd943
