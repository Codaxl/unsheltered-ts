<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title class="title font-weight-regular justify-space-between">
      <v-row align="center" justify="center">
        Welcome
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          outlined
          name="email"
          label="Email"
          type="email"
          v-model="email"
          required
          data-cy="signinEmailField"
        ></v-text-field>
        <v-text-field
          outlined
          name="password"
          label="Password"
          type="password"
          data-cy="signinPasswordField"
          v-model="password"
          required
        ></v-text-field>
      </v-form>
      <span class="caption grey--text text--darken-1">
        Please enter your login credentials to continue.
      </span>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="deep-purple accent-4"
        v-on:click="onClickSignIn"
        data-cy="signinSubmitBtn"
      >
        Login
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserStore from "../../store/user/user-store";
@Component({
  components: {}
})
export default class LoginComponent extends Vue {
  private snackbar = false;
  private text = "";

  private email = "";
  private password = "";
  private errorMessage = "";
  get isError() {
    return this.errorMessage != "";
  }
  private async onClickSignIn() {
    this.errorMessage = "";
    const result = await UserStore.signIn({
      email: this.email,
      password: this.password
    });
    if (result.isError) {
      this.errorMessage = result.errorMessage;
      return;
    }
    this.$router.push({ name: "home" });
  }
}
</script>
