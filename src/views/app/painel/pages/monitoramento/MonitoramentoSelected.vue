<template>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconMonitoramento" :scale="0.7" fill="blue"/>
                    Monitoramento</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <router-link :to="`/monitoramento/editar/${id}`" v-if="!loading && canEdit">
                    <button class="btn btn-outline-primary mx-2">Editar Monitoramento</button>
                </router-link>
            </div>
            
        </template>
        
        <template v-slot:corpo_page>
            <Widget :loading="loading">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="row py-2">
                                <h4>Porcentagem de Publicações:</h4>
                                <p>Total de Publicações: <b>{{ totalPublicacoes }}</b></p>
                                <div class="col">
                                    <SelectVue @input_change_value="setDataDunutsAndPublish" :input="filtro" />
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-2">
                                    <IconWeb/> {{ localPercent.web }}%
                                </div>
                                <div class="col-10 border px-0">
                                    <div :style="`width: ${localPercent.web}%; height:100%;`" class="bg-primary"></div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-2">
                                    <IconInstagram/> {{ localPercent.instagram }}%
                                </div>
                                <div class="col-10 border px-0">
                                    <div :style="`width: ${localPercent.instagram}%; height:100%;`" class="bg-primary"></div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-2">
                                    <IconFacebook/> {{ localPercent.facebook }}%
                                </div>
                                <div class="col-10 border px-0">
                                    <div :style="`width: ${localPercent.facebook}%; height:100%;`" class="bg-primary"></div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-2">
                                    <IconTwitter/> {{ localPercent.twitter }}%
                                </div>
                                <div class="col-10 border px-0">
                                    <div :style="`width: ${localPercent.twitter}%; height:100%;`" class="bg-primary"></div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-2">
                                    <IconYoutube/> {{ localPercent.youtube }}%
                                </div>
                                <div class="col-10 border px-0">
                                    <div :style="`width: ${localPercent.youtube}%; height:100%;`" class="bg-primary"></div>
                                </div>
                            </div>

                            <div class="container">
                                <hr>
                                <p>Filtrar por Data</p>
                                <input @change="handleDateChange" class="form-control" v-model="dataIni" type="date" placeholder="data inicio">
                                <input @change="handleDateChange" class="form-control" v-model="dataFim" type="date" placeholder="data inicio">
                               </div>

                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <ChartWidget
                                titulo=""
                                chartType="doughnut"  
                                :chartData="{
                                    labels:atualStats.labels,
                                    data:atualStats.values
                                }"
                                :key="atualizacao"
                            />
                        </div>
                        <div class="col-12 col-lg-4 py-2">
                            <h5>{{ monitoramento.titulo }}</h5>
                            <p>{{ monitoramento.descricao }}</p>
                            <p>criado dia: {{ getCreateat() }}</p>
                            <hr>
                            <p><b><small>Pequisa:</small></b><br>{{ monitoramento.pesquisa }}</p>
                            <p><b><small>Hashtags:</small></b><br>{{ monitoramento.hashtags.join(" ") }}</p>
                            <p><b><small>Alvo:</small></b><br>{{ monitoramento.alvo }}</p>
                            <p><b><small>Ativo:</small></b><br>{{ monitoramento.ativo == 1? 'sim': 'Não' }}</p>
                            <p><b><small>Repetir:</small></b><br>{{ monitoramento.repetir == 1? 'sim': 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </Widget>

            <Widget :loading="loadingPub">
                <div class="container-fluid ">
                    <div class="row">
                        <div class="col-12">
                            <h3>Publicações: </h3>
                        </div>
                    </div>
                    <div class="row ps-md-4">
                        <div v-for="pub of publicacoes_filter" class="col-lg-3 col-md-6 col-12">
                            <PublishWidget 
                                :titulo="pub.titulo"
                                :texto="pub.texto"
                                :avaliacao="pub.avaliacao"
                                :link="pub.link"
                                :local_pub="pub.local_pub"
                                :curtidas="pub.curtidas"
                                :visualizacoes="pub.visualizacoes"
                                :compartilhamentos="pub.compartilhamento"
                                :data_pub="pub.data_pub"
                            />
                        </div>
                    </div>
                </div>
            </Widget>

        </template>
    </Page>
</template>

<script lang="ts">

import InputVue from '@/components/InputVue.vue';
import { defineComponent } from 'vue'
import Page from '@/components/Page.vue';
import { request } from '@/model/libs/Request';
import Widget from '@/components/Widget.vue';
import Icon from '@/components/Icon.vue';
import IconInstagram from '@/components/icons/IconInstagram.vue';
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconYoutube from '@/components/icons/IconYoutube.vue'
import IconWeb from '@/components/icons/IconWeb.vue'
import ChartWidget from '@/views/app/painel/widgets/_includes/ChartWidget.vue'
import SelectVue from '@/components/inputs/SelectVue.vue';
import Data from '@/model/libs/Data';
import PublishWidget from '@/views/app/painel/widgets/monitoramento/PublishWidget.vue';
import { App } from '@/model/Entidades/App';

interface publicacao_stats {
    local:string,
    positivos:number,
    neutros:number,
    negativos:number
}

interface monitoramento_i {
    titulo:string,
    descricao:string,
    ativo:number,
    repetir:number,
    creatat:string,
    pesquisa:string,
    alvo:string,
    stats:Array<publicacao_stats>,
    hashtags:Array<string>
}

interface publicacoes_i {
    id:number,
    monitoramento_id:number,
    titulo:string,
    texto:string,
    avaliacao:number,
    link:string,
    local_pub:string,
    curtidas:number,
    compartilhamento:number,
    visualizacoes:number,
    data_pub:string
}


export default defineComponent({

    async created() {

        const today = new Date();

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30 * 6 );

        const formatToISODate = (date: Date): string => {
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        };

        this.dataIni = formatToISODate(thirtyDaysAgo);
        this.dataFim = formatToISODate(tomorrow);

    },

    mounted() {
        this.loadData();   
    },

    methods: {

        async getPublishs(){
            
            this.loadingPub = true

            const resp = await request({
                method:'post',
                route:'publicacoes/filter_by_date'
            }, {
                monitoramento_id:this.id,
                dataini:this.dataIni,
                datafim:this.dataFim
            })

            if(resp.code == 200){
                this.publicacoes = resp.body as publicacoes_i[]
                this.loadingPub  = false
            }

        },

        async filterPub(){ 

            this.loadingPub = true

            this.publicacoes_filter = []

            if(this.filtro.select.value == 'tudo'){
                this.publicacoes_filter = this.publicacoes
                this.loadingPub = false
                return
            }

            for(const pub of this.publicacoes){
                if(pub.local_pub == this.filtro.select.value){
                    this.publicacoes_filter.push(pub)
                }
            }

            this.loadingPub = false

        },
        
        async loadData(){
            this.totalPublicacoes = 0
            await this.getData()
            await this.getPublishs()
            this.filterPub()
        },

        handleDateChange() {
            this.loadData();
        },
        
        async getData(){

            const resp = await request({
                method:'post',
                route:'monitoramento/unique'
            }, {
                id:this.id,
                dataini:this.dataIni,
                datafim:this.dataFim
            })

            this.code = resp.code

            if(this.code != 200){
                return
            }

            const monitoramento = resp.body as monitoramento_i
            this.monitoramento  = monitoramento
            
            let total:{[key:string]:number} = {
                'web':0,
                'youtube':0,
                'facebook':0,
                'instagram':0,
                'twitter':0
            }

            for(const stat of monitoramento.stats){
                this.totalPublicacoes += stat.negativos + stat.positivos + stat.neutros
                total[stat.local] += stat.negativos + stat.positivos + stat.neutros
            }

            this.localPercent.web       = this.totalPublicacoes == 0 ? 0 : Math.round((total.web * 100 )/ this.totalPublicacoes)
            this.localPercent.youtube   = this.totalPublicacoes == 0 ? 0 : Math.round((total.youtube * 100 )/ this.totalPublicacoes)
            this.localPercent.facebook  = this.totalPublicacoes == 0 ? 0 : Math.round((total.facebook * 100 )/ this.totalPublicacoes)
            this.localPercent.instagram = this.totalPublicacoes == 0 ? 0 : Math.round((total.instagram * 100 )/ this.totalPublicacoes)
            this.localPercent.twitter   = this.totalPublicacoes == 0 ? 0 : Math.round((total.twitter * 100 )/ this.totalPublicacoes)

            this.loading = false

            this.setDataDunutsAndPublish()

        },

        async setDataDunutsAndPublish(){

            let positivos = 0
            let negativos = 0
            let neutros = 0

            for(const stat of this.monitoramento.stats){
                if(this.filtro.select.value == 'tudo' || stat.local == this.filtro.select.value){
                    negativos += stat.negativos
                    positivos += stat.positivos
                    neutros   += stat.neutros
                }
            }

            this.atualStats.labels = [ 'negativos', 'positivos', 'neutros' ]
            this.atualStats.values = [  negativos ,  positivos ,  neutros  ]
            this.atualizacao++

            this.filterPub()

        },

        getCreateat(){
            return (new Data(this.monitoramento.creatat)).toBr()
        }

    },

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    data() {

        return {

            atualizacao:1,
            code:200,
            loading:true,
            loadingPub:true,
            totalPublicacoes:0,
            monitoramento:{} as monitoramento_i,
            canEdit:App.userHasPermission('monitoramento@update'),
            atualSlug:'tudo',
            dataIni:'',
            dataFim:'',
            filtro:{
                select:{
                    label:'Mostrar:',
                    value:'tudo',
                    options:[
                        {
                            label:'tudo',
                            value:'tudo'
                        },
                        {
                            label:'web',
                            value:'web'
                        },
                        {
                            label:'instagram',
                            value:'instagram'
                        },
                        {
                            label:'twitter',
                            value:'twitter'
                        },
                        {
                            label:'facebook',
                            value:'facebook'
                        },
                        {
                            label:'youtube',
                            value:'youtube'
                        }
                    ]
                }
            },
            publicacoes:[] as publicacoes_i[],
            publicacoes_filter:[] as publicacoes_i[],
            localPercent:{
                web:      0,
                instagram:0,
                facebook: 0,
                twitter:  0,
                youtube:  0
            },
            atualStats:{
                labels:[] as string[],
                values:[] as number[]
            }

        }

    },

    components:{ InputVue, Page, Widget, Icon, IconInstagram, IconFacebook, IconTwitter, IconYoutube, IconWeb, ChartWidget, SelectVue, PublishWidget }

})

</script>