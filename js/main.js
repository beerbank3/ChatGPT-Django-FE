const token = sessionStorage.getItem('token');
const baseUrl= 'http://127.0.0.1:8000/';
const deleteButton = document.querySelector(".deleteButton");
const chatList = document.querySelector(".chat-list");
const $textarea = document.querySelector("textarea");

const Sessiondate = sessionStorage.getItem('date');

let letdate = Sessiondate

$textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px'; // 내용에 맞게 너비 조정
});
$textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        console.log("cehclk")
        $textarea.value += "\n";
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        loadConversations();
    }
});
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
    formData.append('date',letdate);
    
    fetch(baseUrl + "chatbot/", {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body:formData,
    })
        .then(response => response.json())
        .then(data => {
            mainData(letdate)
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
                }else if(conversation.role==="assistant"){
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
        $textarea.value = "";
        chatList.scrollTop = chatList.scrollHeight;
    });

}

function mainData(date) {
    // 서버에서 데이터를 가져오는 fetch 요청을 보냅니다.
    letdate = date;
    fetch(baseUrl + "chatbot/?date="+date, {
        method: 'GET',
        headers: {
            "Authorization": `token ${token}`, // YOUR_TOKEN_HERE를 실제 토큰 값으로 대체해야 합니다.
        },
    })
        .then(response => response.json())
        .then(data => {
            chatList.innerHTML = '';
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
            chatOtherList.innerHTML = '';
            data.conversations_other_dates.forEach(conversation => {
                // 대화 정보를 표시하는 div 엘리먼트를 생성합니다.
                const divWrapper = document.createElement("div");
                divWrapper.classList.add("flex", "items-center");

                // 왼쪽 배경 엘리먼트 생성
                const leftBgDiv = document.createElement("div");
                leftBgDiv.classList.add("bg-gray-300", "text-white", "py-2", "px-4", "rounded-l-lg","whitespace-nowrap");
                leftBgDiv.innerText = `${conversation.date}`;

                // 오른쪽 배경 엘리먼트 생성
                const rightBgDiv = document.createElement("div");
                rightBgDiv.classList.add("bg-gray-200", "py-2", "px-4", "rounded-r-lg","overflow-hidden","whitespace-nowrap","overflow-ellipsis");

                // 대화 내용 엘리먼트 생성
                const contentDiv = document.createElement("div");
                contentDiv.innerHTML = `${conversation.first_question}`;

                // 오른쪽 배경 엘리먼트에 대화 내용 엘리먼트 추가
                rightBgDiv.appendChild(contentDiv);

                const deleteButton = document.createElement("div");
                deleteButton.classList.add("delete-button", "px-3", "py-1", "bg-red-200", "text-white", "rounded-md", "cursor-pointer", "flex", "items-center", "justify-center");
                deleteButton.innerHTML = `<span class="text-xl font-bold">×</span>`; // Using innerHTML to add an "X" symbol
                deleteButton.addEventListener("click", () => {
                    Chatdelete(conversation.date);
                });

                // 생성한 엘리먼트들을 상위 엘리먼트에 추가합니다.
                divWrapper.appendChild(leftBgDiv);
                divWrapper.appendChild(rightBgDiv);

                divWrapper.addEventListener("click", () => {
                    mainData(conversation.date);
                });
                divWrapper.addEventListener("mouseover", function () {
                    divWrapper.style.cursor = "pointer";
                });
                divWrapper.addEventListener("mouseout", function () {
                    divWrapper.style.cursor = "default";
                });

                divWrapper.appendChild(deleteButton);
                // 기존 요소에 추가합니다.
                chatOtherList.appendChild(divWrapper);
            });
            chatList.scrollTop = chatList.scrollHeight;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

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

function Chatdelete(date){
    const formData = new FormData();
    formData.append('date', date);

    // fetch를 사용하여 서버로 데이터를 전송
    fetch(baseUrl+'chatbot/delete/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        mainData(Sessiondate)
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

mainData(Sessiondate)