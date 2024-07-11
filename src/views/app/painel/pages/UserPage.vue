<template>
    <ModalDynamic v-if="openModal" @close_modal="openModal=false">
        <component :is="component"></component>
    </ModalDynamic>
    <Page :code="code">
        <template v-slot:header_page>
            <div class="col-12">
                <span class="h5 me-2">
                    <Icon icon="IconUsuarios" :scale="0.7" fill="blue"/>
                Usuarios</span>
                <a href="#">
                    <!-- <Icon icon="IconEstatistica" :scale="0.7" fill="blue"/> -->
                </a>
                <a href="#">
                    <!-- <Icon icon="IconLogs" :scale="0.7" fill="blue"/>-->
                </a>
                <button class="btn btn-outline-primary mx-2" @click="() => {
                    component = 'NovoUsuario';
                    openModal = true
                }">Novo Usuário</button>
            </div>
            
        </template>
        
        <template v-slot:corpo_page>
            <div class="container-fluid" v-if="loading">
                <div class="row justify-content-center py-5">
                    <div class="col-6 py-5">
                        <LoadingSimple/>
                    </div>
                </div>
            </div>
            <div class="container-fluid" v-if="!loading">
                <Widget :loading="false">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">e-mail</th>
                                <th scope="col">tipo</th>
                                <th scope="col">slug</th>
                                <th scope="col">status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user of listaUsuarios">
                                <td>{{ user.nome }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ getUserType(user.tipo_usuario) }}</td>
                                <td>{{ simplifySlug(user.slug) }}</td>
                                <td v-html="user.accepted == 1 && user.ativo == 1 ? `<p class='text-primary'>ativo</p>` : user.ativo == 0 ? `<p class='text-danger'>bloqueado</p>`: user.accepted == 0 ? `<p class='text-warning'>aguardando</p>` :  user.accepted == 2 ? 'não aceitou' :''"></td>
                                <td><button class="btn btn-sm btn-primary mx-auto d-block">+</button></td>
                            </tr>
                        </tbody>
                    </table>
                </Widget>
            </div>
        </template>
    </Page>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '@/components/Page.vue';
import Icon from '@/components/Icon.vue';
import InputVue from '@/components/InputVue.vue';
import LoadingSimple from '@/components/LoadingSimple.vue';
import ModalDynamic from '@/components/ModalDynamic.vue';
import { App } from '@/model/Entidades/App';
import NovoUsuario from '@/views/app/painel/widgets/user/NovoUsuario.vue'
import Widget from '@/components/Widget.vue';
import { request } from '@/model/libs/Request';

interface user_complete {
    id:number,
    nome:string,
    tipo_usuario: number,
    slug:string,
    accepted:number,
    email:string,
    ativo:number,
    client_slug:string,
    client_nome:string
}

const type_users = ['', '', '', 'Admin', 'Usuário']

export default defineComponent({
    components:{Page, Icon, InputVue, LoadingSimple, ModalDynamic, NovoUsuario, Widget},
    created() {
        this.getListUsers()
    },
    data(){
        return {
            code:App.havePagePermission("user") ? 200 : 401,
            loading:false,
            openModal:false,
            component:'NovoUsuario',
            listaUsuarios:[] as user_complete[]
        }
    },
    methods:{
        async getListUsers(){

            if(this.code != 200){
                return
            }

            const resp = await request({
                method:'post',
                route:'user/list'
            })

            if(resp.code != 200){
                this.code = resp.code
                return
            }

            this.listaUsuarios = resp.body as user_complete[]
        },

        getUserType(index:number){
            return type_users[index]
        },

        simplifySlug(slug:string) {
            return slug.split('#')[0]
        }
    }
})
</script>