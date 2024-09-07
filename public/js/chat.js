// CLIENT_SEND_MESSAGE
const form = document.querySelector(".chat .inner-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const content = e.target.elements[0].value;
  if (content) {
    socket.emit("CLIENT_SEND_MESSAGE", content);
    e.target.elements[0].value = "";
  }
});
// End CLIENT_SEND_MESSAGE
// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  if (data.user_id == myId) {
    div.classList.add("inner-outgoing");
    div.innerHTML = `
          <div class='inner-content'>${data.content}</div>
        `;
  } else {
    div.classList.add("inner-incoming");
    div.innerHTML = `
      <div class='inner-name'> ${data.fullName}</div>
      <div class='inner-content'>${data.content}</div>
    `;
  }
  body.appendChild(div);
  bodyChat.scrollTop = bodyChat.scrollHeight; //Khi cập nhật tin mới cũng cập nhật scroll
});
// End SERVER_RETURN_MESSAGE

//Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight; // scroll to bottom on new message
}
//End Scroll Chat To Bottom

//Show Icon Chat
const emoji = document.querySelector("emoji-picker");
if (emoji) {
  const input = document.querySelector(".chat input");
  emoji.addEventListener("emoji-click", (e) => {
    input.value += e.detail.unicode;
  });
}

const buttonIcon = document.querySelector(".chat .inner-root span");

if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
//End Show Icon Chat
