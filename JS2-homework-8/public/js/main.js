'use strict';

const app = new Vue({
	el: '#app',
	data: {
		showCart: false,
		error: false
	},

	methods: {
		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error);
					this.error = true;
				})

		},
		postJson(url, data) {
			return fetch(url, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(result => result.json())
				.catch(error => {
					// console.log(error)
					this.$refs.error.text = error;
				})
		},
		putJson(url, data) {
			return fetch(url, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(result => result.json())
				.catch(error => {
					// console.log(error)
					this.$refs.error.text = error;
				})
		},
		delJson(url) {
			return fetch(url, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json"
				},
			})
				.then(result => result.json())
				.catch(error => {
					// console.log(error)
					this.$refs.error.text = error;
				})
		},
		menuOpen() {
			this.$refs.menu.classList.remove('main-nav-close');
		},
		menuClose() {
			this.$refs.menu.classList.add('main-nav-close');
		},
	},

	mounted() {
	}
});