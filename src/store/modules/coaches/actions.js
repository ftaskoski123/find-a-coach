import axios from "axios";

export default {
   async registerCoach(context,data){
        const userId=context.rootGetters.userId;
        const coachData={
            firstName:data.first,
            lastName:data.last,
            description:data.desc,
            hourlyRate:data.rate,
            areas:data.areas
        }

        const response = await axios.put(`https://find-a-coach-17df2-default-rtdb.firebaseio.com/coaches/${userId}.json`, coachData);

    //   const responseData=await response.data;

      if(!response.data){
         //error
      }



        context.commit('registerCoach',{...coachData, id:userId});
    },
    async loadCoaches(context,payload){
        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return;
        }
        const response=await axios.get(`https://find-a-coach-17df2-default-rtdb.firebaseio.com/coaches.json`);

        const responseData=await response.data;
        if(!response.data){
            const error=new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        const coaches=[];
        for(const key in responseData){
           const coach={
                id:key,
                firstName:responseData[key].firstName,
                lastName:responseData[key].lastName,
                description:responseData[key].description,
                hourlyRate:responseData[key].hourlyRate,
                areas:responseData[key].areas
            };
            coaches.push(coach);
        }
        context.commit('setCoaches',coaches);
        context.commit('setFetchTimeStamp');

    }
}