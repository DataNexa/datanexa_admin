<script lang="ts">
import MainPainel from "./painel/MainPainel.vue";
import {defineComponent} from "vue"

export default defineComponent({
    components: { MainPainel },
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

