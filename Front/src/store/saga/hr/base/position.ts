

import { call, fork, put, takeEvery, takeLatest } from "redux-saga/effects"
import {  getPositionSuccess, getPosition1, deletePosition1, deletePositionSuccess } from "store/slices/hr/base/position";
import {getPosition,deletePosition} from 'store/api/base/index'




function* handlePosition() {
    try {
        const { positionList } = yield call(getPosition);
        console.log("사가사가",positionList)
        yield put(getPositionSuccess({positionList}));

    } catch (error) {
       console.log("쉬발")
    }
}

function* handleDeletePosition(action:any) {
    const positionList = action.payload;
    console.log(positionList);
    try {
        const { newpositionList } = yield call(deletePosition,positionList);
        console.log("사가사가",newpositionList)
        yield put(deletePositionSuccess({newpositionList}));

    } catch (error) {
       console.log("쉬발")
    }
}

function* watchGetPosition() {
    yield takeLatest(getPosition1, handlePosition);
    yield takeLatest(deletePosition1,handleDeletePosition);
}

export default function* positionSaga(){
    yield fork(watchGetPosition);
};


