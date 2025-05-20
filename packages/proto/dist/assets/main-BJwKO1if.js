import{i as v,x as s,a as m,d as f,O as y,n as k,b as w,e as b,c as $}from"./property-BEtx6N0r.js";import{r as l,a as O}from"./reset.css-CnD5YrwS.js";const h=class h extends v{constructor(){super(),this.title="Default Title",this.img="placeholder.jpg",this.linkUrl="#"}render(){return s`
      <div class="card">
        <a href="${this.linkUrl}">
          <img src="${this.img}" alt="${this.title} Poster" class="poster">
          <div class="title">${this.title}</div>
        </a>
      </div>
      `}};h.properties={title:{type:String},img:{type:String},linkUrl:{type:String}},h.styles=m`
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
  `;let p=h;var _=Object.defineProperty,g=(o,e,t,c)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(e,t,r)||r);return r&&_(e,t,r),r};f({"movie-element":p});class d extends v{constructor(){super(...arguments),this.loggedIn=!1,this.movies=[],this._authObserver=new y(this,"blazing:auth")}hydrate(e){fetch(e).then(t=>t.json()).then(t=>{if(t){const r=t.titles.map(async i=>await(await fetch(`poster/${i}`,{headers:this.authorization})).json());Promise.all(r).then(i=>{this.movies=i,console.log("Movies hydrated:",this.movies)}).catch(i=>{console.error("Error fetching poster data:",i)})}}).catch(t=>{console.error("Error fetching or parsing movie title data:",t)})}renderMovie(e){return s`
      <movie-element
        title="${e.title}"
        img="${e.img}"
        linkUrl="${e.link}"
      ></movie-element>
    `}render(){return console.log(this.movies),s`
        <ol class="movieList">
        ${this.movies.map(e=>this.renderMovie(e)).map(e=>s`<li>${e}</li>`)}
        </ol>
    `}static get styles(){return m`
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
    `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}}g([l()],d.prototype,"loggedIn");g([l()],d.prototype,"userid");g([k()],d.prototype,"src");g([l()],d.prototype,"movies");var I=Object.defineProperty,x=(o,e,t,c)=>{for(var r=void 0,i=o.length-1,a;i>=0;i--)(a=o[i])&&(r=a(e,t,r)||r);return r&&I(e,t,r),r};const u=class u extends v{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new y(this,"blazing:auth")}render(){return s`
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
                  @change=${e=>{var t;return b.relay(e,"dark-mode",{checked:(t=e.target)==null?void 0:t.checked})}}
                >            
              <input type="checkbox" /> Dark mode
              </label>
                ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
            </div>
          </mu-dropdown>
        </nav>
      </header>`}renderSignOutButton(){return s`
      <button
        @click=${e=>{b.relay(e,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return s`
        <a href="/login.html">
          Sign In…
        </a>
      `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:t}=e;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function e(t,c){t==null||t.classList.toggle("dark-mode",c)}document.body.addEventListener("dark-mode",t=>e(t.currentTarget,t.detail.checked))}};u.uses=f({"mu-dropdown":w.Element}),u.styles=[O.styles,m`
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
        
      `];let n=u;x([l()],n.prototype,"loggedIn");x([l()],n.prototype,"userid");f({"ryl-header":n,"movie-list":d,"mu-auth":$.Provider});n.initializeOnce();
