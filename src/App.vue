<script lang="ts">

import {defineComponent} from "vue"
import LoadingFull from "./components/LoadingFull.vue"
import Main from "./views/app/Main.vue"
import MainLogin from "./views/login/MainLogin.vue"
import Session from "./model/libs/Session"
import { App } from "./model/Entidades/App"
import { setRedirection } from "./model/libs/Request"

export default defineComponent({
    created() {
        // verificar se existe uma session 
        // se nao existir exibir a tela de login
        setRedirection(() => {
            this.component = 'LoadingFull'
            App.changeUser()
            App.refreshLocalSystem()
            this.loadingData()
        })

        this.loadingData()
    },
    components:{ LoadingFull, Main, MainLogin },
    data(){
        return {
            loading:false,
            component:"LoadingFull",
            keyLoading:1,
            percentLoading:1,
            innerModule:''
        }
    },
    methods:{
        async loadingData(){
            
            this.percentLoading = 1

            this.loading = true

            let token = Session.getSessionBy('TOKEN')
            
            this.percentLoading = 50

            if(!token || !App.isConnected()) {	
                this.loading = false
                return this.component = "MainLogin"
            }

            if(App.isConnected()){
                this.loading = false
                return this.component = "Main"
            }
        }
    }
})

</script>

<template>
	<div v-if="loading">
		<LoadingFull :percent="percentLoading"/>
	</div>
	<div v-else>
		<component :is="component" :innerModule="innerModule" @changeArea="loadingData"/>
	</div>
</template>
 
<style>
main {
    z-index: 3; 
    position: fixed; 
    width:100%; 
    height: 100%;
    overflow: auto;
}

a {
    text-decoration: none;
}

.fill-white {
    fill:white
}

.fill-blue-light {
    fill:#C2D9FF
}

.fill-blue {
    fill:#0052ED
}

.bg-blue {
    background-color: #0052ED;
}

.bg-red-ancient {
    background-color: #FF8F66;
}

.bg-blue-ancient {
    background-color: #90b9fc;
}

.bg-green-ancient {
    background-color: #00FF00;
}

.fill-dark-light {
    fill:#999999
}

.bg-dark-light {
    background-color:#999999
}

.bg-dark-super-light {
    background-color:#E6E6E6
}

.fill-gray {
    fill:#666666
}

.fill-yellow {
    fill:#d1b200;
}

.bg-yellow {
    background-color:#d1b200;
}


.left__menu__datanext {
    width: 50px;
    position:fixed;
    left:0;
    height: 100%;
    transition: 0.5s;
    background-color: white;
}

@media (min-width: 992px) {
    .left__menu__datanext:hover {
        width: 200px;
    }
}


.left__menu__datanext .brand_menu {
    background-color: #0052ED;
    width: 100%;
    height: 50px;
    overflow: hidden;
    white-space:nowrap;
}

.left__menu__datanext .left_item {
    width: 100%;
    border-left: 5px solid white;
    overflow: hidden;
    white-space:nowrap;
    cursor: pointer;
}

.left__menu__datanext .left_item > div, 
.left__menu__datanext .brand_menu > div, 
.top__menu__datanext > div,
.menu__user__top > div {
    display:inline-block;
}

.left__menu__datanext .brand_menu > svg {
    float: left;
}

.left__menu__datanext .left_item.selected, .left__menu__datanext .left_item:hover{
    border-left: 5px solid #0052ED;
    background-color: #CFE1FF;
}

.left__menu__datanext .left_item .item_icon {
    fill: #666666;
    width: 45px;
}

.left__menu__datanext .left_item.selected .item_icon, .left__menu__datanext .left_item:hover .item_icon {
    fill: #0052ED;
}

.left__menu__datanext .left_item .item_description {
    color: #666666;
}

.left__menu__datanext .left_item.selected .item_description, .left__menu__datanext .left_item:hover .item_description {
    color: #0052ED;
}

.fill-dark {
    fill: #666666;
}

.fill-black{fill:#000}.bg-black{background-color:#000}.text-black{color:#000}.fill-black-grafiti{fill:#4d4d4d}.bg-black-grafiti{background-color:#4d4d4d}.text-black-grafiti{color:#4d4d4d}.fill-black-light{fill:#999}.bg-black-light{background-color:#999}.text-black-light{color:#999}.fill-black-super-light{fill:#e6e6e6}.bg-black-super-light{background-color:#e6e6e6}.text-black-super-light{color:#e6e6e6}.fill-red{fill:#f05}.bg-red{background-color:#f05}.text-red{color:#f05}.fill-red-light{fill:#ff4d88}.bg-red-light{background-color:#ff4d88}.text-red-light{color:#ff4d88}.fill-red-super-light{fill:#ffb3cc}.bg-red-super-light{background-color:#ffb3cc}.text-red-super-light{color:#ffb3cc}.fill-red-dark{fill:#b3003c}.bg-red-dark{background-color:#b3003c}.text-red-dark{color:#b3003c}.fill-red-super-dark{fill:#4d001a}.bg-red-super-dark{background-color:#4d001a}.text-red-super-dark{color:#4d001a}.fill-green{fill:#0f5}.bg-green{background-color:#0f5}.text-green{color:#0f5}.fill-green-light{fill:#4dff88}.bg-green-light{background-color:#4dff88}.text-green-light{color:#4dff88}.fill-green-super-light{fill:#b3ffcc}.bg-green-super-light{background-color:#b3ffcc}.text-green-super-light{color:#b3ffcc}.fill-green-dark{fill:#00b33c}.bg-green-dark{background-color:#00b33c}.text-green-dark{color:#00b33c}.fill-green-super-dark{fill:#004d1a}.bg-green-super-dark{background-color:#004d1a}.text-green-super-dark{color:#004d1a}.fill-blue{fill:#0080ff}.bg-blue{background-color:#0080ff}.text-blue{color:#0080ff}.fill-blue-light{fill:#4da6ff}.bg-blue-light{background-color:#4da6ff}.text-blue-light{color:#4da6ff}.fill-blue-super-light{fill:#b3d9ff}.bg-blue-super-light{background-color:#b3d9ff}.text-blue-super-light{color:#b3d9ff}.fill-blue-dark{fill:#0059b3}.bg-blue-dark{background-color:#0059b3}.text-blue-dark{color:#0059b3}.fill-blue-super-dark{fill:#00264d}.bg-blue-super-dark{background-color:#00264d}.text-blue-super-dark{color:#00264d}

</style>