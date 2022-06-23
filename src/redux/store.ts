import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from "./filters/slice"
import cartReducer from "./cart/slice"
import pizzasReducer from "./pizzas/slice"
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        cart: cartReducer,
        pizzas: pizzasReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()