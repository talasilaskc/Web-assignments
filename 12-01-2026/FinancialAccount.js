export default class FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this._balance = balance;
        this.transactions = [];
        this.createdDate = new Date();
    }

    get balance() {
        return this._balance;
    }

    deposit(amount, description = "Deposit") {
        if (amount <= 0) throw new Error("Deposit amount must be positive");
        this._balance += amount;
        this.recordTransaction(amount, 'credit', description);
        return this._balance;
    }

    withdraw(amount, description = "Withdrawal") {
        if (amount <= 0) throw new Error("Withdrawal amount must be positive");
        if (amount > this._balance) throw new Error("Insufficient funds");
        this._balance -= amount;
        this.recordTransaction(amount, 'debit', description);
        return this._balance;
    }

    recordTransaction(amount, type, description) {
        const transaction = {
            id: this.transactions.length + 1,
            date: new Date(),
            amount,
            type,
            description,
            balanceAfter: this._balance
        };
        this.transactions.push(transaction);
        return transaction;
    }

    calculateInterest() {
        return 0;
    }

    displayInfo() {
        return `${this.constructor.name} #${this.accountNumber} - Balance: $${this.balance.toFixed(2)}`;
    }
}
