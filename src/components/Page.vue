<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-11">
                <div class="container-fluid py-2">
                    <div class="row">
                        <slot name="header_page"></slot>
                    </div>
                    <div class="row">
                        <slot name="corpo_page"></slot>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>