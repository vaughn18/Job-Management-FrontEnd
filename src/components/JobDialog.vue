<template>
  <div>
    <v-card>
      <v-card-title> {{ dialogTitle }}</v-card-title>
      <v-list-item>
        <v-list-item-content>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="jobName"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-select
                v-model="select"
                :items="companies"
                :rules="[(v) => !!v || 'Please select a company']"
                label="Select a Company"
                item-text="companyName"
                :return-object="true"
                required
              ></v-select>

              <v-checkbox
                v-model="jobStatus"
                label="Check the box if this Job is available"
              ></v-checkbox>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Send
              </v-btn>
            </v-form>
          </v-container>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-dialog v-model="jobsLoading" hide-overlay persistent width="300">
      <v-card color="purple" dark>
        <v-card-text>
          Loading Job....
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{ snackbarMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["InitialData"],
  data: () => ({
    //dialog variables
    dialogTitle: "",
    //end
    //snackbar
    snackbar: false,
    snackbarColor: "",
    snackbarMsg: "",
    //snackbar end
    //form variables
    valid: true,
    jobName: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    select: null,
    jobStatus: false,
    //end
  }),
  created() {
    if (this.InitialData != null) {
      this.dialogTitle = "Edit a Job";
      this.jobName = this.InitialData.jobName;
      this.jobStatus = this.InitialData.jobStatus;
      let index = this.companies.findIndex(
        (item) => item.companyId == this.InitialData.companyId
      );
      this.select = this.companies[index];
    } else {
      this.dialogTitle = "Add a Job";
      this.jobName = "";
      this.select = "";
      this.jobStatus = false;
    }
  },
  watch: {
    InitialData: function (value) {
      if (value != null) {
        this.dialogTitle = "Edit a Job";
        this.jobName = this.InitialData.jobName;
        this.jobStatus = this.InitialData.jobStatus;
        let index = this.companies.findIndex(
          (item) => item.companyId == this.InitialData.companyId
        );

        this.select = this.companies[index];
      } else {
        this.dialogTitle = "Add a Job";
        this.jobName = "";
        this.select = "";
        this.jobStatus = false;
      }
    },
  },
  computed: {
    ...mapGetters(["companies", "jobsLoading"]),
  },
  methods: {
    validate() {
      let isValid = this.$refs.form.validate();
      if (isValid) {
        let payload = {
          jobName: this.jobName,
          jobStatus: this.jobStatus,
          companyId: this.select.companyId,
        };
        if (this.InitialData == null) {
          this.$store.dispatch("addJob", payload).then((result) => {
            if (result) {
              this.$store.commit("addNewJob", {
                company: this.select,
                job: result,
              });
              this.snackbar = true;
              this.snackbarMsg = "Job Added";
              this.snackbarColor = "green";
            } else {
              this.snackbar = true;
              this.snackbarMsg = "ERROR: Job not added";
              this.snackbarColor = "red";
            }
          });
        } else {
          payload["jobId"] = this.InitialData.jobId;
          this.$store.dispatch("editJob", payload).then((result) => {
            if (result) {
              this.$store.commit("updateJobInCompany", {
                companyId: payload.companyId,
                job: payload,
              });
              this.snackbarMsg = "Job Updated";
              this.snackbarColor = "green";
              this.snackbar = true;
            } else {
              this.snackbarMsg = "ERROR: Job not updated";
              this.snackbarColor = "red";
              this.snackbar = true;
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>