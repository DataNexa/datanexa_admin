<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 py-3">
                <a href="#" @click="gotoMain" class="text-center d-block mx-auto"><span>⤶</span> voltar para o inicio</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

    props:{
        disable:{
            type:Boolean,
            required:false
        }
    },
    
    methods: {
        gotoMain(){
            if(this.disable) return
            this.$emit('redirectTo', 'AuthMain')
        }
    },

})

</script>

<style scoped>

a {
    text-decoration: none;
    color:white;
}

span {
    font-size: x-large;
}

</style>