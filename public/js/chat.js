// CLIENT_SEND_MESSAGE
const form = document.querySelector('.chat .inner-form')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = e.target.elements[0].value
    if(content) {
      socket.emit('CLIENT_SEND_MESSAGE', content)
      e.target.elements[0].value = ''
    }
    
})
// End CLIENT_SEND_MESSAGE