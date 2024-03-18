import hrApi, { ApiResponse } from '../intercepter';

const EMPLIST_URL = 'empinfomgmt/empreallist';

export const getEmplist = async () => {
  try {
    const response: ApiResponse<string[]> = await hrApi.get(EMPLIST_URL);
    console.log('있니?', response.data);
    return response.data;
  } catch (error) {
    console.log('error');
  }
};
