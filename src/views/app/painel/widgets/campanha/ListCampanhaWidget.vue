<script lang="ts">
import {defineComponent} from 'vue'
import CampanhaWidgetVue from '@/views/app/painel/widgets/campanha/CampanhaWidget.vue'

interface card_list {
    id:number,
    name:string,
    state:string,
    description:string,
    date?:string,
    show?:boolean,
    criadoEm:string,
    modificadoEm?:string
}

interface campanha_i {
    title:string,
    description:string,
    cards:card_list[]
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
        :index="k"
        :title="campanha.title"
        :description="campanha.description"
        :cards="campanha.cards"
    
    />
</template>

