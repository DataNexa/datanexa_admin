<template>
    <div class="container">
        <div class="row justify-content-center">
            <CardUserLogin v-for="user,index in listUser" :key="index"
                :userType="user.tipo"
                :userSlug="user.slug"
                @clickUser="clickUser"
            />
        </div>
    </div>
</template>


<script lang="ts">

import {defineComponent} from 'vue'
import CardUserLogin from "../includes/CardUserLogin.vue"

interface user_slug {
    tipo:string,
    slug:string
}

export default defineComponent({
    component:{ CardUserLogin },
    props:{
        listUser:{
            type: Object as () => user_slug[],
            required: true
        }
    },
    methods:{
        clickUser(slug:string){
            
        }
    }
})
</script>