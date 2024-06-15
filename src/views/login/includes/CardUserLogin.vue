<template>
    <div @click="clickUser"
        class="col-12 col-md-4 col-lg-3 text-center p-1">
        <div class="row">
            <div class="container">
                <div class="col-12 bg-white rounded cardUserLogin py-2">
                    <Icon
                        :icon="icone"
                        css="d-block mx-auto"
                        fill="blue"
                    />
                    <h4>{{ userType }}</h4>
                    <p class="text-primary">{{ clientName ? clientName : 'DataNexa' }}</p>
                    <h5><i><small>{{ changeSlug(userSlug) }}</small></i></h5>
                    <p :class="`${accepted == 1 ? 'text-success' :'text-danger'}`">{{ accepted == 1 ? 'ativo' : accepted == 2 ? 'recusado' : 'aguardando aceitação' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import IconAdmin from "@/components/icons/IconAdmin.vue"
import IconUser  from "@/components/icons/IconUser.vue"
import IconGhost from "@/components/icons/IconGhost.vue"
import Icon from "@/components/Icon.vue"

export default defineComponent({

    props:{
        icone:{
            type:String,
            required:true
        },
        userType:{
            type:String,
            required:true
        },
        userSlug:{
            type:String,
            required:true
        },
        clientName:{
            type:String,
            required:true
        },
        accepted:{
            type:Number,
            required:true
        }
    },
    
    components:{ IconAdmin, IconUser, IconGhost, Icon },

    methods:{
        clickUser(){
            this.$emit('clickUser', this.userSlug)
        },
        changeSlug(slug:string){
            return slug.split("#")[0]
        },
    }   

})
</script>

<style scoped>
.cardUserLogin {
    cursor: pointer;
    transition: 0.3s;
}

.cardUserLogin:hover {
    -webkit-box-shadow: 0px 0px 32px -5px rgba(5,0,13,1);
    -moz-box-shadow: 0px 0px 32px -5px rgba(5,0,13,1);
    box-shadow: 0px 0px 32px -5px rgba(5,0,13,1);
}
</style>