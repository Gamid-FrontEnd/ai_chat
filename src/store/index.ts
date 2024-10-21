import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './chatSlice'
import firestoreSlice from './firestoreSlice';

const store = configureStore({
    reducer: {
        chats: chatReducer,
        firestoreSlice: firestoreSlice,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;