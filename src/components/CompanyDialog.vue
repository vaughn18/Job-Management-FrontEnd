<template>
  <div>
    <v-card>
      <v-container fill-height fluid v-if="companiesLoading">
        <v-row align="center" justify="center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </v-container>
      <v-card-title v-if="!companiesLoading"> {{ dialogTitle }} </v-card-title>
      <v-list-item v-if="!companiesLoading">
        <v-list-item-content>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="companyName"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="urlName"
                label="Image Url Logo"
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
                class="mr-4"
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
  computed: {
    ...mapGetters(["companiesLoading"]),
  },
  created() {
    if (this.InitialData != null) {
      this.dialogTitle = "Edit a Company";
      this.btnTitle = "Edit Company";
      this.companyName = this.InitialData.companyName;
      this.description = this.InitialData.description;
      this.urlName = this.InitialData.logoUrl;
      this.companyId = this.InitialData.companyId;
    } else {
      this.dialogTitle = "Add a Company";
      this.btnTitle = "Add Company";
      (this.companyName = ""),
        (this.description = ""),
        (this.urlName = ""),
        (this.companyId = null);
    }
  },
  watch: {
    InitialData: function (value) {
      if (value != null) {
        this.dialogTitle = "Edit a Company";
        this.btnTitle = "Update Company";
        this.companyName = this.InitialData.companyName;
        this.description = this.InitialData.description;
        this.urlName = this.InitialData.logoUrl;
        this.companyId = this.InitialData.companyId;
      } else {
        this.dialogTitle = "Add a Company";
        this.btnTitle = "Add Company";
        (this.companyName = ""),
          (this.description = ""),
          (this.urlName = ""),
          (this.companyId = null);
      }
    },
  },
  data: () => ({
    //title
    btnTitle: null,
    dialogTitle: null,
    //snackbar
    snackbarTimeout: 2000,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    //the company to be sent to the database
    companyId: null,
    valid: true,
    companyName: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    description: "",
    descriptionRules: [
      (v) =>
        (v && v.length <= 120) ||
        "Description must be less than 120 characters",
    ],
    urlName: "",
  }),

  methods: {
    validate() {
      let isValid = this.$refs.form.validate();
      if (isValid) {
        //to check if user is updating or adding
        let newCompany = {
          companyName: this.companyName,
          description: this.description,
          logoUrl: this.urlName,
        };
        if (this.InitialData == null) {
          this.$store.dispatch("addCompany", newCompany).then((result) => {
            if (result) {
              this.snackbar = true;
              this.snackbarText = "Company Added";
              this.snackbarColor = "green";
            } else {
              this.snackbar = true;
              this.snackbarText = "ERROR: Company not added";
              this.snackbarColor = "red";
            }
          });
        } else {
          newCompany["companyId"] = this.InitialData.companyId;
          this.$store.dispatch("editCompany", newCompany).then((result) => {
            if (result) {
              this.snackbarText = "Successfully, updated a Company";
              this.snackbarColor = "green";
              this.snackbar = true;
            } else {
              this.snackbarColor = "red";
              this.snackbarText = "Sorry, there was an error";
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