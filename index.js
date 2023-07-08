import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js"

const appSettings ={
    databaseURL :"https://we-are-champions-428f0-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Endorsements")



const endorsements = document.getElementById("endorsements")
const textEl = document.getElementById("text")
const publishBtn = document.getElementById("publish-btn")

publishBtn.addEventListener("click", function(){
    
let outPut = textEl.value.trim()

if (outPut !==""){
  push(endorsementsInDB, outPut)

clearInputField()  
}

     
})


onValue(endorsementsInDB, function(snapshot){
    let endorsementArray = []
    
    if(snapshot.exists()){
         endorsementArray = Object.entries(snapshot.val())
        
        clearEndorsementListEl()

        for(let i = 0; i < endorsementArray.length; i++){
            let currentEndorsement = endorsementArray[i]
            let currentEndorsementID = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]
            
            displayEndorsements(currentEndorsement)

        }        
    }else{
        endorsements.innerHTML ="No endorsements written yet!"
    }
    
})
    

function clearEndorsementListEl(){
    endorsements.innerHTML=""
}

function clearInputField(){
    textEl.value = ""
}


function displayEndorsements(endorsement){
let endorsementID = endorsement[0]
let endorsementValue =endorsement[1]

let newEndorsement = document.createElement("p")

    newEndorsement.textContent = endorsementValue
    
    newEndorsement.addEventListener("click", function(){
        
        let exactLocationOfEndorsementInDB = ref(database, `Endorsements/${endorsementID}`)
        
        remove(exactLocationOfEndorsementInDB)
    })
    
    endorsements.append(newEndorsement)

}