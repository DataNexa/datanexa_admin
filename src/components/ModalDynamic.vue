<template>
    <div style="position:absolute; top:0; left:0" >
        <div class="container-fluid pt-4 modal-vue" @click="!dontClose ? $emit('close_modal') : ()=>{}">
            <div class="row modal-content ms-1 ms-md-0" >  
                <div class="col-12 col-md-8 col-lg-6 bg-white rounded p-3 shadow inner-content d-block mx-auto" @click="stopPropagation">
                    <button v-if="!dontClose" @click="$emit('close_modal')" type="button" class="btn-close d-block ms-auto" aria-label="Close"></button>
                    <div class="container-fluid">
                        <div class="row">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
    props:{
        dontClose:Boolean
    },

    methods:{
        onEvent(name:string, data?:Object){
            this.$emit('eventModal', name, data)
        },
        stopPropagation(event:Event){
            event.stopImmediatePropagation()
        }
    }
})
</script>

<style scoped>
.modal-vue {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 119, 0.5);
    z-index: 9999999;
}
.modal-content {
    height:80%
}
.inner-content {
    max-height: 100%;
    overflow: auto;
}
</style>