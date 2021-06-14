
import { combineReducers } from 'redux';

import boardsSlice from './slices/boardsSlice';


export const rootReducer = combineReducers({
    boards: boardsSlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;