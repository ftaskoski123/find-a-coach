import axios from "axios";
export default {
    login(){},
    async signup(context,payload){
      const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxDgLfFT9EOQSpYCsudW36_Fhxho2RIRs',{
            email:payload.email,
            password:payload.password,
            returnSecureToken:true
        })

        const responseData=response.data;
        const status = response.status

        if( parseInt( String(status /100) ) !== 2 ){
            console.log(responseData);
            const error=new Error(responseData.message || 'Failed to authenticate!');
            throw error;
            
        }
        console.log(response);
        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expiresIn
        })
    }

};