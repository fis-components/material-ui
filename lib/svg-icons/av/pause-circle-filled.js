'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _svgIcon = require('../../svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

var AvPauseCircleFilled = _react2['default'].createClass({
  displayName: 'AvPauseCircleFilled',

  mixins: [_reactAddonsPureRenderMixin2['default']],

  render: function render() {
    return _react2['default'].createElement(
      _svgIcon2['default'],
      this.props,
      _react2['default'].createElement('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' })
    );
  }

});

exports['default'] = AvPauseCircleFilled;
module.exports = exports['default'];