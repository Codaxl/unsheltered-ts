<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        text
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>

      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down">
        <v-btn class="ma-2" outlined color="white" to="/Login">Login</v-btn>
      </div>
      <div>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn class="ma-2" text fab color="white" v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item exact>
                <v-list-item-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Firstname Lastname</v-list-item-title>
                  <v-list-item-subtitle>Email</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-row class="py-4" align="center" justify="center">
              <v-btn outlined to="/Profile">Manage your Account</v-btn>
            </v-row>
            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="hints" color="purple"></v-switch>
                </v-list-item-action>
                <v-list-item-title>Dark Mode</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-row align="center" justify="center">
                <v-btn outlined>Logout</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
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

    <v-content transition="slide-x-transition">
      <loading-component></loading-component>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import LoadingComponent from "@/components/Layout/LoadingComponent.vue";
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
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
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Funding",
        model: false,
        children: [
          { text: "Federal", route: "/funding/federal" },
          { text: "State", route: "/funding/state" },
          { text: "HEAP", route: "/funding/state/heap" },
          { text: "County", route: "/funding/county" }
        ]
      }
    ]
  }),
  components: {
    LoadingComponent
  }
});
</script>
