import {
  define,
  Auth,
  Dropdown,
  Events,
  Observer
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "../styles/reset.css.ts";
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
        <h1 class="title">Movie Royale</h1>

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
            <menu>
                <label class="dark-mode-switch" 
                  @change=${(event: Event) => Events.relay(
                    event, "dark-mode", {
                    checked: (event.target as HTMLInputElement)?.checked
                  })
                }
                >            
              <input type="checkbox" /> Dark mode
              </label>
                ${this.loggedIn && this.userid ? html`
                    <a href="/app/user/${this.userid}" class="dropdown-link">
                        My Profile
                    </a>
                ` : ''}
              </label>
                ${this.loggedIn ?
                  this.renderSignOutButton() :
                  this.renderSignInButton()
                }
            </menu>
          </mu-dropdown>
        </nav>
      </header>`
    }

    static styles = [
      reset.styles,
      css`
          header {
              display: flex;
              align-items: center;
              justify-content: space-between; 
              font-family: "Alegreya", serif;
              background-color: var(--color-accent);
              color: var(--color-text);
              line-height: var(--line-height);
              border-radius: var(--border-radius);
              font-size: 2.5em;box-shadow: var(--box-shadow);
              padding: var(--size-spacing-medium);
          }

          header > .title {
              flex: 4;
              text-align: center;
          }

          header > nav { 
              flex: 1; 
              text-align: right;
          }
          nav {
            display: flex;
            flex-direction: column;
            flex-basis: max-content;
            align-items: end;
          }

          a[slot="actuator"] {
            color: var(--color-link-inverted);
            cursor: pointer;
          }
          #userid:empty::before {
            content: "traveler";
          }
          menu a {
            color: var(--color-link);
            cursor: pointer;
            text-decoration: underline;
          }
          nav.logged-out .when-signed-in,
          nav.logged-in .when-signed-out {
            display: none;
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
        page?.classList.toggle("dark-mode", checked);}
  
      document.body.addEventListener("dark-mode", (event: Event) =>
        toggleDarkMode(event.currentTarget as HTMLElement,
          (event as CustomEvent).detail.checked)
      );
    }
}