import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchTransactions } from './mockData';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [bankTransactions, setBankTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [transactionsError, setTransactionsError] = useState(null);

    useEffect(()=>{
        setLoadingTransactions(true);
        setTransactionsError(null);
    
        fetchTransactions().then(res=>{
          if(res.length === 0){
              throw new Error("No Transactions found")
          }
          setBankTransactions(res);
        }
        )
        .catch((error)=>{
          setTransactionsError(`Failed to load bank transactions : ${error.message}`);
        })
        .finally(()=>{
          setLoadingTransactions(false)
        })
      },[])

  return (
    <TransactionContext.Provider value={{ bankTransactions, loadingTransactions, transactionsError }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
