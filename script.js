const grossPay = document.querySelector('.gross-pay')
const calculate = document.querySelector('.submit')

function calculateLevy(){
    let housingLevy = 0.015 * grossPay.value
    return housingLevy
}

function calculateNHIF(){
    let basePay = grossPay.value
    let nhif;

    if (basePay <= 5999){
        nhif = 150;
    }
    else if(basePay >= 6000 && basePay <= 7999){
        nhif = 300;
    }
    else if(basePay >= 8000 && basePay <= 11999){
        nhif = 400;
    }
    else if(basePay >= 12000 && basePay <= 14999){
        nhif = 500;
    }
    else if(basePay >= 15000 && basePay <= 19999){
        nhif = 600;
    }
    else if(basePay >= 20000 && basePay <= 24999){
        nhif = 750;
    }
    else if(basePay >= 25000 && basePay <= 29999){
        nhif = 850;
    }
    else if(basePay >= 30000 && basePay <= 34999){
        nhif = 900;
    }
    else if(basePay >= 35000 && basePay <= 39999){
        nhif = 950;
    }
    else if(basePay >= 40000 && basePay <= 44999){
        nhif = 1000;
    }
    else if(basePay >= 45000 && basePay <= 49999){
        nhif = 1100;
    }
    else if(basePay >= 50000 && basePay <= 59999){
        nhif = 1200;
    }
    else if(basePay >= 60000 && basePay <= 69999){
        nhif = 1300;
    }
    else if(basePay >= 70000 && basePay <= 79999){
        nhif = 1400;
    }
    else if(basePay >= 80000 && basePay <= 89999){
        nhif = 1500;
    }
    else if(basePay >= 90000 && basePay <= 99999){
        nhif = 1600;
    }
    else{
        nhif = 1700;
    }

    return nhif;
}

calculate.addEventListener('click', function(){
    let deductableLevy = calculateLevy()
    let netPay = grossPay.value - deductableLevy

    console.log(netPay)
    console.log(calculateNHIF())
} )
