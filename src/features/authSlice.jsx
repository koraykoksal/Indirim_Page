
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loading: false,
    error: false,
    token: "",
    user:[]
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {


        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        fetchLoginSuccess: (state, { payload }) => {
            state.loading = false
            state.token = payload?.accessToken
            state.user=payload
        },
        fetLogOutSuccess: (state) => {
            state.token = ""
        }


    }


})



export const {

    fetchStart,
    fetchFail,
    fetchLoginSuccess,
    fetLogOutSuccess

} = authSlice.actions

//slice oluşturulduktan sonra export default olarak export edilmeli ve reducer ifadesi belirtilmelidir.
export default authSlice.reducer