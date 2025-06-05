import { define, Form, View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { User, MovieRoyale, Movie } from "server/models";
import { Msg } from "../messages.js";
import { Model } from "../model";
import reset from "../styles/reset.css.js";
export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });
  @property({ attribute: "user-id" })
  userid?: string;
  @state()
  get user(): User | undefined {
    return this.model.profile;
  }
  @state()
  get movieRoyalesDetails(): MovieRoyale[] {
    return this.model.profile?.movieRoyales || [];
  }
  @state()
  get favoriteMoviesDetails(): Movie[] {
    return this.model.profile?.favoriteMovies || [];
  }
  @state()
  mode = "view"; 
  @state()
  private message: string | null = null;
  constructor() {
    super("blazing:model");
  }
  override render() {
    return html`
      ${this.message ? html`<div class="message-box">${this.message}</div>` : ""}
      ${this.renderContent()}
    `;
  }
  renderContent() {
    switch (this.mode) {
      case "edit":
        return this.renderEditor();
      case "create-movie-royale":
        return this.renderNewMovieRoyaleForm();
      default:
        return this.renderView();
    }
  }
  private showMessage(msg: string, duration: number = 3000) {
    this.message = msg;
    setTimeout(() => {
      this.message = null;
    }, duration);
  }
  renderView() {
    const { name, _id } = this.user || {};
    if (!_id) {
      return html`<p>Loading user profile...</p>`;
    }
    return html`
      <section>
        <button @click=${() => this.mode = "edit"}>
          Edit Profile
        </button>
        <h1>${name || "User"} Profile</h1>
        <h2>Your Movie Royales</h2>
        <button @click=${() => this.mode = "create-movie-royale"}>
          Create New Movie Royale
        </button>
        ${this.movieRoyalesDetails.length > 0 ?
          html`
            <ul>
              ${this.movieRoyalesDetails.map(royale => html`
                <li>
                  <h3>${royale.title}</h3>
                  <p>ID: ${royale._id?.toHexString()}</p>
                </li>
              `)}
            </ul>
          ` :
          html`<p>You are not in any Movie Royales yet.</p>`
        }
        <h2>Your Favorite Movies</h2>
        ${this.favoriteMoviesDetails.length > 0 ?
          html`
            <ul>
              ${this.favoriteMoviesDetails.map(movie => html`
                <li>
                  <h3>${movie.title}</h3>
                  <p>ID: ${movie._id?.toHexString()}</p>
                </li>
              `)}
            </ul>
          ` :
          html`<p>You haven't added any favorite movies yet.</p>`
        }
      </section>
    `;
  }
  renderEditor() {
    const { name } = this.user || {};
    const init = {
      ...this.user
    };
    return html`
      <mu-form
        .init=${init}
        @mu-form:submit=${this.handleProfileSubmit}
      >
        <h1>Edit ${name || "User"} Profile</h1>
        <dl>
          <dt>Name</dt>
          <dd><input name="name" value=${name || ""}></dd>
        </dl>
        <button type="submit">Save Changes</button>
        <button type="button" @click=${() => this.mode = "view"}>Cancel</button>
      </mu-form>
    `;
  }
  renderNewMovieRoyaleForm() {
    return html`
      <mu-form @mu-form:submit=${this.handleNewMovieRoyaleSubmit}>
        <h2>Create New Movie Royale</h2>
        <dl>
          <dt>Title</dt>
          <dd><input name="title" required></dd>
        </dl>
        <button type="submit">Create</button>
        <button type="button" @click=${() => this.mode = "view"}>Cancel</button>
      </mu-form>
    `;
  }
  static styles = [
    reset.styles,
    css`
    :host {
      display: contents;
      grid-column: 2/-2;
      display: grid;
      grid-template-columns: subgrid;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: start;
      grid-column: 1 / -1;
    }
    h1, h2 {
      grid-column: 1 / -1;
      margin-top: var(--size-spacing-large);
      margin-bottom: var(--size-spacing-medium);
    }
    button {
        margin-right: var(--size-spacing-small);
        margin-bottom: var(--size-spacing-medium);
        padding: var(--size-spacing-small) var(--size-spacing-medium);
        border-radius: var(--size-radius-small);
        border: 1px solid var(--color-accent);
        background-color: var(--color-accent);
        color: var(--color-on-accent);
        cursor: pointer;
        font-family: var(--font-family-display);
        font-size: var(--size-font-small);
    }
    button:hover {
        opacity: 0.9;
    }
    ul {
        list-style: none;
        padding: 0;
        grid-column: 1 / -1;
        display: grid;
        gap: var(--size-spacing-medium);
    }
    li {
        border: 1px solid var(--color-light-gray);
        padding: var(--size-spacing-medium);
        border-radius: var(--size-radius-small);
        background-color: var(--color-surface-2);
    }
    dl {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
      align-items: baseline;
      gap: var(--size-spacing-small) var(--size-spacing-medium);
    }
    dt {
      grid-column: 1 / span 1;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: 2 / -1;
    }
    mu-form {
      display: contents;
    }
    input {
     margin: var(--size-spacing-medium) 0;
     font: inherit;
     padding: var(--size-spacing-small);
     border: 1px solid var(--color-border);
     border-radius: var(--size-radius-small);
     width: 100%; /* Make input fill available width */
     box-sizing: border-box; /* Include padding and border in the element's total width and height */
    }
    .message-box {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--color-accent);
      color: var(--color-on-accent);
      padding: var(--size-spacing-medium);
      border-radius: var(--size-radius-small);
      z-index: 1000;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  `];
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      this.dispatchMessage([
        "profile/select",
        { userid: newValue }
      ]);
    }
  }
  handleProfileSubmit(event: Form.SubmitEvent<User>) {
    const updatedProfile: Partial<User> = {
      ...this.user,
      ...event.detail
    };
    if (this.userid) {
      this.dispatchMessage(["profile/save", {
        userid: this.userid, 
        profile: updatedProfile,
        onSuccess: () => {
          this.mode = "view";
          this.showMessage("Profile saved successfully!");
        },
        onFailure: (err) => {
          console.error("Error saving profile:", err);
          this.showMessage("Failed to save profile. See console for details.");
        }
      }]);
    }
  }
  handleNewMovieRoyaleSubmit(event: Form.SubmitEvent<{ title: string }>) {
    const { title } = event.detail;
    if (!title) {
      this.showMessage("Movie Royale title is required!");
      return;
    }
    this.dispatchMessage(["movieRoyales/create", {
      title: title,
      creatorId: this.userid, 
      onSuccess: (newRoyale: MovieRoyale) => {
        console.log("New Movie Royale created:", newRoyale);
        this.showMessage(`Movie Royale "${newRoyale.title}" created!`);
        this.mode = "view";
        if (this.userid) {
          this.dispatchMessage(["profile/select", { userid: this.userid }]);
        }
      },
      onFailure: (err: any) => {
        console.error("Error creating Movie Royale:", err);
        this.showMessage("Failed to create Movie Royale. See console for details.");
      }
    }]);
  }
}
