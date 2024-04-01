import hrApi from '../intercepter';

const LOGIN_URL = 'login/login';
const TOKEN_AUTH_URL = 'login/token';

// 회원 확인 및 토큰 발행
export const getLoginToken = async (payload: any) => {
  const { id, pw } = payload;
  try {
    return await hrApi.get(LOGIN_URL, {
      params: {
        id,
        pw
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 토큰 확인
export const getTokenCheck = async (token: any) => {
  try {
    return await hrApi.get(TOKEN_AUTH_URL, {
      params: {
        token: 'klawjehnkawerfjnb'
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};
