<template>
    <g id="Camada_x0020_1" :transform="`scale(${scale})`">
       <circle :class="`fill-${fill}`" cx="25" cy="25" r="21.83"/>
       <path class="fill-white" d="M15.58 35.02l6.91 0 0 1.5 14.26 0 0 -3.72 -14.26 0 0 1.87 -6.35 0 0 -8.87 6.35 0 0 1.69 14.26 0 0 -3.73 -14.26 0 0 1.7 -6.35 0 0 -6.67 2.33 0 0 -5.31 -5.22 0 0 5.31 2.33 0 0 16.23zm0.97 0.82l-1.79 0 0 -16.22 -2.33 0 0 -6.96 6.87 0 0 6.96 -2.34 0 0 5.01 4.71 0 0 -1.69 15.9 0 0 5.36 -15.9 0 0 -1.67 -4.71 0 0 7.22 4.71 0 0 -1.87 15.9 0 0 5.36 -15.9 0 0 -1.5 -5.12 0zm5.53 -22l15.49 0 0 5.37 -15.9 0 0 -5.37 0.41 0zm14.67 0.82l-14.26 0 0 3.73 14.26 0 0 -3.73z"/>
   </g>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
   props:{
       fill:{
           type:String,
           required:true
       },
       scale:{
           type:Number,
           required:true
       }
   }
})
</script>