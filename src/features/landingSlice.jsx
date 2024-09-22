
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loading: false,
    error: false,
    landingData:[],
    landingRecordData:[]
}

const landingSlice = createSlice({

    name: "landing",
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
        fetchLandingSuccess: (state, { payload }) => {
            state.loading = false
            state.landingData=payload
        },



    }


})



export const {

    fetchStart,
    fetchFail,
    fetchLandingSuccess

} = landingSlice.actions

//slice oluşturulduktan sonra export default olarak export edilmeli ve reducer ifadesi belirtilmelidir.
export default landingSlice.reducer