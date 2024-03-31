import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
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
import { postHoliday, getHoliday } from 'store/api/base/index';

function* handleHoliday() {
  try {
    const { holidayList } = yield call(getHoliday);
    console.log('사가사가', holidayList);
    yield put(getHolidaySuccess({ holidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

function* handleUpdateHoliday(action: any) {
  const holidayList = action.payload;
  console.log('사가', holidayList);
  try {
    const newholidayList = yield call(postHoliday, [holidayList]);
    console.log('사가사가', newholidayList);
    yield put(updateHolidaySuccess({ newholidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

function* handleInsertHoliday(action: any) {
  const holidayList = action.payload;
  console.log('사가', holidayList);
  try {
    const newholidayList = yield call(postHoliday, [holidayList]);
    console.log('사가사가', newholidayList);
    yield put(insertHolidaySuccess({ newholidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

function* handleDeleteHoliday(action: any) {
  const updatedHolidayList = action.payload;
  console.log('사가', updatedHolidayList);
  try {
    const newholidayList = yield call(postHoliday, [updatedHolidayList]);
    console.log('삭제사가', newholidayList);
    yield put(deleteHolidaySuccess({ newholidayList }));
  } catch (error) {
    console.log('쉬발');
  }
}

function* watchGetHoliday() {
  yield takeLatest(requestHoliday, handleHoliday);
  yield takeLatest(requestUpdateHoliday, handleUpdateHoliday);
  yield takeLatest(requestInsertHoliday, handleInsertHoliday);
  yield takeLatest(requestDeletetHoliday, handleDeleteHoliday);
}

export default function* HolidaySaga() {
  yield fork(watchGetHoliday);
}
