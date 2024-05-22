<template>
    <div @click="clickUser"
    class="cardUserLogin col-12 col-md-4 col-lg-3 bg-white rounded text-center p-2">
        <IconAdmin v-if="userType == 'ADMIN' || userType == 'ADMIN_CLIENT'" />
        <IconGhost v-else-if="userType == 'GHOST'" />
        <IconUser v-else/>
        <h4>{{ userType }}</h4>
        <h5><i>{{ userSlug }}</i></h5>
        <span :class="`text-${(userStatus?'primary':'danger')}`">{{ userStatus ? "Conectado" : "Não conectado" }}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import IconAdmin from "@/components/icons/IconAdmin.vue"
import IconUser  from "@/components/icons/IconUser.vue"
import IconGhost from "@/components/icons/IconGhost.vue"

export default defineComponent({

    props:{
        userType:{
            type:String,
            required:true
        },
        userSlug:{
            type:String,
            required:true
        },
        userStatus:{
            // conectado ou nao conectado
            type:Boolean,
            required:true
        }
    },

    components:{ IconAdmin, IconUser, IconGhost },

    methods:{
        clickUser(){
            this.$emit('clickUser')
        }
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