<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/unsheltered-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/unsheltered-name-dark.png"
          width="150"
        />
      </div>
      <v-spacer></v-spacer>
      <v-autocomplete
        text
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      >
        <template slot="item" slot-scope="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content>{{ data.item }}</v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <slot name="highlight" :highlight="data.item.highlight">
                <v-list-item-title v-html="data.item.highlight" />
              </slot>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
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
      floating
    >
      <v-list rounded>
        <v-list-item color="primary" to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item exact color="primary" to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>

        <v-list-item exact color="primary" to="/calendar">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Calendar</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Funding</v-list-item-title>
          </template>

          <v-list-item exact color="primary" to="/funding">
            <v-list-item-icon> </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Federal</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(funds, i) in federalFunds"
              :key="i"
              :to="funds[1]"
            >
              <v-list-item-title v-text="funds[0]"></v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group sub-group no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>State</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(funds, i) in stateFunds"
              :key="i"
              :to="funds[1]"
            >
              <v-list-item-title v-text="funds[0]"></v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group sub-group no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>County</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(funds, i) in countyFunds"
              :key="i"
              :to="funds[1]"
            >
              <v-list-item-title v-text="funds[0]"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
      <v-fab-transition>
        <v-btn
          v-scroll="onScroll"
          v-show="fab"
          fab
          dark
          fixed
          bottom
          right
          color="primary"
          @click="toTop"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-content>
    <v-footer style="background:inherit;" padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-8 text-center" cols="12"> </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    isActive: false,
    fav: true,
    fab: false,
    menu: false,
    message: false,
    hints: true,
    drawer: null,
    federalFunds: [["CoC", "/funding/federal/coc"]],
    stateFunds: [
      ["CESH", "/funding/state/cesh"],
      ["HEAP", "/funding/state/heap"],
      ["ESG", "/funding/state/esg"]
    ],
    countyFunds: [["General", "/funding/county/general"]]
  }),
  methods: {
    onScroll(e: any) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
});
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
