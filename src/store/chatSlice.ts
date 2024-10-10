import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatsState = {
    chats: Array<string>,
    openChat: string
}

const initialState: ChatsState = {
    chats: [],
    openChat: 'chat1',
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        openChat(state, action: PayloadAction<string>) {
            state.openChat = action.payload;
        },

        addChats(state, action: PayloadAction<string>) {
            state.chats.push(action.payload);
        }
    }
},
)

export const {openChat, addChats} = chatSlice.actions;

export default chatSlice.reducer;