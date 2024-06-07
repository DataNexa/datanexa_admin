<template>
    <div v-if="button.canLoad && button.loading" :class="`spinner-border text-primary ${button.css}`" ></div>
    <button v-else type="button" :class="button.css" v-on:click="clickEvt">{{ button.text }}</button>
</template>

<script lang="ts">

import type { button_i } from '@/components/interfaces/ButtonI';
import { defineComponent } from 'vue';

export default defineComponent({
    props:{
        button:{
            type: Object as () => button_i,
            required:true
        }
    },
    methods:{
        clickEvt(event:Event){
            event.preventDefault()
            if(this.button.canLoad){
                this.button.loading = true
            }
            this.$emit('click_button', this.button.slug)
        }
    }
})
</script>


<style scoped>
.logo-animation {
    -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation:spin 2s linear infinite;
}

@-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
}
@-webkit-keyframes spin { 
    100% { -webkit-transform: rotate(360deg); } 
}
@keyframes spin { 
    100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    } 
}
</style>