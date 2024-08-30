// add user
async function addUser(event: Event): Promise<void> {

    event.preventDefault()

    let form: any = document.getElementById('user-add-form')

    let formData: any = new FormData(form)

    formData.append('name', form[0].value)
    formData.append('email', form[1].value)
    formData.append('phoneNo', form[2].value)
    formData.append('image', form[3].files[0])

    const resp = await fetch('users', {
        method: 'POST',
        body: formData
    })

    const data = await resp.json()

    if (resp.ok) {


        // alert(data.msg)

        setTimeout(() => {
            $('#staticBackdrop').modal('hide')
            window.location.reload()
        }, 200)

    } else {
        alert(data.msg)
    }
}


// edit user
function editUserBtn(userId: string, uname: string, uemail: string, uphoneNo: string): void {
    localStorage.setItem('userId', userId)

    let name = document.getElementById('uname-edit-admin') as HTMLInputElement
    name.value = uname

    let email = document.getElementById('uemail-edit-admin') as HTMLInputElement
    email.value = uemail

    let phoneNo = document.getElementById('uphoneNo-edit-admin') as HTMLInputElement
    phoneNo.value = uphoneNo

}

async function editUser(event: Event): Promise<void> {

    event.preventDefault()

    let form: any = document.getElementById('user-edit-Form')

    let formData: FormData = new FormData(form)

    let userId = localStorage.getItem('userId')
    if (userId) {
        formData.append('userId', userId)
    } else {
        alert("no user id in local storage")
        return;
    }

    formData.append('name', form[0].value)
    formData.append('email', form[1].value)
    formData.append('phoneNo', form[2].value)
    formData.append('image', form[3].files[0])

    const resp = await fetch('users', {
        method: 'PATCH',
        body: formData
    })

    let data = await resp.json()

    if (resp.ok) {

        // alert(data.msg)

        setTimeout(() => {
            $('#editUserData').modal('hide')
            window.location.reload()
        }, 200)


    } else {

        alert(data.msg)

    }
}


// delete user
function deleteUserBtn(userId: string, name: string): void {
    localStorage.setItem('userId', userId)
    let text = document.getElementById('delete-user-name')
    if (text) {
        text.innerHTML = `${name}`
    }
}

async function deleteUser(event: Event): Promise<void> {

    event.preventDefault()

    let userId = localStorage.getItem('userId')

    const resp = await fetch(`users?userId=${userId}`, {
        method: 'DELETE'
    })

    let data = await resp.json()

    if (resp.ok) {
        // alert(data.msg)

        setTimeout(() => {
            $('#deleteUserData').modal('hide')
            window.location.reload()
        }, 200)
    } else {
        alert(data.msg)
    }

}


// clear edit form

function clearUserEditFormByadmin(): void {
    localStorage.clear()
    let form: any = document.getElementById('user-edit-Form')
    form.reset()
}

// clear add form

function clearAddUserForm(): void {
    localStorage.clear()
    let form: any = document.getElementById('user-add-form')
    form.reset()
}

// close delte modal

function closeDeleteModal(): void {
    localStorage.clear()
    let text = document.getElementById('delete-user-name')
    if (text) {
        text.innerHTML = ''
    }
}

// showsnack bar
// function showSnackBar(text: string) {

//     let div = document.getElementById("snackbar");
//     let textP = document.getElementById('snackbar_msg')

//     if (div) {
//         div.className = 'show'
//         setTimeout(function () {
//             if (div && textP) {
//                 div.className = div.className.replace("show", "");
//                 textP.innerHTML = text
//             }
//         }, 3000);
//     }

// }

// showSnackBar('kjhjhb')