<template>
    <div class="bg-white text-start rounded col-11 col-md-9 col-lg-6 py-3">
        <h3>Um código foi enviado para o e-mail:</h3>
        <h5><i>{{  email }}</i></h5>
        <p>copie e cole o código abaixo:</p>
        <InputVue 
            @change_input="onChange"
            :input="input"
        />
        <ButtonVue 
            @click="onClick"
            :button="button"
        />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import InputVue from '@/components/InputVue.vue';
import ButtonVue from '@/components/ButtonVue.vue';
export default defineComponent({
    
    components: {InputVue, ButtonVue },

    props:{
        email:{
            required:true,
            type:String
        },
        codeType:{
            required:true,
            type:String
        }
    },

    data() {
        return {
            input:{
                slug:"codigo",
                text:{
                    type:"text",
                    placeholder:"CÓDIGO"
                }
            },
            button:{
                slug:"resend",
                text:"enviar novo código",
                css:"btn btn-link d-block mx-auto",
            }
        }
    },

    methods:{
        onChange(){
            // se o código tiver 6 caracteres
            // envia para análise no servidor
        },
        onClick(){
            // envia novo cógido
        }
    }

})

</script>