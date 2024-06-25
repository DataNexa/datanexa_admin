
class User {

    private client_nome:string   = ''
    private client_slug:string   = ''
    private client_id:number     = 0
    private slug:string          = ''
    private permissions:string[] = []
    private tipo_usuario:string  = 'ANONIMUS'
    private pag_permiss:string[] = []

    constructor(slug:string, tipo_usuario:string){
        this.slug = slug 
        this.tipo_usuario = tipo_usuario
    }

    setPagePermission(page:string){
        this.pag_permiss.push(page)
    }

    setPermissions(permissions:string[]){
        this.permissions = permissions
    }

    setClientNome(client_nome:string) {
        this.client_nome = client_nome
    }

    setClientSlug(client_slug:string){
        this.client_slug = client_slug
    }

    setClientId(client_id:number){
        this.client_id = client_id
    }

    getClientNome(){
        return this.client_nome
    }

    getClientSlug(){
        return this.client_slug
    }

    getSlugUser(){
        return this.slug
    }

    getClientId(){
        return this.client_id
    }

    havePermissions(permission:string, local_app:string){
        if(local_app == 'LOGIN') return true
        if(this.tipo_usuario == 'ADMIN' && local_app == 'ADMIN') return true 
        else {
            if(this.tipo_usuario == 'ADMIN_CLIENT' || this.tipo_usuario == 'GHOST') return true
            return this.permissions.includes(permission)
        }
    }

    havePagePermission(page:string){
        if(this.tipo_usuario == 'ADMIN' || this.tipo_usuario == 'ADMIN_CLIENT') 
            return true 
        return this.pag_permiss.includes(page)
    }

    getJson(){
        return {
            client_nome:this.client_nome,
            client_slug:this.client_nome,
            slug:this.slug,
            permissions:this.permissions,
            tipo_usuario:this.tipo_usuario,
        }
    }

} 

export default User