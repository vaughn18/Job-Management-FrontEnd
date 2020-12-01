import Vue from "vue";
import Vuex from "vuex";
import Workers from "./workers.js";
import Company from "./company.js";
import WorkersJobs from "./workersjobs";
import Jobs from "./jobs";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Workers,
    Company,
    WorkersJobs,
    Jobs,
  },
});
