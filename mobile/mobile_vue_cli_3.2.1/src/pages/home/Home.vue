
<template lang="pug">
div
	.aaa(@click="text()") d节流fd
	.bbb(@click="text1()") 第三方   防抖
</template>

<script>
import {_debounce,_throttle} from './tools'
export default {
	data() {
		return {
			str: '2',
			str1: "www.baidu.com?a=1&b=2&c=3&e",
			num: 1,
			arr: [1, 2, 3],
			arr1: [5, 7, 8],
			arr2: [5, 7, 8,[1, 2, 3]],
			obj: { name: '你好', age: 2 },
			bul: false,

		}
	},
	mounted() {
		  window.addEventListener('scroll', this.handleScroll)

		let arr3 =	this.arr2.reduce((arg,item)=>{
			 return	Array.isArray(item)?arg.concat(item):[...arg,item]
			},[])
			console.log(arr3)

	
		function foo() {
			console.log(this.name)
		}
		Function.prototype.myCall = function(thisArg, ...args) {
			thisArg.fn1 = this // this指向调用call的对象,即我们要改变this指向的函数
			console.log(thisArg)
			return thisArg.fn1(...args) // 执行函数并return其执行结果
		}
		foo.myCall(this.obj)
		Function.prototype.myApply = function(thisArg, args) {
			if (typeof this != 'function') {
				throw new TypeError('类型错误')
			}
			const fn = Symbol('fn');
			thisArg[fn] = this;
			const result = thisArg[fn](...args)
			delete thisArg[fn]
			console.log(thisArg)
			return result
		}
		foo.myApply(this.obj, [])
		console.log(foo)
		Function.prototype.myBind = function(thisArg, args) {
			if (typeof this != 'function') {
				throw new TypeError('类型错误')
			}
			const self = this;
			let fbound = () => {
				self.myApply(thisArg, args)
			}
			fbound.prototype = Object.create(self.prototype);
			return fbound;
		}

		function foo11() {
			console.log(this.name)
			console.log(arguments)
		}
		foo11.myBind({ name: '蔡徐坤' }, [1, 2, 3])()
		let result;
		let obj = {}
		let index = this.str1.indexOf('?');
		let str = this.str1.substr(index + 1);
		str.split('&').map(item => {
			let arr = item.split('=')
			obj[arr[0]] = arr[1] ? arr[1] : 'undefined'
		})

		function fn() {}
		fn.prototype = {
			color: "red",
			say: function(color = this.color) {
				// eslint-disable-next-line no-console
				console.log("My color is " + color);
			}
		}

		var apple = new fn;
		apple.say();
		let banana = {
			color: "yellow"
		}
		let pee = {
			color: "touming"
		}
		let ba = apple.say.bind(banana).bind(pee)
		ba()
		// eslint-disable-next-line no-console
		console.log(ba)

		this.add()
		console.log(a)
		a()
		var a = 3

		function a() {
			a = 4
		}

		function fn() {
			this.a = 2;
		}
		var test = new fn();
		console.log(test); //{a:2}
		console.log(a)
	},
	methods: {
		  handleScroll () {

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	console.log(scrollTop)
	alert('scrollTop'+scrollTop)
  },

		text1() {
		let fn = _debounce(this.add, 5000, "防抖")
		fn()
		},
		text() {
		let fn = _throttle(this.add, 5000, "节流")
		fn()
		},
		_debounce(func, wait = 3000) {
			let timeout = null;
			console.log(arguments)
			return function()  {
				console.log("11111")
				let context = this
				if (timeout) clearTimeout(timeout)
				console.log(timeout)
				let args = arguments
				timeout = setTimeout(() => {
					func.apply(context, args)
				}, wait);
			}
		},
		test() {
			this.arr.map((item, index) => {
				if (index == 1) {

					throw new TypeError('错误')

				}
				console.log(item + "还没return")
			})
			console.log("return失败")

		},
		add(str) {
			console.log(str + "张三" + Math.random())
		},
		getType(arg, isType) {
			let result = Object.prototype.toString.call(arg).split(' ')[1]
			console.log(arg, typeof arg)
			return result.substr(0, result.length - 1).toLowerCase() === isType.toLowerCase()
		}
	},
}
</script>

<style scoped lang="stylus">
  @import "../../assets/stylus/mixins.styl"
</style>