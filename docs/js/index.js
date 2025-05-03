let data = []; // store data
const table = document.getElementById("taskList"); // select table
const message = document.getElementById("message"); // select message completed

/*
using add task 
*/
function addTask() {
  const inputEl = document.getElementById("taskInput");
  const input = inputEl.value.trim();
  // check input dont null
  if (!input) return;

  // object task
  const task = {
    name: input,
    isCompleted: false,
  };
  data.push(task);
  // add task
  appendTaskToTable(data.length - 1, task);
  // make input is null
  inputEl.value = "";
  // check all message is completed
  updateMessage();
}
/*
using to append task in table
*/
function appendTaskToTable(index, task) {
  // create row
  const row = document.createElement("tr");
  //  set attribute because search on note
  row.setAttribute("data-index", index);
  // add class
  row.className = "border-b border-gray-600";
  // put data inside row
  row.innerHTML = `
    <td class="px-6 py-4 ${task.isCompleted ? "completed" : ""}">${
    task.name
  }</td>
    <td class="px-6 py-4 text-center">
      <button onclick="toggle(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Toggle</button>
    </td>
    <td class="px-6 py-4 text-center">
      <button onclick="deleteTask(${index})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
    </td>
  `;
  table.appendChild(row);
}
/*
using to rebuild table because delete note and because change arrange tasks
*/

function rebuildTable() {
  table.innerHTML = "";
  data.forEach((task, i) => appendTaskToTable(i, task));
}
/*
change state note is complted or not
*/
function toggle(index) {
  data[index].isCompleted = !data[index].isCompleted;
  updateTaskRow(index);
  updateMessage();
}
/*
update row only after completed
*/

function updateTaskRow(index) {
  const row = table.querySelector(`tr[data-index="${index}"]`);
  if (row) {
    row.children[0].classList.toggle("completed", data[index].isCompleted);
    row.children[0].textContent = data[index].name;
  }
}
// delete task in table
function deleteTask(index) {
  data.splice(index, 1);
  rebuildTable(); // indices need to be updated
  updateMessage();
}
// check tasks is complted or not and show message
function updateMessage() {
  const allDone = data.length > 0 && data.every((task) => task.isCompleted);
  message.classList.toggle("hidden", !allDone);
}
