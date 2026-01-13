export function showTransactionsByAccountNumber(bank, accountNumber) {
    const acc = bank.findAccount(accountNumber);
    if (!acc) return console.log("Account not found");

    console.table(acc.transactions.map(t => ({
        ID: t.id,
        Date: t.date.toLocaleString(),
        Type: t.type,
        Amount: t.amount,
        Balance: t.balanceAfter
    })));
}
