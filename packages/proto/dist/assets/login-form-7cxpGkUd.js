import{i as u,x as d,a as l,n as p}from"./property-BEtx6N0r.js";import{a as f,r as m}from"./reset.css-CnD5YrwS.js";var b=Object.defineProperty,i=(h,r,t,o)=>{for(var e=void 0,s=h.length-1,c;s>=0;s--)(c=h[s])&&(e=c(r,t,e)||e);return e&&b(r,t,e),e};const n=class n extends u{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return d`
      <form
        @change=${r=>this.handleChange(r)}
        @submit=${r=>this.handleSubmit(r)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(r){const t=r.target,o=t==null?void 0:t.name,e=t==null?void 0:t.value,s=this.formData;switch(o){case"username":this.formData={...s,username:e};break;case"password":this.formData={...s,password:e};break}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:o}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};n.styles=[f.styles,l`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let a=n;i([m()],a.prototype,"formData");i([p()],a.prototype,"api");i([p()],a.prototype,"redirect");i([m()],a.prototype,"error");export{a as L};
