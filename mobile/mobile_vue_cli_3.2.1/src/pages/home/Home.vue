
<template lang="pug">
div
	.aaa(@click="text()") d节流fd
	.bbb#mode(@click="text1()") 第三方   防抖
</template>

<script>
import '@src/pages/home/csss.css'
import { _debounce, _throttle } from './tools'
export default {
	data() {
		return {
			str: '2',
			str1: "www.baidu.com?a=1&b=2&c=3&e",
			num: 1,
			arr: [1, 2, 3],
			arr1: [5, 7, 8],
			arr2: [5, 7, 8, [1, 2, 3]],
			obj: { name: '你好', age: 2 },
			bul: false,

		}
	},
	mounted() {

		const arr222 = [{ code: "021213", menuName: '余额明细', rightFlag: true },{ code: "021213", menuName: '余额明细', rightFlag: true },{ code: "021213", menuName: '余额明细', rightFlag: true },{ code: "021213", menuName: '余额明细', rightFlag: true }]   
		const obj222 = {}
		arr222.map(item => {
			obj222.menuName = item.menuName
		})
		console.log(obj222)
		window.addEventListener('scroll', this.handleScroll)

		let arr3 = this.arr2.reduce((arg, item) => {
			return Array.isArray(item) ? arg.concat(item) : [...arg, item]
		}, [])
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


		let objarr = [{ age: 5, name: 1 }, { age: 1, name: 2 }, { age: 2, name: 3 }, { age: 0, name: 3 }, { name: 4, age: undefined }, { name: 5, age: null }, { name: 5, age: undefined }, { name: 7, age: NaN }, { age: 0, name: 3 }]
		// objarr.sort((a,b)=>a.age -b.age)
		let arr123 = objarr.filter(item => {
			return typeof item.age == 'number'
		})
		console.log(arr123, "<<<<")

		console.log(typeof this.handleScroll)
		console.log(this.quickSort([1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50]))


	},
	methods: {

		//手写一个冒泡排序:
		swap(array, i, j) {
			const num = array[i]
			array[i] = array[j]
			array[j] = num
			return array
		},
		maopao(array) {


		},
		//手写一个选择排序
		// change(array) {
		// 	const LENGTH = array.length
		// 	let minIndex = 0
		// 	for (let i = 0; i < LENGTH - 1; i++) {
		// 		let index = i
		// 		for (let j = i + 1; j < LENGTH; j++) {
		// 			if (array[index] > array[j]) {
		// 				index = j
		// 			}

		// 		}
		// 		this.swap(array, i, index)
		// 	}
		// 	return array
		// },
		//手写一个快速排序
		quickSort(arr) {
			const LENGTH = arr.length
			if (LENGTH <= 1) { //如果ary小于等于1一项 不做处理
				return arr
			}
			//第一步找中间项 并把中间项提取出来
			const middleIndex = Math.floor(LENGTH / 2)
			const middle = arr.splice(middleIndex, 1)[0]
			const left = [],
				right = []
			arr.map(current => {
				current < middle ? left.push(current) : right.push(current)

			})

			//第二步是拼接并递归
			return [...this.quickSort(left), middle, ...this.quickSort(right)]
		},
		handleScroll() {

			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			console.log(scrollTop)
			// alert('scrollTop'+scrollTop)
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
			return function() {
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