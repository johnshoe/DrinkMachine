export interface DrinkData {
  id: number;
  name: string;
  price: number;
}

export interface Pipe {
  name: number;
  title: string;
  coinCount: number;
}

export interface Coin {
  coin: number;
  count: number;
}

export interface StoredData {
  pipes: Pipe[],
  balance: number
}

