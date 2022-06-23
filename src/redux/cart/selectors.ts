import {RootState} from "../store";
import {CartItemT} from "./types";

export const selectPizzaById = (id: string) => (state: RootState) => state.cart.items.find((obj: CartItemT) => obj.id === id)

export const selectItems = (state: RootState) => state.cart.items

export const selectCart = (state: RootState) => state.cart