const displayAccountItem = document.querySelector("#dropdownMenuButton2")
const logOutItem = document.querySelector("#logOut")
const deleteAccItem = document.querySelector("#deleteAcc")
const protocol = window.location.protocol
const host = window.location.host

displayAccountItem.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3002/users/me"
    const url = 'https://nbritton-api-app.herokuapp.com/users/me'

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

            const accName = document.querySelector("#accName")
            const accEmail = document.querySelector("#accEmail")
            accName.innerHTML = `Name: ${data.name}`
            accEmail.innerHTML = `Email: ${data.email}`
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})

logOutItem.addEventListener("click", async(e) => {
  e.preventDefault()

  const token = localStorage.getItem("token")

  //const url = "http://localhost:3002/users/logout"
  const url = 'https://nbritton-api-app.herokuapp.com/users/logout'

  const options = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }

  let response = await fetch(url, options)

  if (response.ok) {
      if (response.status === 200) {
        const newUrl = `${protocol}//${host}`
        window.location.replace(newUrl)
      }
  } else {
      console.log("HTTP-Error: " + response.status)
  }
})

deleteAccItem.addEventListener("click", async(e) => {
  e.preventDefault()

  const token = localStorage.getItem("token")

  //const url = "http://localhost:3002/users/me"
  const url = 'https://nbritton-api-app.herokuapp.com/users/me'

  const options = {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }

  let response = await fetch(url, options)

  if (response.ok) {
      if (response.status === 200) {
        const newUrl = `${protocol}//${host}`
        window.location.replace(newUrl)
      }
  } else {
      console.log("HTTP-Error: " + response.status)
  }
})