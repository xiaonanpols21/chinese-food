import '../styles/style.css';

const ul = document.querySelector("ul");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const pageIndex = document.querySelector("section div") ;

const dialog = document.querySelector("dialog");
const filterBtn = document.querySelector("body > button");

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
    
    // Render items
    function renderItems() {
        ul.innerHTML = ""; // Clear the list before rendering new items
        data.slice(startIndex, startIndex + itemsPerPage).forEach(item => {
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
        const amountItems = Math.ceil(data.length / itemsPerPage);
        
        // Update page index dynamically
        pageIndex.textContent = `${currentIndex} / ${amountItems}`;
   
    }
    
    // Paginations
    function goNext() {
        if (startIndex + itemsPerPage < data.length) {
            startIndex += itemsPerPage; // Move to next batch
            currentIndex++
            renderItems();
        }
    }
    nextBtn.addEventListener("click", goNext);

    function goPrev() {
        if (startIndex - itemsPerPage < data.length) {
            startIndex -= itemsPerPage; 
            currentIndex--
            renderItems();
        }
    }
    prevBtn.addEventListener("click", goPrev);

    renderItems();
}

function showDialog() {
    dialog.showModal();
}
filterBtn.addEventListener("click", showDialog);