<template>
  <v-container full-width>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <!-- Content -->
        <v-card class="pa-4">
          <v-card-title class="headline">Create Project</v-card-title>
          <v-form @submit.prevent="onSubmit">
            <ValidationProvider
              v-slot="{ errors }"
              name="Name"
              rules="required"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Name"
                required
                outlined
              ></v-text-field>
            </ValidationProvider>

            <v-text-field
              v-model="placeholder"
              label="Continuum Project"
              outlined
            />
            <v-text-field v-model="placeholder" label="Grant" outlined />
            <v-text-field
              v-model="placeholder"
              label="HMIS Participating Project"
              outlined
            />

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
                :max="
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                  ).toISOString()
                "
                :min="
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 4)
                  ).toISOString()
                "
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
            <v-text-field
              v-model="placeholder"
              label="Operating End Date"
              outlined
            />
            <v-text-field v-model="placeholder" label="ProjecT Type" outlined />
            <v-text-field
              v-model="placeholder"
              label="Residiential Affiliation"
              outlined
            />
            <v-text-field v-model="placeholder" label="Source Type" outlined />
            <v-text-field
              v-model="placeholder"
              label="Tracking Method"
              outlined
            />
            <v-row>
              <v-spacer />
              <v-btn class="mr-4" @click="submit">submit</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import { required, email, max } from "vee-validate/dist/rules";
import { extend, setInteractionMode, ValidationProvider } from "vee-validate";
import { VValidate } from "./Veelidate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

export default Vue.extend({
  components: {
    ValidationProvider
  },
  data: () => ({
    name: "",
    placeholder: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: null,
    // Datepicker
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false
  }),
  //Datepicker

  //Datepicker

  methods: {
    submit() {
      this.$refs.observer as VValidate;
    }
    // Datepicker
  }
});
</script>

<style></style>
