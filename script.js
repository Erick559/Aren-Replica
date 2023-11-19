const grossPay = document.querySelector('.gross-pay')
const calculate = document.querySelector('.submit')
const resetSelection = document.querySelector('.reset-checkbox')
const form = document.querySelector('.form')
const formDetails = document.querySelector('.form-details')



function calculateLevy() {
    let housingLevy = 0.015 * grossPay.value
    return housingLevy
}

function calculateNHIF() {
    let basePay = grossPay.value
    let nhif;

    if (basePay <= 5999) {
        nhif = 150;
    } else if (basePay >= 6000 && basePay <= 7999) {
        nhif = 300;
    } else if (basePay >= 8000 && basePay <= 11999) {
        nhif = 400;
    } else if (basePay >= 12000 && basePay <= 14999) {
        nhif = 500;
    } else if (basePay >= 15000 && basePay <= 19999) {
        nhif = 600;
    } else if (basePay >= 20000 && basePay <= 24999) {
        nhif = 750;
    } else if (basePay >= 25000 && basePay <= 29999) {
        nhif = 850;
    } else if (basePay >= 30000 && basePay <= 34999) {
        nhif = 900;
    } else if (basePay >= 35000 && basePay <= 39999) {
        nhif = 950;
    } else if (basePay >= 40000 && basePay <= 44999) {
        nhif = 1000;
    } else if (basePay >= 45000 && basePay <= 49999) {
        nhif = 1100;
    } else if (basePay >= 50000 && basePay <= 59999) {
        nhif = 1200;
    } else if (basePay >= 60000 && basePay <= 69999) {
        nhif = 1300;
    } else if (basePay >= 70000 && basePay <= 79999) {
        nhif = 1400;
    } else if (basePay >= 80000 && basePay <= 89999) {
        nhif = 1500;
    } else if (basePay >= 90000 && basePay <= 99999) {
        nhif = 1600;
    } else {
        nhif = 1700;
    }

    return nhif;
}

function calculateNSSF() {
    let nssfTier1 = document.querySelector('.nssf-tier1');
    let nssfTier1_2 = document.querySelector('.nssf-tier1-2')
    let nssf;
    let error = document.querySelector('.error')
    if (!error) {
        error = document.createElement('p')
        error.classList.add('error')
    }

    if (nssfTier1.checked == true && nssfTier1_2.checked == true) {
        error.innerHTML = 'Please select only one'
        form.appendChild(error);
    } else if (nssfTier1.checked) {
        nssf = 360;
    } else if (nssfTier1_2.checked) {
        nssf = 1080;
    } else {
        error.innerHTML = 'Select one of the two tiers'
        form.appendChild(error);
    }

    resetSelection.addEventListener('click', function() {
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false)
    })


    return nssf
}

function calculateIncomeTax() {
    let nssfDeductable = calculateNSSF()
    let taxableIncome = grossPay.value - nssfDeductable
    let nhifRelief = calculateNHIF() * 0.15

    let tax = 0;

    if (taxableIncome <= 24000) {
        tax = taxableIncome * 0.10;
    } else if (taxableIncome <= 32333) {
        tax = 24000 * 0.10 + (taxableIncome - 24000) * 0.25;
    } else if (taxableIncome <= 500000) {
        tax = 24000 * 0.10 + 8333 * 0.25 + (taxableIncome - 32333) * 0.30;
    } else if (taxableIncome <= 800000) {
        tax =
            24000 * 0.10 +
            8333 * 0.25 +
            467667 * 0.30 +
            (taxableIncome - 500000) * 0.325;
    } else {
        tax =
            24000 * 0.10 +
            8333 * 0.25 +
            467667 * 0.30 +
            300000 * 0.325 +
            (taxableIncome - 800000) * 0.35;
    }

    // Subtract personal relief
    tax -= (2400 + nhifRelief);

    if (disabilityCheck() && grossPay.value <= 150000) {
        tax = 0;
    }

    // Ensure tax is non-negative
    tax = Math.max(tax, 0);

    return parseFloat(tax.toFixed(2))

}

function calculateNetPay() {
    let incomeTax = parseFloat(calculateIncomeTax());
    let deductableNSSF = parseFloat(calculateNSSF());
    let deductableNHIF = parseFloat(calculateNHIF());
    let deductableLevy = parseFloat(calculateLevy());

    let totalDeductions = incomeTax + deductableLevy + deductableNSSF + deductableNHIF

    let netPay = grossPay.value - totalDeductions

    return netPay
}

function disabilityCheck() {
    const disabilityCheck = document.querySelector('.disability-check')
    if (disabilityCheck.checked) {
        return true
    } else {
        return false
    }
}

function appendResults() {
    let displayedGrossPay = parseFloat(grossPay.value)

    let results = document.createElement('div')
    results.classList.add('form-results')
    formDetails.appendChild(results)

    let grossPayResult = document.createElement('div')
    grossPayResult.classList.add('gross-pay-result')

    let nssfResult = document.createElement('div')
    nssfResult.classList.add('nssf-result')

    let incomeTaxResult = document.createElement('div')
    incomeTaxResult.classList.add('income-tax-result')

    let nhifResult = document.createElement('div')
    nhifResult.classList.add('nhif-result')

    let housingLevyResult = document.createElement('div')
    housingLevyResult.classList.add('housing-Levy-result')

    let netPayResult = document.createElement('div')
    netPayResult.classList.add('net-pay-result')

    grossPayResult.innerHTML = `GROSS-PAY ${displayedGrossPay.toLocaleString()}`
    nssfResult.innerHTML = `NSSF -${calculateNSSF().toLocaleString()}`
    incomeTaxResult.innerHTML = `INCOME TAX -${calculateIncomeTax().toLocaleString()}`
    nhifResult.innerHTML = `NHIF -${calculateNHIF().toLocaleString()}`
    housingLevyResult.innerHTML = `HOUSING LEVY -${calculateLevy().toLocaleString()}`
    netPayResult.innerHTML = `NET PAY ${calculateNetPay().toLocaleString()}`

    results.append(grossPayResult, nssfResult, incomeTaxResult, nhifResult, housingLevyResult, netPayResult)
}

calculate.addEventListener('click', appendResults)