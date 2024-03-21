// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import menuReducer from './slices/menu';
import InsureReducer from './slices/hr/salary/Insure';
import baseSalaryReducer from './slices/hr/salary/BaseSalary';
import positionReducer from './slices/hr/base/position';
import holidayReducer from './slices/hr/base/holiday';
import empManagementReducer from '../pages/hr/empManagement/slices/index';
import attdReducer from './redux-saga/reducer/attendance/attendanceReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'berry-'
    },
    cartReducer
  ),
  kanban: kanbanReducer,
  customer: customerReducer,
  contact: contactReducer,
  product: productReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  mail: mailReducer,
  user: userReducer,
  menu: menuReducer,
  Insure: InsureReducer, //리듀서 등록
  baseSalary: baseSalaryReducer,
  positionList: positionReducer,
  holidayList: holidayReducer,
  empManagement: empManagementReducer,
  attdReducer: attdReducer // 근태리듀서
});

export default reducer;
