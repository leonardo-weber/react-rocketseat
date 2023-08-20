import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
  }

interface TransactionContextProps {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
  }
  

export const TransactionsContext = createContext({} as TransactionContextProps)

export const TransactionsProvider = (props: TransactionsProviderProps) => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string) {
      const response = await api.get('/transactions', {
        params: {
          q: query,
        }
      })
      setTransactions(response.data)
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{ 
          transactions,
          fetchTransactions,          
          }}>
            {props.children}
        </TransactionsContext.Provider>
    )
}