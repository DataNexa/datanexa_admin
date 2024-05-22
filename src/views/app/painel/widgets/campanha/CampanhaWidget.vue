<template>
    <Widget :loading="false" md="6" lg="3">
        <h5>{{ title }}</h5>
        <div class="row">
            <div class="col-3">
                <a href="#">
                    <Icon icon="IconInfo" fill="blue" css="d-block mx-auto" :scale="0.8"/>
                </a>
            </div>
            <div class="col-3">
                <a :name="`ativo_${index}`" @click="stateChange('ativo')" href="#" class="p-1 mx-auto d-block rounded bg-black-super-light">
                    <IconStaus color="blue" :size="30" :value="c_ativo"/>
                </a>
            </div>
            <div  class="col-3">
                <a :name="`finalizado_${index}`" @click="stateChange('finalizado')" href="#" class="p-1 mx-auto d-block rounded">
                    <IconStaus color="green" :size="30" :value="c_finalizado"/>
                </a>
            </div>
            <div class="col-3">
                <a :name="`cancelado_${index}`" @click="stateChange('cancelado')" href="#" class="p-1 mx-auto d-block rounded">
                    <IconStaus color="red" :size="30" :value="c_cancelado"/>
                </a>
            </div>
        </div>
        <div class="list-card container-fluid mt-1">
            <div class="row">
                <div class="col-12" v-if="noCard">
                    <Icon icon="IconDesert" :size="300" :scale="0.5" css="d-block mx-auto" fill="black-super-light"/>
                    <p class="text-black-light text-center"><i>Não há nada aqui ainda</i></p>
                </div>
                <div class="col-12" v-else>
                    <CardCampanha v-for="card in cardsList" :card="card" @recount_cards="countCards"/>
                </div>
            </div>
        </div>

        <div class="container-fluid" v-if="state == 'ativo'">
            <div class="row">
                <button class="btn btn-primary">Adicionar Cartão</button>
            </div>
        </div>

    </Widget>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Widget from '@/components/Widget.vue';
import CardCampanha from './CardCampanhaWidget.vue';
import IconStaus from '../_includes/IconStaus.vue';
import Icon from '@/components/Icon.vue';
interface card_list {
    id:number,
    name:string,
    state:string,
    description:string,
    date?:string,
    show?:boolean,
    criadoEm:string,
    modificadoEm?:string
}[]

interface data {
    state:string,
    cardsList:card_list[],
    c_ativo:number,
    c_finalizado:number,
    c_cancelado:number,
    noCard:boolean
}

export default defineComponent({
    components:{Widget, CardCampanha, IconStaus, Icon},
    data():data{
        return {
            state:'ativo',
            cardsList:[],
            c_ativo:0,
            c_cancelado:0,
            c_finalizado:0,
            noCard:false
        }
    },
    created() {
        this.cardsList = this.cards
        this.countCards()
        this.stateChange('ativo')
    },
    methods:{

        countCards(){
            this.c_ativo = 0
            this.c_cancelado = 0
            this.c_finalizado = 0
            for(const car of this.cardsList){
                if(car.state == 'ativo') this.c_ativo++
                if(car.state == 'cancelado') this.c_cancelado++
                if(car.state == 'finalizado') this.c_finalizado++
            }
        },

        stateChange(newState:string){

            document.querySelector(`a[name="${this.state}_${this.index}"]`)?.classList.remove('bg-black-super-light')
            document.querySelector(`a[name="${newState}_${this.index}"]`)?.classList.add('bg-black-super-light')

            this.state = newState
            this.noCard = true
            for(let card of this.cardsList) {
                card.show = card.state == this.state
                if(card.show) this.noCard = false
            }
        }
    },
    props:{
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        cards:{
            type: Object as () => card_list[],
            required:true
        }, 
        index:{
            type:Number,
            required:true
        }
    }
})
</script>

<style scoped>
.list-card {
    max-height: 350px;
    overflow-y:auto;
}
</style>