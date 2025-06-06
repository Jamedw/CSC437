import{a as u,i as y,O as C,d as $,b as I,e as M,x as a,r as R,c as z,f as v,n as m,V as E,g as O,h as T,_ as j,s as _}from"./state-CGSWgFgd.js";function D(t,o,e){switch(t[0]){case"profile/save":const r=t[1];U(r,e).then(s=>o(n=>({...n,profile:s}))).then(()=>{r.onSuccess&&r.onSuccess()}).catch(s=>{r.onFailure&&r.onFailure(s)});break;case"profile/select":x(t[1],e).then(s=>o(n=>({...n,profile:s})));break;case"user/select":x(t[1],e).then(s=>o(n=>({...n,user:s})));break;case"profile/addFavoriteMovie":N(t[1],e).then(s=>{s?(o(n=>({...n,profile:s})),console.log("Favorite movie added successfully:",s)):console.error("Failed to add favorite movie.")}).catch(s=>console.error("Error adding favorite movie:",s));break;case"profile/removeFavoriteMovie":Y(t[1],e).then(s=>{s?(o(n=>({...n,profile:s})),console.log("Favorite movie removed successfully:",s)):console.error("Failed to remove favorite movie.")}).catch(s=>console.error("Error removing favorite movie:",s));break;case"profile/addFriend":A(t[1],e).then(s=>{s?(o(n=>({...n,profile:s})),console.log("Friend added successfully:",s)):console.error("Failed to add friend.")}).catch(s=>console.error("Error adding friend:",s));break;case"profile/removeFriend":L(t[1],e).then(s=>{s?(o(n=>({...n,profile:s})),console.log("Friend removed successfully:",s)):console.error("Failed to remove friend.")}).catch(s=>console.error("Error removing friend:",s));break;case"movieRoyales/create":const i=t[1];P(i,e).then(s=>{var n;console.log("Movie Royale created successfully:",s),i.creatorId&&x({userid:i.creatorId},e).then(w=>{o(S=>({...S,profile:w})),console.log("Profile reloaded after new Movie Royale.")}).catch(w=>console.error("Failed to reload profile after Movie Royale creation:",w)),(n=i.onSuccess)==null||n.call(i,s)}).catch(s=>{var n;console.error("Error creating Movie Royale:",s),(n=i.onFailure)==null||n.call(i,s)});break;case"movieRoyales/join":console.log("Handling movieRoyales/join:",t[1]);break;case"movieRoyales/startRound":console.log("Handling movieRoyales/startRound:",t[1]);break;case"movieRoyales/submitVote":console.log("Handling movieRoyales/submitVote:",t[1]);break;case"movies/search":console.log("Handling movies/search:",t[1]);break;default:const l=t[0];throw new Error(`Unhandled message "${l}"`)}}async function P(t,o){const{title:e,creatorId:r}=t,i=await fetch("/api/movieRoyales/",{method:"POST",headers:{...u.headers(o),"Content-Type":"application/json"},body:JSON.stringify({title:e,creatorId:r})});if(!i.ok){const l=await i.text();throw new Error(`Failed to create Movie Royale: ${i.status} ${i.statusText} - ${l}`)}return i.json()}function x(t,o){return fetch(`/api/users/${t.userid}`,{headers:u.headers(o)}).then(async e=>{if(e.status===200)return e.json();if(e.status===404){console.warn(`Profile for user ${t.userid} not found.`);return}const r=await e.text();throw new Error(`Failed to load profile: ${e.status} ${e.statusText} - ${r}`)})}async function N(t,o){const e=await fetch(`/api/users/${t.userId}/favorite-movies`,{method:"POST",headers:{...u.headers(o),"Content-Type":"application/json"},body:JSON.stringify({movieId:t.movieId})});if(!e.ok){const r=await e.text();throw new Error(`Failed to add favorite movie: ${e.status} ${e.statusText} - ${r}`)}return e.json()}async function Y(t,o){const e=await fetch(`/api/users/${t.userId}/favorite-movies/${t.movieId}`,{method:"DELETE",headers:u.headers(o)});if(!e.ok){const r=await e.text();throw new Error(`Failed to remove favorite movie: ${e.status} ${e.statusText} - ${r}`)}return e.json()}async function A(t,o){const e=await fetch(`/api/users/${t.userId}/friends`,{method:"POST",headers:{...u.headers(o),"Content-Type":"application/json"},body:JSON.stringify({friendUsername:t.friendId})});if(!e.ok){const r=await e.text();throw new Error(`Failed to add friend: ${e.status} ${e.statusText} - ${r}`)}return e.json()}async function L(t,o){const e=await fetch(`/api/users/${t.userId}/friends/${t.friendId}`,{method:"DELETE",headers:u.headers(o)});if(!e.ok){const r=await e.text();throw new Error(`Failed to remove friend: ${e.status} ${e.statusText} - ${r}`)}return e.json()}async function U(t,o){const e=await fetch(`/api/users/${t.userid}`,{method:"PUT",headers:{...u.headers(o),"Content-Type":"application/json"},body:JSON.stringify(t.profile)});if(e.status===200)return e.json();if(e.status===404){console.warn(`Profile for user ${t.userid} not found for update.`);return}else{const r=await e.text();throw new Error(`Failed to save profile: ${e.status} ${e.statusText} - ${r}`)}}const B={};var H=Object.defineProperty,F=(t,o,e,r)=>{for(var i=void 0,l=t.length-1,s;l>=0;l--)(s=t[l])&&(i=s(o,e,i)||i);return i&&H(o,e,i),i};const g=class g extends y{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new C(this,"blazing:auth")}render(){return a`
      <header>
        <h1 class="title">Movie Royale</h1>

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
            <menu>
                <label class="dark-mode-switch" 
                  @change=${o=>{var e;return M.relay(o,"dark-mode",{checked:(e=o.target)==null?void 0:e.checked})}}
                >            
              <input type="checkbox" /> Dark mode
              </label>
                ${this.loggedIn&&this.userid?a`
                    <a href="/app/user/${this.userid}" class="dropdown-link">
                        My Profile
                    </a>
                `:""}
              </label>
                ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
            </menu>
          </mu-dropdown>
        </nav>
      </header>`}renderSignOutButton(){return a`
      <button
        @click=${o=>{M.relay(o,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return a`
        <a href="/login.html">
          Sign In…
        </a>
      `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(o=>{const{user:e}=o;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}static initializeOnce(){function o(e,r){e==null||e.classList.toggle("dark-mode",r)}document.body.addEventListener("dark-mode",e=>o(e.currentTarget,e.detail.checked))}};g.uses=$({"mu-dropdown":I.Element}),g.styles=[R.styles,z`
          header {
              display: flex;
              align-items: center;
              justify-content: space-between; 
              font-family: "Alegreya", serif;
              background-color: var(--color-accent);
              color: var(--color-text);
              line-height: var(--line-height);
              border-radius: var(--border-radius);
              font-size: 2.5em;box-shadow: var(--box-shadow);
              padding: var(--size-spacing-medium);
          }

          header > .title {
              flex: 4;
              text-align: center;
          }

          header > nav { 
              flex: 1; 
              text-align: right;
          }
          nav {
            display: flex;
            flex-direction: column;
            flex-basis: max-content;
            align-items: end;
          }

          a[slot="actuator"] {
            color: var(--color-link-inverted);
            cursor: pointer;
          }
          #userid:empty::before {
            content: "traveler";
          }
          menu a {
            color: var(--color-link);
            cursor: pointer;
            text-decoration: underline;
          }
          nav.logged-out .when-signed-in,
          nav.logged-in .when-signed-out {
            display: none;
          }
        
      `];let h=g;F([v()],h.prototype,"loggedIn");F([v()],h.prototype,"userid");var X=Object.defineProperty,f=(t,o,e,r)=>{for(var i=void 0,l=t.length-1,s;l>=0;l--)(s=t[l])&&(i=s(o,e,i)||i);return i&&X(o,e,i),i};const k=class k extends y{constructor(){super(...arguments),this.src="",this.imgSrc="",this.genres=[],this.title="",this.description="",this.cast=[]}connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}render(){var o,e;return a`
        <h1 class="page_description">
            ${this.title}
        </h1>
        <dl class="description">
            <dt>Genres:</dt>
            ${(o=this.genres)==null?void 0:o.map(r=>a`
                    <dd>
                        ${r}
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
                    ${(e=this.genres)==null?void 0:e.map(r=>a`
                            <li>
                                ${r}
                            </li>
                            `)}
                </ul>
            </dd>
        </dl>
        `}hydrate(o){fetch(o).then(e=>e.json()).then(e=>{if(e){const r=e;this.title=r.title,this.imgSrc=r.imgSrc,this.genres=r.genres,this.cast=r.cast,this.description=r.description}})}};k.styles=[z`
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
      `];let c=k;f([m()],c.prototype,"src");f([m({attribute:"img-src"})],c.prototype,"imgSrc");f([m()],c.prototype,"genres");f([m()],c.prototype,"title");f([m()],c.prototype,"description");f([m()],c.prototype,"cast");var q=Object.defineProperty,J=Object.getOwnPropertyDescriptor,p=(t,o,e,r)=>{for(var i=r>1?void 0:r?J(o,e):o,l=t.length-1,s;l>=0;l--)(s=t[l])&&(i=(r?s(o,e,i):s(i))||i);return r&&i&&q(o,e,i),i};const b=class b extends E{constructor(){super("blazing:model"),this.userid="",this.mode="view",this.message=null}get user(){return this.model.profile}get movieRoyalesDetails(){var e;const o=new Map;return(e=this.user)!=null&&e.movieRoyales&&this.user.movieRoyales.forEach(r=>{r._id&&o.set(r._id,r)}),Array.from(o.values())}get favoriteMoviesDetails(){var e;const o=new Map;return(e=this.user)!=null&&e.favoriteMovies&&this.user.favoriteMovies.forEach(r=>{r._id&&o.set(r._id.toHexString(),r)}),Array.from(o.values())}render(){return a`
      ${this.message?a`<div class="message-box">${this.message}</div>`:""}
      ${this.renderContent()}
    `}renderContent(){switch(this.mode){case"edit":return this.renderEditor();case"create-movie-royale":return this.renderNewMovieRoyaleForm();default:return this.renderView()}}showMessage(o,e=3e3){this.message=o,setTimeout(()=>{this.message=null},e)}renderView(){const{name:o,_id:e}=this.user||{};return!this.user||!e?a`
        <section class="loading-state">
          <p>Loading user profile...</p>
        </section>
      `:a`
      <section>
        <div class="profile-header">
            <h1>${o||"User"} Profile</h1>
            <button @click=${()=>this.mode="edit"}>
                <img src="https://api.iconify.design/lucide/edit.svg?color=%23f8f8f8" alt="Edit Icon" class="icon-small">
                Edit Profile
            </button>
        </div>

        <div class="section-header">
            <h2>Your Movie Royales</h2>
            <button @click=${()=>this.mode="create-movie-royale"}>
                <img src="https://api.iconify.design/lucide/plus.svg?color=%231f2937" alt="Create Icon" class="icon-small">
                Create New Movie Royale
            </button>
        </div>
        ${this.movieRoyalesDetails.length>0?a`
            <div class="royales-grid">
              ${this.movieRoyalesDetails.map(r=>a`
                <div class="royale-card">
                  <h3>${r.title}</h3>
                  <p class="royale-status">Status: <span class="status-${r.status}">${r.status.charAt(0).toUpperCase()+r.status.slice(1)}</span></p>
                  <p class="royale-info">Participants: ${r.participants.length}</p>
                  <p class="royale-info">Current Round: ${r.currentRound} / ${r.numberOfRounds}</p>
                  <p class="royale-id">ID: ${r._id}</p>
                  <button class="view-button">View Royale</button>
                </div>
              `)}
            </div>
          `:a`<p class="no-data-message">You are not in any Movie Royales yet. Click "Create New Movie Royale" to start one!</p>`}

        <h2 class="section-header">Your Favorite Movies</h2>
        ${this.favoriteMoviesDetails.length>0?a`
            <div class="movies-grid">
              ${this.favoriteMoviesDetails.map(r=>{var i;return a`
                <div class="movie-card">
                  <img src=${r.imgSrc||`https://placehold.co/150x220/E0BBE4/957DAD?text=${r.title.split(" ").join("+")}`} alt=${r.title} class="movie-card-img">
                  <div class="movie-card-content">
                    <h3>${r.title}</h3>
                    <p class="movie-release-year">${r.releaseYear}</p>
                    <p class="movie-genres">${r.genres.join(", ")}</p>
                    <p class="movie-id">ID: ${(i=r._id)==null?void 0:i.toHexString()}</p>
                  </div>
                </div>
              `})}
            </div>
          `:a`<p class="no-data-message">You haven't added any favorite movies yet. Explore and find some!</p>`}
      </section>
    `}renderEditor(){const{name:o}=this.user||{},e={...this.user};return a`
      <mu-form
        .init=${e}
        @mu-form:submit=${this.handleProfileSubmit}
        class="edit-form"
      >
        <h1>Edit ${o||"User"} Profile</h1>
        <dl>
          <dt>Name</dt>
          <dd><input name="name" value=${o||""} class="form-input"></dd>
        </dl>
        <div class="form-actions">
          <button type="submit" class="save-button">Save Changes</button>
          <button type="button" @click=${()=>this.mode="view"} class="cancel-button">Cancel</button>
        </div>
      </mu-form>
    `}renderNewMovieRoyaleForm(){return a`
      <mu-form @mu-form:submit=${this.handleNewMovieRoyaleSubmit} class="create-royale-form">
        <h2>Create New Movie Royale</h2>
        <dl>
          <dt>Title</dt>
          <dd><input name="title" required class="form-input"></dd>
        </dl>
        <div class="form-actions">
          <button type="submit" class="create-button">Create</button>
          <button type="button" @click=${()=>this.mode="view"} class="cancel-button">Cancel</button>
        </div>
      </mu-form>
    `}attributeChangedCallback(o,e,r){super.attributeChangedCallback(o,e,r),o==="user-id"&&e!==r&&r&&this.dispatchMessage(["profile/select",{userid:r,onSuccess:()=>console.log("Profile data loaded successfully via dispatch"),onFailure:i=>{console.error("Failed to load profile via dispatch:",i),this.showMessage("Failed to load profile. Please try again.")}}])}handleProfileSubmit(o){const e={...this.user,...o.detail};this.userid?this.dispatchMessage(["profile/save",{userid:this.userid,profile:e,onSuccess:()=>{this.mode="view",this.showMessage("Profile saved successfully!"),this.userid&&this.dispatchMessage(["profile/select",{userid:this.userid}])},onFailure:r=>{console.error("Error saving profile:",r),this.showMessage("Failed to save profile. See console for details.")}}]):this.showMessage("User ID is missing, cannot save profile.")}handleNewMovieRoyaleSubmit(o){const{title:e}=o.detail;if(!e||e.trim()===""){this.showMessage("Movie Royale title is required!");return}this.dispatchMessage(["movieRoyales/create",{title:e.trim(),creatorId:this.userid,onSuccess:r=>{console.log("New Movie Royale created:",r),this.showMessage(`Movie Royale "${r.title}" created successfully!`),this.mode="view",this.userid&&this.dispatchMessage(["profile/select",{userid:this.userid}])},onFailure:r=>{console.error("Error creating Movie Royale:",r),this.showMessage("Failed to create Movie Royale. See console for details.")}}])}};b.uses=$({"mu-form":O.Element}),b.styles=[R.styles,z`
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
  `];let d=b;p([m({attribute:"user-id"})],d.prototype,"userid",2);p([v()],d.prototype,"user",1);p([v()],d.prototype,"movieRoyalesDetails",1);p([v()],d.prototype,"favoriteMoviesDetails",1);p([v()],d.prototype,"mode",2);p([v()],d.prototype,"message",2);class G extends y{render(){return a`
    `}}const K=[{auth:"protected",path:"/app/user/:id",view:t=>a`
    <profile-view user-id=${t.id}></profile-view>`},{path:"/",redirect:"/app/test"},{path:"/app/test",view:t=>a`
    <test-view param=${t}></test-view>
    `}];class Q extends y{render(){return a`<mu-switch></mu-switch>`}connectedCallback(){super.connectedCallback(),h.initializeOnce()}}$({"mu-auth":u.Provider,"mu-history":T.Provider,"mu-store":class extends _.Provider{constructor(){super(D,B,"blazing:auth")}},"mu-switch":class extends j.Element{constructor(){super(K,"blazing:history","blazing:auth")}},"blazing-app":Q,"ryl-header":h,"home-view":G,"profile-view":d,"test-view":c});h.initializeOnce();
