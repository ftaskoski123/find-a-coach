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
    }
}