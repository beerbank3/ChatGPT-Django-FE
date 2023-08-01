const token = sessionStorage.getItem('token');
const baseUrl= 'http://127.0.0.1:8000/';
const deleteButton = document.querySelector(".deleteButton");
const chatList = document.querySelector(".chat-list");

const auth_user = () => {
    if (token) {
    } else {
        alert('로그인이 필요한 서비스입니다.')
        location.href = "index.html"
    }
}

auth_user()

async function loadConversations() {
    const data = document.querySelector(".prompt").value;
    const formData = new FormData();
    formData.append('prompt', data);
    
    fetch(baseUrl + "chatbot/", {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body:formData,
    })
        .then(response => response.json())
        .then(data => {
            data.messages.forEach(conversation => {
                // 질문을 위한 flexContainerQuestion을 생성합니다.
                if(conversation.role==="user"){
                    const flexContainerQuestion = document.createElement("div");
                    flexContainerQuestion.classList.add("flex", "items-center");

                    // 질문을 표시하는 엘리먼트를 생성합니다.
                    const divUserQuestion = document.createElement("div");
                    divUserQuestion.classList.add("bg-gray-300", "text-white", "py-2", "px-4", "rounded-l-lg");
                    divUserQuestion.innerText = conversation.role;
                    flexContainerQuestion.appendChild(divUserQuestion);

                    const divQuestion = document.createElement("div");
                    divQuestion.classList.add("bg-gray-200", "py-2", "px-4", "rounded-r-lg");
                    divQuestion.innerText = conversation.content;
                    flexContainerQuestion.appendChild(divQuestion);

                    // 질문을 추가합니다.
                    chatList.appendChild(flexContainerQuestion);
                }else{
                    // 답변을 위한 flexContainerAnswer를 생성합니다.
                    const flexContainerAnswer = document.createElement("div");
                    flexContainerAnswer.classList.add("flex", "items-center", "justify-end");

                    // 답변을 표시하는 엘리먼트를 생성합니다.
                    const divGPTAnswer = document.createElement("div");
                    divGPTAnswer.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded-l-lg");
                    divGPTAnswer.innerText = conversation.role;
                    flexContainerAnswer.appendChild(divGPTAnswer);

                    const divAnswer = document.createElement("div");
                    divAnswer.classList.add("bg-gray-200", "py-2", "px-4", "rounded-r-lg");
                    divAnswer.innerText = conversation.content;
                    flexContainerAnswer.appendChild(divAnswer);

                    // 답변을 추가합니다.
                    chatList.appendChild(flexContainerAnswer);
                }
            });
    });

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
    fetch(baseUrl + "chatbot/", {
        headers: {
            "Authorization": `token ${token}`, // YOUR_TOKEN_HERE를 실제 토큰 값으로 대체해야 합니다.
        },
    })
        .then(response => response.json())
        .then(data => {
            data.conversations_today.forEach(conversation => {
                // 질문을 위한 flexContainerQuestion을 생성합니다.
                const flexContainerQuestion = document.createElement("div");
                flexContainerQuestion.classList.add("flex", "items-center");

                // 질문을 표시하는 엘리먼트를 생성합니다.
                const divUserQuestion = document.createElement("div");
                divUserQuestion.classList.add("bg-gray-300", "text-white", "py-2", "px-4", "rounded-l-lg");
                divUserQuestion.innerText = "USER";
                flexContainerQuestion.appendChild(divUserQuestion);

                const divQuestion = document.createElement("div");
                divQuestion.classList.add("bg-gray-200", "py-2", "px-4", "rounded-r-lg");
                divQuestion.innerText = conversation.question;
                flexContainerQuestion.appendChild(divQuestion);

                // 질문을 추가합니다.
                chatList.appendChild(flexContainerQuestion);

                // 답변을 위한 flexContainerAnswer를 생성합니다.
                const flexContainerAnswer = document.createElement("div");
                flexContainerAnswer.classList.add("flex", "items-center", "justify-end");

                // 답변을 표시하는 엘리먼트를 생성합니다.
                const divGPTAnswer = document.createElement("div");
                divGPTAnswer.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded-l-lg");
                divGPTAnswer.innerText = "GPT";
                flexContainerAnswer.appendChild(divGPTAnswer);

                const divAnswer = document.createElement("div");
                divAnswer.classList.add("bg-gray-200", "py-2", "px-4", "rounded-r-lg");
                divAnswer.innerText = conversation.answer;
                flexContainerAnswer.appendChild(divAnswer);

                // 답변을 추가합니다.
                chatList.appendChild(flexContainerAnswer);
            });
            // 오늘 날짜의 대화 기록을 화면에 추가합니다.

            // 다른 날짜의 대화 기록을 화면에 추가합니다.
            const chatOtherList = document.querySelector(".other-list");
            data.conversations_other_dates.forEach(conversation => {
                // 대화 정보를 표시하는 div 엘리먼트를 생성합니다.
                const divWrapper = document.createElement("div");
                divWrapper.classList.add("flex", "items-center");
              
                // 왼쪽 배경 엘리먼트 생성
                const leftBgDiv = document.createElement("div");
                leftBgDiv.classList.add("bg-gray-300", "text-white", "py-2", "px-4", "rounded-l-lg");
                leftBgDiv.innerText = `${conversation.date}`;
              
              
                // 오른쪽 배경 엘리먼트 생성
                const rightBgDiv = document.createElement("div");
                rightBgDiv.classList.add("bg-gray-200", "py-2", "px-4", "rounded-r-lg");
              
                // 대화 내용 엘리먼트 생성
                const contentDiv = document.createElement("div");
                contentDiv.innerHTML = `${conversation.first_question}`;
              
                // 오른쪽 배경 엘리먼트에 대화 내용 엘리먼트 추가
                rightBgDiv.appendChild(contentDiv);
              
                // 생성한 엘리먼트들을 상위 엘리먼트에 추가합니다.
                divWrapper.appendChild(leftBgDiv);
                divWrapper.appendChild(rightBgDiv);
              
                // 기존 요소에 추가합니다.
                chatOtherList.appendChild(divWrapper);
              });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

function logout() {

    // 로그아웃 요청 보내기
    fetch(baseUrl + 'user/logout/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`, // 로컬 스토리지에 저장된 토큰을 헤더에 포함
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status === 200) {
            // 로그아웃 성공
            alert('로그아웃되었습니다.');
            localStorage.removeItem('token'); // 로그아웃 후 로컬 스토리지의 토큰 제거
            window.location.href = '/'; // 로그인 페이지 등으로 이동하거나, 원하는 페이지로 리다이렉트 가능
        } else {
            // 로그아웃 실패
            alert('로그아웃에 실패하였습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('로그아웃 요청에 오류가 발생하였습니다.');
    });
}

deleteButton.addEventListener('click', () => {
    // 서버로 보낼 데이터
    console.log(sessionStorage.getItem('conversations'))
    const data = {
      date: '2023-07-31' // 날짜 데이터를 여기에 넣어주세요.
    };
  
    // fetch를 사용하여 서버로 데이터를 전송
    fetch(baseUrl+'chatbo/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // 서버로부터의 응답을 처리하는 코드
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });