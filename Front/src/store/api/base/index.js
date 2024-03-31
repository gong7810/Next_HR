import axios from 'axios';

export const getBaseWorkTimeList = () => axios.get('http://localhost:9101/foudinfomgmt/basetime');

// export const deleteBaseWorkTime = (action) =>
//   axios.delete("http://localhost:8889/foudinfomgmt/react-basetime",
//     { sendData: action.payload},
//     { headers: { "Content-Type": "application/json" } },
//   );

export const batchBaseWorkTime = (action) =>
  axios.put(
    'http://localhost:9101/foudinfomgmt/react-basetime',
    { sendData: action.payload },
    { headers: { 'Content-Type': 'application/json' } }
  );

export const deleteBaseWorkTime = (action) =>
  axios.post(
    'http://localhost:9101/foudinfomgmt/react-deleteBasetime',
    { sendData: action.payload },
    { headers: { 'Content-Type': 'application/json' } }
  );

export const getHoliday = async () => {
  let url = 'http://localhost:9101/foudinfomgmt/holiday';
  const response = await axios.get(url);

  return response.data;
};

export const postHoliday = async (sendData) => {
  console.log('뒷단 보내기', sendData);

  const url = 'http://localhost:9101/foudinfomgmt/holiday';
  const response = await axios.post(url, sendData);

  console.log('포스트', response);
  console.log('포스트2', response.data);

  return response.data;
};

// export const holidaySearch = () =>
//   axios.get(
//     "http://localhost:9101/foudinfomgmt/holiday",
//   );

// export const holidayUpdate = (action) =>
//   axios.post(
//     "/base/holidayList.do",
//     { sendData: action.payload },
//     { headers: { "Content-Type": "application/json" } },
//   )

export const deptListManage = () => axios.get('http://localhost:9101/foudinfomgmt/deptlist');

export const deptListUpdate = (action) => {
  console.log('action');
  console.log(action);
  axios.post('/base/deptList.do', { sendData: action.payload }, { headers: { 'Content-Type': 'application/json' } });
};

export const deptMember = (action) => {
  console.log('deptMember:action');
  console.log(action);
  return axios.get('/affair/memberList', {
    params: {
      value: action.params.deptCode
    }
  });
};

export const getPosition = async (action) => {
  // console.log("getPosition",action)
  // return axios.get("http://localhost:9101/foudinfomgmt/positionlist");
  let url = 'http://localhost:9101/foudinfomgmt/positionlist';
  const response = await axios.get(url, action);

  return response.data;
};

export const deletePosition = async (updatedSelRow1) => {
  console.log('뭐가나오나332', updatedSelRow1);
  const sendData = [updatedSelRow1];

  let url = 'http://localhost:9101/foudinfomgmt/positionlist';
  const response = await axios.put(url, sendData);

  return response.data;
};
