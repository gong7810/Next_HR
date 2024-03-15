// third-party
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';

import { persistStore } from 'redux-persist';

// project imports
import rootReducer from './reducer';

//saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

// ==============================|| REDUX - MAIN STORE ||============================== //

const sagaMiddleware = createSagaMiddleware(); //사가 미들웨어

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga); //루트 사가 실행

const persister = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };
