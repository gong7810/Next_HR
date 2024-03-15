

// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';

// types
import { DefaultRootStateProps } from 'types';
import { ProductsFilter, Address } from 'types/e-commerce';
import { boolean } from 'yup';
import { call, put } from 'redux-saga/effects';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['Position'] = {
  error: null,
  positionList:[],
  isLoading:false,
  isDone:false,

};

const slice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    getPosition1(state){
      state.isLoading=true;
    },

    // GET POSITION
    getPositionSuccess(state, action) {
      state.isLoading=false;
      state.positionList = action.payload;
      state.isDone=true;
    },

    getPositionFailure(state) {
      state.isLoading=false;
      state.error="직급정보 조회 실패"
  },

  deletePosition1(state){
    state.isLoading=true;
  },
    deletePositionSuccess(state,action){
      state.isLoading=false;
        state.positionList=action.payload
        console.log("삭삭제",state.positionList)
        state.isDone=true;
        if(state.isDone=true){
          alert("삭제완료")
          window.location.reload();
      }
    },

    deletePositionFailure(state){
      state.isLoading=false;
      state.error="직급정보 삭제 실패"
    }
  }
});

// Reducer
export default slice.reducer;
export const {deletePosition1,deletePositionSuccess,deletePositionFailure,getPosition1,getPositionFailure,hasError,getPositionSuccess}=slice.actions;
// ----------------------------------------------------------------------


// export async function deletePosition(updatedSelRow1: string) {
//   console.log("뭐가나오나332",updatedSelRow1)
//   const sendData=[updatedSelRow1]

//   let url='http://localhost:9101/foudinfomgmt/positionlist';
//   const response=await axios.put(url,sendData);

//   return response.data
// }

