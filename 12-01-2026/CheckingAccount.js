import FinancialAccount from "./FinancialAccount.js";

export default class CheckingAccount extends FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0, overdraftLimit = 500) {
        super(accountNumber, accountHolder, balance);
        this.overdraftLimit = overdraftLimit;
        this.transactionFee = 0.5;
        this.freeTransactionLimit = 10;
        this.transactionCount = 0;
        this.accountType = "Checking";
    }

    withdraw(amount, description = "Checking Withdrawal") {
        const available = this._balance + this.overdraftLimit;
        if (amount > available) {
            throw new Error("Overdraft limit exceeded");
        }

        this.transactionCount++;
        if (this.transactionCount > this.freeTransactionLimit) {
            this._balance -= this.transactionFee;
            this.recordTransaction(this.transactionFee, 'debit', "Transaction Fee");
        }

        this._balance -= amount;
        this.recordTransaction(amount, 'debit', description);
        return this._balance;
    }
}
