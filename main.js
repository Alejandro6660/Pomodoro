const d = document;

let task = [],
  time = 0,
  timer = null,
  timerBreack = null,
  current = null;

const $btnAdd = d.getElementById("btnAdd"),
  $itTask = d.getElementById("itTask"),
  $form = d.getElementById("form__container"),
  taskName = d.getElementById("taskName");

renderTime();
renderTask();

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ($itTask.value !== "") {
    createTask($itTask.value);
    $itTask.value = "";
    renderTask();
  }
});

let createTask = (value) => {
  const newtask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    compled: false,
  };
  task.unshift(newtask);
};
function renderTask() {
  const result = task.map((task) => {
    return `
  <div class="task">
    <div class="completed">${
      task.compled
        ? `<span class="done">Completado</span>`
        : `<button class="btnStart" id="${task.id}">Iniciar</button>`
    }</div>
    <div class="title">${task.title}</div>
  </div>
`;
  });
  const taskContainer = d.querySelector(".workTime");
  taskContainer.innerHTML = result.join("");

  const $btnStart = d.querySelectorAll(".task .btnStart");
  $btnStart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!timer) {
        const id = btn.getAttribute("data-id");
        strbtnhandler();
        btn.textContent = "En progreso...";
      }
    });
  });
}
let strbtnhandler = (id) => {
  time = 5 * 60;
  current = id;
  const taskIndex = task.findIndex((tasks) => task.id === id);
  taskName.textContent = task[taskIndex].title;

  timer = setInterval(() => {
    timeHandler(id);
  }, 1000);
};
function timeHandler(id) {
  time--;
  renderTime();
  if (time == 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTask();
    startBreak();
  }
}
let startBreak = () => {
  time = 3 * 60;
  taskName.textContent = "Descanso";
  timerBreack = setInterval(() => {
    timeBreakHandler();
  }, 1000);
};
function renderTime() {
  const $time = d.getElementById("value");
  const mm = parseInt(time / 60);
  const ss = parseInt(time % 60);

  $time.textContent = `${mm < 10 ? "0" : ""}${mm}:${ss < 10 ? "0" : ""}${ss}`;
}
function markCompleted(id) {
  const taskIndex = task.findIndex((tasks) => task.id === id);
  task[taskIndex].compled = true;
}
let timeBreakHandler = () => {
  time--;
  renderTime();
  if (time == 0) {
    clearInterval(timerBreack);
    current = null;
    timerBreack = null;
    taskName.textContent = "";
    renderTask();
  }
};
