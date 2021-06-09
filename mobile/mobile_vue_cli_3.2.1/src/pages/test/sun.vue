
<template lang="pug">
div
	div(@click="$listeners.handle" ) 孙子的房子:{{house}} attr:{{$attrs.bar}}
	slot( :data="'123'"  name='footer' )
	

</template>

<script>
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
						text: '1',
						abc:'111'
        }
    },

    watch: {
        text(newVal) {
            this.$emit('update:title', newVal)
        }
    }

}
</script>
