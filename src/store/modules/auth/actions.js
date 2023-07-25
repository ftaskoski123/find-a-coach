let timer;
import axios from "axios";
export default {
    async login(context,payload){
      return context.dispatch('auth',{
            ...payload,
            mode:'login'
        });
    },
    async signup(context,payload){
      return context.dispatch('auth',{
            ...payload,
            mode:'signup'
        });
    },
  
   async auth(context,payload){
        const mode = payload.mode;
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxDgLfFT9EOQSpYCsudW36_Fhxho2RIRs';

        if(mode === 'signup'){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxDgLfFT9EOQSpYCsudW36_Fhxho2RIRs';
        }

        const response=await axios.post(url,{
            email:payload.email,
            password:payload.password,
            returnSecureToken:true  
        })

        const responseData=response.data;
        const status = response.status

        if( parseInt( String(status /100) ) !== 2 ){
            console.log(responseData);
            const error=new Error(responseData.message || 'Failed to authenticate.Check your credentials!');
            throw error;
            
        }
        const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
    
        const expiresIn = +tokenExpiration - new Date().getTime();
    
        if (expiresIn < 0) {
          return;
        }
    
        timer = setTimeout(function() {
          context.dispatch('autoLogout');
        }, expiresIn);
    
        if (token && userId) {
          context.commit('setUser', {
            token: token,
            userId: userId
          });
        }
      },
      logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
    
        clearTimeout(timer);
    
        context.commit('setUser', {
          token: null,
          userId: null
        });
      },
      autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
      }

};