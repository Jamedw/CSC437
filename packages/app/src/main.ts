import {
  Auth,
  define,
  History,
  Store,
  Switch
} from "@calpoly/mustang"
import { Msg } from "./messages";
import update from "./update";
import { Model, init} from "./model";
import { html, LitElement } from "lit"
import { HeaderElement } from "./components/header"
import { TestViewElement } from "./views/test-view";
import { ProfileViewElement } from "./views/profile-view";
import { HomeViewElement } from "./views/home-view";



const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/user/:id",
    view: (params: Switch.Params) => html`
    <profile-view user-id=${params.id}></profile-view>`
  },
  {
    path: "/",
    redirect: "/app/test"
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
    "mu-store": class AppStore extends Store.Provider<Model, Msg>{
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
    "ryl-header": HeaderElement,
    "home-view": HomeViewElement,
    "profile-view": ProfileViewElement,
    "test-view": TestViewElement,
  });
  
  HeaderElement.initializeOnce();

