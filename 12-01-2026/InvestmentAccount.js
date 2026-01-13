import SavingsAccount from "./SavingsAccount.js";

export default class InvestmentAccount extends SavingsAccount {
    constructor(accountNumber, accountHolder, balance = 0, interestRate = 0.04, riskLevel = "Medium") {
        super(accountNumber, accountHolder, balance, interestRate);
        this.riskLevel = riskLevel;
        this.investments = [];
        this.accountType = "Investment";
    }

    addInvestment(name, amount, expectedReturn) {
        this.withdraw(amount, `Investment in ${name}`);
        const inv = {
            name,
            amount,
            expectedReturn,
            date: new Date()
        };
        this.investments.push(inv);
        return inv;
    }
}
