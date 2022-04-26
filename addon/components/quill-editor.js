import Quill from 'quill';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { htmlSafe } from '@ember/template';

import layout from '../templates/components/quill-editor';

export default Component.extend({
  layout,
  editor: null,

  textChange() {},

  selectionChange() {},

  options: computed(function () {
    return { theme: 'snow' };
  }),

  safeValue: computed('value', function () {
    return htmlSafe(this.value);
  }),

  fastboot: computed(function () {
    return getOwner(this).lookup('service:fastboot');
  }),

  didInsertElement() {
    this._super(...arguments);
    // Don't instantiate Quill if fastboot is detected
    if (this.get('fastboot.isFastBoot')) {
      return;
    }

    const editor = new Quill(this.element, this.options);

    editor.on('text-change', (delta, oldDelta, source) => {
      this.textChange(this.editor, delta, oldDelta, source);
    });

    editor.on('selection-change', (delta, oldDelta, source) => {
      this.selectionChange(this.editor, delta, oldDelta, source);
    });

    this.set('editor', editor);
  },
});
