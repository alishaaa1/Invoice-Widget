export const transactionData = [
    {transaction_date:"12/02/2023", description:"Website development" , reference_number: "001",  monetary_amount:500},

    {transaction_date:"10/04/2022", description:"Freelance work" , reference_number: "002",  monetary_amount:800},

    {transaction_date:"12/12/2021", description:"Mainteinance" , reference_number: "003",  monetary_amount:-300},

    {transaction_date:"09/12/2020", description:"Subscription" , reference_number: "004",  monetary_amount:-50},

    {transaction_date:"11/20/2022", description:"Classes" , reference_number: "005",  monetary_amount:550},

    {transaction_date:"03/23/2024", description:"Utilities" , reference_number: "006",  monetary_amount:-150},
]

export const invoiceTransactions = [
    {client_name: "Client A", creation_date: "10/02/2022",  reference_number:"002", monetary_amount:800, status:"NOT-PAID"},
    {client_name: "Client B", creation_date: "08/02/2021",  reference_number:"005", monetary_amount:100, status:"NOT-PAID"},
    {client_name: "Client C", creation_date: "11/02/2023",  reference_number:"001", monetary_amount:500, status:"NOT-PAID"},
    {client_name: "Client C", creation_date: "10/02/2024",  reference_number:"004", monetary_amount:-50, status:"NOT-PAID"},
]

export const fetchTransactions = () =>{ 
    return new Promise((resolve, reject)=>{
        const controller = new AbortController();
        const timeout = setTimeout(()=>{
            controller.abort();
            reject(new Error("Request timed out"));
        },5000);
        setTimeout(()=>{
            clearTimeout(timeout);
            resolve(transactionData);
        },2000)
    })
} 

export const fetchInvoices = () =>{ 
    return new Promise((resolve, reject)=>{
        const controller = new AbortController();
        const timeout = setTimeout(()=>{
            controller.abort();
            reject(new Error("Request timed out"));
        },5000);
        setTimeout(()=>{
            clearTimeout(timeout);
            resolve(invoiceTransactions);
        },2000)
    })
} 
