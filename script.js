const grossPay = document.querySelector('.gross-pay')
const calculate = document.querySelector('.submit')

function calculateLevy(){
    let housingLevy = 0.015 * grossPay.value
    return housingLevy
}

calculate.addEventListener('click', function(){
    let deductableLevy = calculateLevy()
    let netPay = grossPay.value - deductableLevy

    console.log(netPay)
} )
