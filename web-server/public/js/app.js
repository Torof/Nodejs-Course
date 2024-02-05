console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    if (!location) return messageOne.textContent = "You must provide an address"

    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})