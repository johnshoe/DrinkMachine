import {DrinkData, Pipe} from "./stuff/types";

export const DRINKS: DrinkData[] = [
  {id: 0, name: 'drink1', price: 10},
  {id: 1, name: 'drink2', price: 20},
  {id: 2, name: 'drink3', price: 100}
]

export const COINT_TYPES: number[] = [100, 50, 20, 10, 5]

export const PIPES_DATA: Pipe[] = [
  {name: 5, title: '5 Ft', coinCount: 10},
  {name: 10, title: '10 Ft', coinCount: 10},
  {name: 20, title: '20 Ft', coinCount: 10},
  {name: 20, title: '20 Ft', coinCount: 10},
  {name: 50, title: '50 Ft', coinCount: 10},
  {name: 100, title: '100 Ft', coinCount: 10},
]

export const INIT_BALANCE = 2050;
