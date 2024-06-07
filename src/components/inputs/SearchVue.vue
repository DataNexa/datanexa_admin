<template>
    <div class="input-group">
        <span class="input-group-text">
            <Icon icon="IconSearch" :scale="0.4" v-if="!value || value.trim() == ''"/>
            <a href="#" @click="close" v-else>
                <Icon icon="IconClose" :scale="0.4" fill="red" css="mx-auto d-block"/>
            </a>
        </span>
        <input :placeholder="input.text?.placeholder" v-on:keyup="changed" :class="`form-control`" v-model="value"/>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import type { input_i } from '@/components/interfaces/InputI'
import Icon from '../Icon.vue'

export default defineComponent({

    components:{ Icon },
    
    data(){
        return {
            value: "",
            digitando:false,
            enviando:false,
            oldValue:""
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
        close(){
            this.value = ''
            this.oldValue = ''
            if(this.input.text)
            this.input.text.value = ''
            this.$emit('input_change_value')
        },
        changed(){
            if(!this.digitando){
                if(this.value.trim() == '' && this.oldValue.trim() == ''){
                    return
                }
                this.digitando = true
                this.$emit('input_searching')
                setTimeout(() => {
                    this.modify()
                }, 1000);
            }
        },
        modify(){
            setTimeout(() => {
                if(this.input.text){
                    this.digitando = false
                    this.input.text.value = this.value
                    this.oldValue = this.value
                    this.$emit('input_change_value')
                }
            },200)
        }

    },

})
</script>