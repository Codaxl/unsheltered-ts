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
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        solo-inverted
        rounded
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search our
              <strong>Documentation</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <v-icon left>mdi-coin</v-icon>
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="headline font-weight-light white--text"
          >
            {{ item.name.charAt(0) }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>
      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down" v-if="!isLogginIn">
        <v-btn class="ma-2" outlined color="white" to="/Login">Login</v-btn>
      </div>
      <div v-else>
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
                  <v-list-item-title>{{ currentUser }}</v-list-item-title>
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
                <v-btn outlined v-on:click="logout">Logout</v-btn>
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
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import firebase from "firebase";
@Component({
  components: {}
})
export default class SiteHeader extends Vue {
  @Prop({ default: "MY SERVICE" }) private title!: string;
  @Watch("search")
  watchSearch(val: any) {
    // Items have already been loaded
    if (this.items.length > 0) return;

    this.isLoading = true;

    // Lazily load input items
    fetch("https://api.github.com/orgs/nodejs")
      .then(res => res.json())
      .then(res => {
        this.items = res.data;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
  }
  private isLoading = false;
  private items = [];
  private model = null;
  private search = null;
  private isActive = false;
  private fav = true;
  private fab = false;
  private menu = false;
  private message = false;
  private hints = true;
  private drawer = null;
  private federalFunds = [["CoC", "/funding/federal/coc"]];
  private stateFunds = [
    ["CESH", "/funding/state/cesh"],
    ["HEAP", "/funding/state/heap"],
    ["ESG", "/funding/state/esg"]
  ];
  private countyFunds = [["General", "/funding/county/general"]];

  private isLogginIn = false;
  private currentUser: any;

  private toTop() {
    this.$vuetify.goTo(0);
  }
  private onScroll(e: any) {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || e.target.scrollTop || 0;
    this.fab = top > 20;
  }
  private logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push({ path: "home" });
      });
  }

  created() {
    if (firebase.auth().currentUser) {
      this.isLogginIn = true;
      this.currentUser = firebase.auth().currentUser?.email;
    }
  }
}
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
