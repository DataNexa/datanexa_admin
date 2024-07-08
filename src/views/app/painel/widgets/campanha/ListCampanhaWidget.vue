<script lang="ts">
import {defineComponent} from 'vue'
import CampanhaWidgetVue from '@/views/app/painel/widgets/campanha/CampanhaWidget.vue'

interface tarefas {
    tarefa_id:number,
    tarefa:string,
    descricao:string,
    status:number,
    createAt:string,
    dataLimite:string
}

interface campanha_i {
    id:number,
    nome:string,
    descricao:string,
    tarefas:tarefas[]
}

export default defineComponent({
    components:{CampanhaWidgetVue},
    props:{
        list: {
            type: Object as () => campanha_i[],
            required:true
        }
    },
    
})
</script>
<template>
    <CampanhaWidgetVue 
        v-for="campanha,k in list" 
        @openInfo="$emit('openInfo', campanha.id)"
        @createCard="$emit('createCard', campanha.id)"
        :id="campanha.id"
        :index="k"
        :title="campanha.nome"
        :description="campanha.descricao"
        :cards="campanha.tarefas"
    />
</template>

