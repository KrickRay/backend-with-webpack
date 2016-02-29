const headerEl = document.getElementById('header');
const buttonEl = document.getElementById('button');

headerEl.style.color = 'green';

function changeColor(el) {
    el.style.color = 'red';
}

buttonEl.addEventListener('click', e=>changeColor(headerEl));