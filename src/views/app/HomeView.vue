<template>
	<component :is="component"></component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeViewPainel from '@/views/app/painel/pages/HomeViewPainel.vue';

export default defineComponent({
	components:{HomeViewPainel},
	data(){
		return {
			component:'HomeViewPainel'
		}
	}
})
</script>
