<template>
    <div class="container-fluid">
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <IconLogoQuadrado class="d-block mx-auto"/>
                    </div>
                </div>
                <div style="height: 170px;" class="row justify-content-center py-2" v-for="btn,k in buttons" :key="k">
                    <div @click="onClick(btn.type)" style="height: 150px;" class="col-11 col-md-10 col-lg-6 bg-white rounded btn-card">
                        <div class="row p-0 px-3">
                            <div class="col-7 col-md-8 col-lg-10">
                                <h2 class="text-blue mt-4">{{ btn.title }}</h2>
                                <span>{{ btn.description }}</span>
                            </div>
                            <div class="col-5 col-md-4 col-lg-2 mt-3">
                                <IconUserAuth :typeIcon="btn.type" :scale="1.2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import IconUserAuth from '@/components/icons/IconUserAuth.manual.vue'
import IconLogoQuadrado from '@/components/icons/IconLogoQuadrado.vue';

export default defineComponent({
    components: { IconUserAuth, IconLogoQuadrado },
    data(){
        return {
            buttons:[
                {
                    title:"ENTRAR",
                    description:"Faça o login com e-mail e senha",
                    type:'entrar'
                },
                {
                    title:"CRIAR CONTA",
                    description:"Crie uma conta com seu e-mail",
                    type:'add'
                },
                {
                    title:"RECUPERAÇÃO",
                    description:"Recupere sua conta aqui",
                    type:'confirm'
                }
            ]
        }
    },
    methods: {
        onClick(slug:string){
            console.log(slug);
            
        }
    },
})
</script>

<style scoped>

.btn-card {
    margin-top: 10px;
    transition: 0.5s;
}

.btn-card:hover {
    margin-top: 0px;
    -webkit-box-shadow: -2px 23px 14px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: -2px 23px 14px -6px rgba(0,0,0,0.75);
    box-shadow: -2px 23px 14px -6px rgba(0,0,0,0.75);
}

</style>