<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field outlined label="Email"></v-text-field>
          <span class="caption grey--text text--darken-1">
            This is the email you will use to login to your Riverside County
            Exchange account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            outlined
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            outlined
            label="Confirm Password"
            type="password"
          ></v-text-field>
          <span class="caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          ></v-img>
          <h3 class="title font-weight-light mb-2">
            Welcome to Riverside County Exchange
          </h3>
          <span class="caption grey--text">Thanks for signing up!</span>
          <v-row align="center" justify="center">
            <v-btn text outlined color="primary" @click="step--">
              Login
            </v-btn>
          </v-row>
        </div>
      </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn v-show="step === 2" text @click="step--">
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <div class="action-bar">
        <v-btn v-show="step !== 3" color="primary" depressed @click="step++">
          Next
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    step: 1,
    show: false
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Register";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  }
};
</script>
<style>
.action-bar {
  min-height: 30px;
}
</style>
