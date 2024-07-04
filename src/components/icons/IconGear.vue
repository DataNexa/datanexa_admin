<template>
    <svg class="rotating-svg " xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 30 30" width="30" height="30">
        <circle cx="15" cy="15" r="12" fill="none" stroke-width="1"/>
        <g transform="rotate(15, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(45, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(75, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(105, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(135, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(165, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(195, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(225, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(255, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
        <g transform="rotate(285, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g><g transform="rotate(315, 15, 15)">
            <rect x="13" y="3" width="4" height="6" :class="`fill-blue`"/>
            <rect x="13" y="21" width="4" height="6" :class="`fill-blue`"/>
        </g>
    </svg>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({

})
</script>

<style scoped>
@keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* Aplicando a animação ao SVG */
    .rotating-svg {
        animation: rotate 2s linear infinite;
        transform-origin: center center;
    }
</style>


