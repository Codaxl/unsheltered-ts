<template>
  <div id="about">
    <v-container style="max-width:1080px;">
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
      <v-sheet class="mx-auto" elevation="8" max-width="800">
        <v-slide-group v-model="model" class="pa-4" show-arrows>
          <v-slide-item
            v-for="n in 15"
            :key="n"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-4"
              height="200"
              width="100"
              @click="toggle"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                    v-text="'mdi-close-circle-outline'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-expand-transition>
          <v-sheet
            v-if="model != null"
            color="grey lighten-4"
            height="200"
            tile
          >
            <v-row class="fill-height" align="center" justify="center">
              <h3 class="title">Selected {{ model }}</h3>
            </v-row>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    model: null,
    breadcrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/"
      },
      {
        text: "About",
        disabled: true,
        href: "/"
      }
    ]
  })
});
</script>
