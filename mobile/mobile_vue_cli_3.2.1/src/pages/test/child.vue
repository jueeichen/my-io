
<template lang="pug">
div
	div 儿子的房子:{{house}}
	input(v-model="text")
	sun(:bar="235" @handle="handle" ) 
		div( slot="footer" slot-scope="slotProps" )
			div {{handle(slotProps.data)}}哈哈
</template>

<script>
import sun from "./sun";
export default {
	inject: {
		house: {
			default: '没房'
		},
		car: {
			default: '没车'
		},
		money: {
			// 长大工作了虽然有点钱
			// 仅供生活费，需要向父母要
			default: '￥4500'
		}
	},
	props: {
		title: String
	},
	data() {
		return {
			text: '1'
		}
	},
	methods:{
		handle(a){
			console.log('handle')
			if(a){
			console.log(a,"<=")
return a
			}
		}
	},
	components: {
		sun
	},
	watch: {
		text(newVal) {
			this.$emit('update:title', newVal)
		}
	}

}
</script>
