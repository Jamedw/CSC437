import { html, css, LitElement, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { define } from "@calpoly/mustang";import './poster';
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
  @property()
  src?: string;

  @state()
  movies: Array<Movie> = [];
  
  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  hydrate(src: string) {
    fetch(src)
    .then(res => res.json())
    .then((json: object) => {
      if(json) {
        this.movies = json as Movie[];
      }
    })
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
}
