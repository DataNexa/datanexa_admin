<template>
    <div class="container-fluid p-fixed bg-white border-bottom" style="height: 50px;">
        <div class="row">
            <div class="col-12 top__menu__datanext">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-6 mt-2">{{ nomeClient }}</div>
                        <div class="col-5 text-end menu__user__top">
                            <div>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="50px" height="50px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                    viewBox="0 0 50 50"
                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Camada_x0020_1">
                                    <path class="fill-dark" d="M20.59 35.87l8.83 0c-0.17,0.34 -0.26,1.62 -1.43,2.65 -1.3,1.14 -3.04,1.45 -4.66,0.8 -2.37,-0.94 -2.5,-2.95 -2.74,-3.45zm5.94 -18.42c0.69,0.06 1.67,0.74 2.18,1.21 0.47,0.43 1.14,1.5 1.3,2.18 0.38,0 1,-0.21 1.27,-0.34 -0.05,-0.63 -0.66,-1.58 -1.05,-2.08 -0.49,-0.63 -1.01,-1.13 -1.69,-1.54 -1.7,-1.03 -1.7,-0.78 -1.85,-0.2 -0.07,0.3 -0.15,0.42 -0.16,0.77zm-1.18 23.51l-0.69 0c-1.59,-0.09 -3.17,-0.85 -4.29,-2.33 -0.19,-0.25 -0.34,-0.49 -0.49,-0.78 -0.25,-0.49 -0.57,-1.3 -0.57,-1.98l-3.64 0c-0.62,0 -1.35,-0.46 -1.66,-0.81 -1.53,-1.65 -0.49,-4.37 1.83,-4.37l0 -8.32c0,-3.68 2.28,-6.86 5.51,-8.31 0.23,-0.11 0.47,-0.2 0.73,-0.29 0.25,-0.09 0.52,-0.13 0.71,-0.22 -0.29,-0.44 -0.59,-0.98 -0.59,-1.7 0,-2.51 3.08,-3.74 4.78,-1.98 1.05,1.09 1.02,2.5 0.23,3.68 0.19,0.09 0.56,0.16 0.77,0.24 1.56,0.56 3.03,1.53 4.05,2.82 1.29,1.63 2.14,3.48 2.14,5.76l0 8.32c2.31,0 3.35,2.72 1.83,4.37 -0.32,0.35 -1.05,0.81 -1.66,0.81l-3.65 0c0,0.71 -0.35,1.56 -0.59,2.04 -0.99,1.87 -2.83,2.93 -4.75,3.05zm-10.7 -7.47c0,-0.76 0.22,-1.53 1.27,-1.53l18.16 0c1.57,0 2.04,2.63 -0.42,2.63l-17.32 0c-0.81,0 -1.69,-0.33 -1.69,-1.1zm2.54 -11.54c0,-3.63 3.62,-7.3 7.39,-7.3 1.48,0 2.43,0.06 3.76,0.73 1.76,0.89 2.79,1.88 3.7,3.68 0.39,0.76 0.77,1.84 0.77,2.97l0 8.57 -15.62 0 0 -8.65zm6.37 -9.93c0,-2.2 2.88,-2.18 2.88,0 0,1.65 -2.88,1.65 -2.88,0z"/>
                                    </g>
                                    </svg>
                                </a>
                            </div>
                            <div class="dropdown">
                                <a href="#" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration: none;">
                                    <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="50px" height="50px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                        viewBox="0 0 50 50"
                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g id="Camada_x0020_1">
                                            <g id="_2631407179472">
                                                <circle class="fill-white" cx="25" cy="25" r="19.38"/>
                                                <path class="fill-gray" style="non-zero" d="M25 26.72c2.93,0 5.6,1.19 7.52,3.12 1.3,1.3 2.26,2.92 2.76,4.75l-1.46 0c-0.45,-1.44 -1.25,-2.73 -2.28,-3.76 -1.67,-1.67 -3.99,-2.71 -6.54,-2.71 -2.55,0 -4.87,1.04 -6.54,2.71 -1.03,1.03 -1.83,2.32 -2.28,3.76l-1.46 0c0.5,-1.83 1.46,-3.45 2.76,-4.75 1.92,-1.93 4.58,-3.12 7.52,-3.12zm0 -11.31c1.42,0 2.71,0.58 3.63,1.5 0.93,0.93 1.51,2.22 1.51,3.64 0,1.41 -0.58,2.7 -1.51,3.63 -0.93,0.93 -2.22,1.51 -3.63,1.51 -1.42,0 -2.71,-0.57 -3.64,-1.5 -0.92,-0.93 -1.5,-2.22 -1.5,-3.64 0,-1.42 0.58,-2.7 1.5,-3.63 0.94,-0.93 2.22,-1.51 3.64,-1.51zm2.65 2.49c-0.68,-0.67 -1.62,-1.09 -2.65,-1.09 -1.03,0 -1.97,0.42 -2.65,1.09 -0.67,0.68 -1.09,1.62 -1.09,2.65 0,1.03 0.42,1.97 1.09,2.65 0.68,0.67 1.62,1.09 2.65,1.09 1.03,0 1.97,-0.42 2.65,-1.09 0.67,-0.67 1.09,-1.61 1.09,-2.65 0,-1.03 -0.42,-1.97 -1.09,-2.65z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <div style="display: inline-block; min-width:100px" class="d-none d-md-inline-block">
                                        <p class="text-start" style="text-decoration: none; color: black;">{{  nomeAccount  }}</p>
                                    </div>
                                </a>
                                <ul class="dropdown-menu py-3">
                                    <li><a class="dropdown-item action_menu" href="#" label="Editar Usuário">Editar</a></li>
                                    <li><a class="dropdown-item action_menu" href="#" label="Configurações do Usuário">Configurações</a></li>
                                    <li><a class="dropdown-item action_menu" href="#" label="Saindo...">Sair</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { App } from '@/model/Entidades/App';
import {defineComponent} from 'vue'

export default defineComponent({
    data(){
        return {
            show:false,
            nomeAccount:App.getNomeAccount(),
            nomeClient:(App.getUserJson() as any).client_nome
        }
    }
})
</script>

<style scoped>
.dropdown:hover > .dropdown-menu {
    display: block;
    left: -100px;
}
@media (min-width: 768px) {
    .dropdown:hover > .dropdown-menu {
        left: 0px;
    }
}
</style>