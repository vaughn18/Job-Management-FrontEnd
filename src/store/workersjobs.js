import apiClient from "../services/api";

export default {
  state: {
    workerJobs: [],
    workerJobsLoading: false,
  },
  mutations: {
    setWorkerJobs(state, payload) {
      state.workerJobs = payload;
    },
    setWorkerJobsLoading(state, status) {
      state.workerJobsLoading = status;
    },
  },
  actions: {
    async getWorkerJobs({ commit }) {
      commit("setWorkerJobsLoading");
      let workerJobs = await apiClient.get("/WorkersJobs");
      commit("setWorkerJobs", workerJobs.data);
      commit("setWorkerJobsLoading", false);
    },
  },
  getters: {
    workerJobs(state) {
      return state.workerJobs;
    },
    workerJobsLoading(state) {
      return state.workerJobsLoading;
    },
  },
};
