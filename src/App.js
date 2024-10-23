import { useEffect, useState } from "react";
import SummaryWidget from "./components/SummaryWidget";
import { fetchInvoices } from "./components/mockData";
import InvoiceWidget from "./components/InvoiceWidget";
import { TransactionProvider } from "./components/TransactionContext";

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

function App() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [invoicesError, setInvoicesError] = useState(null);

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


  if (loadingInvoices) {
    return <div>Loading data...</div>;
  }

  if (invoicesError) {
    return <div>Error: {invoicesError}</div>;
  }

  return (
    <TransactionProvider>
      <SummaryWidget invoiceData={invoiceData} />
      <InvoiceWidget invoiceData={invoiceData} onAddInvoice={handleAddInvoice} onUpdateInvoice={handleOnUpdateInvoice} />
  </TransactionProvider>
  );
}

export default App;
