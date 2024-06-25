<template>
    <div class="container-fluid">
        <div class="row" v-if="code == 200">
            <div class="col-1"></div>
            <div class="col-11">
                <div class="container-fluid py-2">
                    <div class="row">
                        <slot name="header_page"></slot>
                    </div>
                    <div class="row">
                        <slot name="corpo_page"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-1"></div>
            <div class="col-11">
                <div class="container-fluid py-2">
                    <div class="row">
                        <div class="col-12">
                            <h5 class="text-center mt-5">Erro:</h5>
                            <h1 class="text-center" style="font-size: 120px;">{{  code  }}</h1>
                            <h5 class="text-center">{{ message }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({

    props:{
        code:{
            type:Number,
            required:true
        },
        message:{
            type:String,
            required:false
        }
    }

})

</script>