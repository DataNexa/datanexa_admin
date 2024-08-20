<template>
    
    <ModalDynamic v-if="openModal && !canNotChangeState" @close_modal="openModal=false" >
        <span><IconStaus float="left" :color="colorIcon" :size="20" :key="keyIcon"/> 
            <b>{{ status[card.status].charAt(0).toUpperCase() + status[card.status].slice(1) }}. </b>
            <i v-if="card.dataLimite"><br><small>cartão {{ status[card.status] == 'ativo' ? 'expira' : 'expirava' }} em {{ expiraEm }}</small></i>
        </span>
        
        <h5>{{ card.tarefa }}</h5>
        <p>{{ card.descricao }}</p>
        <div class="row" v-if="status[card.status]=='ativo' && canUpdate">
            <div class="col-6">
                <button class="btn btn-sm btn-outline-danger" v-on:click="changeState(3)">Cancelar Cartão</button>
            </div>
            <div class="col-6">
                <button v-if="canUpdate" class="btn btn-success d-block ms-auto" v-on:click="changeState(2)">Feito</button>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <button v-if="canUpdate" class="btn btn-info d-block ms-auto" v-on:click="changeState(1)">Reativar Cartão</button>
            </div>
        </div>
    </ModalDynamic>

    <div v-if="card.show" v-on:click="openModal=true" class="cardCampanha container-fluid bg-black-super-light border my-2 p-2">
        <div class="row">
            <div class="col-10">
                <p>{{ card.tarefa }}</p>
            </div>
            <div class="col-2 pt-1">
                <IconStaus float="right" :color="colorIcon" :size="15" :key="keyIcon"/>
            </div>
        </div>
        <div class="row" v-if="card.dataLimite">
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
import { request } from '@/model/libs/Request';
import { App } from '@/model/Entidades/App';


export default defineComponent({

    methods:{
        async changeState(status:number){

            const resp = await request({
                method:'post',
                route:'tarefas/update'
            }, {
                campanha_id:this.campanha_id,
                tarefa:this.card.tarefa,
                id:this.card.tarefa_id,
                descricao:this.card.descricao,
                status:status,
                createAt:this.card.createAt,
                dataLimite:this.card.dataLimite ? this.card.dataLimite : ''
            })

            if(resp.code == 200){

                let oldstate = this.card.status
                this.card.status = status

                if(status != oldstate){
                    this.card.show = false
                    this.$emit('recount_cards')
                }
                
                this.setColor()
                this.keyIcon++

            }

        },
        setColor(){
            if(!['ativo', 'finalizado', 'cancelado'].includes(this.status[this.card.status])){
                return
            }
            switch (this.card.status) {
                case   1 : this.colorIcon = "blue" ; break;
                case   3 : this.colorIcon = "red"  ; break;
                case   2 : this.colorIcon = "green"; break;
            }
        }
    },

    props:{
        campanha_id:{
            type:Number,
            required:true
        },
        card:{
            type: Object as () => {
                tarefa_id:number,
                tarefa:string,
                descricao:string,
                status:number,
                createAt:string,
                dataLimite?:string,
                show?:boolean
            },
            required:true
        },
        canNotChangeState:Boolean
    },

    data(){
        return {
            status:['inativo', 'ativo', 'finalizado', 'cancelado'],
            keyIcon:1,
            percent: "0%",
            openModal:false,
            colorIcon:"blue",
            colorPercent:"blue",
            expiraEm:"",
            modifiEm:"",
            canUpdate:App.userHasPermission('campanhas@tarefas_update')

        }
    },
    created() {
        
        this.setColor()
        
        if(this.card.dataLimite){

            let expr = new Data(this.card.dataLimite)
            this.expiraEm = expr.toBr()

            let crea = new Data(this.card.createAt).timestamp()
            let exp2 = expr.timestamp()
            let hoje = Date.now()

            if(exp2 && crea){
                let x = 100 - Math.round((100 * (exp2 - hoje)) / (exp2 - crea))
                x = x > 100 ? 100 : x
                this.colorPercent = x > 30 ? (x > 60 ? (x > 80 ? "red" : "yellow"):"blue") : "green"
                this.percent = `${x}%`
            }
            
        }


    },
    components:{IconStaus, ModalDynamic, Icon}
})

</script>

<style scoped>
.cardCampanha {
    cursor:pointer;
    background-color: white;
}

.cardCampanha:hover {
    background-color:aliceblue;
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