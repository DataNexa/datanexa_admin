<template>
     <g id="Camada_x0020_1" :transform="`scale(${scale})`">
        <circle :class="`fill-${fill}`" cx="25" cy="25" r="21.83"/>
        <g id="_2732083546976">
            <path class="fill-white" d="M32.42 21.52l3.47 0 0 15.7 -3.47 0 0 -15.7zm-18.31 7.88l3.48 0 0 7.82 -3.48 0 0 -7.82zm15.54 7.82l-3.32 0 0 -9.56 3.48 0 0 9.41c0,0.11 -0.04,0.15 -0.16,0.15zm-9.45 -0.15l0 -13.66c0,-0.11 0.03,-0.15 0.15,-0.15l3.32 0 0 13.96 -3.32 0c-0.12,0 -0.15,-0.04 -0.15,-0.15zm-8.29 1.02l26.18 0 0 -0.87 -1.28 0 0 -15.54c0,-0.43 0.04,-0.84 -0.25,-0.98 -0.21,-0.1 -4.61,-0.06 -4.74,-0.03 -0.35,0.1 -0.28,0.48 -0.27,0.9l0 15.65 -0.87 0 0 -9.82c0,-0.72 -0.29,-0.66 -0.97,-0.66 -0.49,0 -3.84,-0.06 -4.05,0.05 -0.17,0.08 -0.25,0.3 -0.25,0.56 -0.02,1.08 0,2.19 0,3.27 0,2.2 0,4.4 0,6.6l-0.82 0 0 -14.11c0.01,-1.04 -0.59,-0.72 -2.61,-0.72 -0.71,0 -1.44,-0.02 -2.15,0 -0.38,0.01 -0.51,0.17 -0.51,0.56l0.01 14.27 -0.87 0c0,-0.56 0.03,-8.3 -0.03,-8.46 -0.14,-0.37 -0.67,-0.28 -1.15,-0.28l-2.81 0c-0.48,0 -1.02,-0.09 -1.2,0.23 -0.18,0.34 -0.08,2.21 -0.08,2.78 0,1.91 0,3.82 0,5.73l-1.28 0 0 0.87z"/>
            <path class="fill-white" d="M16 23.21l-0.31 0c-0.56,0 -1.12,-0.56 -1.12,-1.13l0 -0.25c0,-1.45 2.56,-1.71 2.56,0.21 0,0.58 -0.54,1.17 -1.13,1.17zm18.01 -11.3l0.36 0c0.26,0.02 0.52,0.09 0.75,0.22 0.1,0.05 0.23,0.12 0.32,0.18 1.13,0.83 1.24,2.4 0.21,3.4 -0.77,0.74 -1.77,0.73 -2.69,0.23l-3.05 3.08c0.17,0.32 0.32,0.68 0.35,1.13 0.07,0.93 -0.86,2.24 -2.04,2.24 -2.16,0 -2.66,-1.98 -2.2,-2.96 -0.19,-0.1 -0.2,-0.14 -0.35,-0.26l-1.91 -1.46c-0.11,-0.09 -0.21,-0.19 -0.35,-0.23 -0.22,0.16 -0.32,0.27 -0.63,0.39 -0.78,0.32 -1.34,0.19 -2.03,-0.19l-3.06 3.08c0.36,0.67 0.49,1.3 0.17,2.06 -0.12,0.28 -0.24,0.43 -0.44,0.63 -0.51,0.51 -0.92,0.68 -1.67,0.68 -1.16,0 -2.1,-1.03 -2.1,-2.2 0,-1.46 1.43,-2.53 2.95,-2.03 0.19,0.06 0.26,0.15 0.44,0.21l3.05 -3.09c-0.39,-0.74 -0.5,-1.5 -0.03,-2.28 0.96,-1.57 3.07,-1.36 3.83,0.12 0.47,0.91 0.13,1.39 0.09,1.91l1.89 1.43c0.21,0.16 0.39,0.31 0.61,0.46 0.13,-0.08 0.15,-0.13 0.29,-0.23 0.81,-0.55 1.65,-0.52 2.49,-0.06l3.05 -3.08c-0.16,-0.31 -0.36,-0.72 -0.36,-1.18 0,-0.87 0.53,-1.61 1.21,-1.96 0.26,-0.13 0.55,-0.22 0.85,-0.24zm-5.99 7c1.15,0 1.76,1.36 0.98,2.17 -0.78,0.8 -2.28,0.34 -2.23,-0.92 0.02,-0.42 0.15,-0.63 0.36,-0.85 0.19,-0.19 0.53,-0.4 0.89,-0.4zm-6.04 -1.78c-1.74,0 -1.81,-2.56 0.06,-2.56 0.58,0 1.18,0.52 1.19,1.29 0.01,0.65 -0.51,1.27 -1.25,1.27zm10.89 -2.92c0,-1.83 2.56,-1.87 2.56,0 0,0.64 -0.55,1.18 -1.38,1.18 -0.58,0 -1.18,-0.6 -1.18,-1.18z"/>
        </g>
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