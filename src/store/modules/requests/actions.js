import axios from "axios";

export default {
  async contactCoach(context, payload) {
    
    const token = context.rootGetters.token;

    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await axios.post(
      `https://find-a-coach-17df2-default-rtdb.firebaseio.com/requests/${payload.coachId}.json?auth=${token}`,
      newRequest
    );

    const responseData = response.data;
    const status = response.status

    if ( parseInt( String(status /100) ) !== 2) {
      const error = new Error(responseData.message || "Failed to send request!");
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await axios.get(
      `https://find-a-coach-17df2-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);

    const responseData = response.data;
    const status = response.status

    if ( parseInt( String(status /100) ) !== 2) {
      const error = new Error("Failed to fetch!");
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  }
};
