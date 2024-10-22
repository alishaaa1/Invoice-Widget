import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components";

const Container = styled.div`
    padding: 1rem;
`

const InvoiceContainer = styled.div`
    padding: 1rem;
    display:flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    border: 1px solid black;
`

const InvoiceInput = styled.input`
    padding: 0.5rem;
    margin-right: 0.5rem;
`

const InvoiceButton = styled.button`
    padding: 0.5rem;
    border-radius: 5px;
`

const InvoiceWidget = ({invoiceData, transactions, onAddInvoice, onUpdateInvoice}) =>{
    const [invoices, setInvoices] = useState(invoiceData);
    const [newInvoice, setNewInvoice] = useState({})

    const calcStatus = useCallback((invoice) =>{
        const matchingTransaction = transactions.find((transaction)=>{
            return (
                transaction.reference_number === invoice.reference_number &&
                parseFloat(transaction.monetary_amount) === parseFloat(invoice.monetary_amount) &&
                new Date(transaction.transaction_date) > new Date(invoice.creation_date)
            );
        });
        return matchingTransaction ? "PAID" : "NOT PAID";
    },[transactions]);

    useEffect(()=>{

        const updatedInvoices = invoiceData.map((invoice)=>({
            ...invoice,
            status: calcStatus(invoice),
        }));
        setInvoices(updatedInvoices);
    },[invoiceData,calcStatus]);

    const handleNewInvoiceChange = (e) =>{
        const {name, value} = e.target;
        setNewInvoice((prevInvoice)=>({
            ...prevInvoice,
            [name] : name === "monetary_amount" ? parseFloat(value) : value,
        }));
    }

    const handleInvoiceChange = (e, index) => {
        const { name, value } = e.target;
        const updatedInvoices = [...invoices];
        updatedInvoices[index] = {
          ...updatedInvoices[index],
          [name]: name === "monetary_amount" ? parseFloat(value) : value, // Update the specific field
        };
        setInvoices(updatedInvoices);
        onUpdateInvoice(updatedInvoices); // Trigger the parent update
      };

    const addNewInvoice = () =>{
        const newInvoiceWithStatus = {
            ...newInvoice,
            status: calcStatus(newInvoice), // Calculate status based on the new invoice
        };
        onAddInvoice(newInvoiceWithStatus);
        setNewInvoice({});
    };

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
      };
      
    return (
        <Container>
            <h2>Invoice data:</h2>
            <div>
            {invoices.map((invoice, index)=>(
                <InvoiceContainer key={invoice.reference_number}>
                    <InvoiceInput
                        type="text"
                        name="client_name"
                        value={invoice.client_name}
                        onChange={(e) => handleInvoiceChange(e, index)}
                    />
                    <InvoiceInput
                    type="date"
                    name="creation_date"
                    value={formatDateForInput(invoice.creation_date)}
                    onChange={(e) => handleInvoiceChange(e, index)}
                    />
                    <InvoiceInput
                    type="text"
                    name="reference_number"
                    value={invoice.reference_number}
                    onChange={(e) => handleInvoiceChange(e, index)}
                    />
                    <InvoiceInput
                    type="number"
                    name="monetary_amount"
                    value={invoice.monetary_amount}
                    onChange={(e) => handleInvoiceChange(e, index)}
                    />
                    <p>Status: {invoice.status}</p>
            </InvoiceContainer>
            ))}
            </div>
            <h3>Add new Invoice</h3>
            <InvoiceInput
                type="text"
                name="client_name"
                placeholder="Client Name"
                value={newInvoice.client_name || ""}
                onChange={handleNewInvoiceChange}
            />
             <InvoiceInput
                type="date"
                name="creation_date"
                value={newInvoice.creation_date|| ""}
                onChange={handleNewInvoiceChange}
            />
            <InvoiceInput
                type="text"
                name="reference_number"
                placeholder="Reference Number"
                value={newInvoice.reference_number || ""}
                onChange={handleNewInvoiceChange}
            />
              <InvoiceInput
                type="number"
                name="monetary_amount"
                placeholder="Amount"
                value={newInvoice.monetary_amount || ""}
                onChange={handleNewInvoiceChange}
            />
            <InvoiceButton onClick={addNewInvoice}>Add Invoice</InvoiceButton>
        </Container>
    )
}

export default InvoiceWidget;

