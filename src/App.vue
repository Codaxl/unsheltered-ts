<template>
  <v-app>
    <v-app-bar
      :collapse="!collapseOnScroll"
      color="white"
      flat
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>
        <v-row align="center" style="min-width:200px;">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2 hidden-sm-and-down"
            contain
            src="@/assets/unsheltered-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
          <span class="font-weight-bold grey--text">Unsheltered.io</span>
        </v-row>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-checkbox v-model="collapseOnScroll" hide-details></v-checkbox> -->
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
        <v-list-item exact color="primary" to="/covid">
          <v-list-item-icon>
            <v-icon color="green">$vuetify.icons.smith</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Covid-19</v-list-item-title>
        </v-list-item>
        <v-list-item exact color="primary" to="/news">
          <v-list-item-icon>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-icon>
          <v-list-item-title>News</v-list-item-title>
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

          <!-- <v-list-group no-action sub-group>
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
          </v-list-group> -->
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
      <v-footer style="background:inherit;" padless>
        <v-row justify="center" no-gutters>
          <v-col class="py-8 text-center" cols="12"> </v-col>
        </v-row>
      </v-footer>
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
  </v-app>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import UserStore from "@/store/user/user-store";
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
        alert(err);
      })
      .finally(() => (this.isLoading = false));
  }
  private collapseOnScroll = true;
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
  private federalFunds = [];
  private stateFunds = [];
  private countyFunds = [];

  private toTop() {
    this.$vuetify.goTo(0);
  }
  private onScroll(e: any) {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || e.target.scrollTop || 0;
    this.fab = top > 20;
  }
  get isSignedIn(): boolean {
    return UserStore.isSignedIn;
  }
  get userName(): string {
    return UserStore.user.name;
  }
  private errorMessage = "";

  private async signOut() {
    await UserStore.signOut();
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
