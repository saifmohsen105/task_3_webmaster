let data = []; // store of notes

const table = document.getElementById("taskList");

const message = document.getElementById("message");

// add task in array

function addTask() {
  const inputElement = document.getElementById("taskInput");

  const input = inputElement.value.trim(); // remove space on input

  switch (input) {
    case "":
      return;

    default:
      data.push({
        name: input,

        isCompleted: false,
      });
      inputElement.value = "";
      displayData();
  }
}
// add data from table

function addNotes() {
  return data.map((note, i) => `
    <tr class="border-b border-gray-600">
      <td class="px-6 py-4 ${note.isCompleted ? "completed" : ""}">${note.name}</td>
      <td class="px-6 py-4 text-center">
        <button onclick="toggle(${i})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Toggle</button>
      </td>
      <td class="px-6 py-4 text-center">
        <button onclick="deleteTask(${i})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
      </td>
    </tr>
  `).join("");
}

// display data from table

function displayData() {
  table.innerHTML = addNotes();
  checkAllDone();
}

// change state completed from table using index

function toggle(index) {
  data[index].isCompleted = !data[index].isCompleted;
  displayData();
}

// delete  tasks using index of array

function deleteTask(i) {
  data.splice(i, 1);
  displayData();
}

// show message done if all tasks is done

function checkAllDone() {
  // every using return true if all element is true else false
  const allDone = data.length > 0 && data.every((el) => el.isCompleted);
  // check all tasks is all done
  switch (allDone) {
    case true:
      message.classList.remove("hidden");
      break;
    default:
      message.classList.add("hidden");
  }
}
