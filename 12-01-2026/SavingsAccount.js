import FinancialAccount from "./FinancialAccount.js";

export default class SavingsAccount extends FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0, interestRate = 0.02) {
        super(accountNumber, accountHolder, balance);
        this.interestRate = interestRate;
        this.minimumBalance = 100;
        this.accountType = "Savings";
    }

    withdraw(amount, description = "Savings Withdrawal") {
        if (this._balance - amount < this.minimumBalance) {
            throw new Error(`Minimum balance of $${this.minimumBalance} required`);
        }
        return super.withdraw(amount, description);
    }

    calculateInterest() {
        return (this._balance * this.interestRate) / 12;
    }
}
