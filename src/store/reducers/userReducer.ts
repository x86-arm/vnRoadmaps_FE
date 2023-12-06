import authServices, { LoginData } from "@/services/authServices"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { store } from "../index"

export const login = createAsyncThunk('user/login', async (data: LoginData, { rejectWithValue }) => {
    try {
        const res = await authServices.login(data)
        return res.data
    }
    catch (error: any) {
        return rejectWithValue((error.code == "ERR_NETWORK" ? "Lỗi mạng" : error.response.data.message) || "Error")
    }
})

export const info = createAsyncThunk('user/info', async (data: null, { rejectWithValue }) => {
    console.log(data)
    try {
        const token = store.getState().userReducer.tokens.accessToken
        if (!token) throw "Err"
        const res = await authServices.info(token)
        return res.data
    }
    catch (error: any) {
        return rejectWithValue((error.code == "ERR_NETWORK" ? "Lỗi mạng" : error.response.data.message) || "Error")
    }
})
interface InitialState {
    info: null | Session,
    isLoading: boolean,
    error: any,
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
        clearTokens: (state) => {
            state.tokens.refreshToken = state.tokens.accessToken = state.info = null
        }
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
                state.error = action.error.message
            })
            .addCase(info.pending, (state) => {
                state.isLoading = true
            })
            .addCase(info.fulfilled, (state, action) => {
                state.isLoading = false
                // Add any fetched posts to the array
                state.info = action.payload.data
            })
            .addCase(info.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }

})

export const { clearTokens } = userReducer.actions

export default userReducer.reducer