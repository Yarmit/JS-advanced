class ProductList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
        this.render(); //вывод товаров
        this.getSumProducts(); // сумма всех товаров
    }
    // метод заполняет масив товарами
    _fetchProducts() {
        this.goods = [
            { id: 1, title: "Notebook", price: 2000 },
            { id: 2, title: "Mouse", price: 20 },
            { id: 3, title: "Keyboard", price: 200 },
            { id: 4, title: "Gamepad", price: 50 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            // block.innerHTML += item.render();
        }
    }
/**
 * метод расчета общей стоимости товаров в корзине
 */
    getSumProducts() {
        let sumPrice = 0;
        for (let product of this.goods) {
            sumPrice += product.price;
        }
        console.log(sumPrice);
    }
}

class ProductItem {
    constructor(product, img = "https://via.placeholder.com/200x150") {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}

class Cart {
    constructor() {
        // параметры объктов корзины
    }

    addProductCart() {
        // метод добавления товара в корзину
    }

    removeProductCart() {
        // метод удаления товара из корзины
    }

    renderCart() {
        // метод вывода всех товаров на старину корзины
    }

    calcProductsCart() {
        // метод расчета общей суммы товаров в корзине
    }
}

class CartItem {
    constructor() {
        // параметры карточки товара
    }

    renderCart() {
        // метод вывода кароточки товара на страницу
    }
}

let list = new ProductList();