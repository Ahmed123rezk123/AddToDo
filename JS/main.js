let input = document.querySelector(".input");

let add = document.querySelector(".add");

let tasksDiv = document.querySelector(".tasks");

getDataLocalStorage();

let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

tasksDiv.addEventListener("click", function (e) {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove From Localstorage
    deleteWithLocal(e.target.parentElement.getAttribute("data-id"));
    // Remove From page
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));

    e.target.classList.toggle("done");
  }
});

add.addEventListener("click", function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add task to array
    input.value = "";
  }
});

function addTaskToArray(textInp) {
  const task = {
    id: Date.now(),
    title: textInp,
    completed: false,
  };
  arrayOfTasks.push(task);

  addElements(arrayOfTasks);

  addToLocalStorage(arrayOfTasks);
}

function addElements(arrayOfTasks) {
  // Empty Div
  tasksDiv.innerHTML = "";
  // Looping of tasks

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.append(document.createTextNode(task.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElements(tasks);
  }
}

function deleteWithLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocalStorage(arrayOfTasks);
}

function toggleStatus(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocalStorage(arrayOfTasks);
}
