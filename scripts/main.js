import '../styles/style.css';

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
        console.log(data)
    })  
    .catch(error => console.error('Failed to fetch data:', error)); 