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
      <calendar-component></calendar-component>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Contacts extends Vue {
  private breadcrumbs: Array<object> = [
    {
      text: "Home",
      disabled: false,
      href: "/"
    },
    {
      text: "Contacts",
      disabled: true,
      href: "/"
    }
  ];
}
</script>
<style></style>
