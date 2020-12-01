<template>
  <div>
    <v-toolbar color="#6c5ce7" dark flat>
      <v-toolbar-title>Job Management</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tabModel" slider-color="yellow">
          <v-tab>
            <v-icon left>mdi-account-box-multiple</v-icon>
            Workers
          </v-tab>
          <v-tab>
            <v-icon left> mdi-office-building</v-icon>
            Companies
          </v-tab>
          <v-tab>
            <v-icon left>mdi-calendar-check</v-icon>
            Jobs
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-container>
      <v-tabs-items v-model="tabModel">
        <!--Worker--->
        <v-tab-item>
          <v-container class="card-list-width">
            <v-row>
              <v-col cols="12" v-for="(worker, index) in workers" :key="index">
                <v-card>
                  <v-container>
                    <v-list-item>
                      <v-list-item-avatar height="100" width="100">
                        <v-sheet
                          height="300"
                          width="300"
                          color="#6c5ce7"
                          class="rounded-circle mx-auto"
                        >
                          <v-container class="white--text" fill-height>
                            <v-row align="center" justify="center">
                              <h1>
                                {{ worker.firstName.charAt(0) }}
                              </h1>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="headline">
                          {{ worker.firstName }}
                          {{ worker.lastName }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          worker.description
                        }}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-btn
                        @click="editData(worker)"
                        class="mx-2"
                        fab
                        dark
                        small
                        color="orange"
                      >
                        <v-icon dark> mdi-pencil </v-icon>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="red"
                        @click="deleteData(worker.workerId)"
                      >
                        <v-icon dark> mdi-delete </v-icon>
                      </v-btn>
                    </v-list-item>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <!--Companies--->
        <v-tab-item>
          <v-container class="card-list-width">
            <v-row>
              <v-col
                cols="12"
                v-for="(company, index) in companies"
                :key="index"
              >
                <v-card>
                  <v-container>
                    <v-list-group>
                      <template v-slot:activator>
                        <v-list-item>
                          <v-list-item-avatar height="100" width="100">
                            <v-sheet
                              height="300"
                              width="300"
                              color="#6c5ce7"
                              class="rounded-circle mx-auto"
                            >
                              <v-container class="white--text" fill-height>
                                <v-row align="center" justify="center">
                                  <h1>
                                    {{ company.companyName.charAt(0) }}
                                  </h1>
                                </v-row>
                              </v-container>
                            </v-sheet>
                            <!-- <v-img v-else :src="company.logoUrl" lazy-src="">
                            <template v-slot:placeholder>
                              <v-sheet
                                height="300"
                                width="300"
                                color="#ff7f50"
                                class="rounded-circle mx-auto"
                                v-if="!company.logoUrl"
                              >
                                <v-container class="white--text" fill-height>
                                  <v-row align="center" justify="center">
                                    <h1>
                                      {{ company.companyName.charAt(0) }}
                                    </h1>
                                  </v-row>
                                </v-container>
                              </v-sheet>
                            </template>
                          </v-img> -->
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title
                              :style="widthStyle"
                              class="headline"
                            >
                              {{ company.companyName }}
                            </v-list-item-title>
                            <v-list-item-subtitle :style="widthStyle">{{
                              company.description
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                      <br />
                      <v-list-item-title>
                        <strong>Jobs Listed:</strong>
                      </v-list-item-title>
                      <v-list-item v-for="(job, i) in company.jobs" :key="i">
                        <v-list-item-title>
                          {{ job.jobName }}
                        </v-list-item-title>
                        <v-list-item-icon>
                          <v-icon v-if="job.jobStatus" color="green">
                            mdi-check-circle
                          </v-icon>
                          <v-icon v-else color="red">
                            mdi-checkbox-blank-circle
                          </v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list-group>
                  </v-container>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="orange"
                      @click="editData(job)"
                    >
                      <v-icon dark> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      @click="deleteData(company.companyId)"
                      fab
                      dark
                      small
                      color="red"
                    >
                      <v-icon dark> mdi-delete </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <!--Jobs--->
        <v-tab-item>
          <v-container class="card-list-width">
            <v-row>
              <v-col cols="12" v-for="(job, index) in jobs" :key="index">
                <v-card>
                  <v-container>
                    <v-list-item>
                      <v-list-item-avatar height="100" width="100">
                        <v-sheet
                          height="300"
                          width="300"
                          color="#6c5ce7"
                          class="rounded-circle mx-auto"
                        >
                          <v-container class="white--text" fill-height>
                            <v-row align="center" justify="center">
                              <h1>
                                {{ job.jobName.charAt(0) }}
                              </h1>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="headline">
                          {{ job.jobName }}
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-btn
                        @click="editData(job)"
                        class="mx-2"
                        fab
                        dark
                        small
                        color="orange"
                      >
                        <v-icon dark> mdi-pencil </v-icon>
                      </v-btn>
                      <v-btn
                        @click="deleteData(job)"
                        class="mx-2"
                        fab
                        dark
                        small
                        color="red"
                      >
                        <v-icon dark> mdi-delete </v-icon>
                      </v-btn>
                    </v-list-item>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-container>

    <!--Worker Dialog-->
    <v-dialog v-model="workerDialog" max-width="600">
      <worker-dialog :InitialData="initialData"></worker-dialog>
    </v-dialog>
    <!--Company Dialog-->
    <v-dialog v-model="companyDialog" max-width="600">
      <company-dialog :InitialData="initialData"> </company-dialog>
    </v-dialog>
    <!--Job Dialog-->
    <v-dialog v-model="jobDialog" max-width="600">
      <job-dialog :InitialData="initialData"></job-dialog>
    </v-dialog>
    <!--Loading Dialog-->
    <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
      <v-card color="#6c5ce7" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--SnackBar-->
    <v-snackbar :color="snackbarColor" v-model="snackbar" :timeout="2000">
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" dark @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!--button for adding-->
    <v-btn
      color="green"
      fab
      large
      dark
      class="floating-btn"
      @click="openDialog"
    >
      <v-icon color="white">mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import WorkerDialog from "@/components/WorkerDialog.vue";
import CompanyDialog from "@/components/CompanyDialog.vue";
import JobDialog from "@/components/JobDialog.vue";
import { mapGetters } from "vuex";
export default {
  //******************* DATA ***************************
  data: () => ({
    tabModel: 0,
    jobDialog: false,
    companyDialog: false,
    workerDialog: false,
    //loading dialog
    loadingDialog: false,
    //snackbar
    snackbar: false,
    snackbarMessage: "",
    snackbarColor: "",
    //data initialData when editing
    initialData: null,
  }),
  methods: {
    //Deleting data
    deleteData(payload) {
      switch (this.tabModel) {
        case 0:
          this.loadingDialog = true;
          this.$store.dispatch("deleteWorker", payload).then((result) => {
            if (result) {
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarColor = "green";
              this.snackbarMessage = "Worker Deleted Successfully!";
            } else {
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarColor = "red";
              this.snackbarMessage = "ERROR: Worker was not deleted!";
            }
          });

          break;
        case 1:
          console.log(this.tabModel);
          console.log(payload);
          this.loadingDialog = true;
          this.$store.dispatch("deleteCompany", payload).then((result) => {
            if (result) {
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarColor = "green";
              this.snackbarMessage = "Company Deleted Successfully!";
            } else {
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarColor = "red";
              this.snackbarMessage = "ERROR: Company was not deleted!";
            }
          });
          break;
        case 2:
          console.log(`delete ${payload}`);
          this.loadingDialog = true;
          this.$store.dispatch("deleteJob", payload.jobId).then((result) => {
            if (result) {
              this.$store.commit("removeJobFromCompany", {
                companyId: payload.companyId,
                jobId: payload.jobId,
              });
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarColor = "green";
              this.snackbarMessage = "Job Deleted Successfully!";
            } else {
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarColor = "red";
              this.snackbarMessage = "ERROR: Job was not deleted!";
            }
          });
          break;
      }
    },
    //editing data
    editData(payload) {
      switch (this.tabModel) {
        case 0: //worker
          this.initialData = payload;
          this.workerDialog = !this.workerDialog;
          break;

        case 1: //company
          this.initialData = payload;
          this.companyDialog = !this.companyDialog;
          break;
        case 2: //jobs
          this.initialData = payload;
          this.jobDialog = !this.jobDialog;
          break;
      }
    },
    randomColorPicker() {
      return this.colors[Math.floor(Math.random() * 11)];
    },
    //open dialog when adding data
    openDialog() {
      switch (this.tabModel) {
        //worker dialog enabled if tab is on workers
        case 0:
          (this.initialData = null), (this.workerDialog = !this.workerDialog);
          break;
        //company dialog enabled
        case 1:
          (this.initialData = null), (this.companyDialog = !this.companyDialog);
          break;
        //work dialog enabled
        case 2:
          (this.initialData = null), (this.jobDialog = !this.jobDialog);
          break;
      }
    },
  },
  components: { WorkerDialog, JobDialog, CompanyDialog },
  created() {
    this.$store.dispatch("getWorkers");
    this.$store.dispatch("getCompanies");
    this.$store.dispatch("getJobs");
    this.$store.dispatch("getWorkerJobs");
  },
  computed: {
    ...mapGetters(["workers", "companies", "jobs", "workerJobs"]),
    widthStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "max-width: 80px;";
        case "sm":
          return "max-width: 50px;";
        case "md":
          return "max-width: 100px;";
        case "lg":
          return "max-width: 300px;";
        case "xl":
          return "max-width: 300px;";
      }
      return null;
    },
  },
};
</script>

<style scoped>
.card-list-width {
  max-width: 600px;
}
.floating-btn {
  position: fixed;
  right: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  bottom: 0;
}
</style>
