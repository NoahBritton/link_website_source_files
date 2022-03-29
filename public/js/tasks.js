const nextTask = document.querySelector("#nextTask")
const taskID = document.querySelector("#taskID")
const taskArea = document.querySelector("#taskArea")
const taskDesc = document.querySelector("#taskDesc")
const taskCard = document.getElementById("#taskCard")
const taskTitle = document.querySelector("#taskTitle")
const checkedBox = document.querySelector("#checkedBox")
const uncheckedBox = document.querySelector("#uncheckedBox")
const checkBoxHolder = document.querySelector("#checkBoxHolder")
const host = window.location.host
const protocol = window.location.protocol

const skip = 0
const limit = 1

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
        console.log(skip)
        const data = await response.json()
        console.log(data)
        taskTitle.innerHTML = `${data.title}`
        taskDesc.innerHTML = `${data.description}`
        taskID.innerHTML = `${data._id}`

        if (data.completed === false) {
          checkBoxHolder.appendChild(uncheckedBox)
        } else {
          checkBoxHolder.appendChild(checkedBox)
        }
        const cardClone = document.importNode(taskCard, true)
        taskArea.appendChild(cardClone)
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
        console.log("button pressed")
        const data = await response.json()
        console.log(data)
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