<template>
  <v-row>
    <v-col cols="12">
      <div>
        <v-card class="mx-auto">
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
            homeless funding and its allocation to programs. Information on who
            is receiving funding in Riverside County, where those Funds are
            distributed, and contact information is vital to efficient
            management, transparency and organizational purposes.
          </v-card-text>

          <v-card-actions>
            <v-btn text color="deep-purple accent-4" to="/news">
              Continue
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
    <v-col class="text-center">
      <div class="mt-12">
        <a href="https://www.buymeacoffee.com/1S5nvID" target="_blank"
          ><img
            src="https://cdn.buymeacoffee.com/buttons/default-white.png"
            alt="Buy Me A Coffee"
            style="height: 51px !important;width: 217px !important;  border-radius: 25px;"
        /></a>
      </div>
    </v-col>
  </v-row>
</template>
