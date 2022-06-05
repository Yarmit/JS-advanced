// ДЗ 4.1
const text = document.querySelector('.text p').innerHTML;
const btn = document.querySelector('.button');


btn.addEventListener('click', () => {
	document.querySelector('.text p').innerHTML = text.replace(/(;)'|'(\s)/g, '"');
	document.querySelector('.text p').classList.add('color');
})
