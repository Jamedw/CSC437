import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class TestViewElement extends LitElement{
    @property()
    src?: string = "";

    @property({attribute: "img-src"})
    imgSrc?: string = "";

    @property()
    genres?: string[] = [] ;

    @property()
    title: string = "";

    @property()
    description?: string = "" ;

    @property()
    cast?: string[] = [] 

    override connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    override render() {
        return html`
        <h1 class="page_description">
            ${this.title}
        </h1>
        <dl class="description">
            <dt>Genres:</dt>
            ${this.genres?.map(
                (genre) => html`
                    <dd>
                        ${genre}
                    </dd>`
                )}
            <dt>Description:</dt>
            <dd>
                ${this.description}
            </dd>
        </dl>
        
        <dl>
            <dt>Cast:</dt>
            <dd>
                <ul class="movieList">
                    ${this.genres?.map(
                        (genre) => html`
                            <li>
                                ${genre}
                            </li>
                            `
                        )}
                </ul>
            </dd>
        </dl>
        `
    }

    static styles = [
        css`
            h1 {
                background-color: var(--color-accent);
                color: var(--color-text);
                line-height: var(--line-height);
                border-radius: var(--border-radius);
                box-shadow: var(--box-shadow);
            }
            dl {
                background-color: var(--color-accent);
                box-shadow: var(--box-shadow);
                line-height: var(--line-height);
                border-radius: var(--border-radius);
            }
            ul {
                background-color: var(--color-accent);
                box-shadow: var(--box-shadow);
                line-height: var(--line-height);
                border-radius: var(--border-radius);
            }
            li {
                padding: 10%;
                margin: 1%;
                border: 1px;
                border-style: solid;
                border-radius: 10%;
                border-color: black;
            }
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
      `];

    hydrate(src: string) {
        fetch(src)
        .then(res => res.json())
        .then((json: object) => {
          if(json) {
            const movie_properties = json as {
              title: string,
              genres: Array<string>,
              cast: Array<string>,
              description: string,
              imgSrc: string,
            }
            this.title = movie_properties.title
            this.imgSrc = movie_properties.imgSrc
            this.genres = movie_properties.genres
            this.cast = movie_properties.cast
            this.description = movie_properties.description
          }
        })
      }
}