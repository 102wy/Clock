window.onload = function () {
  // greeting section

  const loginForm = document.querySelector("#login-form");
  const loginInput = document.querySelector("#login-form input");
  const greeting = document.querySelector("#greeting");

  const hiddenClassName = "hidden";
  const userNameKey = "username";

  function onLoginSubmit(e) {
    e.preventDefault();
    loginForm.classList.add(hiddenClassName);
    const userName = loginInput.value;
    localStorage.setItem(userNameKey, userName);
    paintGreeting(userName);
  }

  const saveUserName = localStorage.getItem(userNameKey);

  function paintGreeting(userName) {
    greeting.innerText = `Hello ${userName}`;
    greeting.classList.remove(hiddenClassName);
  }

  if (saveUserName === null) {
    // show the form
    loginForm.classList.remove(hiddenClassName);
    loginForm.addEventListener("submit", onLoginSubmit);
  } else {
    // show the greeting
    paintGreeting(saveUserName);
  }

  // clock
  const clock = document.querySelector("#clock");

  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    clock.innerText = `${hours}:${minutes}:${seconds}`;
  }

  getClock();
  setInterval(getClock, 1000);

  // quotes
  const quotes = [
    {
      quote: "What do you want a meaning for? Life is a desire, not a meaning.",
      author: "Charlie Chaplin",
    },
    {
      quote:
        "When you jump for joy, beware that no one moves the ground from beneath your feet.",
      author: "Stanislaw J. Lec",
    },
    {
      quote:
        "Time is a cruel thief to rob us of our former selves. We lose as much to life as we do to death.",
      author: "Elizabeth Forsythe Hailey",
    },
    {
      quote:
        "It is wise to apply the oil of refined politeness to the mechanisms of friendship.",
      author: "Colette",
    },
    {
      quote: "A penny saved is a penny earned.",
      author: "Benjamin Franklin",
    },
    {
      quote: "Mistakes are the portals of discovery.",
      author: "James Joyce",
    },
    {
      quote: "By perseverance the snail reached the ark.",
      author: "Charles Haddon Spurgeon",
    },
    {
      quote:
        "If I had to live my life again, I'd make the same mistakes, only sooner.",
      author: "Tallulah Bankhead",
    },
    {
      quote: "Force without wisdom falls of its own weight.",
      author: "Horace",
    },
    {
      quote: "Suspicion always haunts the guilty mind.",
      author: "William Shakespeare",
    },
  ];

  const quote = document.querySelector("#quote span:first-child");
  const author = document.querySelector("#quote span:last-child");

  const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

  quote.innerText = todaysQuote.quote;
  author.innerText = todaysQuote.author;

  //Background

  const images = ["img01.jpg", "img02.jpg", "img03.jpg", "img04.jpg"];
  const chosenImg = images[Math.floor(Math.random() * images.length)];

  const bgImg = document.createElement("img");

  bgImg.src = `img/${chosenImg}`;

  document.body.appendChild(bgImg);

  //Todo-List
  const toDoForm = document.getElementById("todo-form");
  const toDoInput = toDoForm.querySelector("input");
  const toDoList = document.getElementById("todo-list");

  const TODOS_KEY = "todos";

  let toDos = [];

  function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  }

  function deleteTodo(e) {
    const li = e.target.parentElement;
    console.log(li.id);
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id != Number(li.id));
    saveToDos();
  }

  function paintTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
  }

  function handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveToDos();
  }

  toDoForm.addEventListener("submit", handleTodoSubmit);

  const savedToDos = localStorage.getItem(TODOS_KEY);

  if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo);
  }

  //weather

  const API_KEY = "91cba7286a056f934df1823e392e1be3";

  function onGeoOK(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");

        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main}  ${data.main.temp}`;
      });
  }

  function onGeoError() {
    alert("Can't find you. No weather for you");
  }

  navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
};
