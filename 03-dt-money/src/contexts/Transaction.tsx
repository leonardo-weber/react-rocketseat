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
    createTransaction: (data: CreateTransactionItemProps) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

interface CreateTransactionItemProps {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

export const TransactionsContext = createContext({} as TransactionContextProps)

export const TransactionsProvider = (props: TransactionsProviderProps) => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const createTransaction = async (item: CreateTransactionItemProps) => {
      
      const { description, price, category, type } = item

      const response = await api.post('transactions', { 
          description, 
          price, 
          category, 
          type,
          createdAt: new Date(),
      })

      setTransactions(state => [response.data, ...state])

    }
    

    const fetchTransactions = async (query?: string) => {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
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
          createTransaction    
          }}>
            {props.children}
        </TransactionsContext.Provider>
    )
}