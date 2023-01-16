import {Pipe, StoredData} from "../stuff/types";

const STORE_BALANCE = 'balance'
const PIPES = 'pipes'
const AMOUNT = 'amount'

export class Store {

  private static instance: Store;

  constructor() {
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Store();
    return this.instance;
  }

  clearStore = () => {
    localStorage.clear();
  }

  async getPipeData(): Promise<Pipe[]> {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(PIPES)) as Pipe[]
  }

  async getStoredData(): Promise<StoredData> {
    // @ts-ignore
    const pipes: Pipe[] = JSON.parse(localStorage.getItem(PIPES)) as Pipe[]
    const balance: number = Number(localStorage.getItem(STORE_BALANCE))

    return {pipes: pipes, balance: balance} as StoredData
  }

  async updatePipeData(pipeData: Pipe[]) {
    localStorage.setItem(PIPES, JSON.stringify(pipeData))
  }

  async setPipeData(pipeData: Pipe[]) {
    localStorage.setItem(PIPES, JSON.stringify(pipeData))
  }

  async hasStore(): Promise<boolean> {
    // @ts-ignore
    let pipes = JSON.parse(localStorage.getItem(PIPES)) as []
    // @ts-ignore
    return localStorage.getItem(PIPES) && localStorage.hasOwnProperty(STORE_BALANCE) && pipes.length > 0
  }

  async getBalance(): Promise<number> {
    const balance: string = localStorage.getItem(STORE_BALANCE) || ''
    return Number(balance)
  }

  async setBalance(balance: number) {
    localStorage.setItem(STORE_BALANCE, balance.toString())
  }

  async getAmount(): Promise<number> {
    const amount: string = localStorage.getItem(AMOUNT) || ''
    return Number(amount)
  }

  async setAmount(amount: number) {
    localStorage.setItem(AMOUNT, (amount).toString())
  }

  async clearAmount() {
    localStorage.setItem(AMOUNT, '')
  }

}


