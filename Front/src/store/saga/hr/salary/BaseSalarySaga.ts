/*eslint-disable */

import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import * as api from '../../../api/salary/index';
import {
  BASE_SALARY_LIST_FAILURE,
  BASE_SALARY_LIST_SUCCESS,
  REQUEST_BASE_SALARY,
  // UPDATE_BASE_SALARY_FAILURE,
  // UPDATE_BASE_SALARY_SUCCESS
} from 'store/slices/hr/salary/BaseSalary';


//************************* 급여 기준 관리 시작 *************************

function* baseSalarySearch():any {
  try {
    const result = yield call(api.baseSalarySearch);
    yield put(BASE_SALARY_LIST_SUCCESS(result));
  } catch (error) {
    yield put(BASE_SALARY_LIST_FAILURE());
  }
}

function* BASE_SALARY_LIST() {
  yield takeEvery(REQUEST_BASE_SALARY, baseSalarySearch);
}


// 급여기준관리 수정 로직
// function* baseSalaryUpdate() {
//   try {
//     const { baseSalaryList } = yield call(api.baseSalaryUpdate, '파라미터');
//     yield put(UPDATE_BASE_SALARY_SUCCESS({ baseSalaryList }));
//   } catch (error) {
//     yield put(UPDATE_BASE_SALARY_FAILURE());
//   }
// }

// 급여기준관리 수정 로직
// function* UPDATE_BASE_SALARY() {
//   yield takeEvery(UPDATE_BASE_SALARY_REQUEST, baseSalaryUpdate);
// }

export default function* baseSalarySaga() {
  yield all([fork(BASE_SALARY_LIST)]);
}
