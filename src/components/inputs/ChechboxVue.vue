<template>
    <div :class="`form-check ${input.checkbox?.switch ? 'form-switch' : ''}`">
        <input class="form-check-input" v-on:change="change" type="checkbox" :checked="input.checkbox?.checked">
        <label class="form-check-label" v-html="input.checkbox?.text"></label>
    </div>
    <p class="text-danger" v-if="input.required && asterico && !input.checkbox?.checked"><small><i>{{ input.messageError }}</i></small></p>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import type { input_i } from '@/components/interfaces/InputI';

export default defineComponent({
    props:{
        input: {
            type:Object as () => input_i,
            required:true
        },
        asterico:Boolean
    },
    data(){
        return {
            status:this.input.checkbox?.checked
        }
    },
    methods:{
        change(){
            this.status = this.status ? false :  true
            if(this.input.checkbox){
                this.input.checkbox.checked = this.status
                this.$emit('input_change_value')
            }
        }
    }
})
</script>