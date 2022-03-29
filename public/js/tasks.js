const host = window.location.host
const protocol = window.location.protocol
const taskID = document.getElementById('taskID');
const nextTask = document.querySelector('nextTask')
const taskArea = document.querySelector('taskArea')
const taskDesc = document.querySelector('taskDesc')
const taskCard = document.getElementById("taskCard")
const taskTitle = document.querySelector('taskTitle')
const container = document.getElementById("taskArea")
const checkedBox = document.querySelector('checkedBox')
const deleteTask = document.querySelector('deleteTask')
const modifyTask = document.querySelector('modifyTask')
const uncheckedBox = document.querySelector('uncheckedBox')
const checkBoxHolder = document.querySelector('checkBoxHolder')

const skip = 0
const limit = 1

function initialLoad() {
  const token = localStorage.getItem("token")

  const url = `https://nbritton-api-app.herokuapp.com/tasks?skip=${skip}&limit=${limit}`

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

        taskTitle.innerHTML = `${data.title}`
        taskDesc.innerHTML = `${data.description}`
        taskID.innerHTML = `${data._id}`
        console.log(taskID.innerHTML)
        if (data.completed === false) {
          checkBoxHolder.appendChild(uncheckedBox)
        } else {
          checkBoxHolder.appendChild(checkedBox)
        }
        const cardClone = document.importNode(taskCard, true)
        container.appendChild(cardClone)
        skip++
      }
  } else {
      console.log("HTTP-Error: " + response.status)
  }
}


// display a task on load
nextTask.addEventListener("click", async(e) => {
  e.preventDefault()

  const token = localStorage.getItem("token")

  const url = `https://nbritton-api-app.herokuapp.com/tasks?skip=${skip}&limit=${limit}`

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

        taskTitle.innerHTML = `${data.title}`
        taskDesc.innerHTML = `${data.description}`
        if (data.completed == 'false') {
          checkBoxHolder.appendChild(uncheckedBox)
        } else {
          checkBoxHolder.appendChild(checkedBox)
        }
        const cardClone = document.importNode(taskCard, true)
        container.appendChild(cardClone)
        skip++
      }
  } else {
      console.log("HTTP-Error: " + response.status)
  }
})