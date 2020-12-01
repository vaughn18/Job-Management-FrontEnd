<template>
  <div>
    <v-card height="500px">
      <v-container fill-height fluid v-if="workersLoading">
        <v-row align="center" justify="center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </v-container>
      <v-card-title v-if="!workersLoading"> {{ dialogTitle }} </v-card-title>
      <v-list-item v-if="!workersLoading">
        <v-list-item-content>
          <v-container text-center>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="firstName"
                :counter="20"
                :rules="nameRules"
                label="First Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="lastName"
                :counter="20"
                :rules="nameRules"
                label="Last Name"
                required
              ></v-text-field>

              <v-textarea
                v-model="description"
                :rules="descriptionRules"
                label="Description"
                :counter="120"
                full-width
                single-line
                maxlength="120"
                required
              ></v-textarea>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 text-capitalize"
                @click="validate"
              >
                {{ btnTitle }}
              </v-btn>
            </v-form>
          </v-container>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-snackbar
      dark
      v-model="snackbar"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
    >
      {{ snackbarText }}

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
  created() {
    if (this.InitialData != null) {
      //set title
      this.dialogTitle = "Edit A Worker";
      this.btnTitle = "Edit Worker";
      this.firstName = this.InitialData.firstName;
      this.lastName = this.InitialData.lastName;
      this.description = this.InitialData.description;
    } else {
      //set title
      this.dialogTitle = "Add A Worker";
      this.btnTitle = "Add Worker";
      this.firstName = "";
      this.lastName = "";
      this.description = "";
    }
  },
  watch: {
    InitialData: function (value) {
      if (value != null) {
        //set title
        this.dialogTitle = "Edit A Worker";
        this.btnTitle = "Edit Worker";
        this.firstName = this.InitialData.firstName;
        this.lastName = this.InitialData.lastName;
        this.description = this.InitialData.description;
      } else {
        //set title
        this.dialogTitle = "Add A Worker";
        this.btnTitle = "Add Worker";
        this.firstName = "";
        this.lastName = "";
        this.description = "";
      }
    },
  },
  data: () => ({
    //TITLES
    btnTitle: "",
    dialogTitle: "",
    //end
    snackbarTimeout: 2000,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    valid: false,
    firstName: "",
    lastName: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 30) || "Name must be less than 20 characters",
    ],
    description: "",
    descriptionRules: [
      (v) =>
        (v && v.length <= 100) ||
        "Description must be lest than 100 characters",
    ],
  }),
  computed: {
    ...mapGetters(["workersLoading"]),
  },
  methods: {
    validate() {
      let isValid = this.$refs.form.validate();
      if (isValid) {
        let newWorker = {
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
        };

        //check if the user is editing or adding
        if (this.InitialData == null) {
          this.$store.dispatch("addWorker", newWorker).then((response) => {
            if (response.status >= 400) {
              this.snackbarText = "Sorry, there was an error";
              this.snackbarColor = "red";
              this.snackbar = true;
            } else if (response.status <= 201) {
              this.snackbarText = "Successfully, added a worker";
              this.snackbarColor = "green";
              this.snackbar = true;
            }
          });
        } else {
          newWorker["workerId"] = this.InitialData.workerId;
          this.$store.dispatch("editWorker", newWorker).then((result) => {
            if (result) {
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarText = "Successfully, updated a Worker";
              this.snackbarColor = "green";
            } else {
              this.loadingDialog = false;
              this.snackbar = true;
              this.snackbarText = "Sorry, there was an error";
              this.snackbarColor = "red";
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