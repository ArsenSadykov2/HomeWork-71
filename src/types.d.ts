export interface DishItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    counter?: number;
}

export interface Dish {
    name: string;
    price: number;
    image: string;
}

export interface DishAPI  {
    [id: string]: Dish;
}
