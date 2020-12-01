import apiClient from "../services/api";

export default {
  state: {
    companies: [],
    companiesLoading: false,
  },
  mutations: {
    setCompanies(state, payload) {
      state.companies = payload;
    },
    setCompaniesLoading(state, status) {
      state.companiesLoading = status;
    },
    addCompany(state, payload) {
      state.companies.push(payload);
    },
    deleteCompany(state, id) {
      let index = state.companies.findIndex((company) => {
        return company.companyId == id;
      });
      state.companies.splice(index, 1);
    },
    updateCompany(state, payload) {
      let index = state.companies.findIndex(
        (company) => company.companyId == payload.companyId
      );
      state.companies[index] = payload;
    },
    addNewJob(state, payload) {
      let index = state.companies.findIndex((company) => {
        return company.companyId == payload.company.companyId;
      });
      console.log(payload.job);
      state.companies[index].jobs.push(payload.job);
    },
    removeJobFromCompany(state, payload) {
      let index = state.companies.findIndex(
        (company) => company.companyId == payload.companyId
      );
      let jobIndex = state.companies[index].jobs.findIndex(
        (job) => job.jobId == payload.jobId
      );
      state.companies[index].jobs.splice(jobIndex, 1);
    },
    updateJobInCompany(state, payload) {
      let index = state.companies.findIndex(
        (company) => company.companyId == payload.companyId
      );
      let jobIndex = state.companies[index].jobs.findIndex(
        (job) => job.jobId == payload.job.jobId
      );
      state.companies[index].jobs[jobIndex] = payload.job;
    },
  },
  actions: {
    async getCompanies({ commit }) {
      commit("setCompaniesLoading", true);
      let companies = await apiClient.get("/Companies");
      commit("setCompanies", companies.data);
      commit("setCompaniesLoading", false);
    },
    async addCompany({ commit }, payload) {
      commit("setCompaniesLoading", true);
      try {
        let newCompany = await apiClient.post("/Companies", payload);
        commit("addCompany", newCompany.data);
        commit("setCompaniesLoading", false);
        return true;
      } catch (error) {
        console.log(error);
        commit("setCompaniesLoading", false);
        return false;
      }
    },
    async deleteCompany({ commit }, id) {
      commit("setCompaniesLoading", true);
      try {
        let deletedCompany = await apiClient.delete("/Companies/" + id);
        commit("deleteCompany", id);
        console.log(`status for deletion: ${deletedCompany.status}`);
        commit("setCompaniesLoading", false);
        return true;
      } catch (error) {
        console.log(error);
        commit("setCompaniesLoading", false);
        return false;
      }
    },
    async editCompany({ commit }, payload) {
      commit("setCompaniesLoading", true);
      try {
        let httpStatus = await apiClient.put(
          "/Companies/" + payload.companyId,
          payload
        );
        console.log(`status for update: ${httpStatus.status}`);
        commit("updateCompany", payload);
        commit("setCompaniesLoading", false);
        return true;
      } catch (error) {
        console.log(error);
        commit("setCompaniesLoading", false);
        return false;
      }
    },
  },
  getters: {
    companies(state) {
      return state.companies;
    },
    companiesLoading(state) {
      return state.companiesLoading;
    },
  },
};
