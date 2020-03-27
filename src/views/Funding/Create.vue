<template>
  <v-container full-width>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <!-- Content -->
        <v-card class="pa-4">
          <v-form @submit.prevent="onSubmit">
            <v-text-field v-model="name" label="Amount" />
            <v-text-field v-model="email" label="Continuum Project" />
            <v-text-field v-model="email" label="Date Created" />
            <v-text-field v-model="email" label="Date Updated" />
            <v-text-field v-model="email" label="Grant" />
            <v-text-field v-model="email" label="HMIS Participating Project" />
            <v-text-field v-model="email" label="Operating Start Date" />
            <v-text-field v-model="email" label="Operating End Date" />
            <v-text-field v-model="email" label="ProjecT Type" />
            <v-text-field v-model="email" label="Residiential Affiliation" />
            <v-text-field v-model="email" label="Source Type" />
            <v-text-field v-model="email" label="Tracking Method" />
            <v-row>
              <v-spacer />
              <v-btn type="submit">Submit</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { db } from "@/firebase";

export default Vue.extend({
  data() {
    return {
      name: "test",
      email: "test"
    };
  }
});
</script>
<style></style>
