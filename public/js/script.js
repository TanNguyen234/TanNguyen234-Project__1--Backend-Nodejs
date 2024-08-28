// Show Alert 
const showAlert = document.querySelector('[show-alert]');

if(showAlert) {
    const time = showAlert.getAttribute('data-time');

    setTimeout(() =>{
        showAlert.classList.add('alert-hidden');
    }, time)

    var closeAlert = showAlert.querySelector('[close-alert]');
}

if(closeAlert) {
    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    })
}
// End Show Alert 
//Delete Product In Cart
const inputsQuantity = document.querySelectorAll('[item-id]')

if(inputsQuantity.length > 0) {
    inputsQuantity.forEach(input => {
        input.addEventListener('change', () => {
            const productId = input.getAttribute('item-id')
            window.location.href = `/cart/update/${productId}/${input.value}`
        })
    })
}
//End Delete Product In Cart