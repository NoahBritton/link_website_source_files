/* Buttons */
const nextTask = document.querySelector("#nextTask")
const newTask = document.querySelector("#newTask")

/* Empty task card */
  // areas
const cardTemp = document.querySelector("#taskCard")
const taskArea = document.querySelector("#taskArea")
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

/* New task card */
  // areas
const newCardTemp = document.querySelector("#createTaskCard")
const newTaskArea = document.querySelector("#newTaskArea")
const newTaskCard = newCardTemp.content.querySelector(".card")
const newCardContent = taskCard.querySelector(".card-body")
  // inputs
const titleInput = newCardContent.querySelector("#titleInput")
const descInput = newCardContent.querySelector("#descInput")
const checkBox = newCardContent.querySelector("#flexCheckDefault")

const host = window.location.host
const protocol = window.location.protocol

var skip = 0
var creatingTask = false
const limit = 1

newTask.addEventListener("click", function() {
  const newTaskCardClone = document.importNode(newTaskArea, true)
  console.log(newTaskCardClone)
  if (!creatingTask) {
    creatingTask = true
    taskArea.appendChild(newTaskCardClone)
  }
});

// createNewTask.addEventListener('submit', async (e) => {
//     e.preventDefault()

//     const email = emailInput.value;
//     const name = usernameInput.value;
//     const password = passwordInput.value;
//     let data = { email, password, name }

//     //const url = 'http://localhost:3002/users'
//     const url = 'https://nbritton-api-app.herokuapp.com/users'

//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }

//     let response = await fetch(url, options)
//     data = await response.json()

//     if (response.status === 400) {
//         const message = document.querySelector("#message")
//         message.textContent = data.message
//     } 
//     else if (response.status === 201) {
//         localStorage.setItem("token", data.token)
//         alert(data.token)

//         const newUrl = `${protocol}//${host}/main`
//         window.location.replace(newUrl)
//     }
// });

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

        const checkBox = checkBoxHolder.querySelector("div")
        checkBox.remove();
        taskTitle.innerHTML = `${data[0].title}`
        taskDesc.innerHTML = `${data[0].description}`
        taskID.innerHTML = `${data[0]._id}`

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
})

