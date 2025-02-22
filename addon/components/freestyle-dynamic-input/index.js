import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  tagName: '',

  isCheckbox: equal('inputType', 'checkbox'),
  isTextarea: equal('inputType', 'textarea'),
  isSelect: equal('inputType', 'select'),
  isNumber: equal('inputType', 'number'),
  isRange: equal('inputType', 'range'),

  inputId: computed('propertyName', function () {
    return `${guidFor(this)}_${this.propertyName}`;
  }),

  @action
  toggleCheckbox() {
    let newValue = !this.value;
    this.changeValueTo(newValue);
    return false;
  },
  @action
  onChange(ev) {
    this.changeValueTo(ev.target.value);
  },
  @action
  sendChangedText(ev) {
    this.changeValueTo(ev.target.value);
  },
  @action
  onChangeWithNumericCoercion(ev) {
    let newValue = ev.target.value;
    let coercedValue = newValue === '' ? null : Number(newValue);
    this.changeValueTo(coercedValue);
  },
});
