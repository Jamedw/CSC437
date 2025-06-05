import{i as p,O as y,d as b,a as x,e as v,x as o,r as k,b as m,c as f,n as c,h as $,f as O,_ as S,s as _}from"./state-QUZgR6IG.js";var z=Object.defineProperty,w=(r,t,e,s)=>{for(var i=void 0,d=r.length-1,h;d>=0;d--)(h=r[d])&&(i=h(t,e,i)||i);return i&&z(t,e,i),i};const u=class u extends p{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new y(this,"blazing:auth")}render(){return o`
      <header>
        <p1 class="title">
        Movie Royale
        </p1>
        <nav>
          <mu-dropdown>
            <a slot="actuator" style="cursor:pointer;">
                <h3>
                  Hello, ${this.userid||"Guest"}
                </h3>
              <svg class="icon">
                <use href="./icons/movies.svg#movie-icon1" />
              </svg>
            </a>  
            <div>
                <label class="dark-mode-switch" 
                  @change=${t=>{var e;return v.relay(t,"dark-mode",{checked:(e=t.target)==null?void 0:e.checked})}}
                >            
              <input type="checkbox" /> Dark mode
              </label>
                ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
            </div>
          </mu-dropdown>
        </nav>
      </header>`}renderSignOutButton(){return o`
      <button
        @click=${t=>{v.relay(t,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return o`
        <a href="/login.html">
          Sign In…
        </a>
      `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:e}=t;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function t(e,s){e==null||e.classList.toggle("dark-mode",s)}document.body.addEventListener("dark-mode",e=>t(e.currentTarget,e.detail.checked))}};u.uses=b({"mu-dropdown":x.Element}),u.styles=[k.styles,m`
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
        
      `];let n=u;w([f()],n.prototype,"loggedIn");w([f()],n.prototype,"userid");class C extends p{render(){return o`
    `}}var I=Object.defineProperty,l=(r,t,e,s)=>{for(var i=void 0,d=r.length-1,h;d>=0;d--)(h=r[d])&&(i=h(t,e,i)||i);return i&&I(t,e,i),i};const g=class g extends p{constructor(){super(...arguments),this.src="",this.imgSrc="",this.genres=[],this.title="",this.description="",this.cast=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var t,e;return o`
        <h1 class="page_description">
            ${this.title}
        </h1>
        <dl class="description">
            <dt>Genres:</dt>
            ${(t=this.genres)==null?void 0:t.map(s=>o`
                    <dd>
                        ${s}
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
                    ${(e=this.genres)==null?void 0:e.map(s=>o`
                            <li>
                                ${s}
                            </li>
                            `)}
                </ul>
            </dd>
        </dl>
        `}hydrate(t){fetch(t).then(e=>e.json()).then(e=>{if(e){const s=e;this.title=s.title,this.imgSrc=s.imgSrc,this.genres=s.genres,this.cast=s.cast,this.description=s.description}})}};g.styles=[m`
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
      `];let a=g;l([c()],a.prototype,"src");l([c({attribute:"img-src"})],a.prototype,"imgSrc");l([c()],a.prototype,"genres");l([c()],a.prototype,"title");l([c()],a.prototype,"description");l([c()],a.prototype,"cast");const P=[{path:"/app/tour/:id",view:r=>o`
        <tour-view tour-id=${r.id}></tour-view>
      `},{auth:"protected",path:"/app",view:()=>o`<home-view></home-view>`},{path:"/",redirect:"/app"},{path:"/app/test",view:r=>o`
      <test-view param=${r}></test-view>
      `}];class A extends p{render(){return o`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),n.initializeOnce()}}b({"mu-auth":O.Provider,"mu-history":$.Provider,"mu-store":class extends _.Provider{},"mu-switch":class extends S.Element{constructor(){super(P,"blazing:history","blazing:auth")}},"blazing-app":A,"blazing-header":n,"home-view":C,"test-view":a});n.initializeOnce();
