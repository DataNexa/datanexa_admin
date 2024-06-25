<template>
    <Page :code="200">
        <CampanhaHomeWidget/>
        <CampanhaHomeWidget/>
    </Page>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '@/components/Page.vue';
import CampanhaHomeWidget from '@/views/app/painel/widgets/campanha/CampanhaHomeWidget.vue'

export default defineComponent({
    components:{Page, CampanhaHomeWidget}
})
</script>