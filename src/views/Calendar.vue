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
<script>
import CalendarLoading from "@/components/Calendar/Loading.vue";
import CalendarLoadError from "@/components/Calendar/LoadError.vue";
const CalendarComponent = import("@/components/Calendar/CalendarComponent.vue");

export default {
  name: "Calendar",
  data() {
    return {
      breadcrumbs: [
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
      ]
    };
  },
  components: {
    CalendarComponent: () => ({
      component: CalendarComponent,
      loading: CalendarLoading,
      error: CalendarLoadError,
      delay: 200,
      timeout: 3000
    })
  }
};
</script>
