import { takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 락 창@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 타입@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//==========근태외 신청=============
export const INSERT_EXCUSED_ATTD_START = 'excusedattd/INSERT_EXCUSED_ATTD_START';
//==========근태외 조회=============
export const SEARCH_EXCUSED_ATTD_START = 'excusedattd/SEARCH_EXCUSED_ATTD_START';
//==========근태외 확정=============
export const UPDATE_EXCUSED_ATTD_START = 'excusedattd/UPDATE_EXCUSED_ATTD_START';

//==========연차신청 조회=============
export const SEARCH_BREAK_ATTD_START = 'excusedattd/SEARCH_BREAK_ATTD_START';
//==========연차신청 마감=============
export const UPDATE_BREAK_ATTD_START = 'excusedattd/UPDATE_BREAK_ATTD_START';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 생성 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
export const insertExcusedAttdStart = createAction(INSERT_EXCUSED_ATTD_START);
export const searchExcusedAttdStart = createAction(SEARCH_EXCUSED_ATTD_START);
export const updateExcusedAttdStart = createAction(UPDATE_EXCUSED_ATTD_START);

export const searchBreakAttdStart = createAction(SEARCH_BREAK_ATTD_START);
export const updateBreakAttdStart = createAction(UPDATE_BREAK_ATTD_START);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SAGA함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
const ExcusedAttdSaga = createRequestSaga(INSERT_EXCUSED_ATTD_START, api.excusedAttdUpdate);
const SearchExcusedAttdSaga = createRequestSaga(SEARCH_EXCUSED_ATTD_START, api.attdApprovalSearch);
const UpdateExcusedAttdSaga = createRequestSaga(UPDATE_EXCUSED_ATTD_START, api.attdApprovaUpdate);

const SearchBreakAttdSaga = createRequestSaga(SEARCH_BREAK_ATTD_START, api.breakSearch);
const UpdateBreakAttdSaga = createRequestSaga(UPDATE_BREAK_ATTD_START, api.breakUpdate);

export default function* ExcusedAttd() {
  yield takeLatest(INSERT_EXCUSED_ATTD_START, ExcusedAttdSaga);
  yield takeLatest(SEARCH_EXCUSED_ATTD_START, SearchExcusedAttdSaga);
  yield takeLatest(UPDATE_EXCUSED_ATTD_START, UpdateExcusedAttdSaga);

  yield takeLatest(SEARCH_BREAK_ATTD_START, SearchBreakAttdSaga);
  yield takeLatest(UPDATE_BREAK_ATTD_START, UpdateBreakAttdSaga);
}
