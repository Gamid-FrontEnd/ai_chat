import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatsState = {
    allChats: Array<{id: string, name: string, chatPhotoURL: string, creatorId: string, appearance: string, personality: string, situation: string, isNSFW: boolean}>,
    chats: Array<string>,
    openChat: string
}

const initialState: ChatsState = {
    allChats: [],
    chats: [],
    openChat: 'chat1',
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setOpenChat(state, action: PayloadAction<string>) {
            state.openChat = action.payload;
        },

        addChats(state, action: PayloadAction<string>) {
            state.chats.push(action.payload);
        },
        setAllChats(state, action: PayloadAction<Array<{id: string, name: string, chatPhotoURL: string, creatorId: string, appearance: string, personality: string, situation: string, isNSFW: boolean}>>) {
            state.allChats = action.payload;
        },
    }
},
)

export const {setOpenChat, addChats, setAllChats} = chatSlice.actions;

export default chatSlice.reducer;