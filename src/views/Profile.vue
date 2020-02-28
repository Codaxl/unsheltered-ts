<template>
  <v-container style="max-width:1080px;">
    <v-col>
      <v-row align="center" justify="center">
        <h1 class="font-weight-regular display-1">Personal info</h1>
      </v-row>
      <v-row align="center" justify="center">
        <div class="font-weight-light mb-3 title">
          <span
            >Basic info, like your name and photo, that you use on our
            services</span
          >
        </div>
      </v-row>
      <v-row align="center" justify="center">
        <v-card flat outlined class="mx-auto" width="750">
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
          </v-card-title>
          <v-card-subtitle>
            <span
              >Some info may be visible to other people using Google services.
              Learn more</span
            >
          </v-card-subtitle>

          <v-window v-model="step">
            <v-window-item :value="0">
              <v-card flat class="mx-auto">
                <v-list>
                  <template v-for="(item, index) in items">
                    <v-list-item :key="item.title" @click="step = item.id">
                      <v-list-item-content>
                        <v-list-item-title
                          class="caption font-weight-medium"
                          v-text="item.title"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          v-text="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon color="grey lighten-1" @click="[item.route]"
                            >mdi-arrow-right</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider
                      v-if="index + 1 < items.length"
                      :key="index"
                    ></v-divider>
                  </template>
                  <v-divider></v-divider>
                </v-list>

                <v-spacer></v-spacer>

                <v-card-title
                  class="title font-weight-regular justify-space-between"
                >
                  <span>Contact Info</span>
                </v-card-title>
                <v-list>
                  <template v-for="(item, index) in items2">
                    <v-list-item :key="item.title" @click="step = item.id">
                      <v-list-item-content>
                        <v-list-item-title
                          class="caption font-weight-medium"
                          v-text="item.title"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-subtitle
                          v-text="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn icon>
                          <v-icon color="grey lighten-1" @click="[item.route]"
                            >mdi-arrow-right</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider
                      v-if="index + 1 < items2.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list>
              </v-card>
            </v-window-item>

            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  outlined
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                  outlined
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <v-card-text>
                <v-text-field
                  outlined
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-card-text>
            </v-window-item>
            <v-window-item :value="4">
              <v-card-text>
                <v-text-field
                  outlined
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-card-text>
            </v-window-item>
            <v-window-item :value="5">
              <v-card-text>
                <v-text-field
                  outlined
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-card-text>
            </v-window-item>
            <v-window-item :value="6">
              <v-card-text>
                <v-text-field
                  outlined
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-card-actions>
            <v-btn v-show="step !== 0" text @click="step = 0">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-show="step !== 0"
              color="primary"
              depressed
              @click="step++"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    items: [
      {
        id: 1,
        icon: "mdi-account",
        iconClass: "grey lighten-1 white--text",
        title: "PHOTO",
        subtitle: "A photo helps personalize your account",
        route: "step++"
      },
      {
        id: 2,
        icon: "mdi-folder",
        iconClass: "grey lighten-1 white--text",
        title: "NAME",
        subtitle: "Joshua Coda",
        route: "/Profile"
      },
      {
        id: 3,
        icon: "mdi-folder",
        iconClass: "grey lighten-1 white--text",
        title: "NICKNAME",
        subtitle: "Joshua",
        route: "/Profile"
      }
    ],
    items2: [
      {
        id: 4,
        icon: "mdi-assignment",
        iconClass: "blue white--text",
        title: "EMAIL",
        subtitle: "joshua.coda@gmail.com",
        route: "/Profile"
      },
      {
        id: 5,
        icon: "mdi-call_to_action",
        iconClass: "amber white--text",
        title: "PHONE",
        subtitle: "951-595-7159",
        route: "/Profile"
      }
    ],
    step: 0
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 0:
          return "Profile";
        case 1:
          return "Photo";
        case 2:
          return "Name";
        case 3:
          return "Nickname";
        case 4:
          return "Gender";
        case 5:
          return "Password";
        case 6:
          return "Phone";
        default:
          return "Profile";
      }
    }
  }
};
</script>
