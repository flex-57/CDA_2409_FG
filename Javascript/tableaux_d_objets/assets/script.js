const message = document.querySelector('#message')
const inputUsername = document.querySelector('#username')
const inputPassord = document.querySelector('#password')
const btnConnection = document.querySelector('#btn-connection')
const btnDisconnection = document.querySelector('#btn-disconnection')
const form = document.querySelector('form')
const tbody = document.querySelector('tbody')
const listUser = document.querySelector('#list-users')
const username = document.querySelector('#hello h3 span')
 
const getUsers = async () => {
    try {
        const response = await fetch('./assets/users.json')
        if(!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        return await response.json()
    }
    catch (error) {
        console.error('Erreur', error)
        return []
    }
}
 
form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    if(inputUsername.value !== '' && inputPassord.value !== '') {
        const firstname = inputUsername.value.split('.')[0]
        const lastname = inputUsername.value.split('.')[1]
        const password = inputPassord.value
       
        tbody.innerText = ''
       
        getUsers().then(users => {
            if(users.some(e =>
                e.firstname.toLowerCase() == firstname && e.lastname.toLowerCase() == lastname && e.password == password
            )) {
                const firstnameToUpper = String(firstname).charAt(0).toUpperCase() + firstname.slice(1)
                const lastnameToUpper = String(lastname).charAt(0).toUpperCase() + lastname.slice(1)    
           
                message.style.display = 'none'
                form.style.display = 'none'
                listUser.style.display = 'block'
                username.innerText = `${firstnameToUpper} ${lastnameToUpper}`
   
                users.forEach(e => {
                    const trBody = document.createElement('tr')
                    const tdLastname = document.createElement('td')
                    const tdFirstname = document.createElement('td')
                    const tdBirthdate = document.createElement('td')
                    const tdEmail = document.createElement('td')
                    const tdSalary = document.createElement('td')
   
                    tdLastname.innerText = e.lastname
                    tdFirstname.innerText = e.firstname
                    tdBirthdate.innerText = e.birthday
                    tdEmail.innerText = `${e.firstname.toLowerCase()}.${e.lastname.toLowerCase()}@example.com`
                    tdSalary.innerText = `${e.salary} €`
   
                    tbody.append(trBody)
                    trBody.append(tdLastname)
                    trBody.append(tdFirstname)
                    trBody.append(tdBirthdate)
                    trBody.append(tdEmail)
                    trBody.append(tdSalary)
               
                    if(e.lastname.toLowerCase() == lastname && e.firstname.toLowerCase() == firstname) {
                        trBody.className = 'selected'
                    }
                })
            }
            else {
                displayMessage('Identifiant ou mot de passe incorrect !')
            }
        })
    }
    else {
        displayMessage('Veuillez saisir vos identifiants de connexion !')
    }
})
 
btnDisconnection.addEventListener('click', () => {
    listUser.style.display = 'none'
    form.style.display = 'flex'
})
 
const displayMessage = (m) => {
    message.innerText = m
    message.style.display = 'block'
    setTimeout(() => {
        message.style.display = 'none'    
    }, 5000)
}
 