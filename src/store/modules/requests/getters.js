export default{
    requests(state,_,_2,rootGetters){
        const coachId=rootGetters.userId;
        return state.requests.filter(request=>{
            return request.coachId===coachId
        })
    },
    hasRequests(_,getters){
        return getters.requests && getters.requests.length > 0
    }
}