let bill = document.getElementById('bill')
let btnTip = document.querySelectorAll('.btn_tip')
let btnTipCustom = document.querySelector('.btn_tip_custom')
let inputCustom = document.getElementById('custom')
let numberPeople = document.getElementById('number_people')
let tipAmount = document.getElementById('tip_amount')
let total = document.getElementById('total')
let resetBtn = document.querySelector('.reset_btn')
let errorMsgBill = document.querySelector('.bill_span')
let errorMsgNumberPeople = document.querySelector('.number_people_span')
let currentBtnTip = 0

function calc() {
    if (bill.value == 0) {
        bill.style.border = '2px solid var(--red)'
        errorMsgBill.classList.remove('hide')
    } else {
        bill.style.border = '2px solid var(--strong_cyan)'
        errorMsgBill.classList.add('hide')
    }

    if (numberPeople.value == 0) {
        numberPeople.style.border = '2px solid var(--red)'
        errorMsgNumberPeople.classList.remove('hide')
    } else {
        numberPeople.style.border = '2px solid var(--strong_cyan)'
        errorMsgNumberPeople.classList.add('hide')
    }

    if (inputCustom.value == '') {
        tipAmount.innerHTML = `$ ${(((btnTip[currentBtnTip].textContent.replace('%', "") * bill.value) / 100) /
            numberPeople.value).toFixed(2)}`

        total.innerHTML = `$ ${((((btnTip[currentBtnTip].textContent.replace('%', "") * bill.value) / 100) + Number(bill
            .value)) / numberPeople.value).toFixed(2)}`
    } else {
        tipAmount.innerHTML = `$ ${(((inputCustom.value * bill.value) / 100) /
            numberPeople.value).toFixed(2)}`

        total.innerHTML = `$ ${((((inputCustom.value * bill.value) / 100) + Number(bill
            .value)) / numberPeople.value).toFixed(2)}`
    }

    if (tipAmount.innerHTML != '$ 0.00' && total.innerHTML != '$ 0.00') {
        resetBtn.style.opacity = '1'
    }

    if (tipAmount.innerHTML == '$ Infinity' || tipAmount.innerHTML == '$ NaN' || total.innerHTML == '$ Infinity' ||
        total
            .innerHTML == '$ NaN') {
        tipAmount.value = ''
        tipAmount.innerHTML = '$ 0.00'

        total.value = ''
        total.innerHTML = '$ 0.00'
    }
}

for (let i = 0; i < btnTip.length; i++) {
    btnTip[i].addEventListener('click', () => {
        btnTipCustom.style.display = 'block'
        inputCustom.value = ''
        inputCustom.innerHTML = ''
        inputCustom.classList.add('hide')

        btnTip[currentBtnTip].style.backgroundColor = 'var(--very_dark_cyan)'
        btnTip[i].style.backgroundColor = 'var(--strong_cyan)'
        currentBtnTip = i
    })
}

btnTipCustom.addEventListener('click', () => {
    btnTip[currentBtnTip].style.backgroundColor = 'var(--very_dark_cyan)'
    btnTipCustom.style.display = 'none'
    inputCustom.classList.remove('hide')
})

bill.addEventListener('input', calc)

for (let i = 0; i < btnTip.length; i++) {
    btnTip[i].addEventListener('click', calc)
}

inputCustom.addEventListener('input', calc)

numberPeople.addEventListener('input', calc)

function reset() {
    resetBtn.style.opacity = '0.1'

    bill.value = ''
    bill.innerHTML = ''

    for (let i = 0; i < btnTip.length; i++) {
        btnTip[i].style.backgroundColor = 'var(--very_dark_cyan)'
        currentBtnTip = 0
    }

    btnTipCustom.style.display = 'block'
    inputCustom.value = ''
    inputCustom.innerHTML = ''
    inputCustom.classList.add('hide')

    numberPeople.value = ''
    numberPeople.innerHTML = ''

    tipAmount.value = ''
    tipAmount.innerHTML = '$ 0.00'

    total.value = ''
    total.innerHTML = '$ 0.00'
}