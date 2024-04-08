import hrApi from '../intercepter';

const DEPTLIST_URL = 'foudinfomgmt/deptlist';
const EMPLIST_URL = 'empinfomgmt/emplist';
const SEVERANCE_PAY_URL = 'salary/severance';

// 부서 조회
export const getDeptList = async () => {
  try {
    return await hrApi.get(DEPTLIST_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 사원 조회
export const getEmpList = async (deptCode: string) => {
  try {
    return await hrApi.get(EMPLIST_URL, {
      params: {
        value: deptCode,
        authLevel: localStorage.getItem('authLevel'),
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 퇴직금 조회
export const getSeverancePayList = async (empCode: string) => {
  try {
    return await hrApi.get(SEVERANCE_PAY_URL, {
      params: {
        empCode,
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 퇴직금 삭제
export const deleteSeverancePay = async (body: any) => {
  try {
    return await hrApi.delete(SEVERANCE_PAY_URL, {
      data: body,
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 퇴직금 등록
export const insertSeverancePay = async (body: any) => {
  try {
    return await hrApi.post(SEVERANCE_PAY_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};
