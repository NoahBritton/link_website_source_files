const displayAccountItem = document.querySelector("#dropdownMenuButton2")
const logOutItem = document.querySelector("#logOut")
const deleteAccItem = document.querySelector("#deleteAcc")
const modifyAccountModalSaveButton = document.querySelector("#modifyAccountModalSaveButton")
const protocol = window.location.protocol
const host = window.location.host

loadAvatar()

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


modifyAccountModalSaveButton.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/me"
    const url = 'https://nbritton-api-app.herokuapp.com/users/me'

    const nameInput = document.querySelector("#nameInput")
    const passwordInput = document.querySelector("#passwordInput")
    const name = nameInput.value
    const password = passwordInput.value
    const requestData = {...name && { name }, ...password && { password } }
    console.log(requestData)

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    }
    console.log(options)

    let response = await fetch(url, options)

    if (response.status === 200) {
        const contentArea = document.querySelector("#contentArea")
        contentArea.innerHTML = `Saved successfully, you may now exit the modal.`
    } else {
        console.log("HTTP-Error: " + response.status)
    }

    const modal = document.querySelector("#modifyAccountModal")
    bootstrap.Modal.getInstance(modal).hide()

    const form = document.querySelector("#modifyAccountForm").reset()
})

async function uploadAvatar() {
    const token = localStorage.getItem("token")

    const url = 'https://nbritton-api-app.herokuapp.com/users/me/avatar'
    
    const input = document.querySelector("#avatarInput")

    const formData = new FormData();
    formData.append('avatar', input.files[0]);

    const options = {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        console.log("upload successful")
        loadAvatar()
    } else {
        console.log("Error uploading avatar: " + response.status)
    }
}

async function loadAvatar() {
    const token = localStorage.getItem("token")

    const url = 'https://nbritton-api-app.herokuapp.com/users/me/avatar'

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        
        const imageBlob = await response.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob);

        const image = document.createElement('img')
        image.src = imageObjectURL
        image.className = 'profile-pic'

        const container = document.getElementById("pfpBox")
        container.innerHTML = ""
        container.prepend(image)
    }
    else {
        console.log("HTTP-Error: " + response.status)
    }
}
