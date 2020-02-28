<template>
  <v-container style="max-width:1080px;" fluid>
    <div>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </div>
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <v-card class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1"
                >Headline 5</v-list-item-title
              >
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
              <div class="text--primary my-4">
                well meaning and kindly. "a benevolent smile". Lorem ipsum dolor
                sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">
              Read
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="mx-auto">
          <v-subheader>CATEGORIES</v-subheader>
          <v-list shaped>
            <v-list-item-group v-model="model" multiple>
              <template v-for="(item, i) in items">
                <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                <v-list-item
                  v-else
                  :key="`item-${i}`"
                  :value="item"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        color="deep-purple accent-4"
                        @click="toggle"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "News",
  data() {
    return {
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
          href: "/"
        },
        {
          text: "News",
          disabled: true,
          href: "/"
        }
      ],
      items: ["Dog Photos", "Cat Photos", "", "Potatoes", "Carrots"],
      model: ["Carrots"]
    };
  }
};
</script>
