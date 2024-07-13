<template>

    <Widget :loading="loading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h5>{{ nome }}</h5>
                    <h5>{{ email }}</h5>
                    <p>Admin</p>
                    <div class="form-check form-switch py-2">
                        <input  class="form-check-input" type="checkbox" role="switch" id="ativoCheckSwitch" checked>
                        <label class="form-check-label" for="ativoCheckSwitch">Ativo</label>
                    </div>
                </div>
            </div>
            <div class="row border-top py-3">
                <div class="col-12 ">
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
                </div>
            </div>
        </div>
    </Widget>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Widget from '@/components/Widget.vue';
import { request } from '@/model/libs/Request';

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

    components: {Widget},

    created() {
        this.getData()
    },

    data() {
        return {
            loading:false,
            userType: 0,
            nome:'',
            email:'',
            permissions:[] as Array<{nome:string, actions:Array<{nome:string, descricao:string, checked:boolean, id:number}>}>
        }
    },

    methods: {
        async getData(){
            
            this.loading = true

            console.log(this.id);
            

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
                this.nome = user.nome
                this.email = user.email
                console.log(req.body);
            }

            this.loading = false

        }
    },

})

</script>