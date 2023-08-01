// const baseUrl= 'http://3.38.212.163:8000/'
const baseUrl= 'http://127.0.0.1:8000/'
function openRegister() {
    document.getElementById("Register").style.display = "block";
}

function openLogin() {
    document.getElementById("Login").style.display = "block";
}

// Close the modal
function closeModal() {
    document.getElementById("Register").style.display = "none";
    document.getElementById("Login").style.display = "none";
}

document.getElementById("registerForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(document.getElementById("registerForm"));

    fetch(baseUrl+'user/register/', {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if ('message' in data) {
            alert(data.message); // 성공 메시지 띄우기
            sessionStorage.setItem('token', data['token']);
            sessionStorage.setItem('date', data['date']);
            closeModal();
            location.href = "./base.html";
        } else if ('error' in data) {
            const errorDiv = document.getElementById("registerErrorDiv");
            errorDiv.innerHTML = `<p style="color: red">${data.error}</p>`; // 에러 메시지 띄우기
        }
    })
    .catch(error => console.error("Error:", error));
};

document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(document.getElementById("loginForm"));

    fetch(baseUrl + 'user/login/', {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if ('token' in data) {
            // 성공 메시지를 띄우는 경우
            alert('로그인 성공!'); // 또는 서버에서 보내는 메시지 사용 (예: alert(data.message);)
            sessionStorage.setItem('token', data['token']);
            sessionStorage.setItem('date', data['date']);
            closeModal();
            location.href = "./base.html";
        } else if ('error' in data) {
            // 에러 메시지를 표시하는 경우
            const errorDiv = document.getElementById("loginErrorDiv");
            errorDiv.innerHTML = `<p style="color: red">${data.error}</p>`;
        } else {
            // 응답에 필요한 데이터가 없는 경우 또는 다른 처리가 필요한 경우
            console.error('잘못된 응답 데이터입니다:', data);
        }
    })
    .catch(error => console.error("Error:", error));
};