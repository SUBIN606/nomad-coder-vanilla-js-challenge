const toDoForm = document.querySelector(".js-toDo-form"),
  toDoInput = form.querySelector("input"),
  pendingArea = document.querySelector(".js-pendingList"),
  finishedArea = document.querySelector(".js-finishedList");

let pendingList = [],
  finishedList = [];

// localStorage에 저장된 toDo 불러오기
const loadTask = () => {
  const pendingTasks = JSON.parse(localStorage.getItem("pending"));
  const finishedTasks = JSON.parse(localStorage.getItem("finished"));
  if (pendingTasks !== null) {
    pendingList = pendingTasks;
    pendingList.forEach(toDo => {
      paintTask(pendingArea, toDo.id, toDo.text);
    });
  }
  if (finishedTasks !== null) {
    finishedList = finishedTasks;
    finishedList.forEach(toDo => {
      paintTask(finishedArea, toDo.id, toDo.text);
    });
  }
};

// localStorage에 toDo 저장
const saveTask = toDos => {
  // localStorage에서는 JS의 object를 그대로 인식하지 못함. String값으로 넣어줘야 함.
  toDos === pendingList
    ? localStorage.setItem("pending", JSON.stringify(toDos))
    : localStorage.setItem("finished", JSON.stringify(toDos));
};

const deleteTask = e => {
  const li = e.target.parentNode;

  if (li.parentNode === pendingArea) {
    const afterDelete = pendingList.filter(toDo => {
      return toDo.id !== parseInt(li.id);
    });
    pendingList = afterDelete;

    pendingArea.removeChild(li);
    saveTask(pendingList);
  } else {
    const afterDelete = finishedList.filter(toDo => {
      return toDo.id !== parseInt(li.id);
    });
    finishedList = afterDelete;

    finishedArea.removeChild(li);
    saveTask(finishedList);
  }
};

const finishTask = e => {
  const li = e.target.parentNode;

  const finished = pendingList.find(toDo => toDo.id === parseInt(li.id));
  finishedList.push(finished);
  saveTask(finishedList);
  paintTask(finishedArea, finished.id, finished.text);

  const afterFinish = pendingList.filter(toDo => {
    return toDo.id !== parseInt(li.id);
  });
  pendingList = afterFinish;
  saveTask(pendingList);
  pendingArea.removeChild(li);
};

const cancleTask = e => {
  const li = e.target.parentNode;
  const cancled = finishedList.find(toDo => toDo.id === parseInt(li.id));
  pendingList.push(cancled);
  saveTask(pendingList);
  paintTask(pendingArea, cancled.id, cancled.text);

  const afterCancle = finishedList.filter(toDo => {
    return toDo.id !== parseInt(li.id);
  });
  finishedList = afterCancle;
  saveTask(finishedList);
  finishedArea.removeChild(li);
};

// 화면에 toDo 나타나게
const paintTask = (area, newId, text) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");

  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTask);

  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);

  if (area === pendingArea) {
    const finishBtn = document.createElement("button");
    finishBtn.innerText = "✅";
    finishBtn.addEventListener("click", finishTask);
    li.appendChild(finishBtn);

    pendingArea.appendChild(li);
  } else {
    const cancleBtn = document.createElement("button");
    cancleBtn.innerText = "⏪";
    cancleBtn.addEventListener("click", cancleTask);
    li.appendChild(cancleBtn);

    finishedArea.appendChild(li);
  }
};

const handleToDoSubmit = e => {
  e.preventDefault();
  const text = toDoInput.value;
  const newId = Date.now();
  const newTask = { id: newId, text: text };

  pendingList.push(newTask);
  saveTask(pendingList);
  toDoInput.value = "";
  paintTask(pendingArea, newId, text);
};

const toDoInit = () => {
  loadTask();
  toDoForm.addEventListener("submit", handleToDoSubmit);
};
toDoInit();
