<template>
    <component :is="component" :input="input" :asterisco="asterisco" @input_change_value="input_change_value"/>
</template>

<script lang="ts">

import { defineComponent } from "vue"
import type { input_i } from "@/components/interfaces/InputI";

import TextVue from "./inputs/TextVue.vue";
import ChechboxVue from "./inputs/ChechboxVue.vue";
import SelectVue from "./inputs/SelectVue.vue";
import RadioVue from "./inputs/RadioVue.vue";
import TextareaVue from "./inputs/TextareaVue.vue";
import SearchVue from "./inputs/SearchVue.vue";

export default defineComponent({

    methods:{
        input_change_value(){
            this.$emit('change_value', this.input.slug)
        }
    },

    components:{
        TextVue, ChechboxVue, SelectVue, RadioVue, TextareaVue, SearchVue
    },

    data(){
        return {
            component:"TextVue"
        }
    },

    props:{
        input:{
            type: Object as () => input_i,
            required:true
        },
        asterisco:Boolean
        
    },

    created() {
        if(this.input.text){
            this.component = this.input.text.type == 'textarea' ? 'TextareaVue' : 
            (this.input.text.type == 'search')? 'SearchVue' : "TextVue"
        }

        if(this.input.checkbox){
            this.component = "ChechboxVue"
        }

        if(this.input.radio){
            this.component = "RadioVue"
        }
        
        if(this.input.select){
            this.component = "SelectVue"
        }

    },
})

</script>