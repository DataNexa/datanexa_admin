<template>
    <label class="form-label">{{ input.text?.label }} <span><small><i>{{ input.required && asterisco ? '(*)' : '' }}</i></small></span></label>
    <div class="input-group pb-2">
        <span v-if="input.text?.icon" class="input-group-text" id="basic-addon1" v-html="input.text?.icon"></span>
        <input :placeholder="input.text?.placeholder" @input="onTyping" @focusout="isValid" :class="`form-control ${(input.showError?'boder border-danger':'')}`" :type="inptype" v-model="value" :readonly="input.readonly ? input.readonly : false"/>
        <span v-if="input.text?.type == 'password'" @click="changeType" class="input-group-text" style="cursor:pointer;" v-html="see ? '&#128515;' : '&#128518;'"></span>
    </div>
    <p class="text-danger pb-3 my-0" v-if="input.showError"><small><i>{{ (input.messageError ? input.messageError : "campo inválido") }}</i></small></p>
    <p class="text-gray pb-3 my-0" v-if="input.message"><small><i v-html="input.message"></i></small></p>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import type { input_i } from '@/components/interfaces/InputI';

const regs:{[key:string]:string} = {
    cpf:"([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})",
    email:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    senha:"^(?=.*)(?=.*\\d)[A-Za-z@\\/_\.\\-+#$%&*!?\\{\\[\\]\\}\\(\\)\\d\\\\]{8,}$" // 8 caracteres letras e numeros
}

export default defineComponent({
    data(){
        return {
            showError:this.input.showError ? this.input.showError : false,
            see:false,
            inptype:this.input.text?.type,
            value: this.input.text ? this.input.text.value : "" 
        }  
    },
    created() {
        this.input.validate = !(this.input.text?.regex || this.input.required)
        if(this.value){
            this.isValid()
        }
    },
    props:{
        input:{
            type: Object as () => input_i,
            required:true
        },
        asterisco:Boolean
    },
    methods:{

        changeType(){
            this.inptype = this.inptype == 'password' ? 'text' : 'password'
            this.see = !this.see
        },

        onTyping(e:Event){
            this.$emit('onTypingEvent', e)
        },

        isValid(){

            if(this.input.text){
                this.input.text.value = this.value
            }

            if (this.input.text?.regex) {
                
                var reg:RegExp = this.input.text.regex instanceof RegExp ? this.input.text.regex : new RegExp("", "i")
                
                for(const ob of Object.keys(regs)){
                    if(ob == this.input.text.regex){
                        reg = new RegExp(regs[ob],"i")
                        break;
                    }
                }
    
                if(this.input.text.value && reg.test(this.input.text.value)){
                    this.input.validate = true
                    this.input.showError = false
                    return this.$emit('input_change_value', this.input.validate, this.input.text.value)
                }

                this.showError = true
            } else
            if (this.input.required && (!this.input.text || !this.input.text.value || this.input.text.value?.trim() == "")){
                this.input.validate  = false
                this.input.showError = true
            } else {
                this.input.validate  = true
                this.input.showError = false
            }

            this.$emit('input_change_value', this.input.validate, this.input.text?.value)

        }

    }
})
</script>