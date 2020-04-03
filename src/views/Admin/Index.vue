<template>
  <div id="dynamic-component-demo" class="demo">
    <button
      v-for="tab in tabs"
      v-bind:key="tab"
      v-bind:class="['tab-button', { active: currentTab === tab }]"
      v-on:click="currentTab = tab"
    >
      {{ tab }}
    </button>

    <component v-bind:is="currentTabComponent" class="tab"></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Projects from "./Projects/Index.vue";
import Organizations from "./Organizations/Index.vue";

Vue.component("tab-projects", {
  template: "<projects></projects>"
});
Vue.component("tab-organizations", {
  template: "<organizations></organizations>"
});

export default Vue.extend({
  components: {
    Projects,
    Organizations
  },

  data: () => ({
    currentTab: "Home",
    tabs: ["Home", "Posts", "Archive"]
  }),

  computed: {
    currentTabComponent: function() {
      return "tab-" + this.currentTab.toLowerCase();
    }
  }
});
</script>
<style></style>
