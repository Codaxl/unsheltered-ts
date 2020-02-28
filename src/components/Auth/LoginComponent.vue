<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-title class="title font-weight-regular justify-space-between">
      <v-row align="center" justify="center">
        Welcome
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          outlined
          name="email"
          label="Email"
          type="email"
          v-model="email"
          :rules="emailRules"
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
          :rules="passwordRules"
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
        :disabled="!valid"
        @click="submit"
        data-cy="signinSubmitBtn"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters"
      ]
    };
  },
  methods: {
    ...mapActions("auth", ["userLogin"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.userLogin({
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>
