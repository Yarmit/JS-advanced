
// ДЗ 4.3
function handleFormSubmit(event) { //обрабатывать Отправку формы
	event.preventDefault(); // запрет не отправку данных самостоятельно
	getObjectsForm(formEl);
}


function getObjectsForm(formNode) {
	const { elements } = formNode;
	const data = Array.from(elements); // преобразуем колекцию элементов в массив
	const formElement = data.filter((item) => item.type === 'text'); // массив с элементами форм удовлетворяющих сортировки

	verificationValidity(formElement);
}

/**
 * метод проверяет на валдиность поля формы по регулярным выражениям
 * @param {Array} checkNode - массив всех полей в форме содержащих type='text'
 */
function verificationValidity(checkNode) {
	// Регулярные выражения (Имя, Телефон, email)
	const nameExpr = /^[A-ZА-Я][a-zа-я]+$/; //[a-zA-zа-яА-я]
	const telExpr = /^[+][7][(][0-9]{3}[)][0-9]{3}[-][0-9]{4}$/;
	const emailExpr = /^([a-z]{6}|[a-z]{2}[\.][a-z]{4}|[a-z]{2}[\-][a-z]{4})@[a-z]+\.[a-z]{2,3}$/;
	const criteria = [nameExpr, telExpr, emailExpr];
	let error = false;
	let i = 0;
	let errorValidity = false;
	checkNode.forEach((element) => {
		let result = !!element.value.match(criteria[i]); // проверка на валидность
		frameForms(element, result); // отрисовка рамок полей
		if (!result) { error = true; } // статус ошибки
		i++;
	})
	message(error);
}

/**
 * метод выделяет рамкой поле не прошедшее валидацию
 * @param {Object} element - массив с элементами формы
 * @param {Boolean} result - результат проверки на валидность 
 */
function frameForms(element, result) {
	if (!result) {
		element.classList.add('validity');
	} else {
		element.classList.remove('validity');
	}
}

function message(error) {
	if (error) {
		document.querySelector('.info').innerText = 'Заполните правильно форму!';
	} else {
		document.querySelector('.info').innerText = 'Отправка....';
		// formEl.submit();
		setTimeout(() => {
			formEl.submit();
		}, 1000);
	}
}

const formEl = document.querySelector('.form');

// formEl.addEventListener('submit', handleFormSubmit);
formEl.addEventListener('submit', (event) => {
	handleFormSubmit(event);
})
