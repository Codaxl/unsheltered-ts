<template>
  <div id="calendar">
    <v-container style="max-width:1080px;">
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
      <calendar-component></calendar-component>
    </v-container>
  </div>
</template>
<template>
  <div id="calendar">
    <v-container style="max-width:1080px;">
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
      <v-card> </v-card>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class OrgChart extends Vue {}
</script>
<style></style>
