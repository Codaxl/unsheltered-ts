import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import scrollBehavior from "./scroll-behavior";

Vue.use(VueRouter);

import UserStore from "../store/user/user-store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
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
    path: "/news",
    name: "News",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/News.vue")
  },
  {
    path: "/calendar",
    name: "Calendar",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Calendar.vue")
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
    path: "/funding",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Funding.vue"),
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "",
        name: "Funding",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Funding/Index.vue")
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "summary",
        name: "Funding Summary",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Funding/Summary.vue")
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
                /* webpackChunkName: "about" */ "../views/Funding/Federal/Index.vue"
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
                /* webpackChunkName: "about" */ "../views/Funding/State/Index.vue"
              )
          },
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "cesh",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/State/Cesh.vue"
              )
          },
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "esg-state",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/State/EsgState.vue"
              )
          },
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "heap",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/State/Heap.vue"
              )
          }
        ]
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "county",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/County.vue"),
        children: [
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/State/Index.vue"
              )
          },
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: "general-funds",
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/Funding/County/GeneralFunds.vue"
              )
          }
        ]
      }
    ]
  },
  {
    // UserPosts will be rendered inside User's <router-view>
    // when /user/:id/posts is matched
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: "",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Admin/Index.vue")
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: "projects",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/Admin/Projects/Index.vue"
          )
      }
    ]
  },
  {
    path: "/org-chart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrgChart.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior,
  routes
});

// ログインチェック
router.beforeEach((to: any, from: any, next: any) => {
  const isRequiresAuth: boolean = to.matched.some(
    (v: any) => v.meta.requiresAuth
  ); // 要認証ページか
  const isSignedIn: boolean = UserStore.isSignedIn; // サインイン済みか

  // 要認証ページなのにサインアウトしてなかったらフロントページに飛ばす
  if (isRequiresAuth && !isSignedIn) {
    next({ name: "Login" });
    return;
  }

  // 認証不要ページなのにサインイン済ならユーザー用ホームページに飛ばす（アプリによよってはいらないかも）
  if (!isRequiresAuth && isSignedIn) {
    next();
    return;
  }

  next();
});

export default router;
