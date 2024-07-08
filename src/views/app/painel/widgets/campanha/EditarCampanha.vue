<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                editar
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    
    props:{
        id:{
            type:Number,
            required:true
        }
    },

    created() {
        // pegar informações basicas da companha pelo id
    },

})

</script>