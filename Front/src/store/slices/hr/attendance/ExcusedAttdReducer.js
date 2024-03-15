import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최락창@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// createRequestSaga.js를 거친다음에 
// action.type = loading/FINISH_LOADING
// action.payload = dayattd/SELECT_DAY_ATTD_START


//*********************************근태외 신청***************************/
export const INSERT_EXCUSED_ATTD_SUCCESS = 'excusedattd/INSERT_EXCUSED_ATTD_START_SUCCESS';
export const INSERT_EXCUSED_ATTD_FAILURE = 'excusedattd/INSERT_EXCUSED_ATTD_START_FAILURE';
//*********************************근태외 조회***************************/
export const SEARCH_EXCUSED_ATTD_SUCCESS = 'excusedattd/SEARCH_EXCUSED_ATTD_START_SUCCESS';
export const SEARCH_EXCUSED_ATTD_FAILURE = 'excusedattd/SEARCH_EXCUSED_ATTD_START_FAILURE';
//*********************************근태외 승인***************************/
export const UPDATE_EXCUSED_ATTD_SUCCESS = 'excusedattd/UPDATE_EXCUSED_ATTD_START_SUCCESS';
export const UPDATE_EXCUSED_ATTD_FAILURE = 'excusedattd/UPDATE_EXCUSED_ATTD_START_FAILURE';

//*********************************연차신청 조회***************************/
export const SEARCH_BREAK_ATTD_SUCCESS = 'excusedattd/SEARCH_BREAK_ATTD_START_SUCCESS';
export const SEARCH_BREAK_ATTD_FAILURE = 'excusedattd/SEARCH_BREAK_ATTD_START_FAILURE';
//*********************************연차신청 마감***************************/
export const UPDATE_BREAK_ATTD_SUCCESS = 'excusedattd/UPDATE_BREAK_ATTD_START_SUCCESS';
export const UPDATE_BREAK_ATTD_FAILURE = 'excusedattd/UPDATE_BREAK_ATTD_START_FAILURE';


const initialState = {
    restAttdList: [],
    errorMsg: '',
    errorCode: '',
};

const excusedAttd = (state = initialState, action) => {

    console.log("익스커즈드 액션 페이로드");
    console.log(action.payload);
    console.log("익스커즈드 액션 타입");
    console.log(action.type);
    switch (action.type) {
        case INSERT_EXCUSED_ATTD_SUCCESS:
            return {
                ...state,
                restAttdList: []
            };
        case INSERT_EXCUSED_ATTD_FAILURE:
            return {
                ...state
            };
        case SEARCH_EXCUSED_ATTD_SUCCESS:
            return {
                ...state,
                restAttdList: action.payload.restAttdList
            };        
        case SEARCH_EXCUSED_ATTD_FAILURE:
            return {
                ...state
            };
        case UPDATE_EXCUSED_ATTD_SUCCESS:
            return {
                restAttdList: []
            };        
        case UPDATE_EXCUSED_ATTD_FAILURE:
            return {
                ...state
            };
        case SEARCH_BREAK_ATTD_SUCCESS:
            return {
                ...state,
                restAttdList: action.payload.annualVacationMgtList
            };        
        case SEARCH_BREAK_ATTD_FAILURE:
            return {
                ...state
            };
        case UPDATE_BREAK_ATTD_SUCCESS:
            return {
                ...state,
                // restAttdList: []
            };        
        case UPDATE_BREAK_ATTD_FAILURE:
            return {
                ...state
            };
        default:
           return state;
            }
        };
       
export default excusedAttd;