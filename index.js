'use strict';

module.exports = {
  name: 'ember-quill',
  options: {},
  isDevelopingAddon: function () {
    return true;
  },
  included(app) {
    // this._super.included(app);
    this._super.included.apply(this, arguments);
    app.import('node_modules/quill/dist/quill.snow.css');
    app.import('node_modules/quill/dist/quill.core.css');
    app.import('node_modules/quill/dist/quill.js');
  },
};
