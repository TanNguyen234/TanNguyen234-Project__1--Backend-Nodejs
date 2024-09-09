// CLIENT_SEND_MESSAGE
const form = document.querySelector(".chat .inner-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("CLIENT_SEND_TYPING", "hidden");
    const content = e.target.elements[0].value;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements[0].value = "";
    }
  });
}
// End CLIENT_SEND_MESSAGE
// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  const boxTyping = document.querySelector(".chat .inner-list-typing");

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

  body.insertBefore(div, boxTyping); //Phải insert trước cái typing nếu không cái typing sẽ bị đẩy dần lên trên sau khi gửi message
  bodyChat.scrollTop = bodyChat.scrollHeight; //Khi cập nhật tin mới cũng cập nhật scroll
});
// End SERVER_RETURN_MESSAGE

//Scroll Chat To Bottom
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight; // scroll to bottom on new message
}
//End Scroll Chat To Bottom

//Show Typing
function showTyping() {
  socket.emit("CLIENT_SEND_TYPING", "show");

  clearTimeout(timeOut); //Xóa cái timeout trước đó nếu không sẽ bị lỗi

  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
}
//End Show Typing

//Show Icon Chat
const emoji = document.querySelector("emoji-picker");
if (emoji) {
  const input = document.querySelector(".chat input");
  emoji.addEventListener("emoji-click", (e) => {
    input.value += e.detail.unicode;
    
    const end = input.value.length
    input.setSelectionRange(end, end);//Vì chọn icon input hiểu nhầm là bấm ra ngoài của ô input
    input.focus();

    showTyping();
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

//Typing
var timeOut;
const input = document.querySelector(".chat .inner-root input");
if (input) {
  input.onkeyup = () => {
    showTyping();
  };
}

const elementListTyping = document.querySelector(".chat .inner-list-typing");

if (elementListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show") {
      const boxTypingExist = elementListTyping.querySelector(
        `[user-id="${data.user_id}"]`
      );

      if (!boxTypingExist) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.user_id);

        boxTyping.innerHTML = `
         <div class='box-typing'>
           <div class='inner-name'> ${data.fullName} </div>
           <div class='inner-dots'>
            <span></span> 
            <span></span>  
            <span></span> 
           </div>
         </div>
        `;

        elementListTyping.appendChild(boxTyping);
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      const boxTypingRemove = elementListTyping.querySelector(
        `[user-id="${data.user_id}"]`
      );
      if (boxTypingRemove) {
        boxTypingRemove.remove();
      }
    }
  });
}
//End Typing
