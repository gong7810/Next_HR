import { call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  deleteHolidaySuccess,
  getHolidaySuccess,
  insertHolidaySuccess,
  requestDeletetHoliday,
  requestHoliday,
  requestInsertHoliday,
  requestUpdateHoliday,
  updateHolidaySuccess
} from 'store/slices/hr/base/holiday';
import { getHoliday, postHoliday } from 'store/api/base/index';
import { AxiosResponse } from 'axios';

// 휴일정보 조회
function* handleHoliday() {
  try {
    const { holidayList } = yield call(getHoliday);
    console.log('사가사가', holidayList);
    yield put(getHolidaySuccess({ holidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

// 휴일정보 추가
function* handleInsertHoliday(action: any) {
  const holidayList = action.payload;
  console.log('사가', holidayList);
  try {
    const newholidayList: AxiosResponse = yield call(postHoliday, [holidayList]);
    console.log('사가사가', newholidayList);
    yield put(insertHolidaySuccess({ newholidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

// 휴일정보 수정
function* handleUpdateHoliday(action: any) {
  const holidayList = action.payload;
  console.log('사가', holidayList);
  try {
    const newholidayList: AxiosResponse = yield call(postHoliday, [holidayList]);
    console.log('사가사가', newholidayList);
    yield put(updateHolidaySuccess({ newholidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

// 휴일정보 삭제
function* handleDeleteHoliday(action: any) {
  const updatedHolidayList = action.payload;
  console.log('사가', updatedHolidayList);
  try {
    const newholidayList: AxiosResponse = yield call(postHoliday, [updatedHolidayList]);
    console.log('삭제사가', newholidayList);
    yield put(deleteHolidaySuccess({ newholidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

function* watchGetHoliday() {
  yield takeLatest(requestHoliday, handleHoliday);
  yield takeLatest(requestInsertHoliday, handleInsertHoliday);
  yield takeLatest(requestUpdateHoliday, handleUpdateHoliday);
  yield takeLatest(requestDeletetHoliday, handleDeleteHoliday);
}

export default function* HolidaySaga() {
  yield fork(watchGetHoliday);
}
