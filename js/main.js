const token = sessionStorage.getItem('token');
const baseUrl= 'http://127.0.0.1:8000/'

const auth_user = () => {
    if (token) {
    } else {
        alert('로그인이 필요한 서비스입니다.')
        location.href = "index.html"
    }
}

auth_user()

async function loadConversations() {
    try {
        const response = await fetch(baseUrl + 'chatbot/', {
            headers: {
              'Authorization': `token ${token}`, // 토큰 값 추가
            },
        });
        const data = await response.json();
        const modal = document.getElementById('chatModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalQuestion = document.getElementById('modalQuestion');
        const modalAnswer = document.getElementById('modalAnswer');
        
        modalTitle.textContent = '채팅 내역';
        modalQuestion.textContent = '';
        modalAnswer.textContent = '';
        
        data.forEach(conversation => {
            const conversationElement = document.createElement('p');
            conversationElement.innerHTML = `
            <a href="#" class="text-blue-500 hover:underline" onclick="openModal('${conversation.question}', '${conversation.answer}')">
                ${conversation.created_at}
            </a>
            `;
            modalQuestion.appendChild(conversationElement);
        });
        
        modal.classList.remove('hidden');
        } catch (error) {
        console.error('Error fetching conversations:', error);
    }
}
  
function openModal(question, answer) {
const modalQuestion = document.getElementById('modalQuestion');
const modalAnswer = document.getElementById('modalAnswer');
modalQuestion.textContent = question;
modalAnswer.textContent = answer;
const modal = document.getElementById('chatModal');
modal.classList.remove('hidden');
}
  
function closeModal() {
const modal = document.getElementById('chatModal');
modal.classList.add('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
    // 서버에서 데이터를 가져오는 fetch 요청을 보냅니다.
    console.log(`${token}`)
    fetch(baseUrl + "chatbot/", {
        headers: {
            "Authorization": `token ${token}`, // YOUR_TOKEN_HERE를 실제 토큰 값으로 대체해야 합니다.
            },
        })
        .then(response => response.json())
        .then(data => {
            // 서버에서 받아온 데이터를 동적으로 화면에 추가합니다.
            const chatList = document.getElementById("chat-list");
            data.conversations.forEach(conversation => {
                const listItem = document.createElement("li");
                const article = document.createElement("article");
                const contentsWrap = document.createElement("div");
                const questionHeading = document.createElement("h3");
                const answerPara = document.createElement("p");
                const createdAtPara = document.createElement("p");

                // 대화 정보를 엘리먼트에 추가합니다.
                questionHeading.innerText = "Question: " + conversation.question;
                answerPara.innerText = "Answer: " + conversation.answer;
                createdAtPara.innerText = "Created At: " + conversation.created_at;

                // 생성한 엘리먼트들을 상위 엘리먼트에 추가합니다.
                contentsWrap.appendChild(questionHeading);
                contentsWrap.appendChild(answerPara);
                contentsWrap.appendChild(createdAtPara);
                article.appendChild(contentsWrap);
                listItem.appendChild(article);
                chatList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
