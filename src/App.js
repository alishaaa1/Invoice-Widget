import { useEffect, useState } from "react";
import SummaryWidget from "./components/SummaryWidget";
import { fetchInvoices, fetchTransactions } from "./components/mockData";
import InvoiceWidget from "./components/InvoiceWidget";

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

function App() {
  const [bankTransactions, setBankTransactions] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  
  const [transactionsError, setTransactionsError] = useState(null);
  const [invoicesError, setInvoicesError] = useState(null);

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

  useEffect(() => {
    setLoadingInvoices(true);
    setInvoicesError(null); // Reset any previous error

    const savedInvoices = loadFromLocalStorage('invoiceData');
    if(savedInvoices){
      setInvoiceData(savedInvoices);
      setLoadingInvoices(false);
    }else{
      fetchInvoices()
      .then(res => {
        if(res.length === 0){
          throw new Error("No invoices found")
      }
        setInvoiceData(res);
      })
      .catch(error => {
        setInvoicesError(`Failed to load invoices : ${error.message}`);
      })
      .finally(()=>{
        setLoadingInvoices(false);
      })
    }
  }, []);

  const handleAddInvoice = (newInvoice) =>{
    const updatedInvoices = [...invoiceData, newInvoice];
    setInvoiceData(updatedInvoices);
    localStorage.setItem('invoiceData', JSON.stringify(updatedInvoices));

  }

  const handleOnUpdateInvoice = (updatedInvoices) =>{
      setInvoiceData(updatedInvoices);
      localStorage.setItem('invoiceData', JSON.stringify(updatedInvoices));
  }


  if (loadingTransactions || loadingInvoices) {
    return <div>Loading data...</div>;
  }

  if (transactionsError) {
    return <div>Error: {transactionsError}</div>;
  }

  if (invoicesError) {
    return <div>Error: {invoicesError}</div>;
  }

  return (
    <div>
      <SummaryWidget bankTransactions={bankTransactions} invoiceData={invoiceData}/>
      <InvoiceWidget invoiceData={invoiceData} transactions={bankTransactions} onAddInvoice={handleAddInvoice} onUpdateInvoice={handleOnUpdateInvoice}/>
    </div>
  );
}

export default App;
