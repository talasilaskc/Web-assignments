import SavingsAccount from "./SavingsAccount.js";
import CheckingAccount from "./CheckingAccount.js";
import InvestmentAccount from "./InvestmentAccount.js";

export default class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = [];
    }

    openAccount(type, ...args) {
        let account;
        switch (type.toLowerCase()) {
            case "savings":
                account = new SavingsAccount(...args);
                break;
            case "checking":
                account = new CheckingAccount(...args);
                break;
            case "investment":
                account = new InvestmentAccount(...args);
                break;
            default:
                throw new Error("Invalid account type");
        }
        this.accounts.push(account);
        return account;
    }

    findAccount(accountNumber) {
        return this.accounts.find(a => a.accountNumber === accountNumber);
    }

    transfer(from, to, amount) {
        const fromAcc = this.findAccount(from);
        const toAcc = this.findAccount(to);
        fromAcc.withdraw(amount, `Transfer to ${to}`);
        toAcc.deposit(amount, `Transfer from ${from}`);
    }
}
