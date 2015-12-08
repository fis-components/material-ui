'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _stylesColors = require('./styles/colors');

var _stylesColors2 = _interopRequireDefault(_stylesColors);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Overlay = _react2['default'].createClass({
  displayName: 'Overlay',

  _originalBodyOverflow: '',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
    if (this.props.show !== nextProps.show) {
      this._applyAutoLockScrolling(nextProps);
    }
  },

  propTypes: {
    autoLockScrolling: _react2['default'].PropTypes.bool,
    show: _react2['default'].PropTypes.bool.isRequired,
    style: _react2['default'].PropTypes.object,
    transitionEnabled: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true,
      style: {}
    };
  },

  componentDidMount: function componentDidMount() {
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.overflow;
    if (this.props.show) {
      this._applyAutoLockScrolling(this.props);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._allowScrolling();
  },

  setOpacity: function setOpacity(opacity) {
    var overlay = _reactDom2['default'].findDOMNode(this);
    overlay.style.opacity = opacity;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        zIndex: 9,
        top: 0,
        left: '-100%',
        opacity: 0,
        backgroundColor: _stylesColors2['default'].lightBlack,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

        // Two ways to promote overlay to its own render layer
        willChange: 'opacity',
        transform: 'translateZ(0)',

        transition: this.props.transitionEnabled && _stylesTransitions2['default'].easeOut('0ms', 'left', '400ms') + ',' + _stylesTransitions2['default'].easeOut('400ms', 'opacity')
      },
      rootWhenShown: {
        left: '0',
        opacity: 1,
        transition: this.props.transitionEnabled && _stylesTransitions2['default'].easeOut('0ms', 'left') + ',' + _stylesTransitions2['default'].easeOut('400ms', 'opacity')
      }
    };
    return styles;
  },

  render: function render() {
    var _props = this.props;
    var show = _props.show;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['show', 'style']);

    var styles = this.prepareStyles(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown);

    return _react2['default'].createElement('div', _extends({}, other, { style: styles }));
  },

  _applyAutoLockScrolling: function _applyAutoLockScrolling(props) {
    if (props.autoLockScrolling) {
      if (props.show) {
        this._preventScrolling();
      } else {
        this._allowScrolling();
      }
    }
  },

  _preventScrolling: function _preventScrolling() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },

  _allowScrolling: function _allowScrolling() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = this._originalBodyOverflow || '';
  }

});

exports['default'] = Overlay;
module.exports = exports['default'];