import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import {
  define,
  Auth,
  Observer
} from "@calpoly/mustang";
import { MovieElement } from "./poster"; 

interface Movie {
  title: string;
  link: string;
  img: string;
}


define({
  "movie-element": MovieElement
  });

export class MovieList extends LitElement {

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  @property()
  src?: string;

  @state()
  movies: Array<Movie> = [];
  


  hydrate(src: string) {
    fetch(src)
    .then(res => res.json())
    .then((json: object) => {
      if (json) {
        let data = json as { titles: string[] };
        const posterPromises: Promise<Movie>[] = data.titles.map(async (movie_title) => {
          const response = await fetch(`poster/${movie_title}`, { headers: this.authorization });
          const movieData = await response.json() as Movie;
          return movieData;
        });

        Promise.all(posterPromises)
          .then(movies => {
            this.movies = movies;
            console.log("Movies hydrated:", this.movies);
          })
          .catch(error => {
            console.error("Error fetching poster data:", error);
          });
      }
    })
    .catch(error => {
      console.error("Error fetching or parsing movie title data:", error);
    });
  }


  renderMovie(movie: Movie) {
    return html`
      <movie-element
        title="${movie.title}"
        img="${movie.img}"
        linkUrl="${movie.link}"
      ></movie-element>
    `;
  }

  render() {
    console.log(this.movies)
    return html`
        <ol class="movieList">
        ${this.movies.map(movie => this.renderMovie(movie))
            .map((m) => html`<li>${m}</li>`)}
        </ol>
    `;
  }

  static get styles() {
    return css`
    .movieList {
        display: flex; /* etc., as before */
        flex-wrap: wrap;

        list-style: none;
      & > * {
        width: fit-content;
        flex-grow: 1;
        flex-basis: 0%;
      @media screen and (max-width: 30rem) {
          /* override for mobile: */
          flex-basis: auto;
        }
      }
      }
      a {
        color: var(--color-link);
      }
      ol {
      background-color: var(--color-accent);
      box-shadow: var(--box-shadow);
      line-height: var(--line-height);
      border-radius: var(--border-radius);
      }
    `;
  }
  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  _user?: Auth.User;

  override connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.src) this.hydrate(this.src);
    });
  }

  get authorization(): { Authorization?: string } {
    if (this._user && this._user.authenticated)
      return {
        Authorization:
          `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    else return {};
  }

}
