const searchInput = document.querySelector('[data-search]');
const dropDownList = document.getElementById('dropdownList');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value
    console.log(value)
});

document.getElementById('search').addEventListener('click', function() {
    // Retrieve the search term from the input field
    const searchTerm = document.getElementById('searchTerm').value;

    // Call the fetchUniversities function with the search term
    fetchUniversities(searchTerm);
});

async function fetchUniversities(searchTerm) {
    const where = encodeURIComponent(JSON.stringify({
        "name": {
            "$regex": `${searchTerm}.*`,
            "$options": "i",  
        }
    }));

    try {
        const response = await fetch(
            `https://parseapi.back4app.com/classes/Usuniversitieslist_University?where=${where}&count=1&limit=0`,
            {
                headers: {
                    'X-Parse-Application-Id': 'qKopeimpXUUVUGqKcWBw6wL6o2sHvBjeFSALB3Qf',
                    'X-Parse-REST-API-Key': '1kh2aPHlBD8glptNw14CZVsAfsAXyO2c7WBeHmW1',
                }
            }
        );

        const data = await response.json();
        console.log('Response Data:', JSON.stringify(data, null, 2));

        data.results.forEach((school, index) => {
            console.log(`School ${index + 1}:`, school);
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }

}