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
import CalendarComponent from "@/components/Calendar/CalendarComponent.vue";

@Component({
  components: { CalendarComponent }
})
export default class News extends Vue {
  private breadcrumbs: Array<object> = [
    {
      text: "Home",
      disabled: false,
      href: "/"
    },
    {
      text: "Calendar",
      disabled: true,
      href: "/"
    }
  ];
}
</script>
<style></style>
