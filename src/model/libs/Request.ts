
import { App } from "../Entidades/App";
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

type redirectFunction = (route:string, body_res:body_res) => any;

class Req {

    private static onRedirect:redirectFunction = () => {}

    private constructor(){}

    static setRedirect(onRedirect:redirectFunction){
        this.onRedirect = onRedirect
    }

    static redirectTo(route:string, body_res:resp){
        this.onRedirect(route, body_res)
    }

}

interface header_i {
    method:string,
    route:string,
    sess_type?:string,
    content_type?:string
}

interface body_res {
    message?:string,
    code:number,
    body?:any,
    session?:string,
    redirect?:string
}

interface resp {
    message?:string,
    code:number,
    body?:any
}

const setRedirection = (callback:redirectFunction) => {
    Req.setRedirect(callback)
}

const logoff = async () => {
    Session.deleteToken()
    Session.expireSessions()
}

const download = async (header:header_i, body?:any) => {

    const headers:{'Content-Type':string, session?:string} = {
        'Content-Type':header.content_type ? header.content_type : 'application/json'
    }

    if(header.sess_type){
        headers.session = Session.getSessionBy(header.sess_type)
    } else {
        let sess = Session.getSessionBy("SESSION")
        if(sess) headers.session = sess
    }

    let dataReq  = body ? {
        method:header.method,
        headers:headers,
        body: JSON.stringify(body)
    } : {
        method:header.method,
        headers:headers
    }

    const response = await fetch(import.meta.env.VITE_API_URL+header.route, dataReq)

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'download.pdf'; 

    if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition.split('filename=')[1].trim();
    }
    
    a.download = filename
    document.body.appendChild(a)

    a.click();
    a.remove();

}   

const request = async (header:header_i, body?:any):Promise<resp> => {

    const headers:{'Content-Type':string, session?:string} = {
        'Content-Type':header.content_type ? header.content_type : 'application/json'
    }

    if(header.sess_type){
        headers.session = Session.getSessionBy(header.sess_type)
    } else {
        let sess = Session.getSessionBy("SESSION")
        if(sess) headers.session = sess
    }

    let dataReq  = body ? {
        method:header.method,
        headers:headers,
        body: JSON.stringify(body)
    } : {
        method:header.method,
        headers:headers
    }

    const response = await fetch(import.meta.env.VITE_API_URL+header.route, dataReq)

    const body_res = (await response.json() as body_res)

    const resp = { body:body_res.body, code:body_res.code, message:body_res.message }

    if(response.status == 401){
        Session.expireSessions()
        Req.redirectTo('login', resp)
    }

    if(body_res.session){
        Session.saveSession(body_res.session, 'Request')
    }
   
    if(body_res.redirect){
        Req.redirectTo(body_res.redirect, resp)
    }

    return resp

}

const toLogin = () => {
    Req.redirectTo('login', { body:{}, code:401, message:''})
}

export { request, setRedirection, logoff, download, toLogin}