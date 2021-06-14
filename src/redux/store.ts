 

import rootReducer  from './rootReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'boards',
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureAppStore() {
	
	const store = configureStore({
		reducer: persistedReducer,
		middleware: getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	});

	return store;
}
