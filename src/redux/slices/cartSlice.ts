import {createSlice} from "@reduxjs/toolkit";
import cartItem from "../../components/CartItem";


type CartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    size: string,
    type: string,
    count: number,
}

interface cartSliceState {
    items: CartItem[],
    totalPrice: number,
    totalCount: number,
}

let initialState: cartSliceState = {
    items: [],
        totalPrice: 0,
        totalCount: 0,
};

let cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaItem: (state, action) => {
            let findItem = state.items.find((obj) => obj.id === action.payload.id)
            console.log(findItem)
            if (findItem) {
                findItem.count++
            } else {
                const newItem = action.payload
                newItem.count = 1
                state.items.push(newItem)
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count
            }, 0)
            state.totalCount = state.items.reduce((sum, obj) => {
                return sum + obj.count
            }, 0)
        },
        reducePizzaItem: (state, action) => {
            let findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count -= 1
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + obj.price * obj.count
            }, 0)
            state.totalCount = state.items.reduce((sum, obj) => {
                return sum + obj.count
            }, 0)
        },
        removePizzaItem: (state, action) => {
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

export const selectPizzaById = (id: string) => state => state.cart.items.find((obj: CartItem) => obj.id === id)

export const selectCart = state => state.cart

export default cartSlice.reducer