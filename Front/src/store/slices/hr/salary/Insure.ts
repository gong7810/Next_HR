import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
//import { dispatch } from 'store';
import { dispatch } from '../../../index';
// ----------------------------------------------------------------------

type StateType = {
  insureList: [];
};

const initialState: StateType = {
  insureList: []
};

const Insure = createSlice({
  name: 'Insure',
  initialState,
  reducers: {
    // INSURE_LIST_REQUEST
    INSURE_LIST_REQUEST(state, action) {
      state.insureList = action.payload;
    }
  }
});

//reducer export
export default Insure.reducer;

//action export
export const { INSURE_LIST_REQUEST } = Insure.actions;

// ----------------------------------------------------------------------

export function searchInsure(searchYear: string) {
  return async () => {
    try {
      const response = await axios.get('http://localhost:9101/salarystdinfomgmt/social', { params: { searchYear } });
      dispatch(Insure.actions.INSURE_LIST_REQUEST(response.data.baseInsureList));
    } catch (error) {
      alert(error);
    }
  };
}
