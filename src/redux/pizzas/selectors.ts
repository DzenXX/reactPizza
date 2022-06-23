import {RootState} from "../store";

export const selectStatus = (state: RootState) => state.pizzas.status
export const selectItems = (state: RootState) => state.pizzas.items