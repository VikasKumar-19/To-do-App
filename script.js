const form = document.querySelector("form");
let taskItems = [];

const localStorageData = JSON.parse(localStorage.getItem("todoList"));

const renderListItems = () => {
  console.log(taskItems);
  const tasksList = document.querySelector(".tasksList_container");
  taskItems.forEach((item, idx) => {
    let id;
    let value;

    for (let key in item) {
      id = key;
      value = item[key];
    }

    const taskListItem = document.createElement("div");
    taskListItem.classList.add("taskItem_container");
    taskListItem.setAttribute("data-item", id);
    taskListItem.innerHTML = ` <div class="task_item">${value}</div>
                <button type="button" onclick="saveItem(${id})" class="done_btn"><span style="font-size: 20px" class="material-icons-outlined">
check
</span></button>
                <button type="button" onclick="editItem(${id})" class="edit_btn"><span style="font-size: 20px" class="material-icons-outlined">
edit_note
</span></button>
                <button type="button" onclick="removeItem(${id})" class="remove_btn"><span style="font-size: 20px" class="material-icons-outlined">
delete
</span></button>`;
    tasksList.appendChild(taskListItem);
  });
};

if (localStorageData) {
  for (key of Object.keys(localStorageData)) {
    let obj = {};
    obj[key] = localStorageData[key];
    taskItems.push(obj);
  }
  renderListItems();
}

const removeItem = (id) => {
  const taskParent = document.querySelector(`[data-item="${id.toString()}"]`);
  const localTask = JSON.parse(localStorage.getItem("todoList"));
  delete localTask[id];
  localStorage.setItem("todoList", JSON.stringify(localTask));
  taskItems = taskItems.filter((item) => {
    return item.id !== id;
  });
  taskParent.remove();
};

const saveItem = (id) => {
  const taskParent = document.querySelector(`[data-item="${id.toString()}"]`);
  const taskItem = taskParent.querySelector(".task_item");
  taskItem.contentEditable = false;
  const taskData = taskItem.textContent;

  const localTask = JSON.parse(localStorage.getItem("todoList"));
  localTask[id] = taskData;
  localStorage.setItem("todoList", JSON.stringify(localTask));

  taskItems.forEach((item) => {
    if (item.id === id) {
      item.value = taskData;
    }
  });
};

const editItem = (id) => {
  const taskParent = document.querySelector(`[data-item="${id.toString()}"]`);
  const taskItem = taskParent.querySelector(".task_item");
  taskItem.contentEditable = true;
};

const addTask = () => {
  const input = document.querySelector("input");
  const tasksList = document.querySelector(".tasksList_container");
  const taskListItem = document.createElement("div");
  taskListItem.classList.add("taskItem_container");
  taskListItem.setAttribute("data-item", taskItems.length);
  taskListItem.innerHTML = ` <div class="task_item">${input.value}</div>
                <button type="button" onclick="saveItem(${taskItems.length})" class="done_btn"><span style="font-size: 20px" class="material-icons-outlined">
check
</span></button>
                <button type="button" onclick="editItem(${taskItems.length})" class="edit_btn"><span style="font-size: 20px" class="material-icons-outlined">
edit_note
</span></button>
                <button type="button" onclick="removeItem(${taskItems.length})" class="remove_btn"><span style="font-size: 20px" class="material-icons-outlined">
delete
</span></button>`;
  tasksList.appendChild(taskListItem);

  const todoLocal = JSON.parse(localStorage.getItem("todoList"));
  if (todoLocal) {
    todoLocal[taskItems.length] = input.value;
    localStorage.setItem("todoList", JSON.stringify(todoLocal));
  } else {
    localStorage.setItem(
      "todoList",
      JSON.stringify({ [taskItems.length]: input.value })
    );
  }
  taskItems.push({ id: taskItems.length, value: input.value });
  input.value = "";
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});
