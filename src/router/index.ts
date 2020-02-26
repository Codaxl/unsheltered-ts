import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    name: "Funding",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Funding.vue")
  },
  {
    // UserProfile will be rendered inside User's <router-view>
    // when /user/:id/profile is matched
    path: "/funding/federal",
    name: "Federal",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Federal.vue")
  },
  {
    // UserPosts will be rendered inside User's <router-view>
    // when /user/:id/posts is matched
    path: "/funding/state",
    name: "State",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/State.vue")
  },

  {
    // UserPosts will be rendered inside User's <router-view>
    // when /user/:id/posts is matched
    path: "/funding/state/heap",
    name: "Heap",
    component: () => import(/* webpackChunkName: "about" */ "../views/Heap.vue")
  },
  {
    // UserPosts will be rendered inside User's <router-view>
    // when /user/:id/posts is matched
    path: "/funding/county",
    name: "County",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/County.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
