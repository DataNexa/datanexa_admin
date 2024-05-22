<template>
    <svg xmlns="http://www.w3.org/2000/svg" 
        xml:space="preserve" 
        :width="`${sized}px`" :height="`${sized}px`" 
        version="1.1" 
        style="shape-rendering:geometricPrecision; 
        text-rendering:geometricPrecision; 
        image-rendering:optimizeQuality; 
        fill-rule:evenodd; clip-rule:evenodd"
        preserveAspectRatio="xMidYMid meet"
        :viewBox="`0 0 ${sized} ${sized}`"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :class="css?css:''">
        <component :is="comp" :fill="fill?fill:'black-grafiti'" :scale="scale?scale:1"></component>
    </svg>
</template>

<script lang="ts">
import {defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
    created() {
        if(this.scale){
            this.sized *= this.scale
        }
    },
    data(){
        return {
            sized:this.size?this.size:50
        }
    },
    computed: {
        comp() {
            return defineAsyncComponent(() => import(`@/components/icons/${this.icon}.vue`))
        }
    },
    props:{
        icon:{
            type:String,
            required:true
        },
        css:String,
        fill:String,
        scale:Number,
        size:Number
    }
})
</script>

