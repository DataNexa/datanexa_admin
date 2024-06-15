<script lang="ts">
import MainPainel from "./painel/MainPainel.vue";
import {defineComponent} from "vue"
import MainAdmin from "./admin/MainAdmin.vue";
import { App, system_type } from "@/model/Entidades/App";

export default defineComponent({
    components: { MainPainel, MainAdmin },
    created() {
        if(!App.isConnected()){
            // chama o app.vue novamente para analisar
        }
        if(App.getTypeSystem() == system_type.ADMIN){
            this.component = "MainAdmin"
        }
        if(App.getTypeSystem() == system_type.CLIENT){
            this.component = "MainPainel"
        }
        if(App.getTypeSystem() == system_type.LOGIN){
            // chama o app.vue novamente para analisar
        }
    },
    data(){
        return {
            component:'MainPainel'
        }
    }
})

</script>

<template>
    <component :is="component"></component>
</template>

