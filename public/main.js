const socket = io.connect(location.href);

// dom
const message = document.querySelector('#message'),
  handle = document.querySelector('#name'),
  chat_window = document.querySelector('.chat-window')
btn = document.querySelector('#send'),
  output = document.querySelector('#output'),
  feedback = document.querySelector('#feedback'),
  clean = document.querySelector('#clean');
// event
btn.addEventListener('click', () => {
  if (message.value != '' && handle.value != '') {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
  } else {
    if (message.value != '') alert('Bạn phải nhập tên!')
    if (handle.value != '') alert('Bạn phải nhập tin nhắn!')
  }
  message.value = '';
});

// gửi sự kiện typing
message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

socket.on('chat', data => {
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
  // cuộn cuối
  chat_window.scrollTop = chat_window.scrollHeight - chat_window.clientHeight;
});
let timer = setTimeout(makeNoTypingState, 1000);
//bắt sự kiện typing
socket.on('typing', data => {
  console.log(feedback.innerHTML);  
  feedback.innerHTML = `<p class='typing'><em>${data} đang nhập</em></p>`;
  // cuộn cuối
  chat_window.scrollTop = chat_window.scrollHeight - chat_window.clientHeight;
  clearTimeout(timer);
  //sau 2s tự biến mất
  timer = setTimeout(makeNoTypingState, 2000);
});
function makeNoTypingState() {
  feedback.innerHTML = "";
}
