<template>
  <div id="about">
    <v-container style="max-width:1080px;">
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    model: null,
    breadcrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/"
      },
      {
        text: "Funding",
        disabled: true,
        href: "/funding"
      }
    ]
  })
});
</script>
