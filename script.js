const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error('cannot find the element ${selector}');
}

const form =selectElement('form');
const input = selectElement('input');
const result = selectElement('.result');
const hamburger = selectElement('.hamburger');
const navMenu = selectElement('.nav-menu');

hamburger.addEventlistener('click', () =>{
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
})

form.addEventlistener('submit', (e) =>{
    e.preventDefault();
    const url = input.value;

    shortenUrl(url);
})

async function shortenUrl(url){
    try{
        const res = await fetch('https://api.shrtco.de/v2/shorten?url=${url}')
        const data = res.json();

        const newUrl = document.createElement('div');
        newUrl.classList.add('item');
        newUrl.innerHTML =`
        <p>${data.result.short_link}<P>
        <button class='newUrl-btn'>Copy</button>
        `
        result.prepend(newUrl);
        const copyBtn = document.querySelector('newUrl-btn');
        copyBtn.addEventListener('click', () =>{
            navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
        });
        input.value=""
    } catch (error) {
        console.log(error);
    }
}