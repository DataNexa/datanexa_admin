<template>
    <div class="container-fluid p-0 m-0" style="height:100%; width:100%; position: fixed; overflow-y: auto; overflow-x: hidden; background-color: #0052EC;">
        <img class="logo-animation d-block mx-auto" src="/datanexa_icon.png"/>
        <div v-if="percent > 0">
            <div class="loading-data ">
                <div class="bg-blue" :style="`width: ${percent}%; height:10px;`"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    props:{
        percent:{
            type:Number,
            required:true
        }
    }
})

</script>

<style scoped>

.loading-data {
    width: 40%;
    height:10px;
    background-color: #00CBFE;
    position:absolute;
    top: 60%;
    left:30%;
}

.loading-data div {
    float: left;
    position:relative;
    background-color: blue;
    transition: 0.5s;
}

.logo-animation {
    width: 20%;
    position: absolute;
    top: 30%;
    left:40%;
    -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation:spin 2s linear infinite;
}

@media (min-width: 768px) {
    .logo-animation {
        width: 10%;
        left:45%;
    }

    .loading-data {
        width: 30%;
        left:35%;
    }
}

@-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
}
@-webkit-keyframes spin { 
    100% { -webkit-transform: rotate(360deg); } 
}
@keyframes spin { 
    100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    } 
}
</style>