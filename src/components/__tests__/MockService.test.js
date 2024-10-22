import { fetchInvoices, fetchTransactions } from "../mockData";

test("fetchTransactions returns mock data", async () => {
  const transactions = await fetchTransactions();
  expect(transactions.length).toBeGreaterThan(0);
  expect(transactions[0]).toHaveProperty("description");
});

test("fetchInvoices returns mock data", async () => {
  const invoices = await fetchInvoices();
  expect(invoices.length).toBeGreaterThan(0);
  expect(invoices[0]).toHaveProperty("client_name");
});
