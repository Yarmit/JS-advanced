"use strict";
class Hamburger {
	constructor() {
		// масивы данных
		this.sizeBurger = [];
		this.stuffingBurger = [];
		this.toppingsBurger = [];
		// заполняем массивы данных
		this._sizeBurger();
		this._stuffingBurger();
		this._toppingsBurger();
		// получаем инфорацию о бургере
		this.size = this.getSize();
		this.stuffing = this.getStuffing();
		this.toppings = this.getToppings();
		// выводим результаты
		this.showResults();
	}

	_sizeBurger() {
		this.sizeBurger = [
			{ title: "Small", price: 50, calories: 20 },
			{ title: "Big", price: 100, calories: 40 },
		];
	}

	_stuffingBurger() {
		this.stuffingBurger = [
			{ title: "Cheese", price: 10, calories: 20 },
			{ title: "Salad", price: 20, calories: 5 },
			{ title: "Potato", price: 15, calories: 10 },
		];
	}

	_toppingsBurger() {
		this.toppingsBurger = [
			{ title: "Spices", price: 15, calories: 0 },
			{ title: "Mayo", price: 20, calories: 5 },
		];
	}

	getSize() {
		let sizeBurger = document.getElementsByName("size");
		let size = "";
		sizeBurger.forEach((element) => {
			if (element.checked) {
				size = element.value;
			}
		});
		for (const obj of this.sizeBurger) {
			if (obj.title == size) {
				return obj;
			}
		}
	}

	getStuffing() {
		let stuffingBurger = document.getElementsByName("add");
		let stuffing = {};
		stuffingBurger.forEach((element) => {
			if (element.checked) {
				for (const obj of this.stuffingBurger) {
					if (obj.title == element.value) {
						stuffing = obj;
					}
				}
			}
		});
		return stuffing;
	}

	getToppings() {
		let topingsBurger = document.getElementsByName("topings");
		let topings = [];
		topingsBurger.forEach((element) => {
			if (element.checked) {
				for (const obj of this.toppingsBurger) {
					if (obj.title == element.value) {
						topings.push(obj);
					}
				}
			}
		});
		return topings;
	}

	calculatePrice() {
		let sumPrice = this.size.price + this.stuffing.price;
		if (this.toppings != 0) {
			for (const obj of this.toppings) {
				sumPrice += obj.price;
			}
		}
		return sumPrice;
	}

	calculateCalories() {
		let sumCalories = this.size.calories + this.stuffing.calories;
		if (this.toppings != 0) {
			for (const obj of this.toppings) {
				sumCalories += obj.calories;
			}
		}
		return sumCalories;
	}

	showResults() {
		document.querySelector("#price").textContent = this.calculatePrice();
		document.querySelector("#calories").textContent = this.calculateCalories();
	}
}

document.querySelector("button").addEventListener("click", () => {
	let a = new Hamburger();
});
