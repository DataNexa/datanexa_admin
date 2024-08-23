<template>

    <AlertVue :alert="alert" />

    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1><Icon icon="IconUsuarios" :scale="0.7" fill="blue"/> Novo Usuário</h1>
            </div>
        </div>

        <div class="row py-3">
            <div class="col-12">
                <InputVue :input="inputEmail" />
                <InputVue @change_value="onChange" :input="userTypeObj"/>
            </div>
        </div>

        <div class="row py-2 border-top" v-if="usuarioForm">
            <div class="col-12">
                <h3>Permissões:</h3>
            </div>
           <div class="col-12" v-for="permission of permissions">
                <h5 class="text-primary">{{ permission.nome }} 
                    <input v-if="permission.action_list" v-model="permission.action_list.checked" class="form-check-input" type="checkbox" role="switch" ></h5>
                <div v-if="isActiveList(permission)">
                    <div class="form-check form-switch py-2" v-for="action of permission.actions">
                        <div v-if="!action.list">
                            <input v-model="action.checked" class="form-check-input" type="checkbox" role="switch" id="ativoCheckSwitch">
                            <label class="form-check-label" for="ativoCheckSwitch">{{ action.nome }}</label>
                            <p><small><i>{{ action.descricao }}</i></small></p>
                        </div>
                    </div>
                </div>
           </div>
           
        </div>
        <div class="row py-2 border-top">
            <div class="col-12">
                <ButtonVue @click_button="salvar" :button="button"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

enum type_user {
    ANONIMUS, GHOST, ADMIN, ADMIN_CLIENT, USER_CLIENT, BOT
}

import { defineComponent } from 'vue'
import { request } from '@/model/libs/Request';
import Icon from '@/components/Icon.vue';
import InputVue from '@/components/InputVue.vue';
import ButtonVue from '@/components/ButtonVue.vue';
import AlertVue from '@/components/AlertVue.vue';

type permission = { nome:string, action_list?:{nome:string, descricao:string, checked:boolean, id:number, list:boolean}, actions:Array<{nome:string, descricao:string, checked:boolean, id:number, list:boolean}> }

export default defineComponent({    

    created() {
        this.getPermissions()
    },

    components:{ InputVue, Icon, ButtonVue, AlertVue},

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    methods: {

        listarPermissoes(permission:permission){
            for(const action of permission.actions){
                if(action.list){
                    action.checked = !action.checked
                }
            }
        },

        isActiveList(permission:permission):boolean{
            for(const action of permission.actions){
                if(action.list && action.checked){
                    return true
                }
            }
            return false
        },

        async getPermissions(){
            const req = await request({
                method:'get',
                route:'user/permissions'
            })

            if(req.code == 200){

                this.permissions = req.body
                console.log(this.permissions);
                
                for (let i = 0; i < this.permissions.length; i++) {
                    for(const action of this.permissions[i].actions){
                        if(action.list){
                            this.permissions[i].action_list = action  
                        }
                    }
                }
                
            }
        },

        async salvar(){
            
            if(!this.userType || !this.inputEmail.validate){
                this.button.loading = false
                this.alert.text = 'Os campos não podem estar vazios ou o e-mail é inválido'
                this.alert.type = 'danger'
                this.alert.show = true
                return
            }
            
            this.button.loading = true
            const actions = [] as number[]
            
            if(this.userType && this.userType == type_user.USER_CLIENT){
                let stats = false
                for(const per of this.permissions){
                    if(per.action_list && per.action_list.checked){
                        actions.push(per.action_list.id)
                        for(const ac of per.actions){
                            if(!ac.list && ac.checked){
                                stats = true 
                                actions.push(ac.id)
                            }
                        }
                    }
                }
                if(!stats){
                    this.alert.text = 'É necessário escolher pelo menos uma permissão'
                    this.alert.type = 'danger'
                    this.button.loading = false
                    this.alert.show = true
                    return
                }
            }

            const exe = await request({
                method:'post',
                route:'user/create'
            }, {
                tipo_usuario:this.userType,
                service_actions:actions,
                email:this.inputEmail.text.value
            })


            if(exe.code != 200){
                this.alert.text = exe.message ? exe.message : 'Erro ao tentar salvar usuário'
                this.alert.type = 'danger'
                this.button.loading = false
                this.alert.show = true
                return
            } 

            this.$emit('refresh', 'success', 'Usuário adicionado com sucesso!')
            this.$emit('close')

        },

        onChange(slug:string, val:any){
            this.usuarioForm = val == type_user[type_user.USER_CLIENT]
            this.userType    = this.usuarioForm ? type_user.USER_CLIENT : type_user.ADMIN_CLIENT
        }
    },

    data() {
        return {
            userTypeObj:{
                    radio:{
                        label:'Tipo de Usuário',
                        name:'usuarioOrAdmin',
                        options:[
                            {
                                label:'Usuário',
                                value:type_user[type_user.USER_CLIENT]
                            },
                            {
                                label:'Administrador',
                                value:type_user[type_user.ADMIN_CLIENT]
                            }
                        ]
                    },
                    required:true
                },
            alert:{
                text:'test',
                type:'danger',
                show:false
            },
            usuarioForm:false,
            userType: undefined as type_user | undefined,
            button:{
                slug:'salvar',
                css:'btn btn-outline-primary d-block ms-auto',
                text:'salvar novo usuário',
                canLoad:true,
                disable:false,
                loading:false
            },
            inputEmail:{
                text:{
                    label:'e-mail',
                    value:'',
                    type:'email',
                    regex:'email',
                    placeholder:'Digite o e-mail do usuário que será criado'
                },
                required:true,
                validate:true
            },
            permissions:[] as Array<permission>
        }
    },
})

</script>