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