enum alert_type {
    SUCCESS, WARNING, DANGER
}

type alert_i = {
    type:alert_type,
    text:string,
    show?:boolean
}

export {type alert_i, alert_type}