
<template lang="pug">
div
	div(@click="test") fdfs 
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {
		// 布局视口的width
		var vw = document.documentElement.clientWidth;
		//设备width
		var dw = screen.availWidth;
		// 设备像素比
		var dpr = window.devicePixelRatio;
		console.log("vw:" + vw);
		console.log("dw:" + dw);
		console.log("dpr:" + dpr)
		// function Foo() {
		// 	let id = this.__proto__.id ? this.__proto__.id : 1
		// 	this.id = id;
		// 	this.__proto__.id = id + 1
		// }

		const Foo = (function() {
			let idIndex = 1;
			return function() {
				this.id = idIndex++;
			}
		})()

		console.log()
		let foo1 = new Foo()
		let foo2 = new Foo()
		let foo3 = new Foo()
		// console.log(foo3)
		console.log(foo1.id, foo2.id, foo3.id)

		let arr1 = [1, 2, 3, 3, 2, 1]
		// let newArr = arr1.reduce((arg, item) => {
		// 	!arg.includes(item) && (arg.push(item))
		// 	return arg
		// }, [])
		let newArr = arr1.filter((item) => {
			item
		})

		console.log(newArr)

		setTimeout(() => {
			console.log('timeout');

		}, 0);
		this.$nextTick(() => {
			setTimeout(() => {
				console.log('timeou');

			}, 0);
			console.log('2');
			this.$nextTick(() => {

				console.log('3');

			})
		})




		//1.手动实现new
		function myNew(foo, ...args) {
			const obj = Object.create(foo.prototype)
			let result = foo.apply(obj, args)
			return typeof result == 'object' && result !== null ? result : obj
		}

		// function Foo(name) {
		// 	this.name = name
		// }
		let foo = myNew(Foo, '张三')
		// console.log(foo.name, "手动实现new")
		//2.es5实现继承
		function Parent(name) {
			this.name = [name]
		}
		Parent.prototype.getName = function() {
			return this.name
		}

		function Child() {
			// 构造函数继承
			Parent.call(this, 'zhangsan')
		}
		//原型链继承
		// Child.prototype = new Parent()
		Child.prototype = Object.create(Parent.prototype) //将`指向父类实例`改为`指向父类原型`
		Child.prototype.constructor = Child

		//测试
		const child = new Child()
		const parent = new Parent('a')
		let result1 = child.getName() // ['zhangsan']
		let result2 = parent.getName() // 报错, 找不到getName()
		// console.log(result1, result2, parent)
		this.extend1()
	},
	methods: {
		extend1() {
			function Foo(name = "张三") {
				this.name = name
			}
			Foo.prototype.getName = function() {
				return this.name;
			}

			function Coo() {
				this.name2 = "历史"
			}
			Coo.prototype = new Foo();
			Coo.prototype.constructor = Coo;
			let coo = new Coo('哈哈')
			// console.log(coo)
		},
		test: _.debounce(function() {
			console.log("今天你防抖了吗", this)
		}, 1000, false),


	},
}
</script>
