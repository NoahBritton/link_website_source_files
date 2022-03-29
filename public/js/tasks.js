const nextTask = document.querySelector("#nextTask")
const cardTemp = document.querySelector("#taskCard")
const taskArea = document.querySelector("#taskArea")
const taskCard = cardTemp.content.querySelector(".card")
const cardContent = taskCard.querySelector(".card-body")

const taskID = cardContent.querySelector("#taskID")
const taskDesc = cardContent.querySelector("#taskDesc")
const taskTitle = cardContent.querySelector("#taskTitle")
const checkBoxHolder = cardContent.querySelector("#checkBoxHolder")

const checkedBoxTemp = document.querySelector("#checkedBox")
const uncheckedBoxTemp = document.querySelector("#uncheckedBox")

const host = window.location.host
const protocol = window.location.protocol

var skip = 0
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
        const data = await response.json()
        taskTitle.innerHTML = `${data[0].title}`
        taskDesc.innerHTML = `${data[0].description}`
        taskID.innerHTML = `${data[0]._id}`

        if (data[0].completed === false) {
          const uncheckedBox = document.importNode(uncheckedBoxTemp)
          checkBoxHolder.appendChild(uncheckedBox)
        } else {
          const checkedBox = document.importNode(checkedBoxTemp)
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
        const data = await response.json()

        taskTitle.innerHTML = `${data[0].title}`
        taskDesc.innerHTML = `${data[0].description}`
        taskID.innerHTML = `${data[0]._id}`

        if (data[0].completed === false) {
          const uncheckedBox = document.importNode(uncheckedBoxTemp)
          checkBoxHolder.appendChild(uncheckedBox)
        } else {
          const checkedBox = document.importNode(checkedBoxTemp)
          checkBoxHolder.appendChild(checkedBox)
        }

        const cardClone = document.importNode(taskCard, true)
        console.log(cardClone)
        taskArea.appendChild(cardClone)
        skip++
      }
  } else {
      console.log("HTTP-Error: " + response.status)
  }
})