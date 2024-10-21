import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FirestoreType = {
    firestoreInstance: any;
    auth: any;
    user: any;
}

const initialState: FirestoreType = {
    firestoreInstance: null,
    auth: null,
    user: null,
}

const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,
    reducers: {
        setFirestoreInstance: (state, action: PayloadAction<any>) => {
          state.firestoreInstance = action.payload;
        },
        setAuth: (state, action: PayloadAction<any>) => {
            state.auth = action.payload;
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    }
})

export const { setFirestoreInstance, setAuth, setUser } = firestoreSlice.actions;
export default firestoreSlice.reducer;