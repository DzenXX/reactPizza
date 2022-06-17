// import axios from "axios";
// import {action} from "prompts/lib/util";
// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//
//
//
//
// export const fetchPizzaItems = createAsyncThunk(
//     'pizzas/fetchPizzas', async ({ currentPage, activeCategory, sortArr, selectedSort}) => {
//         const { data } = await axios.get(
//             `https://627f8941be1ccb0a466137de.mockapi.io/api/reactPizza/items?page=${currentPage}&limit=4&${activeCategory > 0 ? `category=${activeCategory}` : ''}&${sortArr[selectedSort].param}`
//         );
//         console.log("loading")
//         return data
//     }
// )
//
// let pizzasSlice = createSlice({
//     name: 'pizzas',
//     initialState: {
//         items: [],
//         status: 'loading'
//     },
//     reducers: {
//         setPizzaItems: (state, action) => {
//             state.status = action.payload
//         },
//     },
//     extraReducers: {
//        [fetchPizzaItems.pending]: (state, action) => {
//            console.log('Идет загрузка')
//            state.status = 'loading'
//            state.items = []
//        },
//        [fetchPizzaItems.rejected]: (state, action) => {
//            console.log('Произошла ошибка')
//            state.status = 'error'
//        },
//         [fetchPizzaItems.fulfilled]: (state, action) => {
//             state.items = action.payload.data
//             console.log('Загрузка успешно завершнена')
//         },
//     }
// })
//
// export const { setPizzaItems } = pizzasSlice.actions
//
// export default pizzasSlice.reducer
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "axios";

export const fetchPizzaItems = createAsyncThunk(
    'pizzas/fetchPizzas', async ({ currentPage, activeCategory, sortArr, selectedSort}) => {
        const { data } = await axios.get(
            `https://627f8941be1ccb0a466137de.mockapi.io/api/reactPizza/items?page=${currentPage}&limit=4&${activeCategory > 0 ? `category=${activeCategory}` : ''}&${sortArr[selectedSort].param}`
        );
        console.log("loading")
        return data
    }
)


let pizzasSlice = createSlice({
    name: 'filters',
    initialState: {
        status: 'loading',
        pizzas: []
    },
    reducers: {

    },
    extraReducers: {
       [fetchPizzaItems.pending]: (state, action) => {
           console.log('Идет загрузка')
           state.status = 'loading'
           state.items = []
       },
       [fetchPizzaItems.rejected]: (state, action) => {
           console.log('Произошла ошибка')
           state.status = 'error'
       },
        [fetchPizzaItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
            console.log('Загрузка успешно завершнена')
        },
    }
})

export const selectStatus = (state) => state.pizzas.status
export const selectItems = (state) => state.pizzas.items
// export const {  } = filtersSlice.actions

export default pizzasSlice.reducer