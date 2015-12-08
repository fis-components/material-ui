'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _enhancedButton = require('../enhanced-button');

var _enhancedButton2 = _interopRequireDefault(_enhancedButton);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var ClockButton = _react2['default'].createClass({
  displayName: 'ClockButton',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    onTouchTap: _react2['default'].PropTypes.func,
    position: _react2['default'].PropTypes.oneOf(['left', 'right']),
    selected: _react2['default'].PropTypes.bool
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
  },

  getDefaultProps: function getDefaultProps() {
    return {
      position: 'left'
    };
  },

  _handleTouchTap: function _handleTouchTap() {
    this.setState({
      selected: true
    });
    this.props.onTouchTap();
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.timePicker;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['className']);

    var styles = {
      root: {
        position: 'absolute',
        bottom: 65,
        pointerEvents: 'auto',
        height: 50,
        width: 50,
        borderRadius: '100%'
      },

      label: {
        position: 'absolute',
        top: 17,
        left: 14
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: 0,
        left: 0,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: _stylesTransitions2['default'].easeOut(),
        backgroundColor: this.getTheme().accentColor
      }
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if (this.props.position === 'right') {
      styles.root.right = 5;
    } else {
      styles.root.left = 5;
    }

    return _react2['default'].createElement(
      _enhancedButton2['default'],
      _extends({}, other, {
        style: this.mergeStyles(styles.root),
        disableFocusRipple: true,
        disableTouchRipple: true,
        onTouchTap: this._handleTouchTap }),
      _react2['default'].createElement('span', { style: this.prepareStyles(styles.select) }),
      _react2['default'].createElement(
        'span',
        { style: this.prepareStyles(styles.label) },
        this.props.children
      )
    );
  }
});

exports['default'] = ClockButton;
module.exports = exports['default'];