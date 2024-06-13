import type { input_i } from "./InputI"

export type formdata_i = {
    inputs:input_i[],
    title?:string
    description?:string,
    messages?:string[],
    asterisco?:boolean,
    inputsControl?:{
        disable?:boolean
    }
}
