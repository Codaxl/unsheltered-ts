declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vuetify/lib/services/goto" {
  export default function goTo<T extends string | number | HTMLElement | Vue>(
    target: T,
    options?: any
  ): any;
}
