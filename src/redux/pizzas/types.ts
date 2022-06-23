import {SortItem} from "../../pages/Home";

export type FetchPizzaArgs = {
    currentPage?: number,
    activeCategory?: number,
    sortArr?: SortItem[],
    selectedSort?: number;
}



export type PizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[]
}

export interface pizzaSliceState {
    status: 'loading' | 'success' | 'error',
    items: PizzaItem[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}