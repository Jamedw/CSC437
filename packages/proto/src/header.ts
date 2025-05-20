import {
  define,
  Auth,
  Dropdown,
  Events,
  Observer
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.ts";
import { state } from "lit/decorators.js";


export class HeaderElement extends LitElement {
  
  
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  render() {
    return html`
      <header>
        <p1 class="title">
        Movie Royale
        </p1>
        <nav>
          <mu-dropdown>
            <a slot="actuator" style="cursor:pointer;">
                <h3>
                  Hello, ${this.userid || "Guest"}
                </h3>
              <svg class="icon">
                <use href="./icons/movies.svg#movie-icon1" />
              </svg>
            </a>  
            <div>
                <label class="dark-mode-switch" 
                  @change=${(event: Event) => Events.relay(
                    event, "dark-mode", {
                    checked: (event.target as HTMLInputElement)?.checked
                  })
                }
                >            
              <input type="checkbox" /> Dark mode
              </label>
                ${this.loggedIn ?
                  this.renderSignOutButton() :
                  this.renderSignInButton()
                }
            </div>
          </mu-dropdown>
        </nav>
      </header>`
    }

    static styles = [
      reset.styles,
      css`
        header {
            display: flex; /* etc., as before */
            font-family: "Alegreya", serif;
            background-color: var(--color-accent);
            color: var(--color-text);
            line-height: var(--line-height);
            border-radius: var(--border-radius);
            text-align: center;
            font-size: 2.5em;
            box-shadow: var(--box-shadow);
        }
        a{
          display: inline-flex; /* etc., as before */
          padding: 0 rem
        }

        header > .title{
            width: 80%;
        }
        header > .settings{
            width: 20%;
        }
        
      `];


  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"])
        }}
      >
        Sign Out
      </button>
    `;
  }

    renderSignInButton() {
      return html`
        <a href="/login.html">
          Sign In…
        </a>
      `;
    }
  
    _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  
    connectedCallback() {
      super.connectedCallback();
      this._authObserver.observe((auth: Auth.Model) => {
        const { user } = auth;
  
        if (user && user.authenticated ) {
          this.loggedIn = true;
          this.userid = user.username;
        } else {
          this.loggedIn = false;
          this.userid = undefined;
        }
      });
    }
  
  
    static initializeOnce() {
      function toggleDarkMode(page: HTMLElement | null, checked: any) {
        page?.classList.toggle("dark-mode", checked);
      }
  
      document.body.addEventListener("dark-mode", (event: Event) =>
        toggleDarkMode(event.currentTarget as HTMLElement,
          (event as CustomEvent).detail.checked)
      );
    }
}