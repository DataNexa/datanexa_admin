<template>
<Page>
    
    <CampanhaWidgetVue 
        title="um titulo qualquer para ver como fica"
        :cards="[
            {
                id:1,
                name:'uma cartao com titulo grande aqui',
                state:'ativo',
                description:'uma descricao qualquer',
                criadoEm:'2024-01-20 00:00:00',
                date:'2024-03-15 00:00:00'
            },
            {
                id:2,
                name:'uma cartao com titulo grande aqui 2',
                state:'ativo',
                description:'uma descricao qualquer 2',
                criadoEm:'2024-01-20 00:00:00',
                modificadoEm:'2024-01-19 00:00:00'
            },
            {
                id:3,
                name:'uma cartao com titulo grande aqui 3',
                state:'ativo',
                description:'uma descricao qualquer 3',
                criadoEm:'2024-01-20 00:00:00',
            },
            {
                id:4,
                name:'uma cartao com titulo grande aqui 4',
                state:'ativo',
                description:'uma descricao qualquer 4',
                criadoEm:'2024-01-20 00:00:00',
                modificadoEm:'2024-01-19 00:00:00'
            },
            {
                id:5,
                name:'uma cartao com titulo grande aqui 5',
                state:'ativo',
                description:'uma descricao qualquer 5',
                criadoEm:'2024-01-20 00:00:00',
                modificadoEm:'2024-01-19 00:00:00'
            }
        ]"
    />
</Page>
</template>

<script lang="ts">
import Page from './components/Page.vue';
import {defineComponent} from 'vue'
import CampanhaWidgetVue from './views/app/painel/widgets/campanha/CampanhaWidget.vue';
import Icon from './components/Icon.vue';
export default defineComponent({
    components:{CampanhaWidgetVue, Page, Icon}
})
</script>