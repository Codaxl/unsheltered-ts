<template>
  <v-card class="mx-auto">
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">Welcome</v-list-item-title>
        <v-list-item-subtitle>by Joshua Coda</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="@/assets/front.png"
      lazy-src="@/assets/front.png"
      aspect-ratio="1"
      class="grey lighten-2"
      max-height="628"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-text>
      The purpose of this website is to collect structural components of
      homeless funding and its allocation to programs. Information on who is
      receiving funding in Riverside County, where those Funds are distributed,
      and contact information is vital to efficient management, transparency and
      organizational purposes.
    </v-card-text>

    <v-card-actions>
      <v-btn text color="deep-purple accent-4">
        Read
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
