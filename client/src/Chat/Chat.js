import React from 'react'
import io from 'socket.io-client'

export default function Chat() {
    const socket= io.connect('http://localhost:5000');

    // const socket= io();

    const chatMessage= document.getElementById('chat-messages');
    const chatForm= document.getElementById('chat-form');
    const messageInput= document.getElementById('message-input');

    const handler= chatForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const message= messageInput.value;
        if(message.trim() !== ''){
            // input이 빈칸이 아니라면, 메시지를 전송
            socket.emit('chat message', message);
            // 전송 후, input 빈칸으로 초기화
            messageInput.value='';
        }
    });
    
    socket.on('chat message', (message)=> {
        const Li= document.createElement('Li');
        // textContent는 공백이 있어도 그대로 가져옴
        Li.textContent= message;
        // chatMessage가 Ul임으로 그 아래에 뿌려준다는 의미
        chatMessage.appendChild(Li);
    })

    return (
        <>
            <title>실시간 채팅</title>
            <ul id='chat-messages'></ul>
            <form id='chatForm'>
                <input id='messageInput' autocomplete="off"></input>
                <button type='submit' onClick={handler}>전송</button>
            </form>
        </>
    )
}
