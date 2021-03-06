let lettersContainer = document.getElementById("letters-container")
let wordContainer = document.getElementById("word-container")
let word
let img = document.getElementById("img")
let startButton = document.getElementById("start")

for(let i=65;i<=90;i++){
    let letter = String.fromCharCode(i)
    let div = document.createElement("div")
    div.classList.add("inline")
    div.innerHTML = `<button type="button" class="margin button letter" name="letter">${letter}</button>`
    lettersContainer.appendChild(div)
}


let saveChanges = document.getElementById("apply")
let countries = document.getElementById("countries")
let computerLanguages = document.getElementById( "computerLanguages")
let speakingLanguages = document.getElementById( "speakingLanguages")
let capitals = document.getElementById( "capitals")
saveChanges.addEventListener("click",function(){
    let country = countries.checked
    let codingLanguages = computerLanguages.checked
    let languages = speakingLanguages.checked
    let capitalCities = capitals.checked
    console.log(country,codingLanguages,languages,capitalCities)
    img.src = "./images/guess.png"


    
let array = []
let countryArray = []
let capitalArray = []
let languagesArray = []

async function getData(){
    let apiResponse = await fetch(`https://restcountries.eu/rest/v2/all`)
    let apiData = await apiResponse.json()
    

    for(let i=0;i<apiData.length;i++){
        countryArray.push(apiData[i].name)
        capitalArray.push(apiData[i].capital)
        languagesArray.push(apiData[i].languages[0].name)
    }


    let codingLanguagesList = ["python","java","ruby on rails","html","java script","c","php","sql","swift","r","go","dart","kotlin","perl","matlab","ruby","rust","scala","elm","objective-c","type script","bash","julia","srystal","lisp","assembly"]

    let list = document.getElementsByName("list")
    for(let i=0;i<list.length;i++){
        if(list[i].checked){
            if(list[i].id==="countries"){
                array.push(countryArray)
            }
            else if(list[i].id==="capitals"){
                array.push(capitalArray)
            }
            else if(list[i].id==="computerLanguages"){
                array.push(codingLanguagesList)
            }
            else if(list[i].id==="speakingLanguages"){
                array.push(languagesArray)
            }
            
        }
    }
    let finalArray = []

    for(let i=0;i<array.length;i++){
        for(let j=0;j<array[i].length;j++){
           finalArray.push(array[i][j])
        }
    }


    let length =  finalArray.length
    word = finalArray[Math.ceil(Math.random()*length)].toUpperCase()
    wordContainer.innerHTML = ""
    for(let i=0;i<word.length;i++){
        let div = document.createElement("div")
        div.classList.add("inline")
        div.innerHTML = `<button type="button" class="margin-letter button button-letter "><span class="hidden" id="id${i}">${word[i]}</span></button>`
        wordContainer.appendChild(div)
    }

    }
    getData()
    let misCount = 9
    let count = 0
    let letter = document.getElementsByName("letter")
    for(let i=0;i<letter.length;i++){
        letter[i].addEventListener("click",function(){
            let key = letter[i].innerHTML
            let wordArray = word.split("")
            let hidden;
            let flag = 0
            for(let j=0;j<wordArray.length;j++){
                
                if(key == wordArray[j]){
                    count++
                    flag = 1
                    let id = `id${j}`
                    hidden = document.getElementById(id).classList.remove("hidden")
                }
                if(count===wordArray.length){
                    // alert("You Won!!!\nRefresh Page to Play Again!!")
                    img.src = `./images/won.png`
                    break;
                }
                
            }
            if(flag ===0){
                let img = document.getElementById("img")
                
                img.src = `./images/${misCount}.png`
                misCount--
                
            }
            
            if(misCount<0){
                // alert("Game Over, Refresh page to Play Again!!")
                img.src = `./images/lost.png`
            }
            
            letter[i].disabled = true
            letter[i].classList.add("disabled")
        })
    }
    
})

