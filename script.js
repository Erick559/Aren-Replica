const grossPay = document.querySelector('.gross-pay')
const calculate = document.querySelector('.submit')
const reset = document.querySelector('.reset')
const resetSelection = document.querySelector('.reset-checkbox')
const form = document.querySelector('.form')
const formDetails = document.querySelector('.form-details')
const radioButtons = document.querySelectorAll('input[name="group"]');


function getGrossPay() {
    return parseFloat(grossPay.value)
}

function calculateLevy() {
    let income = getGrossPay()
    let housingLevy = 0.015 * income
    return housingLevy
}

function calculateNHIF() {
    let basePay = getGrossPay()
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

    if (nssfTier1.checked) {
        nssf = 360;
    } else if (nssfTier1_2.checked) {
        nssf = 1080;
    }

    resetSelection.addEventListener('click', function() {
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false)
    })


    return nssf
}

function calculateIncomeTax() {
    let nssfDeductable = calculateNSSF()
    let taxableIncome = getGrossPay() - nssfDeductable
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

    let netPay = getGrossPay() - totalDeductions

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


    let results = document.querySelector('.form-results')
    results = document.createElement('div')
    results.classList.add('form-results')
    formDetails.appendChild(results)

    let grossPayDiv = document.createElement('div')
    grossPayDiv.classList.add('gross-pay-result')
    let grossPayResult = document.createElement('p')
    let grossPayTitle = document.createElement('p')
    grossPayTitle.classList.add('gross-pay-title')
    grossPayDiv.append(grossPayTitle, grossPayResult)

    let nssfDiv = document.createElement('div')
    nssfDiv.classList.add('nssf-result')
    let nssfResult = document.createElement('p')
    let nssfTitle = document.createElement('p')
    nssfTitle.classList.add('nssf-result-title')
    nssfDiv.append(nssfTitle, nssfResult)

    let incomeTaxDiv = document.createElement('div')
    incomeTaxDiv.classList.add('income-tax-result')
    let incomeTaxResult = document.createElement('p')
    let incomeTaxTitle = document.createElement('p')
    incomeTaxTitle.classList.add('income-tax-title')
    incomeTaxDiv.append(incomeTaxTitle, incomeTaxResult)

    let nhifDiv = document.createElement('div')
    nhifDiv.classList.add('nhif-result')
    let nhifResult = document.createElement('p')
    let nhifTitle = document.createElement('p')
    nhifTitle.classList.add('nhif-result-title')
    nhifDiv.append(nhifTitle, nhifResult)

    let housingLevyDiv = document.createElement('div')
    housingLevyDiv.classList.add('housing-Levy-result')
    let housingLevyResult = document.createElement('p')
    let housingLevyTitle = document.createElement('p')
    housingLevyTitle.classList.add('housing-Levy-title');
    housingLevyDiv.append(housingLevyTitle, housingLevyResult)

    let netPayDiv = document.createElement('div')
    netPayDiv.classList.add('net-pay-result')
    let netPayResult = document.createElement('p')
    netPayResult.classList.add('net-pay-value')
    let netPayTitle = document.createElement('p')
    netPayTitle.classList.add('net-pay-title')
    netPayDiv.append(netPayTitle, netPayResult)

    grossPayTitle.innerHTML = 'GROSS-PAY '
    nssfTitle.innerHTML = 'NSSF'
    incomeTaxTitle.innerHTML = 'INCOME TAX'
    nhifTitle.innerHTML = 'NHIF'
    housingLevyTitle.innerHTML = 'HOUSING LEVY'
    netPayTitle.innerHTML = 'NET PAY'

    grossPayResult.innerHTML = `${displayedGrossPay.toLocaleString()}`
    nssfResult.innerHTML = `-${calculateNSSF().toLocaleString()}`
    incomeTaxResult.innerHTML = `-${calculateIncomeTax().toLocaleString()}`
    nhifResult.innerHTML = `-${calculateNHIF().toLocaleString()}`
    housingLevyResult.innerHTML = `-${calculateLevy().toLocaleString()}`
    netPayResult.innerHTML = `${calculateNetPay().toLocaleString()}`

    results.append(grossPayDiv, nssfDiv, incomeTaxDiv, nhifDiv, housingLevyDiv, netPayDiv)
}

calculate.addEventListener('click', function() {
    // Check if the results are already present
    let results = document.querySelector('.form-results');
    calculate.style.color = 'white'

    if (!results) {
        // If results are not present, append them
        appendResults();
    } else {
        // If results are already present, you may choose to update them or do nothing
        console.log('Results are already displayed.');
    }
})

reset.addEventListener('click', function() {
    grossPay.value = 0
    calculate.style.color = 'black'

    let results = document.querySelector('.form-results')

    if (results) {
        results.remove()
    }
})

// Add a change event listener to each radio button
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
        // Uncheck all other radio buttons in the same group
        radioButtons.forEach(function(otherRadioButton) {
            if (otherRadioButton !== radioButton) {
                otherRadioButton.checked = false;
            }
        });
    });
});

grossPay.addEventListener('click', function() {
    grossPay.value = ''
})