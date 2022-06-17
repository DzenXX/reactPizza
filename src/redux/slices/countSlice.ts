// import {createSlice} from "@reduxjs/toolkit";
//
// let countSlice = createSlice({
//     name: 'counter',
//     initialState: {
//         count: 0,
//     },
//     reducers: {
//         increment: (state) => {
//             state.count += 1
//
//         },
//         decrement: (state) => {
//             state.count -= 1
//         },
//         incrementByAmount: (state, action) => {
//             state.count += action.payload
//         }
//     }
// })
//
// export const { increment, decrement, incrementByAmount } = countSlice.actions
//
// export const selectCount = (state) => state.counter.count
//
// export default countSlice.reducer