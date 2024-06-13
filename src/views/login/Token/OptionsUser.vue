<template>
    <div class="container-fluid ">
        
        <div class="row">
            <div class="col-12 text-center mt-5">
                <IconLogoQuadrado/>
            </div>
            <div class="col-12">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-4 p-1 bg-white rounded text-center mt-3">
                        <h5>andreifcoelho@gmail.com</h5>
                    </div>
                </div>
            </div>
            <div class="col-12" v-if="listUser.length > 0">
                <p class="text-center text-white p-3">Selecione um Usuário:</p>
            </div>
            <div class="col-12" v-if="listUser.length > 0">
                <div class="row justify-content-center">
                    <CardUserLogin v-for="user,index in listUser" :key="index"
                        :userType="user.tipo"
                        :userSlug="user.slug"
                        @clickUser="clickUser"
                    ></CardUserLogin>
                </div>
            </div>
            <div class="col-12" v-else>
                <NotUser></NotUser>
            </div>

        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue"

import IconLogoQuadrado from "@/components/icons/IconLogoQuadrado.vue"
import CardUserLogin from "../includes/CardUserLogin.vue"
import NotUser from "./NotUser.vue";

export default defineComponent({
    components:{ IconLogoQuadrado, NotUser, CardUserLogin },
    created() {
        // this.listUser = account.getUsers();
    },
    data(){
        return {
            listUser:[
                /*
                {
                tipo:'GHOST',
                slug:'andreifcoelho@sqmidia#234343242434345'
                }
                */
            ],
            showPassInput:false
        }
    },
    methods:{
        clickUser(k:number){
            /*
            if(this.listUser[k].isConnected()){
                // pega o token_user e inicia a sessão
                // gera a sessão do usuário
                // e usa o startSessionUser
                account.startSessionUser(k, "sessao_vinda_do_servidor")
            } else {
                // solicita o envio da senha
            }
                */

        }
    }
})

</script>