import hrApi from '../intercepter';

const AUTHLIST_URL = 'base/authLevel';
const DETAIL_CODE_URL = 'base/detailCode';

// 권한 조회
export const getAuthList = async () => {
  try {
    return await hrApi.get(AUTHLIST_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 코드 조회
export const getCodeList = async () => {
  try {
    return await hrApi.get(DETAIL_CODE_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};
