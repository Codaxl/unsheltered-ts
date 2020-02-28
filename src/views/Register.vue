<template>
  <v-container>
    <register-component></register-component>
  </v-container>
</template>
<script>
import RegisterComponent from "@/components/Auth/RegisterComponent.vue";

export default {
  name: "Register",
  components: {
    RegisterComponent
  }
};
</script>
