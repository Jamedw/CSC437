import{i as p,x as c,a as b,n as o,d as g}from"./property-BEtx6N0r.js";var u=Object.defineProperty,d=(n,i,r,e)=>{for(var s=void 0,a=n.length-1,h;a>=0;a--)(h=n[a])&&(s=h(i,r,s)||s);return s&&u(i,r,s),s};const l=class l extends p{constructor(){super(...arguments),this.src="",this.imgSrc="",this.genres=[],this.title="",this.description="",this.cast=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var i,r;return c`
        <h1 class="page_description">
            ${this.title}
        </h1>
        <dl class="description">
            <dt>Genres:</dt>
            ${(i=this.genres)==null?void 0:i.map(e=>c`
                    <dd>
                        ${e}
                    </dd>`)}
            <dt>Description:</dt>
            <dd>
                ${this.description}
            </dd>
        </dl>
        
        <dl>
            <dt>Cast:</dt>
            <dd>
                <ul class="movieList">
                    ${(r=this.genres)==null?void 0:r.map(e=>c`
                            <li>
                                ${e}
                            </li>
                            `)}
                </ul>
            </dd>
        </dl>
        `}hydrate(i){fetch(i).then(r=>r.json()).then(r=>{if(r){const e=r;this.title=e.title,this.imgSrc=e.imgSrc,this.genres=e.genres,this.cast=e.cast,this.description=e.description}})}};l.styles=[b`
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
      `];let t=l;d([o()],t.prototype,"src");d([o({attribute:"img-src"})],t.prototype,"imgSrc");d([o()],t.prototype,"genres");d([o()],t.prototype,"title");d([o()],t.prototype,"description");d([o()],t.prototype,"cast");g({"movie-desription":t});
