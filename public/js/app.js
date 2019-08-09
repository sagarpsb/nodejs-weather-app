console.log('clint side js has been lodded.')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            document.getElementById('location').textContent = `Error: ${data.error}`;            
        } else{
            // console.log(data)
            document.getElementById('location').textContent = `Location: ${data.address}`;
            document.getElementById('forecast').textContent = `Forecast: ${data.forecast}`;
            document.getElementById('temp').textContent = `Temperature: ${data.temprature} degree celcius`;
        }
        
    })
})

});



