class TokenManager {

    private static instance:TokenManager
    private token

    private constructor(){
        this.token = TokenManager.getCookie('token')
        //console.log(this.token);
    }

    static getTokenManager(){
        if(!TokenManager.instance){
            TokenManager.instance = new TokenManager()
        }
        return TokenManager.instance
    }

    getToken(){
        return this.token
    }

    setToken(value:string){
        this.token = value
        TokenManager.setCookie('token', value, 365)
    }

    expireToken(){
        TokenManager.deleteCookie('token')
    }

    private static getCookie(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
  

    private static deleteCookie(name: string): void {
      document.cookie = name + '=; Max-Age=-99999999;';
    }

    private static setCookie(name: string, value: string, days: number): void {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  

}

const getToken = () => {
    return TokenManager.getTokenManager().getToken()
}

const setToken = (value:string) => {
    TokenManager.getTokenManager().setToken(value)
} 

const expireToken = () => {
    TokenManager.getTokenManager().expireToken()
}

export { getToken, setToken, expireToken }