import '../styles/style.css';

const ul = document.querySelector("ul");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const pageIndex = document.querySelector("section div") ;

const dialog = document.querySelector("dialog");
const filterBtn = document.querySelector("body > button");
const doneBtn = dialog.querySelector("button:last-of-type");
const closeBtn = dialog.querySelector("button:first-of-type");

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
            currentData = data.filter(item => item.difficulty === "Easy"); // Simplified filter
        } else if (inputHard.checked) {
            currentData = data.filter(item => item.difficulty === "Medium");
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
            /*
            switch (this.checked && this.value) {
                case "soup":
                    // Chat gpt
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("soup"));
                    renderItems();
                    break;
                case "chicken":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("chicken"));
                    renderItems();
                    break;
                case "noodles":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("noodles"));
                    renderItems();
                    break;
                case "tofu":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("tofu"));
                    renderItems();
                    break;
                case "chilli":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("chilli"));
                    renderItems();
                    break;
                case "bean":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("bean"));
                    renderItems();
                case "egg":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("egg"));
                    renderItems();
                    break;
                case "pork":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("pork"));
                    renderItems();
                    break;
                case "vegetables":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("vegetables"));
                    renderItems();
                    break;
                case "sticky":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("sticky"));
                    renderItems();
                    break;
                case "miso":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("miso"));
                    renderItems();
                    break;
                case "broccoli":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("broccoli"));
                    renderItems();
                case "pak-choi":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("pak choi"));
                    renderItems();
                    break;
                case "ginger":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("ginger"));
                    renderItems();
                    break;
                case "duck":
                    currentData = currentData.filter((item) => item.title.toLowerCase().includes("duck"));
                    renderItems();
            }
            */
           

            // Chat gpt
            if (this.checked) {
                currentData = currentData.filter((item) => 
                    item.title.toLowerCase().includes(this.value.toLowerCase()) // Use 'this.value' directly
                );
                
            } else {
                checkLevel();
                currentData = currentData.filter((item) => 
                    !item.title.toLowerCase().includes(this.value.toLowerCase())
                );

                // Full Chat gpt
                // ✅ Check which checkboxes are still checked
                const checkedValues = [...inputs] // Convert NodeList to Array
                    .filter(input => input.checked) // Get only checked checkboxes
                    .map(input => input.value.toLowerCase()); // Get their values

                
                if (checkedValues.length > 0) {
                    // ✅ Re-filter data to show only items that match checked tags
                    currentData = currentData.filter((item) => 
                        checkedValues.some(tag => item.title.toLowerCase().includes(tag))
                    );
                } else {
                    // ✅ If no checkboxes are checked, reset to full dataset
                    currentData = [...data]; 
                }
                
            }
            
            renderItems();



        }
        input.addEventListener("change", checkTags);
    })

    
    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);

    inputEasy.addEventListener("change", checkLevel);
    inputHard.addEventListener("change", checkLevel);

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
closeBtn.addEventListener("click", closeDialog);
