import React,{useMemo} from "react";
import styled from "styled-components";
import { useTransactions } from "./TransactionContext";

const Container = styled.div`
    padding: 1rem;
`

const SummaryContainer = styled.div`
    padding: 1rem;
    display:flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    border: 1px solid black;
`

const SummaryWidget = ({invoiceData}) =>{
    const {bankTransactions} = useTransactions();

    const threshold = 1000;

    const totalBalance = useMemo(()=>{
        return bankTransactions && bankTransactions.reduce((total,transaction)=>{
            return total+transaction.monetary_amount;
        },0);
    },[bankTransactions]);

    const invoicesInLast30Days = useMemo(()=>{
        const now = new Date();
        return invoiceData.filter((invoice)=>{
            const invoiceDate = new Date(invoice.creation_date);
            const diffInDays = (now-invoiceDate) / (1000*60*60*24);
            return diffInDays <= 30;
        }).length;
    },[invoiceData])

    function calculateColor(totalBalance, threshold){
        if(totalBalance > threshold){
            return 'green'
        }
        if(totalBalance <= threshold && totalBalance>0){
            return  'yellow';
        }
        return 'red';
    }

    return (
        <Container>
            <h1>Summary Widget</h1>
            <h3>Account balance: <span data-testid="total-balance" style={{color: calculateColor(totalBalance,threshold)}}>{totalBalance}</span></h3>
            {bankTransactions && bankTransactions.map((transaction)=>(
                <SummaryContainer key={transaction.reference_number}>
                    <p>Date: {transaction.transaction_date}</p>
                    <p>Description: {transaction.description}</p>
                    <p>Ref number: {transaction.reference_number}</p>
                    <p>Amount: {transaction.monetary_amount}</p>
                </SummaryContainer>
            ))}
            <h3>Invoices created in the last 30 days: {invoicesInLast30Days}</h3>
        </Container>
    )

}

export default SummaryWidget;