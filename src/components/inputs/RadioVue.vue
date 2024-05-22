<template>
    <label class="form-label" v-if="input.radio?.label">{{ input.radio.label }} <span><small><i>{{ input.required && asterico ? '(*)' : '' }}</i></small></span></label>
    <p class="text-danger m-0 p-0" v-if="input.showError"><small><i>{{ input.messageError ? input.messageError : 'Você precisa escolher uma opção' }}</i></small></p>
    <p class="m-0 p-0" v-if="!input.showError && input.message"><small><i>{{ input.message }}</i></small></p>
    <div v-if="input.radio" class="form-check" v-for="option in input.radio.options">
        <input v-on:change="changeValue" class="form-check-input" type="radio" :value="option.value" :name="input.radio.name" v-model="value">
        <label class="form-check-label" v-html="option.label"></label>
    </div>
</template>

<script lang="ts">
import type { input_i } from '@/interfaces/InputI';
import {defineComponent} from 'vue'

export default defineComponent({
    data(){
        return {
            value:""
        }
    },
    props:{
        input:{
            type:Object as () => input_i,
            required:true
        },
        asterico:Boolean
    },
    methods:{
        changeValue(){
            if(this.input.radio){
                this.input.radio.value = this.value
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