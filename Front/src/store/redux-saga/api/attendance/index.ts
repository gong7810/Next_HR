import hrApi from '../intercepter';

const EMPLIST_URL = 'empinfomgmt/empAllList';
const REST_ATTD_URL = 'attendance/restAttd';

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
        authLevel: localStorage.getItem('authLevel'),
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 등록
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
<<<<<<< HEAD
=======

// 연차 내역 조회
export const getBreakAttdList = async (param: string) => {
  try {
    return await hrApi.get(BREAK_ATTD_URL, {
      params: {
        selectMonth: param,
        authLevel: localStorage.getItem('authLevel'),
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

//일근태 등록
export const registerDailyAttend = async (body: any) => {
  try {
    return await hrApi.post('attdmgmt/daily-attnd', body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

//일근태 조회
export const searchDailyAttend = async (body: any) => {
  try {
    return await hrApi.post(
      'attdmgmt/searchDailyAttnd',
      { data: body },
      {
        params: {
          token: localStorage.getItem('access')
        }
      }
    );
  } catch (error: any) {
    console.log(error);
  }
};

//일근태 수정
export const modifyDailyAttend = async (body: any) => {
  try {
    return await hrApi.put('attdmgmt/updateDailyAttd', body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

//일근태 추가할 때 사용자가 입력한 사원명과 부서코드를 이용해 사원코드 얻어오기
export const fetchEmpList = async (param: string) => {
  try {
    return await hrApi.get('empinfomgmt/empAllList', {
      params: {
        value: param,
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

//일근태 마감
export const finalizeDailyAttend = async (body: any) => {
  try {
    return await hrApi.put('attdmgmt/finalizeDailyAttd', body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};
>>>>>>> develop/attd
