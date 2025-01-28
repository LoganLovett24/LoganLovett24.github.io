class Chatbox {
    constructor(sendBtnSelector, chatInputSelector, chatMessagesSelector) {
        this.responses = [
            "This is a mock response",
            "Haha, wow!",
            "I will add your response to my list",
            "This is just like pulling on Woody's string",
            "There's a snake in my boot!",
            "That's nice.",
            "God I wish I had a lizard right now.",
            "God I wish I had tea right now.",
            "God I wish I had a good response right now."
        ];
        this.sendBtn = document.getElementById(sendBtnSelector);
        this.chatInput = document.getElementById(chatInputSelector);
        this.chatMessages = document.getElementById(chatMessagesSelector);
    }

    init() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const message = this.chatInput.value.trim();

        if (message) {
            this.responses.push(message);
            if (this.responses.length > 20) {
                this.responses.shift();
            }

            this.displayMessage('You', message);
            this.chatInput.value = '';

            setTimeout(() => {
                const randomResponse = this.responses[Math.floor(Math.random() * this.responses.length)];
                this.displayMessage('Logan', randomResponse);
            }, 1000);
        }
    }

    displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

const chatbox = new Chatbox('send-btn', 'chat-input', 'chat-messages');
chatbox.init();
