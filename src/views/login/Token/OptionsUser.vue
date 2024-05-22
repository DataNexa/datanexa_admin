<template>
    <div class="container-fluid ">
        
        <div class="row">
            <PassModalForm 
                v-if="showPassInput" 
                @close_modal="showPassInput = false"
            />
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
            <div class="col-12">
                <p class="text-center text-white p-3">Selecione um Usuário:</p>
            </div>
            <div class="col-12">
                <div class="container">
                    <div class="row justify-content-center">
                        <CardUserLogin v-for="user,index in listUser" :key="index"
                            :userType="user.getUserType()"
                            :userSlug="user.getSlug()"
                            :userStatus="user.isConnected()"
                            @clickUser="clickUser(index)"
                        />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue"

import IconLogoQuadrado from "@/components/icons/IconLogoQuadrado.vue"
import CardUserLogin from "./CardUserLogin.vue"
import { User, account} from "@/model/AccountFactory"
import PassModalForm from "@/views/login/includes/PassModalForm.vue"

export default defineComponent({
    components:{ IconLogoQuadrado, CardUserLogin, PassModalForm },
    created() {
        this.listUser = account.getUsers();
    },
    data():{listUser:User[], showPassInput:Boolean}{
        return {
            listUser:[],
            showPassInput:true
        }
    },
    methods:{
        clickUser(k:number){
            if(this.listUser[k].isConnected()){
                // pega o token_user e inicia a sessão
                // gera a sessão do usuário
                // e usa o startSessionUser
                account.startSessionUser(k, "sessao_vinda_do_servidor")
            } else {
                // solicita o envio da senha
            }

        }
    }
})

</script>