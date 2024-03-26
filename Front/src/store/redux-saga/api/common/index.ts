import hrApi from '../intercepter';

const LOGIN_URL = 'login/login';

// 회원 확인 및 토큰 발행
export const getLoginToken = async () => {
  try {
    return await hrApi.get(LOGIN_URL);
  } catch (error: any) {
    console.log(error);
  }
};
