/* Buttons */
const nextTask = document.querySelector("#nextTask")
const newTask = document.querySelector("#newTask")

/* Empty task card */
// areas
const cardTemp = document.querySelector("#taskCard")
const taskCard = cardTemp.content.querySelector("#dragElem")
const cardContent = taskCard.querySelector(".card-body")
// specific content areas
const taskID = cardContent.querySelector("#taskID")
const taskDesc = cardContent.querySelector("#taskDesc")
const taskTitle = cardContent.querySelector("#taskTitle")
const checkBoxHolder = cardContent.querySelector("#checkBoxHolder")
// check boxes
const checkedBoxTemp = document.querySelector("#checkedBox")
const uncheckedBoxTemp = document.querySelector("#uncheckedBox")
const checkedBox = checkedBoxTemp.content.querySelector(".form-check")
const uncheckedBox = uncheckedBoxTemp.content.querySelector(".form-check")

/* New task card */
// areas
const newTaskTemp = document.querySelector("#createTaskCard")
const newTaskCard = newTaskTemp.content.querySelector("#newTaskArea")
const newTaskContent = newTaskCard.querySelector(".card-body")
// inputs
const titleInput = newTaskContent.querySelector("#titleInput")
const descInput = newTaskContent.querySelector("#descInput")
const checkBox = newTaskContent.querySelector("#flexCheckDefault")


const host = window.location.host
const protocol = window.location.protocol
dragElement(taskCard);

var skip = 0
var creatingTask = false
var limit = 1
var ids = []

newTask.addEventListener("click", function () {
  const newTaskCardClone = document.importNode(newTaskCard, true)
  console.log(newTaskCardClone)
  if (!creatingTask) {
    creatingTask = true
    taskArea.prepend(newTaskCardClone)
  }
});

async function submitNewTask() {
  const token = localStorage.getItem("token")
  const title = document.getElementById("titleInput").value
  const description = document.getElementById("descInput").value
  const completed = document.getElementById("flexCheckDefault").checked
  let data = { title, description, completed }

  const url = 'https://nbritton-api-app.herokuapp.com/tasks'

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  }
  console.log(options)
  let response = await fetch(url, options)

  if (response.ok) {
    if (response.status === 201) {
      const data = await response.json()
      const checkBox = checkBoxHolder.querySelector("div")
      checkBox.remove();
      taskTitle.innerHTML = `${data.title}`
      taskDesc.innerHTML = `${data.description}`
      taskID.innerHTML = `${data._id}`
      ids[skip] = data._id

      if (data.completed === false) {
        const incomplete = document.importNode(uncheckedBox, true)
        checkBoxHolder.appendChild(incomplete)
      } else {
        const completed = document.importNode(checkedBox, true)
        checkBoxHolder.appendChild(completed)
      }

      const cardClone = document.importNode(taskCard, true)
      console.log(cardClone)
      const newcard = document.getElementById('newTaskArea')
      newcard.remove()
      taskArea.prepend(cardClone)
      skip++
      creatingTask = false
    }
  } else {
    console.log("HTTP-Error: " + response.status)
  }
}

async function initialLoad() {
  const token = localStorage.getItem("token")
  const url = `https://nbritton-api-app.herokuapp.com/tasks?skip=${skip}&limit=${limit}`

  console.log(url)
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)


  if (response.ok) {
    if (response.status === 200) {
      const data = await response.json()
      taskTitle.innerHTML = `${data[0].title}`
      taskDesc.innerHTML = `${data[0].description}`
      taskID.innerHTML = `${data[0]._id}`
      ids[skip] = data[0]._id
      if (data[0].completed === false) {
        const incomplete = document.importNode(uncheckedBox, true)
        checkBoxHolder.appendChild(incomplete)
      } else {
        const completed = document.importNode(checkedBox, true)
        checkBoxHolder.appendChild(completed)
      }
      const cardClone = document.importNode(taskCard, true)
      taskArea.appendChild(cardClone)

      skip++
    }
  } else {
    console.log("HTTP-Error: " + response.status)
  }
}

nextTask.addEventListener("click", async (e) => {
  e.preventDefault()

  const token = localStorage.getItem("token")

  const url = `https://nbritton-api-app.herokuapp.com/tasks?skip=${skip}&limit=${limit}`
  console.log(url)
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  let response = await fetch(url, options)
  const data = await response.json()
  if (!(ids.includes(data[0]._id))) {
    if (response.ok) {
      if (response.status === 200) {

        const checkBox = checkBoxHolder.querySelector("div")
        checkBox.remove();
        taskTitle.innerHTML = `${data[0].title}`
        taskDesc.innerHTML = `${data[0].description}`
        taskID.innerHTML = `${data[0]._id}`
        ids[skip] = data[0]._id
        if (data[0].completed === false) {
          const incomplete = document.importNode(uncheckedBox, true)
          checkBoxHolder.appendChild(incomplete)
        } else {
          const completed = document.importNode(checkedBox, true)
          checkBoxHolder.appendChild(completed)
        }

        const cardClone = document.importNode(taskCard, true)
        console.log(cardClone)
        taskArea.appendChild(cardClone)
        skip++
      }
    } else {
      console.log("HTTP-Error: " + response.status)
    }
  }
})

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}