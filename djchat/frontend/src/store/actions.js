import axios from "@/backend";

const actions = {
  syncDB({ commit }, { rooms, users, messages }) {
    commit('SET_ROOMS', rooms);
    commit('SET_MESSAGES', messages);
    commit('SET_USERS', users);
    commit('LINK_MESSAGES_TO_ROOM', messages);
  },
  fetchRecentActivity({ dispatch }) {
    return new Promise((resolve, reject) => {
      axios.get("/api/v1/rooms/recents").then(response => {
        dispatch('syncDB', {
          rooms: response.data.rooms,
          messages: response.data.messages,
          users: response.data.users
        });
        resolve(response);
      }).catch(error => reject(error));
    });
  },
  fetchMessages({ dispatch }) {
    return new Promise((resolve, reject) => {
      axios.get("/api/v1/messages/").then(response => {
        dispatch('syncDB', {
          rooms: response.data.rooms,
          messages: response.data.messages,
          users: response.data.users
        });
        resolve(response);
      }).catch(error => reject(error));
    });
  },
  fetchPastMessages({ commit }, { firstMessageId, roomId }) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/messages/${roomId}?offset=${firstMessageId}`).then(response => {
        commit('SET_MESSAGES', response.data.messages);
        commit('SET_USERS', response.data.users);
        commit('LINK_PAST_MESSAGES_TO_ROOM', {
          pastMessages: response.data.messages,
          roomId
        });
        resolve(response);
      }).catch(error => reject(error));
    });
  },
  sendMessage(none, { room, body }) {
    return new Promise((resolve, reject) => {
      axios.post("/api/v1/messages/", {
        room,
        body
      }).then(response => {
        resolve(response);
      }).catch(error => reject(error));
    });
  }
};

export default actions;
