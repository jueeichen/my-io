<template>
	<div>
		<div>
			aaddvv
		</div>
		<p>当前的 count 值为：{{count}}</p>
		<p>当前的 count1 值为：{{count1}}</p>
		<p>当前的 zs 值为：{{zs}}</p>
	
	
	</div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
export default {
	props: {
		name: {
			type: String,
			default: 'zyy'
		}
	},
	setup() {
		// console.log(props.name)
		// console.log(context)
		// const state = reactive({ count: 0 })
		// const count1 = ref(0)
		// console.log(count1.value)
		// count1.value++
		// 	console.log(count1.value)
		// return { ...state, count1, zs: ref('zs') }
		const count = ref(1)
		const plusOne = computed(() => count.value + 1)

		console.log(plusOne.value) // 2
	},

}
</script>