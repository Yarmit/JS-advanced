const API =
	"https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
	el: "#app",
	data: {
		catalogUrl: "/catalogData.json",
		cartUrl: "/getBasket.json",
		products: [],
		cart: [],
		filtered: [],
		imgCatalog: "https://via.placeholder.com/200x150",
		imgCart: "https://via.placeholder.com/70x70",
		userSearch: "",
		show: false,
	},
	methods: {
		getJson(url) {
			return fetch(url)
				.then((result) => result.json())
				.catch((error) => {
					console.log(error);
				});
		},
		addProduct(item) {
			this.getJson(`${API}/addToBasket.json`) // файл содержит разршение на запись в корзину  "result": 1
				.then((data) => {
					if (data.result === 1) {
						let find = this.cart.find((el) => el.id_product === item.id_product);
						if (find) {
							find.quantity++;
						} else {
							const itemCart = Object.assign({ quantity: 1 }, item); //создание нового объекта на основе двух, указанных в параметрах
							this.cart.push(itemCart);
							// this.$set(item, 'quantity', 1);
							// this.cart.push(item)
						}
					}
				});
		},
		removeProduct(item) {
			this.getJson(`${API}/addToBasket.json`).then((data) => {
				console.log(item.id_product);
				if (data.result === 1) {
					let find = this.cart.find((product) => item.id_product === product.id_product);
					if (find.quantity > 1) {
						find.quantity--;
					} else {
						this.cart.splice(this.cart.indexOf(find), 1);
					}
					console.log(find);
					console.log(this.cart.indexOf(find));
				}
			});
		},
		filter() {
			const regexp = new RegExp(this.userSearch, "i");
			this.filtered = this.products.filter((product) => regexp.test(product.product_name));
			console.log(this.filtered);
		},
	},
	mounted() {
		this.getJson(`${API + this.cartUrl}`).then((data) => {
			for (let el of data.contents) {
				this.cart.push(el);
			}
		});
		this.getJson(`${API + this.catalogUrl}`).then((data) => {
			for (let el of data) {
				this.products.push(el);
				this.filtered.push(el);
			}
		});
		this.getJson(`getProducts.json`).then((data) => {
			for (let el of data) {
				this.products.push(el);
				this.filtered.push(el);
			}
		});
	},
});
