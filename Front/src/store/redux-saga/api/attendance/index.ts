import hrApi from '../intercepter';

const EMPLIST_URL = 'empinfomgmt/empreallist';
const REST_ATTD_URL = 'attendance/restAttd';
const BREAK_ATTD_URL = 'attendance/breakAttd';

// 사원 조회
export const getEmplist = async () => {
  try {
    return await hrApi.get(EMPLIST_URL);
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 관리 조회
export const getRestAttdList = async (params: any) => {
  try {
    return await hrApi.get(REST_ATTD_URL, {
      params: {
        deptCode: params.deptCode,
        startDate: params.startDate,
        endDate: params.endDate
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 신청
export const insertRestAttd = async (body: any) => {
  try {
    return await hrApi.post(REST_ATTD_URL, body);
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 승인/취소
export const updateRestAttd = async (body: any) => {
  try {
    console.log(body);
    return await hrApi.put(REST_ATTD_URL, { data: body }); // map 형식으로
  } catch (error: any) {
    console.log(error);
  }
};

// 근태외 삭제
export const deleteRestAttd = async (body: any) => {
  try {
    return await hrApi.delete(REST_ATTD_URL, { data: body });
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 내역 조회
export const getBreakAttdList = async (param: string) => {
  try {
    return await hrApi.get(BREAK_ATTD_URL, {
      params: {
        selectMonth: param
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 신청
export const insertBreaKAttd = async (body: any) => {
  try {
    return await hrApi.post(BREAK_ATTD_URL, body);
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 승인 / 반려 / 취소
export const updateBreakAttd = async (body: any) => {
  try {
    return await hrApi.put(BREAK_ATTD_URL, { data: body }); // map 형식으로
  } catch (error: any) {
    console.log(error);
  }
};

// 연차 삭제
export const deleteBreakAttd = async (body: any) => {
  try {
    return await hrApi.delete(BREAK_ATTD_URL, { data: body });
  } catch (error: any) {
    console.log(error);
  }
};
