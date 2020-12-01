import apiClient from "../services/api";

export default {
  state: {
    jobs: [],
    jobsLoading: false,
  },
  mutations: {
    setJobs(state, payload) {
      state.jobs = payload;
    },
    setJobsLoading(state, status) {
      state.jobsLoading = status;
    },
    addJob(state, payload) {
      state.jobs.push(payload);
    },
    deleteJob(state, id) {
      let index = state.jobs.findIndex((job) => {
        return job.jobId == id;
      });
      state.jobs.splice(index, 1);
    },
    updateJob(state, payload) {
      let index = state.jobs.findIndex((job) => job.jobId == payload.jobId);
      state.jobs[index] = payload;
    },
  },
  actions: {
    async getJobs({ commit }) {
      commit("setJobsLoading");
      let jobs = await apiClient.get("/Jobs");
      commit("setJobs", jobs.data);
      commit("setJobsLoading", false);
    },
    async addJob({ commit }, payload) {
      commit("setJobsLoading", true);
      try {
        let newJob = await apiClient.post("/Jobs", payload);
        commit("addJob", newJob.data);
        commit("setJobsLoading", false);
        return newJob.data;
      } catch (error) {
        console.log(error);
        commit("setJobsLoading", false);
        return false;
      }
    },
    async deleteJob({ commit }, id) {
      commit("setJobsLoading", true);
      try {
        let jobDelete = await apiClient.delete("/Jobs/" + id);
        console.log(`delete request Status: ${jobDelete.status}`);
        commit("deleteJob", id);
        commit("setJobsLoading", false);
        return true;
      } catch (error) {
        console.log(error);
        commit("setJobsLoading", false);
        return false;
      }
    },
    async editJob({ commit }, payload) {
      commit("setJobsLoading", true);
      try {
        let httpStatus = await apiClient.put("/Jobs/" + payload.jobId, payload);
        console.log(`status for update: ${httpStatus.status}`);
        commit("updateJob", payload);
        commit("setJobsLoading", false);
        return true;
      } catch (error) {
        console.log(error);
        commit("setJobsLoading", false);
        return false;
      }
    },
  },
  getters: {
    jobs(state) {
      return state.jobs;
    },
    jobsLoading(state) {
      return state.jobsLoading;
    },
  },
};
