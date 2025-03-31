import '../styles/style.css';

const ul = document.querySelector("ul");
const nextBtn = document.querySelector(".next");

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
    data.slice(0, 6).forEach(item => {
        const name = item.title;
        const img = item.image;
        const level = item.difficulty;
        const id = item.id

        const html = 
        `
            <li>
                <h2>${name}</h2>
                <div>
                    <img src="${img}" alt="${name}">
                    <h3>${level}</h3>
                    <p>${id}</p>
                </div>
            </li>
        `;
        ul.insertAdjacentHTML("beforeend", html);
    });

    function goNext() {
        
    }
    nextBtn.addEventListener("click", goNext);
}