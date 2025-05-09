// src/destination.ts
import { html, css, LitElement } from "lit";


export class MovieElement extends LitElement {
    static properties = {
        title: { type: String },
        img: { type: String },
        linkUrl: { type: String }
    };
  img: string;
  linkUrl: string;
    
    constructor() {
        super();
        this.title = 'Default Title';
        this.img = 'placeholder.jpg'; // Replace with a default image URL
        this.linkUrl = '#';
    }

  override render() {
    return html`
      <div class="card">
        <a href="${this.linkUrl}">
          <img src="${this.img}" alt="${this.title} Poster" class="poster">
          <div class="title">${this.title}</div>
        </a>
      </div>
      `;
  }
  static styles = css`
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 5px;
      width: 200px;
    }

    .poster {
      max-width: 100%;
      height: auto;
      border-radius: 3px;
      margin-bottom: 8px;
    }

    .title {
      font-size: 1.2em;
      font-weight: bold;
      text-align: center;
      text-decoration: none; 
      color: inherit;
      }
  `;
}