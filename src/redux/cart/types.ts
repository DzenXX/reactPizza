
export type CartItemT = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    type: number,
    count: number,
}

export interface cartSliceState {
    items: CartItemT[],
    totalPrice: number,
    totalCount: number,
}