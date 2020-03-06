import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import scrollBehavior from "./scroll-behavior";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/funding",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Funding.vue"),
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Funding/Landing.vue")
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "federal",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Federal.vue"),
        children: [
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/Federal/Landing.vue"
              )
          },
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "coc",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/Federal/Coc.vue"
              )
          }
        ]
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "state",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Funding.vue"),
        children: [
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/State/Landing.vue"
              )
          }
        ]
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "state/heap",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Heap.vue")
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "county",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/County.vue")
      }
    ]
  },
  {
    path: "/events",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Events.vue")
  },
  {
    path: "/news",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/News.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior
});

export default router;
