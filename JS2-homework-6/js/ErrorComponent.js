Vue.component('error', {

	template:
			` <div class="error" v-show="$parent.error"  style="color: red; text-align: center;">
					Ошибка, нет файла JSON! <br>
					{{$parent.url}}
			  </div>
			`
});