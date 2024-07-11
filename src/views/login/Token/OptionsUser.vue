<template>
    <ModalDynamic @close_modal="modalInfo.show = false" v-if="modalInfo.show">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h3 class="text-primary">Solicitação para Uso</h3>
                    <h5>Ao aceitar você está concordando com os <a href="#" target="_blank">termos de responsabilidade e política de privacidade</a> para usar a plataforma DataNexa na conta do cliente.</h5>
                    <p class="mt-2">Cliente: <b>{{ modalInfo.cliente_nome }}</b></p>
                    <p>Tipo de Usuário: <b>{{ modalInfo.tipo_de_usuario }}</b></p>
                    <ButtonVue @click="onAccepted" :button="{
                        slug:'aceitar',
                        text:'Eu aceito',
                        css:'btn btn-success d-block ms-auto btn-lg'
                    }" />
                     <ButtonVue @click="onRejected" :button="{
                        slug:'recusar',
                        text:'não, obrigado',
                        css:'btn btn-outline-danger d-block me-auto btn-sm'
                    }" />
                </div>
            </div>
        </div>
    </ModalDynamic>
    <div class="container-fluid ">
        <AlertVue :alert="alert"/>
        <div class="row">
            <div class="col-12 text-center mt-5">
                <IconLogoQuadrado/>
            </div>
            <div class="col-12">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-4 p-1 bg-white rounded text-center mt-3">
                        <h5>{{ emailChange }}</h5>
                    </div>
                </div>
            </div>
            <div class="row" v-if="!isLoading">
                <div class="col-12" v-if="listUser.length > 0">
                    <p class="text-center text-white p-3">Selecione um Usuário:</p>
                </div>
                <div class="col-12" v-if="listUser.length > 0">
                    <div class="row justify-content-center">
                        <CardUserLogin v-for="user,index in listUser" :key="index"
                            :icone="setIcon(user.tipo_usuario)"
                            :userType="changeType(user.tipo_usuario)"
                            :userSlug="user.slug"
                            :clientName="user.client_nome == null ? 'DataNexa' :  user.client_nome"
                            :accepted="user.accepted"
                            @clickUser="clickUser"
                        ></CardUserLogin>
                    </div>
                </div>
                <div class="col-12" v-else>
                    <NotUser></NotUser>
                </div>
            </div>
            <div class="row" v-if="isLoading">
                <LoadingSimple/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue"

import IconLogoQuadrado from "@/components/icons/IconLogoQuadrado.vue"
import CardUserLogin from "../includes/CardUserLogin.vue"
import NotUser from "./NotUser.vue";
import LoadingSimple from "@/components/LoadingSimple.vue";
import userService from "@/model/services/user.service";
import AlertVue from "@/components/AlertVue.vue";
import ModalDynamic from "@/components/ModalDynamic.vue";
import ButtonVue from "@/components/ButtonVue.vue";
import { App } from "@/model/Entidades/App";

export default defineComponent({

    props:{
        email:{
            type:String,
            required:true
        }
    },

    components:{ IconLogoQuadrado, NotUser, CardUserLogin, LoadingSimple, AlertVue, ModalDynamic, ButtonVue },
    
    created() {
        let emailTest = App.getEmailAccount()
        if(emailTest){
            this.emailChange = emailTest
        }else if(this.email){
            this.emailChange = this.email
        }
        this.getUsers()
    },

    data():{ 
            emailChange: string,
            alert:{
                show:boolean,
                type:string,
                text:string
            },
            modalInfo:{
                cliente_nome:string,
                tipo_de_usuario:string,
                slug_user:string,
                show:boolean
            },
            listUser:any[], 
            showPassInput:boolean, 
            isLoading:boolean 
        }{
        return {
            emailChange:'',
            alert:{
                show:false,
                type:'danger',
                text:'Erro'
            },
            modalInfo:{
                cliente_nome:'',
                tipo_de_usuario:'',
                slug_user:'',
                show:false
            },
            listUser:[],
            isLoading:true,
            showPassInput:false
        }
    },

    methods:{

        async changeAccpted(slug:string, accepted:number){
            this.alert.show = false
            const resp = await userService.changeAccepted(slug, accepted)
            this.modalInfo.show = false
            if(!resp.status){
                this.alert.type = 'danger'
                this.alert.show = true
                this.alert.text = resp.message
                return
            }

            for (let i = 0; i < this.listUser.length; i++) {
                const u = this.listUser[i]
                if (u.slug == slug) {
                    this.listUser[i].accepted = accepted
                    if(accepted == 1){
                        this.alert.type = 'success'
                        this.alert.text = 'Aceitação realizada com sucesso! Seja bem vindo!'
                        this.alert.show = true
                    }
                    return
                }
            }
            
        },

        async onRejected(){
            this.changeAccpted(this.modalInfo.slug_user, 2)
        },

        async onAccepted(){
            this.changeAccpted(this.modalInfo.slug_user, 1)
        },

        async getUsers(){
            this.isLoading = true
            this.alert.show = false
            const users = await userService.getListUsers()

            if(users.status){
                this.listUser = users.list
                this.isLoading = false
            } else {
                this.alert.type = 'danger'
                this.alert.text = 'Erro ao tentar resgatar usuários. Por favor, tente novamente mais tarde'
                this.alert.show = true
            }
        },

        changeType(type:string){
            if(type == 'ADMIN' || type == 'ADMIN_CLIENT'){
                return 'Administrador'
            } else 
            if (type == 'USER_CLIENT'){
                return 'Usuário'
            } else {
                return 'Usuário Fantasma'
            }
        },

        setIcon(type:string){
            if(type == 'ADMIN' || type == 'ADMIN_CLIENT'){
                return 'IconAdmin'
            } else 
            if (type == 'USER_CLIENT'){
                return 'IconUser'
            } else {
                return 'IconGhost'
            }
        },

        async clickUser(slug:string){
            this.alert.show = false
            let tipo_usuario = ''
            let client_info  = {
                nome:'',
                slug:''
            }
            for(let u of this.listUser){
                if(u.slug == slug){
                    if(u.accepted == 0){
                        this.modalInfo.cliente_nome = u.client_nome 
                        this.modalInfo.tipo_de_usuario = this.changeType(u.tipo_usuario)
                        this.modalInfo.slug_user = slug
                        this.modalInfo.show = true
                        return 
                    }
                    tipo_usuario = u.tipo_usuario
                    client_info.nome = u.client_nome ? u.client_nome : 'DataNexa'
                    client_info.slug = u.client_slug ? u.client_slug : 'DataNexa'
                }
            }
            const resp = await userService.openSession(slug)
            if(resp.status){
                App.refreshLocalSystem()
                this.$emit('redirectTo', 'system')                
            } else {
                this.alert.type = 'danger'
                this.alert.text = resp.message
                this.alert.show = true
            }
        }
    }
})

</script>