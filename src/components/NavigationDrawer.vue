<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list>
      <template v-for="item in items">
        <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            exact
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.route"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else exact :key="item.text" :to="item.route">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",

  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-newspaper", text: "News", route: "/News" },
      { icon: "mdi-calendar", text: "Calendar", route: "/Calendar" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Programs",
        model: false,
        children: [{ text: "HUD CoC", route: "/" }]
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Coordinator",
        model: false,
        children: [{ text: "Events", route: "/events" }]
      }
    ]
  }),
  watch: {
    value() {
      this.$emit("drawer", this.drawer);
    }
  }
});
</script>
