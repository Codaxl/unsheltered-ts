<template>
  <v-container>
    <login-component></login-component>
  </v-container>
</template>
<script>
import LoginComponent from "@/components/Auth/LoginComponent.vue";

export default {
  name: "Login",
  components: {
    LoginComponent
  }
};
</script>
