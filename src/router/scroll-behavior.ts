import goTo from "vuetify/lib/services/goto";
import { waitForReadystate } from "../util/helpers";

export default async function(to: any, from: any, savedPosition: any) {
  await waitForReadystate();

  const options = {};
  let scrollTo = 0;

  if (to.hash) {
    scrollTo = to.hash;
  } else if (savedPosition) {
    scrollTo = savedPosition.y;
  }

  return new Promise<void>(resolve => {
    setTimeout(() => {
      if (typeof window === "undefined") {
        return resolve();
      }

      window.requestAnimationFrame(() => {
        try {
          goTo(scrollTo, options);
        } catch (err) {
          console.log(err);
        }

        resolve();
      });
    }, 200);
  });
}
