import images from "../images/*.jpg";

const USERS = "users";
const body = document.querySelector("body"),
    container = document.querySelector(".default-text-container"),
    greetingText = container.querySelector(".js-greeting-text"),
    dateText = container.querySelector(".js-date"),
    clock = container.querySelector(".js-clock"),
    form = container.querySelector("form"),
    input = container.querySelector("input");

const toDoContainer = document.querySelector(".js-todo-container");

function getRandumNum() {
    const randumNumber = Math.floor(Math.random() * 7) + 1;
    return randumNumber;
}

function setBackgroundImage() {
    const num = getRandumNum();
    const image = new Image();
    image.src = `${images[num]}`;
    image.classList.add("bg-image");
    image.classList.add("fade-in");
    body.appendChild(image);
}

function setClock() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = date.getDay();
    const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    dateText.innerHTML = `${year}.${month<10?`0${month}`:month}.${day<10?`0${day}`:day} ${dayOfWeek[week]}`;
    const hour = date.getHours();
    const minute = date.getMinutes();
    clock.innerHTML = `${hour>=12?`PM`:`AM`} ${hour<10?`0${hour}`:hour>12?hour-12:hour}:${minute<10?`0${minute}`:minute}`;
}

function showForm() {
    container.style.marginTop = "200px";
    form.classList.remove("hide");
}
function hideForm() {
    container.style.marginTop = "65px";
    form.classList.add("hide");
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem(USERS));
    if(users === null) {
        showForm();
    }else{
      const userName = users.name;
      greetingText.innerHTML = `Hello ${userName}!`;
      toDoContainer.classList.remove("hide");
    }
}

function saveUserName(name) {
    const users = {
        name
    }
    localStorage.setItem(USERS, JSON.stringify(users));
    greetingText.innerHTML = `Hello ${name}!`;
    hideForm();
    toDoContainer.classList.remove("hide");
}

function handleSubmit(e) {
    e.preventDefault();
    const userName = input.value;
    saveUserName(userName);
}

function init() {
    setBackgroundImage();
    setClock();
    setInterval(setClock, 1000);
    loadUsers();
    form.addEventListener("submit", handleSubmit);
}

init();