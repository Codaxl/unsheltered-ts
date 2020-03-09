<template>
  <v-container>
    <login-component></login-component>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LoginComponent from "../components/Auth/LoginComponent.vue";
@Component({
  components: {
    LoginComponent
  }
})
export default class Login extends Vue {}
</script>
