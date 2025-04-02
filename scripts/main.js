import '../styles/style.css';

const ul = document.querySelector("ul");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const pageIndex = document.querySelector("section div") ;

const dialog = document.querySelector("dialog");
const filterBtn = document.querySelector("body > button");
const doneBtn = dialog.querySelector("button:last-of-type");

const inputEasy = document.querySelector("#easy");
const inputHard = document.querySelector("#hard");

const fieldTags = document.querySelector("#tags");
const inputs = fieldTags.querySelectorAll('input');



// Fetch JSON file
// Bron: https://www.geeksforgeeks.org/read-json-file-using-javascript/
fetch('/data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {
        //console.log(data)
        changeData(data)
    })  
    .catch(error => console.error('Failed to fetch data:', error)); 

function changeData(data) {
    // Bron: Chat GPT, https://stackoverflow.com/questions/43288206/how-can-you-dynamically-slice-an-array-in-javascript-jquery
    let startIndex = 0; // Track the current index
    const itemsPerPage = 6;
    let currentIndex = 1;
    let currentData = data;
    
    // Render items
    function renderItems() {
        ul.innerHTML = ""; // Clear the list before rendering new items
        currentData.slice(startIndex, startIndex + itemsPerPage).forEach(item => {
            // Bron: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp
            const html = 
            `
                <li>
                    <h2>${item.title}</h2>
                    <div>
                        <img src="${item.image}" alt="${item.title}">
                        <h3>${item.difficulty}</h3>
                        <p>${item.id}</p>
                    </div>
                </li>
            `;
            ul.insertAdjacentHTML("beforeend", html);
        });

        // Calculate total number of pages
        // Bron: Chat GPT, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
        const amountItems = Math.ceil(currentData.length / itemsPerPage);
        
        // Update page index dynamically
        pageIndex.textContent = `${currentIndex} / ${amountItems}`;
   
    }
    
    // Paginations
    function goNext() {
        if (startIndex + itemsPerPage < currentData.length) {
            startIndex += itemsPerPage; // Move to next batch
            currentIndex++
            renderItems();
        }
    }

    function goPrev() {
        if (startIndex - itemsPerPage >= 0) {
            startIndex -= itemsPerPage; 
            currentIndex--
            renderItems();
        }
    }

    function checkLevel() {
        if (inputEasy.checked) {
            currentData = currentData.filter(item => item.difficulty === "Easy"); // Simplified filter
        } else if (inputHard.checked) {
            currentData = currentData.filter(item => item.difficulty === "Medium");
        }
    
        startIndex = 0; // Reset pagination
        currentIndex = 1;
        
        renderItems();
    }

    inputs.forEach((input) => {
        function checkTags() {
            //  Chat gpt, this is used bc: the right input is clicked
            /*
            if (this.checked && this.value === "soup") {
                console.log("soup tag clicked");
            }
            */

            // Bron: https://www.w3schools.com/jsref/jsref_switch.asp
            switch (this.checked && this.value) {
                case "soup":
                    console.log("soup tag clicked");
                    currentData = currentData.filter(item => item.title = "soup");
                    renderItems();
                    break;
                case "chicken":
                    console.log("chicken tag clicked");
                    break;
                case "noodles":
                    console.log("noodles tag clicked");
                    break;
                case "tofu":
                    console.log("tofu tag clicked");
                    break;
                case "chilli":
                    console.log("chilli tag clicked");
                    break;
                case "bean":
                    console.log("bean tag clicked");
                case "egg":
                    console.log("egg tag clicked");
                    break;
                case "pork":
                    console.log("pork tag clicked");
                    break;
                case "vegetables":
                    console.log("vegetables tag clicked");
                    break;
                case "sticky":
                    console.log("sticky tag clicked");
                    break;
                case "miso":
                    console.log("miso tag clicked");
                    break;
                case "broccoli":
                    console.log("broccoli tag clicked");
                case "pak-choi":
                    console.log("pak-choi tag clicked");
                    break;
                case "ginger":
                    console.log("ginger tag clicked");
                    break;
                case "duck":
                    console.log("duck tag clicked");
            }
        }
        input.addEventListener("click", checkTags);
    })

    
    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);

    inputEasy.addEventListener("click", checkLevel);
    inputHard.addEventListener("click", checkLevel);

    renderItems();
}

function showDialog(e) {
    dialog.showModal();
    e.preventDefault();
}
filterBtn.addEventListener("click", showDialog);

function closeDialog(e) {
    dialog.close();
    e.preventDefault();
}
doneBtn.addEventListener("click", closeDialog);
