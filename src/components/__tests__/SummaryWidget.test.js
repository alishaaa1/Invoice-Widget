import { render, screen } from "@testing-library/react";
import SummaryWidget from "../SummaryWidget";
import { transactionData } from "../mockData";
import { invoiceTransactions } from "../mockData";

describe("Loads Summary Component", () => {
    test("displays the correct total amount and invoice count", () => {
        render(<SummaryWidget bankTransactions={transactionData} invoiceData={invoiceTransactions} />);
        expect(screen.getByText(/Account balance:/).textContent).toContain("1350");
        expect(screen.getByText(/Invoices created in the last 30 days:/).textContent).toBe("Invoices created in the last 30 days: 1");
    })
})