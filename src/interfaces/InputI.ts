type options = {
    label:string,
    value:string
}

type checkbox_i = {
    switch?:boolean,
    checked:boolean,
    text:string
}

type text_i = {
    label?:string,
    type:string,
    regex?:string|RegExp,
    placeholder?:string,
    icon?:string,
    value?:string
}

type radio_i = {
    label?:string,
    value?:string,
    name:string,
    options:options[]
}

type select_i = {
    label:string,
    value?:string,
    options:options[]
}

type input_i = {
    slug?:string,
    text?:text_i,
    checkbox?:checkbox_i,
    radio?:radio_i,
    select?:select_i,
    required?:boolean,
    validate?:boolean,
    message?:string,
    messageError?:string,
    showError?:boolean
}

export type { checkbox_i, text_i, input_i, radio_i, select_i }