class User {

    private token_user:string|undefined
    private session:string|undefined
    private user_type:string
    private nome:string 
    private slug:string
    private permissions:string[] = []
    private client_slug:string|undefined

    constructor(user_type:string, nome:string, slug:string, token_user?:string){
        this.user_type = user_type
        this.nome = nome
        this.slug = slug 
        this.token_user = token_user
        if(this.token_user != undefined){
            // salva um cookie do token_user 
        }
    }

    public disconnect(){
        this.session = undefined
    }

    public session_start(session:string){
        this.session = session
    }

    public setPermissions(permissions:string[]){
        this.permissions = permissions
    }

    public getPermissions(){
        this.permissions
    }

    public getUserType(){
        return this.user_type   
    }

    public getSession(){
        return this.session
    }
    
    public getSlug(){
        return this.slug
    }

    public getNome(){
        return this.nome
    }

    public isConnected(){
        return this.token_user != undefined
    }

}


class Account {

    private static account:Account|undefined
    private token_account:string|undefined
    private session_temp:string|undefined
    private users:User[] = []
    private atual_user:User|undefined

    private constructor(){
        // recupera os cookies do navegador
        // pega o cookie token_account 
        // faz um requisição solicitando os usuarios vinculados
        // analisa as slugs e verifica se existem tokens_users de cada conta
        // ... gerando os Users 
    }

    public static instance(){
        if(!Account.account){
            Account.account = new Account()
        }
        return Account.account
    }

    public setUser(user:User){
        this.users.push(user)
    }

    public getUsers():User[]{
        return this.users
    }

    public getUser(){
        return this.atual_user
    }

    public getUserByKey(key:number){
        return this.users[key]
    }

    public getTokenAccount(){
        return this.token_account
    }

    public getSessionTemp(){
        return this.session_temp
    }

    public setTokenAccount(token_account:string){
        this.token_account = token_account
    }

    public setSessionTemp(session:string){
        this.session_temp = session
    }

    public startSessionUser(key:number, session:string){
        this.atual_user = this.users[key]
        this.atual_user.session_start(session)
    }

    public closeSessionUser(){
        this.atual_user?.disconnect()
    }

    public refreshSessionUser(session:string){
        this.atual_user?.session_start(session)
    }

}


const account = Account.instance()

// apagar a partir daqui
account.setUser(new User("GHOST", "Andrei", "andrei.coelho.qsmidia"))
// apagar até aqui

export {
    User,
    account,
}