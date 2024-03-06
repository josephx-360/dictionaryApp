let displayContent = document.getElementById("displayedContent");
let submitBtn = document.getElementById("submitBtn");
let audioBtn = document.getElementById("audioBtn");
let currentData; 


async function getInfo() {
    let inputValue = document.getElementById("inputtedData").value || document.getElementById("inputtedData").toUpperCase().value;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        displayContent.innerHTML = ""; 
        currentData = data;

        if (data.title && data.title === "No Definitions Found") {
            let InvalidCharacter = document.createElement("h4");
            InvalidCharacter.classList.add("text-danger");
            InvalidCharacter.innerHTML = `<span class="fw-bolder text-muted">${inputValue}</span> is an Invalid Word`;
            displayContent.append(InvalidCharacter);
        } else {
            let word = document.createElement("h3");
            let phonetics = document.createElement("h6");
            let meaning = document.createElement("p");
            let eg = document.createElement("p")

            word.innerText = currentData[0].word;
            phonetics.innerText = currentData[0].phonetics[0].text || currentData[0].phonetics[1].text;
            meaning.innerText = currentData[0].meanings[0].definitions[0].definition;
            eg.innerHTML = `<i><u><b>Example</b></u></i>: ${currentData[0].meanings[0].definitions[0].example}`;

            displayContent.append(word);
            displayContent.append(phonetics)
            displayContent.append(meaning);
            displayContent.append(eg)
        }
    } catch (error) {
        console.error(error);
    }
}

submitBtn.addEventListener("click", function(){
    getInfo()

})
audioBtn.addEventListener("click", function () {
   let text =  document.getElementById("inputtedData").value

   let utterance = new SpeechSynthesisUtterance(text)
   window.speechSynthesis.speak(utterance)
})