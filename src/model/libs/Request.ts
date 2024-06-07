
import Session from "./Session"

/**
 * As requisições acessam a api sem analizar a permissão
 * As requisições tratam as respostas enviadas pela api comunicando-se com a aplicação por callback functions se for necessário:
 * - Redirecionamentos
 * - Alteração de sessão automatizadas
 * - Salvamentos de tokens em cookies
 * - logoff
 * - e outros relacionados a requisições e sessões
 */



class Req {

    private constructor(){

    }

}

interface header_i {
    method:string,
    route:string,
    sess_type?:string
}

const request = async (header:header_i, body:Object) => {

    const headers:{'Content-Type':string, session?:string} = {
        'Content-Type':'application/json'
    }

    if(header.sess_type){
        headers.session = Session.getSessionBy(header.sess_type)
    }

    const response = await fetch(import.meta.env.VITE_API_URL+header.route, {
        method:header.method,
        headers:headers,
        body:JSON.stringify(body)
    })

    

}


export default request