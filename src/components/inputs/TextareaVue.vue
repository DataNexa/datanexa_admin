<template>
    <label v-if="input.text?.label" class="form-label m-0 p-0">{{ input.text?.label }} <span><small><i>{{ input.required && asterico ? '(*)' : '' }}</i></small></span></label>
    <p class="text-danger m-0 p-0" v-if="showError"><small><i>{{ input.messageError ? input.messageError : 'Este campo não pode estar vazio' }}</i></small></p>
    <p class="m-0 p-0" v-if="!showError && input.message"><small><i>{{ input.message }}</i></small></p>
    <textarea :class="`form-control ${showError?'border border-danger':''}`" v-on:focusout="verifyValue" rows="3" v-model="value"></textarea>
</template>

<script lang="ts">
import type { input_i } from '@/components/interfaces/InputI';
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return {
            showError:false,
            value:""
        }
    },
    props:{
        input:{
            type:Object as () => input_i,
            required: true
        },
        asterico:Boolean
    },
    methods:{
        verifyValue(){

            if(this.input.text){
                this.input.text.value = this.value
                this.$emit('input_change_value')
            }

            if(this.input.required && this.input.text && this.input.text.value?.trim() == ''){
                this.showError = true 
                this.input.validate = false
                return
            }

            this.showError = false
            this.input.validate = true

        }
    }
})

</script>