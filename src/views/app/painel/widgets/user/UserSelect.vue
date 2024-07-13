<template>
    <AlertVue :alert="alert"/>
    <Widget :loading="loading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h5>{{ nome }}</h5>
                    <h5>{{ email }}</h5>
                    <p>{{ userType == 4 ? 'Usuário' : 'Administrador'  }}</p>
                    <div class="form-check form-switch py-2">
                        <input v-model="ativo" @change="change" class="form-check-input" type="checkbox" role="switch" id="ativoCheckSwitch" :checked="ativo">
                        <label class="form-check-label" for="ativoCheckSwitch">{{ ativo ? 'ativo' : 'inativo' }}</label>
                    </div>
                </div>
            </div>
            <div class="row border-top py-3">
                <div class="col-12">
                    <h5>Permissões:</h5>
                    <p v-if="userType == 3">Este usuário contém todas as permissões do sistema por ser um administrador</p>
                    <div v-if="userType == 4" class="col-12" v-for="permission of permissions">
                        <h5 class="text-primary">{{ permission.nome }}</h5>
                        <div class="form-check form-switch py-2" v-for="action of permission.actions">
                            <input v-model="action.checked" class="form-check-input" type="checkbox" role="switch" id="ativoCheckSwitch">
                            <label class="form-check-label" for="ativoCheckSwitch">{{ action.nome }}</label>
                            <p><small><i>{{ action.descricao }}</i></small></p>
                        </div>
                    </div>
                    <div class="col-12" v-if="userType == 4">
                        <button @click="salvar" class="btn btn-outline-primary">Salvar Alteraçãoes</button>
                    </div>
                </div>
            </div>
        </div>
    </Widget>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Widget from '@/components/Widget.vue';
import { request } from '@/model/libs/Request';
import AlertVue from '@/components/AlertVue.vue';

enum type_user {
    ANONIMUS, GHOST, ADMIN, ADMIN_CLIENT, USER_CLIENT, BOT
}

export default defineComponent({

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    components: {Widget, AlertVue},

    created() {
        this.getData()
    },

    data() {
        return {
            alert:{
                text:'',
                type:'',
                show:false
            },
            loading:false,
            userType: 0,
            ativo:false,
            nome:'',
            email:'',
            permissions:[] as Array<{nome:string, actions:Array<{nome:string, descricao:string, checked:boolean, id:number}>}>
        }
    },

    methods: {

        async salvar(){

            this.loading = true
            const service_actions_ids = []
            let status = false

            for(const p of this.permissions){
                for(const act of p.actions){
                    if(act.checked){
                        status = true
                        service_actions_ids.push(act.id)
                    }
                }
            }

            if(!status){
                this.alert.text = 'É necessário ter pelo menos 1 permissão'
                this.alert.type = 'danger'
                this.alert.show = true
                this.loading = false
                return
            }

            const req = await request({
                method:'post',
                route:'user/updatePermissionsUser'
            }, {
                user_id:this.id,
                service_actions:service_actions_ids
            })

            if(req.code == 200){
                this.alert.text = 'Alterações realizadas com sucesso'
                this.alert.type = 'success'
                this.alert.show = true
            } else {
                this.alert.text = 'Ocorreu um erro no servidor ao tentar alterar as permissões'
                this.alert.type = 'danger'
                this.alert.show = true
            }

            this.loading = false

        },


        async change(){

            this.loading = true
            let route = this.ativo ? 'user/reactivate' : 'user/block'

            const req = await request({
                method:'post',
                route:route 
            }, {
                user_id:this.id
            })

            if(req.code == 200){
                this.alert.text = 'Usuario '+(this.ativo ? 'ativado' : 'bloqueado')+' com sucesso!'
                this.alert.type = 'success'
                this.alert.show = true
            } else {
                this.alert.text = 'Ocorreu um erro no servidor ao tentar realizar a solicitação'
                this.alert.type = 'danger'
                this.alert.show = true
            }

            this.loading = false
        },

        async getData(){
            
            this.loading = true

            const req = await request({
                method:'post',
                route:'user/unique'
            }, {
                user_id:this.id
            })

            if(req.code == 200){

                const user = req.body.user 
                const permss = req.body.permissions as Array<{nome:string, actions:Array<{nome:string, descricao:string, checked:boolean, id:number}>}>

                for(const per of permss){
                    for(const action of per.actions){
                        if(user.permissions.includes(action.id)){
                            action.checked = true
                        }
                    }
                }
                
                this.permissions = permss

                this.userType = user.tipo_usuario
                this.nome  = user.nome
                this.email = user.email
                this.ativo = user.ativo == 1
                
            }

            this.loading = false

        }
    },

})

</script>