const socket = io();

let username='';

document.getElementById('join-btn').addEventListener('click',(event)=>{
    event.preventDefault();
    username = document.getElementById('username-input').value;
    if(username.trim()!==''){
        document.querySelector('.form-username').style.display='none';
        document.querySelector('.chatroom-container').style.display='block';
    }
})

document.getElementById('send-button').addEventListener('click', (event) => {
    event.preventDefault();
    const data = {
        username: username,
        message: document.getElementById('message-input').value,
    }

    socket.emit('message', data);

    addMessageFn(data);
})

socket.on('message', (data) => {
    if(data.username !== username) {
        addMessageFnRe(data);
    }
})

function addMessageFn(data){
    var msgDiv = document.createElement('div');
    msgDiv.innerText=`${data.username}: ${data.message}`;
    msgDiv.setAttribute('class', 'message sent');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}

function addMessageFnRe(data){
    var msgDiv = document.createElement('div');
    msgDiv.innerText=`${data.username}: ${data.message}`;
    msgDiv.setAttribute('class','message recived');
    document.getElementById('message-container').appendChild(msgDiv);
    document.getElementById('message-input').value='';
}