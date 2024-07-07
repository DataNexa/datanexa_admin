<template>
    
    <ModalDynamic v-if="openModal && !canNotChangeState" @close_modal="openModal=false" >
        <span><IconStaus float="left" :color="colorIcon" :size="20" :key="keyIcon"/> 
            <b>{{ card.state.charAt(0).toUpperCase() + card.state.slice(1) }}. </b>
            <i v-if="card.date"><br><small>cartão {{ card.state == 'ativo' ? 'expira' : 'expirava' }} em {{ expiraEm }}</small></i>
        </span>
        <span v-if="card.modificadoEm"><i>
            <small>estatus modificado em {{ modifiEm }}</small></i></span>
        <h5>{{ card.name }}</h5>
        <p>{{ card.description }}</p>
        <div class="row" v-if="card.state=='ativo'">
            <div class="col-6">
                <button class="btn btn-sm btn-outline-danger" v-on:click="changeState('cancelado')">Cancelar Cartão</button>
            </div>
            <div class="col-6">
                <button class="btn btn-success d-block ms-auto" v-on:click="changeState('finalizado')">Feito</button>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <button class="btn btn-info d-block ms-auto" v-on:click="changeState('ativo')">Reativar Cartão</button>
            </div>
        </div>
    </ModalDynamic>

    <div v-if="card.show" v-on:click="openModal=true" class="cardCampanha container-fluid bg-black-super-light border my-2 p-2">
        <div class="row">
            <div class="col-10">
                <p>{{ card.name }}</p>
            </div>
            <div class="col-2 pt-1">
                <IconStaus float="right" :color="colorIcon" :size="15" :key="keyIcon"/>
            </div>
        </div>
        <div class="row" v-if="card.date">
            <div class="col-12">
                <small>
                    <Icon icon="IconClock" :scale="0.3"/>
                    expira em: {{ expiraEm }}
                </small>
                <div class="col-12">
                    <div class="base-data bg-black-light">
                        <div :class="`percent-data bg-${colorPercent}`"
                            :style="`width: ${percent}`"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue'
import IconStaus from '@/views/app/painel/widgets/_includes/IconStaus.vue';
import ModalDynamic from '@/components/ModalDynamic.vue';
import Data from "@/model/libs/Data"
import Icon from '@/components/Icon.vue';
export default defineComponent({

    methods:{
        changeState(state:string){

            let oldstate = this.card.state
            this.card.state = state

            if(state != oldstate){
                this.card.show = false
                this.$emit('recount_cards')
            }
            
            this.setColor()
            this.keyIcon++
        },
        setColor(){
            if(!['ativo', 'finalizado', 'cancelado'].includes(this.card.state)){
                return
            }
            switch (this.card.state) {
                case       "ativo"  : this.colorIcon = "blue" ; break;
                case    "cancelado" : this.colorIcon = "red"  ; break;
                case   "finalizado" : this.colorIcon = "green"; break;
            }
        }
    },

    props:{
        card:{
            type: Object as () => {
                id:number,
                name:string, 
                description:string, 
                state:string,
                date?:string,
                show?:boolean,
                modificadoEm?:string,
                criadoEm:string
            },
            required:true
        },
        canNotChangeState:Boolean
    },

    data(){
        return {
            keyIcon:1,
            percent: "0%",
            openModal:false,
            colorIcon:"blue",
            colorPercent:"blue",
            expiraEm:"",
            modifiEm:""
        }
    },
    created() {
        
        this.setColor()
        
        if(this.card.date){

            let expr = new Data(this.card.date)
            this.expiraEm = expr.toBr()

            let crea = new Data(this.card.criadoEm).timestamp()
            let exp2 = expr.timestamp()
            let hoje = Date.now()

            if(exp2 && crea){
                let x = 100 - Math.round((100 * (exp2 - hoje)) / (exp2 - crea))
                x = x > 100 ? 100 : x
                this.colorPercent = x > 30 ? (x > 80 ? "red":"blue") : "green"
                this.percent = `${x}%`
            }
            
        }

        if(this.card.modificadoEm){
            let modfy = new Data(this.card.modificadoEm)
            this.modifiEm = modfy.toBr()
        }
    },
    components:{IconStaus, ModalDynamic, Icon}
})

</script>

<style scoped>
.cardCampanha {
    cursor:pointer;
}

.cardCampanha:hover {
    background-color: white;
}

small {
    font-size: 13px;
}

.base-data {
    width: 100%;
    height:5px;
}

.percent-data {
    height:100%;
    float:left;
}
</style>