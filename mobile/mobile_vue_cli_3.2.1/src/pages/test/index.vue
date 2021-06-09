
<template lang="pug">
div
	child(:title.sync="doc.title")
	input(v-model="doc.title")
</template>

<script>
import child from "./child";
export default {
	provide: {
		house: '房子',
		car: '车子',
		money: '￥10000'
	},
	data() {
		return {
			doc: { title: '1' }
		}
	},
	components: {
		child
	},
	mounted() {
		const arr = [{code: "021213", menuName: '余额明细',rightFlag: true}]

	const obj = {}
	arr.map(item => {
		obj.menuName = item.menuName
	})
	console.log(obj,'<=')
	debugger
	this.name = 1
	console.log(this)
	console.log("<=")

	this.keyName()
},
methods: {
	forIn() {
		let obj = { age: 1, name: 2 }
		Object.defineProperty(obj, "age", { value: "18", enumerable: false }) //如果obj 某个属性设置为不可枚举  就不能被for in 输出
		for (let a in obj) {
			console.log(a) //输出的是可枚举的keyName name 
		}
	},
	forOf() {
		let str = 'abc'
		for (let index in 'abc') {
			console.log(str[index]) //输出的是 a b c
		}
	},
	keyName() {
		let obj = { age: 1, name: 2 }


		Object.keys(obj) //['age','name']
			.map(item => {
				console.log(item) //输出的是 a b c

			})
		console.log(Object.entries(obj)) //返回二元数组键值对
	}
},
}
</script>
