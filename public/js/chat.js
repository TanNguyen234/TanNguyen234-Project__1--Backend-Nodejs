import { FileUploadWithPreview } from 'https://unpkg.com/file-upload-with-preview/dist/index.js';

//files-upload-with-preview
const upload = new FileUploadWithPreview('upload-images', {
  multiple: true,
  maxFileCount: 6
});
//End files-upload-with-preview

// CLIENT_SEND_MESSAGE
const form = document.querySelector(".chat .inner-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements[0].value;
    const images = upload.cachedFileArray;

    if (content || images.length > 0) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        content: content,
        images: images
      });
      e.target.elements[0].value = "";
      upload.resetPreviewPanel();
      socket.emit("CLIENT_SEND_TYPING", "hidden");
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

  let htmlFullName = '';
  let htmlContent = '';
  let htmlImages = '';

  if (data.user_id == myId) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");

    htmlFullName = `<div class='inner-name'> ${data.fullName}</div>`;
  }

  if(data.content) {
    htmlContent = `<div class='inner-content'> ${data.content}</div>`;
  }

  if(data.images.length > 0) {
    htmlImages += `<div class='inner-images'>`;

    for (const image of data.images) {
        htmlImages += `
          <img src=${image} alt='image'/>
        `;
    }

    htmlImages += `</div>`;
  }

  div.innerHTML = `
    ${htmlFullName}
    ${htmlContent}
    ${htmlImages}
  `

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
  const input = document.querySelector(".chat .input-text");
  emoji.addEventListener("emoji-click", (e) => {
    input.value += e.detail.unicode;
    
    const end = input.value.length
    input.setSelectionRange(end, end);//Vì chọn icon input hiểu nhầm là bấm ra ngoài của ô input
    input.focus();

    showTyping();
  });
}

const buttonIcon = document.querySelector(".chat .inner-root .icon");

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
  input.onkeydown = () => {
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