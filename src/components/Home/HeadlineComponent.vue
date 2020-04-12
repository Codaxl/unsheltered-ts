<template>
  <v-row>
    <v-col cols="12">
      <div>
        <v-card class="mx-auto">
          <v-img
            src="@/assets/covid-front.png"
            lazy-src="@/assets/covid-front.png"
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
            “There were far too many homeless people on the streets and in
            shelters...three months ago when we didn’t even know the word
            ‘coronavirus,’” - Monsignor Sullivan.
            <a
              href="https://www.americamagazine.org/politics-society/2020/04/03/what-will-happen-people-who-are-homeless-covid-19-crisis-continues"
              >Source</a
            >.
          </v-card-text>

          <v-card-actions>
            <v-btn text color="blue-grey darken-2" to="/covid">
              Continue
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
