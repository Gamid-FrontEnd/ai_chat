import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './chatSlice'

const store = configureStore({
    reducer: {
        chats: chatReducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;