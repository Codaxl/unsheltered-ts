<template>
  <v-container full-width>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <!-- Content -->
        <v-card class="pa-4">
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              :name="name"
              v-model="email"
              placeholder="email"
              :error-messages="errors"
            ></v-text-field>
            <v-text-field v-model="placeholder" label="Continuum Project" />
            <v-text-field v-model="placeholder" label="Date Created" />
            <v-text-field v-model="placeholder" label="Date Updated" />
            <v-text-field v-model="placeholder" label="Grant" />
            <v-text-field
              v-model="placeholder"
              label="HMIS Participating Project"
            />
            <v-text-field v-model="placeholder" label="Operating Start Date" />
            <v-text-field v-model="placeholder" label="Operating End Date" />
            <v-text-field v-model="placeholder" label="ProjecT Type" />
            <v-text-field
              v-model="placeholder"
              label="Residiential Affiliation"
            />
            <v-text-field v-model="placeholder" label="Source Type" />
            <v-text-field v-model="placeholder" label="Tracking Method" />
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
import { Component, Vue, Watch } from "vue-property-decorator";
import { Validator } from "vee-validate";

const v = new Validator();

@Component
export default class Home extends Vue {
  errors: string[] = [];
  name = "email";
  rules = "email";
  email = "";

  @Watch("email")
  async onEmailChanged(val: string) {
    if (val) {
      await this.verify(val);
    }
  }

  async verify(value: string) {
    const { errors } = await v.verify(value, this.rules, { name: this.name });
    this.errors = errors;
  }
  private submit() {
    this.$refs.observer.validate();
  }
}
</script>

<style></style>
