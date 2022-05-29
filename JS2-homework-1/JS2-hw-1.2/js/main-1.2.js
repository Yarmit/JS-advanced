const products = [
	{ id: 1, title: 'Notebook', price: 2000, images: 'notebook' },
	{ id: 2, title: 'Mouse', price: 20, images: 'mouse' },
	{ id: 3, title: 'Keyboard', price: 200, images: 'keyboard' },
	{ id: 4, title: 'Gamepad', price: 50, images: 'gamepad' },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (card) => {
	return `<div class="product-item">
							<img src="img/${card.images}.jpg" alt="${card.images}">
							<div class="product-item-box">
									<h3 class="product-item-title">${card.title}</h3>
									<p class="product-item-price">${card.price} RUB</p>
									<button class="buy-btn">Купить</button>
							</div>
          </div>`
};
const renderPage = list => {
	const productsList = list.map(card => renderProduct(card));
	console.log(productsList);
	document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);