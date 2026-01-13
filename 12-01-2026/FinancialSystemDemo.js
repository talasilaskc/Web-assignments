import Bank from "./Bank.js";
import { showTransactionsByAccountNumber } from "./transactionViewer.js";

export default function runDemo() {
    const bank = new Bank("Global Finance Bank");

    // Create accounts
    const savings = bank.openAccount("savings", "SAV001", "John", 5000, 0.03);
    const checking = bank.openAccount("checking", "CHK001", "John", 2000, 1000);

    // 🔥 ADD TRANSACTIONS
    savings.deposit(1000, "Salary");
    savings.withdraw(500, "Groceries");

    checking.withdraw(2500, "Rent"); // overdraft usage

    // ✅ NOW SHOW TRANSACTIONS
    showTransactionsByAccountNumber(bank, "SAV001");
    showTransactionsByAccountNumber(bank, "CHK001");
}
