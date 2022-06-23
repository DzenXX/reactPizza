import {getCartFromLS} from "../../utils/getCartFromLS";
import {getTotalPriceFromLS} from "../../utils/getTotalPriceFromLS";
import {getTotalCountFromLS} from "../../utils/getTotalCountFromLS";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItemT} from "./types";
import {cartSliceState} from "./types";

let initialState: cartSliceState = {
    items: getCartFromLS(),
    totalPrice: getTotalPriceFromLS(),
    totalCount: getTotalCountFromLS(),
};

let cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaItem: (state, action: PayloadAction<CartItemT>) => {
            let findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                const newItem = action.payload
                newItem.count = 1
                state.items.push(newItem)
            }

            state.totalPrice = state.items.reduce((sum: number, obj) => {
                return sum + obj.price * obj.count
            }, 0)
            state.totalCount = state.items.reduce((sum: number, obj) => {
                return sum + obj.count
            }, 0)
        },
        reducePizzaItem: (state, action: PayloadAction<CartItemT>) => {
            let findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem && findItem.count > 1) {
                findItem.count -= 1
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count
            }, 0)
            state.totalCount = state.items.reduce((sum, obj) => {
                return sum + obj.count
            }, 0)
        },
        removePizzaItem: (state, action: PayloadAction<CartItemT>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id)

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count
            }, 0)
            state.totalCount = state.items.reduce((sum, obj) => {
                return sum + obj.count
            }, 0)
        }
        ,
        clearPizzaItems: (state) => {
            state.items = []

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count
            }, 0)
            state.totalCount = state.items.reduce((sum, obj) => {
                return sum + obj.count
            }, 0)
        }
    }
})

export const {addPizzaItem, removePizzaItem, clearPizzaItems, reducePizzaItem} = cartSlice.actions

export default cartSlice.reducer