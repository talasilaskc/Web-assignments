function createPurchaseOrder(name, description, frequency, amount) {
    return {
        poId:"PO" + Math.floor(Math.random() * 1000000),
        name: name,
        description: description,
        frequency: frequency,
        amount: amount,
        poDate: new Date()
    };
}

function calculateGrossAmount(paymentType, rate,worklog){
    switch (paymentType){
        case 'Daily':
            return rate * worklog.days;
        case 'Hourly':
            return rate * worklog.hours;
        case 'Monthly':
            return rate;
        default:
            throw new Error('Invalid payment type');
    }
}

function generateInvoice(po, worklog, tdsPercent){
    const today=new Date();
    const d=new Date(po.poDate);
    d.setDate(d.getDate()+30);
    const InvoiceEligibleDate=d;
    if(today<InvoiceEligibleDate){
        return {
            status:"Not Eligible for Invoice Generation",
            eligibleDate:InvoiceEligibleDate
        }
    }

    const grossAmount=calculateGrossAmount(po.frequency, po.amount, worklog);

    const tdsAmount=(tdsPercent/100)*grossAmount;
    const netAmount=grossAmount - tdsAmount;

    return{
        invoiceId:"INV"+Math.floor(Math.random()*1000000),
        poId:po.poId,
        grossAmount:grossAmount,
        tdsAmount:tdsAmount,
        netAmount:netAmount,
        invoiceDate:today,
        status:"Invoice Generated"
    }

}

function processPayment(invoice) {
    if (invoice.status === "PENDING") {
        console.log("Payment cannot be processed. Invoice not generated.");
        return;
    }

    return {
        paymentId: "PAY" + Math.floor(Math.random() * 1000000),
        invoiceId: invoice.invoiceId,
        amountPaid: invoice.netAmount,
        paymentDate: new Date(),
        status: "PAID"
    };
}

const poMonthly = createPurchaseOrder(
    "Sarath Kumar",
    "Java Full Stack Training",
    "Monthly",
    100000
);

const workLogMonthly = {
    days: 0,
    hours: 0
};

const monthlyInvoice = generateInvoice(poMonthly, workLogMonthly, 10);
console.log("\nMONTHLY INVOICE:", monthlyInvoice);


const monthlyPayment = processPayment(monthlyInvoice);
console.log("MONTHLY PAYMENT:", monthlyPayment);

console.log(poMonthly);

const poDaily = createPurchaseOrder(
    "Sarath Kumar",
    "Java Full Stack Training",
    "Daily",
    3000 // per day
);

const workLogDaily = {
    days: 22,
    hours: 0
};

// simulate 30 days passed
poDaily.poDate.setDate(poDaily.poDate.getDate() - 31);

const dailyInvoice = generateInvoice(poDaily, workLogDaily, 10);
console.log("\nDAILY INVOICE:", dailyInvoice);

const dailyPayment = processPayment({
    ...dailyInvoice,
    netPayable: dailyInvoice.netAmount
});
console.log("DAILY PAYMENT:", dailyPayment);

const poHourly = createPurchaseOrder(
    "Sarath Kumar",
    "Java Full Stack Training",
    "Hourly",
    800 // per hour
);

const workLogHourly = {
    days: 0,
    hours: 120
};

// simulate 30 days passed
poHourly.poDate.setDate(poHourly.poDate.getDate() - 31);

const hourlyInvoice = generateInvoice(poHourly, workLogHourly, 10);
console.log("\nHOURLY INVOICE:", hourlyInvoice);

const hourlyPayment = processPayment({
    ...hourlyInvoice,
    netPayable: hourlyInvoice.netAmount
});
console.log("HOURLY PAYMENT:", hourlyPayment);
