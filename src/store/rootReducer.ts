import { combineReducers } from '@reduxjs/toolkit';
import invoiceReducer from './invoiceSlice';

const rootReducer = combineReducers({
	invoice: invoiceReducer,
});

export default rootReducer;
