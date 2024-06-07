<template>
    <label class="form-label" v-if="input.select">{{ input.select.label }} <span><small><i>{{ input.required && asterico ? '(*)' : '' }}</i></small></span></label>
    <p class="text-danger m-0 p-0" v-if="input.showError"><small><i>{{ input.messageError ? input.messageError : 'Você precisa escolher uma opção' }}</i></small></p>
    <p class="m-0 p-0" v-if="!input.showError && input.message"><small><i>{{ input.message }}</i></small></p>
    <select v-if="input.select" class="form-select mb-2" v-on:change="changeValue" v-model="value">
        <option v-for="option in input.select.options" :value="option.value">{{ option.label }}</option>
    </select>
</template>

<script lang="ts">
import type { input_i } from '@/components/interfaces/InputI';
import {defineComponent} from 'vue'

export default defineComponent({
    props:{
        input:{
            type:Object as () => input_i,
            required:true,
        },
        asterico:Boolean
    },
    data(){
        return {
            value:""
        }
    },
    methods:{
        changeValue(){
            
            if(this.input.select){
                this.input.select.value = this.value
                this.$emit('input_change_value')
            }

            if(this.input.required && this.input.radio && this.input.radio.value?.trim() == ''){
                this.input.showError = true
                this.input.validate = false
                return
            }
            this.input.validate = true 
            this.input.showError = false

        }
    }
})
</script>