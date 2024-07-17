<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h2>Tem certeza que deseja exluir este grupo?</h2>
                <p>Esta ação não poderá ser desfeita posteriormente.</p>
                <button class="btn btn-success d-block ms-auto" @click="exluir">SIM! Quero exluir este grupo!</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { request } from '@/model/libs/Request';

export default defineComponent({

    props:{
        id:{
            type:Number,
            required:true
        }
    },

    methods: {
        async exluir(){
            const req = await request({
                method:'post',
                route:'grupos/delete'
            }, {
                id:this.id
            })
            if(req.code == 200){
                this.$router.push('/contatos')
            }
        }
    },

})
</script>