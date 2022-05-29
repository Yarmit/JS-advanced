const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
	constructor(container = '.products') {
		this.container = container;
		this.goods = []; //массив товаров из JSON документа
		this._getProducts()
			.then(data => { //data - объект js
				this.goods = data;
				// console.log(data);
				this.render()
			});
	}

	_getProducts() {
		return fetch(`${API}/catalogData.json`)
			.then(result => result.json())
			.catch(error => {
				console.log(error);
			});

	}

	render() {
		const block = document.querySelector(this.container);
		for (let product of this.goods) {
			const productObj = new ProductItem(product);
			//            this.allProducts.push(productObj);
			block.insertAdjacentHTML('beforeend', productObj.render());
		}

	}
}

class ProductItem {
	constructor(product, img = 'https://via.placeholder.com/200x150') {
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		this.img = img;
	}
	render() {
		return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
	}
}

class CartList {
	constructor(container = ".cart-products-price") {
		this.container = container;
		this.goods = []; //массив товаров из JSON документа
		this._getProducts()
			.then((data) => { //data - объект js
				this.goods = data.contents;
				// console.log(data);
				this.render();
				this.events(); // обработчик события кнопок
			});
	}

	_getProducts(link) {
		return fetch(`${API}/getBasket.json`)
			.then((result) => result.json())
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const block = document.querySelector(this.container);
		for (let product of this.goods) {
			product.total = product.price * product.quantity
			const productObj = new CartItem(product);
			block.insertAdjacentHTML('beforebegin', productObj.render());
		}
		this.totalCost();
	}

	/**
	 * функция обрабатывает нажатие кнопок в корзине
	 */
	events() {
		let butInc = document.querySelectorAll('.cart-btn-add'); // кнопки добавить
		let butDec = document.querySelectorAll('.cart-btn-remove'); // кнопки удалить
		butInc.forEach(button => {
			button.addEventListener('click', (event) => {
				let dataID = +event.target.dataset.id;
				console.log(dataID);
				this.calcInc(dataID);
			})
		});
		butDec.forEach(button => {
			button.addEventListener('click', (event) => {
				let dataID = +event.target.dataset.id;
				console.log(dataID);
				this.calcDec(dataID);
			})
		});
	}

	/**
	 * функция уменьшает количество товара в корзине
	 * @param {*} dataID - id-номер продукта
	 */
	calcDec(dataID) {
		for (const element of this.goods) {
			if (element.id_product === dataID) {
				if (element.quantity == 0 ? element.quantity = 0 : element.quantity -= 1);
				element.total = element.quantity * element.price
				document.querySelector(`.cart-products-box[data-id="${dataID}"] .quantity`).textContent = element.quantity;
				document.querySelector(`.cart-products-box[data-id="${dataID}"] .total`).textContent = element.total;
			};
		}
		this.totalCost();
	}

	/**
	 * функция увеличивает количество товара в корзине
	 * @param {*} dataID - id-номер продукта
	 */
	calcInc(dataID) {
		for (const element of this.goods) {
			if (element.id_product === dataID) {
				if (element.quantity == 10 ? element.quantity = 10 : element.quantity += 1);
				element.total = element.quantity * element.price
				document.querySelector(`.cart-products-box[data-id="${dataID}"] .quantity`).textContent = element.quantity;
				document.querySelector(`.cart-products-box[data-id="${dataID}"] .total`).textContent = element.total;
			};
		}
		this.totalCost();
	}

	/**
	 * функция подсчитывает общую стоимость корзины
	 */
	totalCost() {
		let totalSum = 0;
		this.goods.forEach(element => {
			totalSum += element.quantity * element.price;
		});
		document.querySelector(`.cart-totalCost`).textContent = totalSum;
	}
}

class CartItem {
	constructor(product, img = "https://via.placeholder.com/200x150") {
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		this.quantity = product.quantity;
		this.img = img;
		this.total = product.total;
	}
	render() {
		return `<div class="cart-products-box"  data-id="${this.id}">
					<p>${this.title}</p>
					<p><img src="${this.img}"  width="50" alt="Some img"></p>
					<p>
						<span class="quantity">${this.quantity}</span>&ensp;шт.
					</p>
					<p>${this.price}</p>
					<p>
						<span class="total">${this.total}</span>
					</p>
					<p>
					<button class="buy-btn cart-btn-remove" data-id='${this.id}'>-</button>
					<button class="buy-btn cart-btn-add" data-id='${this.id}'>+</button>
					</p>
				</div>`;
	}
}

let list = new ProductsList();
let listCart = new CartList();

const btnCart = document.querySelector('.btn-cart');
const btnCartEl = document.querySelector('.cart-products');

btnCart.addEventListener('click', function () {
	btnCartEl.classList.toggle('cart-products-close');
})