const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.getElementById("btn");
const loginNav = document.getElementById("loginNav");
const usersNav = document.getElementById("usersNav");
const usersDiv = document.querySelector(".users");
const loginDiv = document.querySelector(".login");
const logoutNav = document.getElementById("logout");

let token = localStorage.getItem("token") || "";

function hideViews() {
  loginDiv.classList.add("d-none");
  loginNav.classList.add("d-none");
  usersDiv.classList.add("d-none");
  usersNav.classList.add("d-none");
  logoutNav.classList.add("d-none");
}

function showNavLogged() {
  usersNav.classList.remove("d-none");
  logoutNav.classList.remove("d-none");
}
function logged() {
  if (token.length > 0) {
    hideViews();
    showNavLogged();
    goUsers();
  }
}
logged();

async function login(e) {
  e.preventDefault();
  const userObj = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  const res = await axios.post("https://reqres.in/api/login", userObj);
  token = res.data.token;
  localStorage.setItem("token", token);
  logged();
}

async function goUsers() {
  //   loginDiv.classList.add("d-none"); //escondemos el login
  //   usersDiv.classList.remove("d-none"); //mostramos la vista users
  hideViews();
  showNavLogged();
  usersDiv.classList.remove("d-none");

  const res = await axios.get("https://reqres.in/api/users?page=2", {
    headers: {
      Authorization: token,
    },
  });
  res.data.data.forEach((element) => {
    usersDiv.innerHTML += `
    <div class="card text-white bg-info mb-3 m-5" style="width: 20rem;">
  <div class="card-header">${element.first_name}</div>
  <div class="card-body">
    <h4 class="card-title">${element.email}</h4>
    <img src="${element.avatar}" alt="imagen">
    </div>
</div>
    `;
  });
}

function logout() {
  localStorage.removeItem("token");
  token = "";
  hideViews();
  loginNav.classList.remove("d-none");
  loginDiv.classList.remove("d-none");
}

btn.addEventListener("click", login);
usersNav.addEventListener("click", goUsers);
logoutNav.addEventListener("click",logout)
