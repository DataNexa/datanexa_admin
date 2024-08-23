<template>
    <div style="z-index:999999999; position:fixed; width:90%; left: 5%; top: 10%;" v-if="alert.show" :class="`alert alert-${getType()} alert-dismissible fade show mt-3 shadow`" role="alert">
        <h4 class="alert-heading" v-if="getType() == 'success'">Sucesso!</h4>
        <h4 class="alert-heading" v-if="getType() == 'warning'">Cuidado!</h4>
        <h4 class="alert-heading" v-if="getType() == 'danger'">Erro!</h4>
        <p>{{ alert.text }}</p>
        <button @click="alert.show = false" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue'
import { alert_type, type alert_i } from '@/components/interfaces/AlertI'

export default defineComponent({

    created(){
        if(this.alert.show){
            this.show()
        }
    },

    props:{
        alert:{
            type:Object as () => alert_i,
            required:true
        }
    },

    methods:{
        getType():string {
            return typeof this.alert.type == 'string' ? this.alert.type : alert_type[this.alert.type].toLowerCase()
        },
        show() {
            setTimeout(() => {
                this.alert.show = false
            }, 4000);
        }
    },
    watch:{
        'alert.show'(valor:boolean){
            if(valor){
                this.show()
            }
        }
    }
})

</script>

<style scoped>

</style>