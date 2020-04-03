<template>
  <v-tabs v-model="activeTab">
    <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.route">{{
      tab.name
    }}</v-tab>

    <v-tabs-items v-model="activeTab" @change="updateRouter($event)">
      <v-tab-item v-for="tab in tabs" :key="tab.id" :to="tab.route">
        <router-view></router-view>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    activeTab: "",
    tabs: [
      { id: "1", name: "Projects", route: "/admin/projects" },
      { id: "2", name: "Organizations", route: "/admin/organizations" }
    ]
  }),
  methods: {
    updateRouter(val: any) {
      this.$router.push(val);
    }
  }
});
</script>
