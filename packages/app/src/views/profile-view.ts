import { define, Form, View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { User, MovieRoyale, Movie, PopulatedUser  } from "server/models";
import { Msg } from "../messages.js";
import { Model } from "../model";
import reset from "../styles/reset.css.js";

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property({ attribute: "user-id" })
  userid: string = "";

  @state()
  get user(): PopulatedUser | undefined {
    return this.model.profile as PopulatedUser | undefined;
  }

  @state()
  get movieRoyalesDetails(): MovieRoyale[] {
    const uniqueRoyales = new Map<string, MovieRoyale>();
    if (this.user?.movieRoyales) {
        this.user.movieRoyales.forEach(royale => {
            if (royale._id) {
                uniqueRoyales.set(royale._id, royale);
            }
        });
    }
    return Array.from(uniqueRoyales.values());
  }

  @state()
  get favoriteMoviesDetails(): Movie[] {
    const uniqueMovies = new Map<string, Movie>();
    if (this.user?.favoriteMovies) {
        this.user.favoriteMovies.forEach(movie => {
            if (movie._id) {
                uniqueMovies.set(movie._id.toHexString(), movie);
            }
        });
    }
    return Array.from(uniqueMovies.values());
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

    if (!this.user || !_id) {
      return html`
        <section class="loading-state">
          <p>Loading user profile...</p>
        </section>
      `;
    }

    return html`
      <section>
        <div class="profile-header">
            <h1>${name || "User"} Profile</h1>
            <button @click=${() => this.mode = "edit"}>
                <img src="https://api.iconify.design/lucide/edit.svg?color=%23f8f8f8" alt="Edit Icon" class="icon-small">
                Edit Profile
            </button>
        </div>

        <div class="section-header">
            <h2>Your Movie Royales</h2>
            <button @click=${() => this.mode = "create-movie-royale"}>
                <img src="https://api.iconify.design/lucide/plus.svg?color=%231f2937" alt="Create Icon" class="icon-small">
                Create New Movie Royale
            </button>
        </div>
        ${this.movieRoyalesDetails.length > 0 ?
          html`
            <div class="royales-grid">
              ${this.movieRoyalesDetails.map(royale => html`
                <div class="royale-card">
                  <h3>${royale.title}</h3>
                  <p class="royale-status">Status: <span class="status-${royale.status}">${royale.status.charAt(0).toUpperCase() + royale.status.slice(1)}</span></p>
                  <p class="royale-info">Participants: ${royale.participants.length}</p>
                  <p class="royale-info">Current Round: ${royale.currentRound} / ${royale.numberOfRounds}</p>
                  <p class="royale-id">ID: ${royale._id}</p>
                  <button class="view-button">View Royale</button>
                </div>
              `)}
            </div>
          ` :
          html`<p class="no-data-message">You are not in any Movie Royales yet. Click "Create New Movie Royale" to start one!</p>`
        }

        <h2 class="section-header">Your Favorite Movies</h2>
        ${this.favoriteMoviesDetails.length > 0 ?
          html`
            <div class="movies-grid">
              ${this.favoriteMoviesDetails.map(movie => html`
                <div class="movie-card">
                  <img src=${movie.imgSrc || `https://placehold.co/150x220/E0BBE4/957DAD?text=${movie.title.split(' ').join('+')}`} alt=${movie.title} class="movie-card-img">
                  <div class="movie-card-content">
                    <h3>${movie.title}</h3>
                    <p class="movie-release-year">${movie.releaseYear}</p>
                    <p class="movie-genres">${movie.genres.join(', ')}</p>
                    <p class="movie-id">ID: ${movie._id?.toHexString()}</p>
                  </div>
                </div>
              `)}
            </div>
          ` :
          html`<p class="no-data-message">You haven't added any favorite movies yet. Explore and find some!</p>`
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
        class="edit-form"
      >
        <h1>Edit ${name || "User"} Profile</h1>
        <dl>
          <dt>Name</dt>
          <dd><input name="name" value=${name || ""} class="form-input"></dd>
        </dl>
        <div class="form-actions">
          <button type="submit" class="save-button">Save Changes</button>
          <button type="button" @click=${() => this.mode = "view"} class="cancel-button">Cancel</button>
        </div>
      </mu-form>
    `;
  }

  renderNewMovieRoyaleForm() {
    return html`
      <mu-form @mu-form:submit=${this.handleNewMovieRoyaleSubmit} class="create-royale-form">
        <h2>Create New Movie Royale</h2>
        <dl>
          <dt>Title</dt>
          <dd><input name="title" required class="form-input"></dd>
        </dl>
        <div class="form-actions">
          <button type="submit" class="create-button">Create</button>
          <button type="button" @click=${() => this.mode = "view"} class="cancel-button">Cancel</button>
        </div>
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
      font-family: 'Inter', sans-serif;
      color: var(--color-text);
    }

    section {
      display: grid;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: start;
      grid-column: 1 / -1;
      padding: var(--size-spacing-large);
      background-color: var(--color-surface-1);
      border-radius: var(--size-radius-medium);
      box-shadow: var(--shadow-depth-1);
    }

    .profile-header, .section-header {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--size-spacing-large);
      margin-bottom: var(--size-spacing-medium);
      padding-bottom: var(--size-spacing-small);
      border-bottom: 1px solid var(--color-border);
    }

    h1 {
      font-size: var(--size-font-large);
      font-weight: bold;
      color: var(--color-primary);
      margin: 0;
    }

    h2 {
      font-size: var(--size-font-medium);
      font-weight: bold;
      color: var(--color-secondary);
      margin: 0;
    }

    button {
        display: inline-flex;
        align-items: center;
        gap: var(--size-spacing-extra-small);
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
        transition: all 0.2s ease-in-out;
    }
    button:hover {
        filter: brightness(1.1);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .profile-header button {
        background-color: var(--color-tertiary);
        border-color: var(--color-tertiary);
        color: var(--color-on-tertiary);
    }
    .profile-header button:hover {
        filter: brightness(1.1);
    }
    .section-header button {
        background-color: var(--color-highlight);
        border-color: var(--color-highlight);
        color: var(--color-on-highlight);
    }
    .section-header button:hover {
        filter: brightness(1.1);
    }
    .save-button {
      background-color: var(--color-success);
      border-color: var(--color-success);
      color: var(--color-on-success);
    }
    .cancel-button {
      background-color: var(--color-error);
      border-color: var(--color-error);
      color: var(--color-on-error);
    }
    .create-button {
      background-color: var(--color-highlight);
      border-color: var(--color-highlight);
      color: var(--color-on-highlight);
    }

    .icon-small {
        width: 1em;
        height: 1em;
        vertical-align: middle;
        margin-right: 0.2em;
    }

    .royales-grid, .movies-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--size-spacing-large);
        grid-column: 1 / -1;
    }

    .royale-card {
        background-color: var(--color-surface-2);
        padding: var(--size-spacing-medium);
        border-radius: var(--size-radius-small);
        border: 1px solid var(--color-border);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--size-spacing-small);
        box-shadow: var(--shadow-depth-1);
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .royale-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-depth-2);
    }
    .royale-card h3 {
        font-size: var(--size-font-medium);
        font-weight: 600;
        color: var(--color-primary);
        margin-bottom: var(--size-spacing-extra-small);
        word-break: break-word;
    }
    .royale-status {
      font-size: var(--size-font-small);
      font-weight: 500;
    }
    .status-pending { color: var(--color-warning); }
    .status-active { color: var(--color-success); }
    .status-completed { color: var(--color-info); }
    .status-cancelled { color: var(--color-error); }
    .royale-info {
        font-size: var(--size-font-small);
        color: var(--color-text-light);
    }
    .royale-id {
        font-size: var(--size-font-extra-small);
        color: var(--color-text-faded);
        word-break: break-all;
    }
    .royale-card button.view-button {
      margin-top: var(--size-spacing-small);
      width: 100%;
      background-color: var(--color-secondary);
      border-color: var(--color-secondary);
      color: var(--color-on-secondary);
      font-size: var(--size-font-small);
      padding: var(--size-spacing-small);
      border-radius: var(--size-radius-small);
    }
    .royale-card button.view-button:hover {
      filter: brightness(1.1);
    }

    .movie-card {
        background-color: var(--color-surface-2);
        border-radius: var(--size-radius-small);
        overflow: hidden;
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-depth-1);
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .movie-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-depth-2);
    }
    .movie-card-img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-bottom: 1px solid var(--color-border);
    }
    .movie-card-content {
        padding: var(--size-spacing-medium);
        display: flex;
        flex-direction: column;
        gap: var(--size-spacing-extra-small);
    }
    .movie-card-content h3 {
        font-size: var(--size-font-medium);
        font-weight: 600;
        color: var(--color-primary);
        word-break: break-word;
    }
    .movie-release-year, .movie-genres {
        font-size: var(--size-font-small);
        color: var(--color-text-light);
    }
    .movie-id {
        font-size: var(--size-font-extra-small);
        color: var(--color-text-faded);
        word-break: break-all;
    }

    .no-data-message {
      grid-column: 1 / -1;
      color: var(--color-text-light);
      font-style: italic;
      padding: var(--size-spacing-medium);
      background-color: var(--color-surface-2);
      border-radius: var(--size-radius-small);
      border: 1px dashed var(--color-border);
      text-align: center;
    }

    .edit-form, .create-royale-form {
      grid-column: 1 / -1;
      background-color: var(--color-surface-2);
      padding: var(--size-spacing-large);
      border-radius: var(--size-radius-medium);
      box-shadow: var(--shadow-depth-1);
      border: 1px solid var(--color-border);
    }

    dl {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: var(--size-spacing-small) var(--size-spacing-medium);
      margin-bottom: var(--size-spacing-medium);
    }
    dt {
      grid-column: 1 / span 1;
      color: var(--color-secondary);
      font-family: var(--font-family-display);
      font-weight: 600;
      align-self: center;
    }
    dd {
      grid-column: 2 / -1;
    }
    .form-input {
     margin: 0;
     font: inherit;
     padding: var(--size-spacing-small);
     border: 1px solid var(--color-border);
     border-radius: var(--size-radius-small);
     width: 100%;
     box-sizing: border-box;
     background-color: var(--color-surface-3);
     color: var(--color-text);
    }
    .form-input:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-fade);
    }
    .form-actions {
      display: flex;
      gap: var(--size-spacing-small);
      margin-top: var(--size-spacing-medium);
    }
    .form-actions button {
        margin-bottom: 0;
    }

    .message-box {
      position: fixed;
      top: var(--size-spacing-large);
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--color-accent);
      color: var(--color-on-accent);
      padding: var(--size-spacing-medium) var(--size-spacing-large);
      border-radius: var(--size-radius-medium);
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      font-weight: 500;
      animation: fadeInOut 3.5s forwards;
    }
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        10% { opacity: 1; transform: translateX(-50%) translateY(0); }
        90% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }

    @media (max-width: 768px) {
        .profile-header, .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--size-spacing-small);
        }
        .profile-header button, .section-header button {
            width: 100%;
            justify-content: center;
        }
        .royales-grid, .movies-grid {
            grid-template-columns: 1fr;
        }
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
        {
          userid: newValue,
          onSuccess: () => console.log("Profile data loaded successfully via dispatch"),
          onFailure: (err) => {
            console.error("Failed to load profile via dispatch:", err);
            this.showMessage("Failed to load profile. Please try again.");
          }
        }
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
          if (this.userid) {
            this.dispatchMessage(["profile/select", { userid: this.userid }]);
          }
        },
        onFailure: (err) => {
          console.error("Error saving profile:", err);
          this.showMessage("Failed to save profile. See console for details.");
        }
      }]);
    } else {
      this.showMessage("User ID is missing, cannot save profile.");
    }
  }

  handleNewMovieRoyaleSubmit(event: Form.SubmitEvent<{ title: string }>) {
    const { title } = event.detail;
    if (!title || title.trim() === "") {
      this.showMessage("Movie Royale title is required!");
      return;
    }

    this.dispatchMessage(["movieRoyales/create", {
      title: title.trim(),
      creatorId: this.userid,
      onSuccess: (newRoyale: MovieRoyale) => {
        console.log("New Movie Royale created:", newRoyale);
        this.showMessage(`Movie Royale "${newRoyale.title}" created successfully!`);
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