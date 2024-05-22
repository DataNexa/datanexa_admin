<template>
    <label class="form-label">{{ input.text?.label }} <span><small><i>{{ input.required && asterisco ? '(*)' : '' }}</i></small></span></label>
    <div class="input-group pb-2">
        <span v-if="input.text?.icon" class="input-group-text" id="basic-addon1" v-html="input.text?.icon"></span>
        <input :placeholder="input.text?.placeholder" @focusout="isValid" :class="`form-control ${(showError?'boder border-danger':'')}`" :type="inptype" v-model="value"/>
        <span v-if="input.text?.type == 'password'" @click="changeType" class="input-group-text" style="cursor:pointer;" v-html="see ? '&#128515;' : '&#128518;'"></span>
    </div>
    <p class="text-danger pb-3 my-0" v-if="showError"><small><i>{{ (input.messageError ? input.messageError : "campo inválido") }}</i></small></p>
    <p class="text-gray pb-3 my-0" v-if="!showError && input.message && !input.validate"><small><i>{{ input.message }}</i></small></p>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import type { input_i } from '@/interfaces/InputI';

const regs:{[key:string]:string} = {
    cpf:"([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})",
    email:"^[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.[a-z]+)?$",
    senha:"^(?=.*)(?=.*\\d)[A-Za-z@\\/_\\-+#$%&*!?\\{\\[\\]\\}\\(\\)\\d\\\\]{8,}$" // 8 caracteres letras e numeros
}

export default defineComponent({
    data(){
        return {
            showError:false,
            see:false,
            inptype:this.input.text?.type,
            value: this.input.text ? this.input.text.value : "" 
        }  
    },
    created() {
        this.input.validate = !(this.input.text?.regex || this.input.required)

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

        isValid(){

            if(this.input.text){
                this.input.text.value = this.value
                this.$emit('input_change_value')
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
                    this.showError = false
                    return
                }

                this.showError = true
            } else
            if (this.input.required && (!this.input.text || !this.input.text.value || this.input.text.value?.trim() == "")){
                this.input.validate = false
                this.showError = true
            } else {
                this.input.validate = true
                this.showError = false
            }

        }

    }
})
</script>