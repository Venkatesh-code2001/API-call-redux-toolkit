import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialData = {
    users: [],
    status: "",
    error: false
}

export const fetchUsers = createAsyncThunk('fetch', async () =>{
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        return data;
    } 
    catch (error) {
        throw error;
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: initialData,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) =>{
            state.status="loading"
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status ="Completed",
            state.users=action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status="error",
            state.users=[],
            state.error=action.error.message
        } ) 
    }
})

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export default store;