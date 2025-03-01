const myFriends = [
    {
        "nom" : "Nada",
        "prenom": "Wafae",
        "date_naissance" : "1980-05-18",
        "couleur" : "bleu"
    },
    {
        "nom" : "Gessa",
        "prenom": "Fabrice",
        "date_naissance" : "1981-06-21",
        "couleur" : "argent"
    },
    {
        "nom" : "Da Sylva",
        "prenom": "Lorès",
        "date_naissance" : "1982-03-09",
        "couleur" : "rose"
    },
    {
        "nom" : "Vitu",
        "prenom": "Allan",
        "date_naissance" : "1999-12-01",
        "couleur" : "jaune"
    },
    {
        "nom" : "Lancesseur",
        "prenom": "Remi",
        "date_naissance" : "1991-10-14",
        "couleur" : "noir"
    }
]

const inputLastname = document.querySelector("#input-lastname")
const inputFirstname = document.querySelector("#input-firstname")
const inputBirthdate = document.querySelector("#input-birthdate")
const inputColor = document.querySelector("#input-color")
const btnAdd = document.querySelector("#btn-add")

btnAdd.addEventListener("click", (e) => {
    e.preventDefault()
    const newFriend = {
        "nom" : inputLastname.value,
        "prenom" : inputFirstname.value,
        "date_naissance" : inputBirthdate.value,
        "couleur" : inputColor.value
    }
    myFriends.push(newFriend)
    display()
})

const friendList = document.querySelector("#friend-list")
const paragraphe = document.createElement("p")

const display = () => {
    friendList.innerText = ''
    paragraphe.innerText = ''
    
    if(myFriends.length > 0) {
        const trHead = document.createElement("tr")
        const thLastname = document.createElement("th")
        const thFirstname = document.createElement("th")
        const thBirthdate = document.createElement("th")
        const thColor = document.createElement("th")
        const thDelete = document.createElement("th")

        thLastname.innerText = "Nom"
        thFirstname.innerText = "Prénom"
        thBirthdate.innerText = "Date de Naissance"
        thColor.innerText = "Couleur préférée"
        thDelete.innerText = "c'est plus mon ami(e) :("

        friendList.append(trHead)
        trHead.append(thLastname)
        trHead.append(thFirstname)
        trHead.append(thBirthdate)
        trHead.append(thColor)
        trHead.append(thDelete)

        // console.log(myFriends)

        myFriends.forEach((el, index) => {
            // console.log(el)
            // console.log(index)

            const trBody = document.createElement("tr")
            const tdLastname = document.createElement("td")
            const tdFirstname = document.createElement("td")
            const tdBirthdate = document.createElement("td")
            const tdColor = document.createElement("td")
            const tdDelete = document.createElement("td")

            tdLastname.innerText = el.nom
            tdFirstname.innerText = el.prenom
            tdBirthdate.innerText = el.date_naissance
            tdColor.innerText = el.couleur
            tdDelete.innerHTML = `<a href="" id="${index}" class="delete">X</a>`

            friendList.append(trBody)
            trBody.append(tdLastname)
            trBody.append(tdFirstname)
            trBody.append(tdBirthdate)
            trBody.append(tdColor)
            trBody.append(tdDelete)
        })

        const deleteItems = document.querySelectorAll(".delete")
        console.log(deleteItems)

        deleteItems.forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault()
                myFriends.splice(el.id, 1)
                console.log(el)
                display()
            })
        })
    }
    else {
        paragraphe.innerText = "Vous n'avez pas d'amis, snif!"
        document.body.append(paragraphe)
    }
}

display()

