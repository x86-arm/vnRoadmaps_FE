import authServices, { LoginData } from "@/services/authServices"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const login = createAsyncThunk('user/login', async (data: LoginData, { rejectWithValue }) => {
    const res = await authServices.login(data)
    if (res.status != 200) {
        rejectWithValue(res.data || "Error")
    }
    return res.data
})

interface InitialState {
    info: null | Session,
    isLoading: boolean,
    error: null | string,
    tokens: {
        accessToken: string | null,
        refreshToken: string | null
    },
}

const initialState: InitialState = {
    info: null,
    isLoading: false,
    error: null,
    tokens: {
        accessToken: document.cookie.replace(
            /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        ) == "" ? null : document.cookie.replace(
            /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        ),
        refreshToken: document.cookie.replace(
            /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        ) == "" ? null : document.cookie.replace(
            /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        )
    },
}

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                // Add any fetched posts to the array
                state.tokens = action.payload.tokens
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || "ERROR!!"
            })
    }

})

// export const { } = userReducer.actions

export default userReducer.reducer