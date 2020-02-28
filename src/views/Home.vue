<template>
  <v-container style="max-width: 1080px;">
    <v-layout>
      <v-flex xs12>
        <headline-component> </headline-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import HeadlineComponent from "../components/Home/HeadlineComponent.vue";

export default Vue.extend({
  components: {
    HeadlineComponent
  }
});
</script>
