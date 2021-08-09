import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import engineersReducers from '../screens/EngineersScreen/store/reducers';
import shiftsReducers from '../screens/ShiftsScreen/store/reducers';

const rootReducer = combineReducers({
  fakeEngineers: engineersReducers,
  shifts: shiftsReducers,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
