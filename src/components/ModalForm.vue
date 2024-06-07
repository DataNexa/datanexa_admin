<template>
    <ModalDynamic>
        <FormVue @click_button="click_button" v-if="formdata && buttons" :formdata="formdata" :buttons="buttons"/>
    </ModalDynamic>
</template>

<script lang="ts">

import { defineComponent } from "vue"
import type { formdata_i } from '@/components/interfaces/FormDataI'
import type { button_i } from "@/components/interfaces/ButtonI"
import FormVue from "./FormVue.vue"
import ModalDynamic from "./ModalDynamic.vue"

export default defineComponent({
    components:{FormVue, ModalDynamic},
    data(){
        return {
            showTitle:this.formdata && this.formdata.title,
            showDescription:this.formdata && this.formdata.description,
        }
    },
    props:{
        text:{
            type: String,
            required:false
        },
        buttons:{
            type: Object as () => button_i[],
            required:false
        },
        formdata:{
            type: Object as () => formdata_i,
            required:false
        }
    },
    methods:{
        click_button(slug:string){
            this.$emit("click_button", slug)
        }
    }
})

</script>