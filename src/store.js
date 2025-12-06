import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import taskReducer from './slices/task';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer
    },
});
