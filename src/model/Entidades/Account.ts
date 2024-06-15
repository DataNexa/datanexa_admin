class Account {

    private nome:string
    private email:string

    constructor(nome:string, email:string){
        this.nome = nome
        this.email = email
    }

    getNome(){
        return this.nome 
    }

    getEmail(){
        return this.email
    }
    

}


export default Account