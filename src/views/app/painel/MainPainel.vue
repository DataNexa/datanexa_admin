<script lang="ts">

import MenuClientAdmin from "@/components/MenuClientAdmin.vue";
import HeaderAdmin from "@/components/HeaderAdmin.vue";
import {defineComponent} from "vue"
import { RouterView } from 'vue-router'

export default defineComponent({
    data() {
        return {};
    },
    components: { MenuClientAdmin, HeaderAdmin }
})

</script>

<template>
    <MenuClientAdmin/>
    <HeaderAdmin />
    <RouterView />
</template>

