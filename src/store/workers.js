import apiClient from "../services/api";

export default {
  state: {
    workers: [],
    workersLoading: false,
  },
  mutations: {
    setWorkers(state, payload) {
      state.workers = payload;
    },
    addWorker(state, data) {
      state.workers.push(data);
    },
    setWorkersLoading(state, status) {
      state.workersLoading = status;
    },
    deleteWorker(state, id) {
      let index = state.workers.findIndex((worker) => {
        return worker.workerId == id;
      });
      console.log(index);
      state.workers.splice(index, 1);
    },
    updateWorker(state, payload) {
      let index = state.workers.findIndex((worker) => {
        return worker.workerId == payload.workerId;
      });
      state.workers[index].firstName = payload.firstName;
      state.workers[index].lastName = payload.lastName;
      state.workers[index].description = payload.description;
    },
  },
  actions: {
    async getWorkers({ commit }) {
      commit("setWorkersLoading", true);
      let workers = await apiClient.get("/Workers");
      commit("setWorkers", workers.data);
      commit("setWorkersLoading", false);
    },
    async addWorker({ commit }, payload) {
      commit("setWorkersLoading", true);
      try {
        let newWorker = await apiClient.post("/Workers", payload);
        commit("addWorker", newWorker.data);
        commit("setWorkersLoading", false);
        return newWorker;
      } catch (error) {
        console.log(error);
        commit("setWorkersLoading", false);
      }
    },
    async deleteWorker({ commit }, id) {
      commit("setWorkersLoading", true);
      try {
        let deletedWorker = await apiClient.delete("/Workers/" + id);
        commit("deleteWorker", id);
        console.log(`status for deletion: ${deletedWorker.status}`);
        commit("setWorkersLoading", false);
        return true;
      } catch (error) {
        console.log(error);
        commit("setWorkersLoading", false);
        return false;
      }
    },
    async editWorker({ commit }, payload) {
      commit("setWorkersLoading", true);
      console.log(payload);
      try {
        let httpStatus = await apiClient.put(
          "/Workers/" + payload.workerId,
          payload
        );
        commit("updateWorker", payload);
        console.log(`status for update: ${httpStatus.status}`);
        commit("setWorkersLoading", false);
        return true;
      } catch (error) {
        console.log(error);
        commit("setWorkersLoading", false);
        return false;
      }
    },
  },
  getters: {
    workers(state) {
      return state.workers;
    },
    workersLoading(state) {
      return state.workersLoading;
    },
  },
};
