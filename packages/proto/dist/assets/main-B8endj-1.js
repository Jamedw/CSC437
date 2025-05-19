import{n as c,i as h,x as s,a as p,d as m}from"./property-6n6DIx1f.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function u(r){return c({...r,state:!0,attribute:!1})}const o=class o extends h{constructor(){super(),this.title="Default Title",this.img="placeholder.jpg",this.linkUrl="#"}render(){return s`
      <div class="card">
        <a href="${this.linkUrl}">
          <img src="${this.img}" alt="${this.title} Poster" class="poster">
          <div class="title">${this.title}</div>
        </a>
      </div>
      `}};o.properties={title:{type:String},img:{type:String},linkUrl:{type:String}},o.styles=p`
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
      color: var(--color-link);
      }
  `;let a=o;var v=Object.defineProperty,f=(r,e,t,g)=>{for(var i=void 0,l=r.length-1,d;l>=0;l--)(d=r[l])&&(i=d(e,t,i)||i);return i&&v(e,t,i),i};m({"movie-element":a});class n extends h{constructor(){super(...arguments),this.movies=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}hydrate(e){fetch(e).then(t=>t.json()).then(t=>{t&&(this.movies=t)})}renderMovie(e){return s`
      <movie-element
        title="${e.title}"
        img="${e.img}"
        linkUrl="${e.link}"
      ></movie-element>
    `}render(){return s`
        <ol class="movieList">
        ${this.movies.map(e=>this.renderMovie(e)).map(e=>s`<li>${e}</li>`)}
        </ol>
    `}static get styles(){return p`
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


    `}}f([c()],n.prototype,"src");f([u()],n.prototype,"movies");m({"movie-list":n});
