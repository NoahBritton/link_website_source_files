const taskArea = document.getElementById("taskArea")

/* Buttons */
const nextTask = document.querySelector("#nextTask")
const newTask = document.querySelector("#newTask")
const dragBox = document.getElementById("flexCheckDrag")

/* Empty task card */
// areas
const cardTemp = document.querySelector("#taskCard")
const taskCard = cardTemp.content.querySelector(".card")
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
// buttons
const deleteButton = cardContent.querySelector(".deleteTask")
const modifyButton = cardContent.querySelector(".modifyTask")

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

var draggable = false
var skip = 0
var creatingTask = false
var limit = 3
var ids = []
var newIds = []

function drag() {
  if (dragBox.checked == true) {
    draggable = true
  } else {
    draggable = false
  }
}

function exists(elem) {
  var element = document.getElementById(elem)
  if (typeof (element) != 'undefined' && element != null) {
    return true
  } else {
    return false
  }
}

function cancelModify(id) {
  const modifyCard = document.getElementById(`hidden-card_${id.split("_").pop()}`)
  const modifiedCard = document.getElementById(`card_${id.split("_").pop()}`)
  modifyCard.id = `card-body_${id.split("_").pop()}`
  const updatedCard = document.getElementById(`card-body_${id.split("_").pop()}`)
  updatedCard.removeAttribute("style")
  updatedCard.id = "card-body"
  console.log(updatedCard)
  modifyTaskArea.remove()
}

function modifyTask(id) {
  const modifiedCard = document.getElementById(`card_${id.split("_").pop()}`)
  const modifyCard = document.importNode(newTaskCard, true)
  modifyCard.id = "modifyTaskArea"
  modifyCard.querySelector("#titleInput").value = modifiedCard.querySelector("#taskTitle").innerHTML
  modifyCard.querySelector("#descInput").value = modifiedCard.querySelector("#taskDesc").innerHTML
  modifyCard.querySelector("#flexCheckDefault").checked = modifiedCard.querySelector('input[id^="flexCheck"]').checked
  const submit = modifyCard.querySelector("#submitNewTask")
  const cancel = modifyCard.querySelector("#cancelTask")
  cancel.id = `cancelModify_${id.split("_").pop()}`
  cancel.className = "cancelModify"
  submit.id = `submitModify_${id.split("_").pop()}`
  submit.className = "submitModify"
  const elm = modifiedCard.querySelector("#card-body")
  elm.id = (`hidden-card_${id.split("_").pop()}`)
  elm.style.display = "none"
  modifiedCard.appendChild(modifyCard)
}

function modifiedTask(id) {
  const modifiedCard = document.getElementById(`card_${id.split("_").pop()}`)
  const modifyCard = document.getElementById(`hidden-card_${id.split("_").pop()}`)
  const modifyTaskArea = modifiedCard.querySelector("#modifyTaskArea")
  modifyCard.querySelector("#taskTitle").innerHTML = modifiedCard.querySelector("#titleInput").value
  modifyCard.querySelector("#taskDesc").innerHTML = modifiedCard.querySelector("#descInput").value
  modifyCard.querySelector('input[id^="flexCheck"]').checked = modifiedCard.querySelector("#flexCheckDefault").checked
  modifyCard.id = `card-body_${id.split("_").pop()}`
  const updatedCard = document.getElementById(`card-body_${id.split("_").pop()}`)
  updatedCard.removeAttribute("style")
  updatedCard.id = "card-body"
  console.log(updatedCard)
  modifyTaskArea.remove()
}

async function submitModify(id) {
  const token = localStorage.getItem("token")
  const _id = id.split("_").pop()
  const url = 'https://nbritton-api-app.herokuapp.com/tasks'

  const modifiedCard = document.getElementById(`card_${id.split("_").pop()}`)
  const title = modifiedCard.querySelector("#titleInput").value
  const description = modifiedCard.querySelector("#descInput").value
  const completed = modifiedCard.querySelector("#flexCheckDefault").checked.toString()
  console.log(completed)
  const requestData = { ..._id && { _id }, ...title && { title }, ...description && { description }, ...completed && { completed } }
  console.log(requestData)
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  }

  let response = await fetch(url, options)

  if (response.status === 200) {
    modifiedTask(id)
  } else {
    console.log("HTTP-Error: " + response.status)
  }
}

async function deleteTask(id) {
  console.log(id)
  const token = localStorage.getItem("token")
  const url = 'https://nbritton-api-app.herokuapp.com/tasks'
  id = id.split("_").pop()
  const request = { _id: id }

  const options = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  }
  console.log(options)
  let response = await fetch(url, options)

  if (response.ok) {
    if (response.status === 200) {
      const elm = document.querySelector(`#card_${id.split("_").pop()}`)
      elm.remove()
      skip--
    }
  } else {
    console.log("HTTP-Error: " + response.status)
  }
}

newTask.addEventListener("click", function () {
  if (!creatingTask) {
    newTask.style.display = "none"
    const newTaskCardClone = document.importNode(newTaskCard, true)
    creatingTask = true
    taskArea.prepend(newTaskCardClone)
  } else {
    return
  }
});

function cancelTask() {
  const elm = document.getElementById("newTaskArea")
  elm.remove()
  creatingTask = false
  newTask.style.display = ""
}

async function submitNewTask() {
  newTask.style.display = ""
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
      taskTitle.innerHTML = `${data.title}`
      taskDesc.innerHTML = `${data.description}`
      taskID.innerHTML = `${data._id}`
      newIds[skip] = data._id

      taskCard.id = `card_${data._id}`
      deleteButton.id = `delete_${data._id}`
      modifyButton.id = `modify_${data._id}`
      checkBoxHolder.innerHTML = ""
      if (data.completed === false) {
        const incomplete = document.importNode(uncheckedBox, true)
        checkBoxHolder.appendChild(incomplete)
      } else {
        const completed = document.importNode(checkedBox, true)
        checkBoxHolder.appendChild(completed)
      }

      const cardClone = document.importNode(taskCard, true)
      console.log(cardClone)
      const newcard = document.querySelector('#newTaskArea')
      newcard.remove()
      taskArea.prepend(cardClone)
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
      for (let i = 0; i < 3; i++) {
        taskTitle.innerHTML = `${data[i].title}`
        taskDesc.innerHTML = `${data[i].description}`
        taskID.innerHTML = `${data[i]._id}`
        ids[skip] = data[i]._id
        deleteButton.id = `delete_${data[i]._id}`
        modifyButton.id = `modify_${data[i]._id}`
        taskCard.id = `card_${data[i]._id}`

        if (data[i].completed === false) {
          const incomplete = document.importNode(uncheckedBox, true)
          checkBoxHolder.appendChild(incomplete)
        } else {
          const completed = document.importNode(checkedBox, true)
          checkBoxHolder.appendChild(completed)
        }
        const cardClone = document.importNode(taskCard, true)
        taskArea.appendChild(cardClone)
        checkBoxHolder.innerHTML = ""
      }
      skip += 3
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
  console.log(data)
  for (let i = 0; i < 3; i++) {
    if (!(ids.includes(data[i]._id))) {
      if (!(newIds.includes(data[i]._id))) {
        if (response.ok) {
          if (response.status === 200) {
            checkBoxHolder.innerHTML = ""
            taskTitle.innerHTML = `${data[i].title}`
            taskDesc.innerHTML = `${data[i].description}`
            taskID.innerHTML = `${data[i]._id}`
            ids[skip] = data[i]._id
            deleteButton.id = `delete_${data[i]._id}`
            taskCard.id = `card_${data[i]._id}`
            modifyButton.id = `modify_${data[i]._id}`
            if (data[i].completed === false) {
              const incomplete = document.importNode(uncheckedBox, true)
              checkBoxHolder.appendChild(incomplete)
            } else {
              const completed = document.importNode(checkedBox, true)
              checkBoxHolder.appendChild(completed)
            }
            const cardClone = document.importNode(taskCard, true)
            taskArea.appendChild(cardClone)
          }
        } else {
          console.log("HTTP-Error: " + response.status)
        }
      }
    }
  }
  skip += 3
})

function makeDraggable(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    elmnt.style.position = "absolute"
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

taskArea.addEventListener('click', function (e) {
  if (e.target.classList.contains('cancelTask')) {
    cancelTask()
  }
  if (e.target.classList.contains('submitNewTask')) {
    submitNewTask()
  }
  if (e.target.classList.contains('deleteTask')) {
    deleteTask(e.target.id)
  }
  if (e.target.classList.contains('modifyTask')) {
    modifyTask(e.target.id)
  }
  if (e.target.classList.contains('submitModify')) {
    submitModify(e.target.id)
  }
  if (e.target.classList.contains('cancelModify')) {
    cancelModify(e.target.id)
  }
  if (e.target.classList.contains('flexCheckDrag')) {
    drag()
  }
  if (draggable == true) {
    if (e.target.classList.contains('card')) {
      makeDraggable(e.target)
    }
  }
})