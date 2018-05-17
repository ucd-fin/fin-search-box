import {PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./fin-search-box.html"

export class FinSearchBox extends PolymerElement {

  static get properties() {
    return {
      placeholder : {
        type : String,
        value : ''
      },
      browse : {
        type : Object,
        observer : '_onBrowseOptionsChange',
        value : () => {}
      }
    }
  }

  static get template() {
    let tag = document.createElement('template');
    tag.innerHTML = template;
    return tag;
  }

  get browseValue() {
    return this._browseValue || 'Browse';
  }

  set browseValue(value) {
    this._browseValue = value;
    this.$.select.value = value;
  }

  get value() {
    return this.$.input.value;
  }

  set value(value) {
    this.$.input.value = value;
  }

  _fireSearch() {
    this.dispatchEvent(
      new CustomEvent(
        'search', 
        {
          detail: this.$.input.value,
          bubbles: true, 
          composed: true
        }
      )
    );
  }

  _fireBrowse() {
    this.dispatchEvent(
      new CustomEvent(
        'browse', 
        {
          detail: this.$.select.value,
          bubbles: true, 
          composed: true
        }
      )
    );
  }

  _onKeyUp(e) {
    if( e.which !== 13 ) return;
    this._fireSearch();
  }

  _onBrowseOptionsChange() {
    let options = [`<option>Browse</option>`];
    for( let key in this.browse ) {
      options.push(`<option value="${key}">${this.browse[key]}</option>`)
    };
    this.$.select.innerHTML = options.join('');
    this.$.select.value = this.browseValue;
  }

}
customElements.define('fin-search-box', FinSearchBox);