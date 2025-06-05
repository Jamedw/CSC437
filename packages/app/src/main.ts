import {
  Auth,
  define,
  History,
  Store,
  Switch
} from "@calpoly/mustang"
import { Msg } from "./messages";
import { init, Model } from "./model";
import update from "./update";
import { html, LitElement } from "lit"
import { HeaderElement } from "./components/header"
import { HomeViewElement } from "./views/home-view";
import { TestViewElement } from "./views/test-view";



const routes: Switch.Route[] = [
    {
      path: "/app/tour/:id",
      view: (params: Switch.Params) => html`
        <tour-view tour-id=${params.id}></tour-view>
      `
    },
    {
      auth: "protected",
      path: "/app",
      view: () => html`<home-view></home-view>`
    },
    {
      path: "/",
      redirect: "/app"
    },
    {
      path: "/app/test",
      view: (params: Switch.Params) => html`
      <test-view param=${params}></test-view>
      `
    }
  ];

  class AppElement extends LitElement {
    render() {
      return html`<mu-switch></mu-switch>`;
    }
  
    connectedCallback() {
      super.connectedCallback();
      HeaderElement.initializeOnce();
    }
  }
  
  define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore extends Store.Provider<
      Model,
      Msg
    > {
      constructor() {
        super(update, init, "blazing:auth");
      }
    },
    "mu-switch": class AppSwitch extends Switch.Element {
      constructor() {
        super(routes, "blazing:history", "blazing:auth");
      }
    },
    "blazing-app": AppElement,
    "blazing-header": HeaderElement,
    "home-view": HomeViewElement,
    "test-view": TestViewElement,
  });
  
  HeaderElement.initializeOnce();

