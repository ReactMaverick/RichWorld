import { createStore, combineReducers } from 'redux';
import HomeReducer from './reducers/HomeReducer';

const mainReducer = combineReducers({
    home: HomeReducer
})

const commonData = {
    home: {
        
    }
}

const store = createStore(mainReducer,commonData)
export default store;