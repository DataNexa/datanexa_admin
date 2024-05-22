<template>
    <form>
        <h4 class="text-center" v-if="formdata.title">{{ formdata.title }}</h4  >
        <p class="text-center" v-if="formdata.description">{{ formdata.description }}</p>
        <InputVue :asterisco="showMessageRequired" v-for="input in formdata.inputs" :input="input"/>
        <div class="row py-3">
            <div class="col" v-for="button in buttons" >
                <ButtonVue 
                    @click_button="click_button(button.slug, button.success)"
                    :button="button"
                />
            </div>
        </div>
        <div class="row">
            <p v-if="showMessageRequired"><small><i>(*) campos obrigatórios</i></small></p>
            <p v-for="message in formdata.messages"><small><i>{{ message }}</i></small></p>
        </div>
    </form>
</template>

<script lang="ts">

import {defineComponent} from "vue"
import type { formdata_i } from '@/interfaces/FormDataI'
import type { button_i } from "@/interfaces/ButtonI"

import InputVue from "@/components/InputVue.vue"
import ButtonVue from "@/components/ButtonVue.vue"

export default defineComponent({

    methods:{
        click_button(slug:string, success?:boolean){
            if(success){
                let status = false         
                for(const inp of this.formdata.inputs){
                    if(inp.required && !inp.validate){
                        inp.showError = true
                        status = true
                    }
                }
                if(status){
                    for(const btn of this.buttons){
                        if(btn.slug == slug && btn.canLoad){
                            btn.loading = false
                        }
                    }
                }
            }
            this.$emit('click_button', slug)
        }
    },
    created() {
        if(this.formdata.asterisco)
        for(const inp of this.formdata.inputs){
            if(inp.required){
                this.showMessageRequired = true
                break
            }
        }
    },
    components:{
        InputVue, ButtonVue
    },
    data(){
        return {
            showMessageRequired:false
        }
    },
    props:{
        formdata:{
            required:true,
            type:Object as () => formdata_i
        },
        buttons:{
            required:true,
            type:Object as () => button_i[]
        },
    },

})

</script>