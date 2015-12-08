'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _mixinsContextPure = require('./mixins/context-pure');

var _mixinsContextPure2 = _interopRequireDefault(_mixinsContextPure);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _utilsPropTypes = require('./utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _enhancedButton = require('./enhanced-button');

var _enhancedButton2 = _interopRequireDefault(_enhancedButton);

var _fontIcon = require('./font-icon');

var _fontIcon2 = _interopRequireDefault(_fontIcon);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _utilsChildren = require('./utils/children');

var _utilsChildren2 = _interopRequireDefault(_utilsChildren);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var IconButton = _react2['default'].createClass({
  displayName: 'IconButton',

  mixins: [_mixinsStylePropable2['default'], _mixinsContextPure2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      var spacing = muiTheme.rawTheme.spacing;
      var palette = muiTheme.rawTheme.palette;

      return {
        iconSize: spacing.iconSize,
        textColor: palette.textColor,
        disabledColor: palette.disabledColor
      };
    },

    getChildrenClasses: function getChildrenClasses() {
      return [_enhancedButton2['default'], _fontIcon2['default'], _tooltip2['default']];
    }
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

  propTypes: {
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    disabled: _react2['default'].PropTypes.bool,
    iconClassName: _react2['default'].PropTypes.string,
    iconStyle: _react2['default'].PropTypes.object,
    onBlur: _react2['default'].PropTypes.func,
    onFocus: _react2['default'].PropTypes.func,
    onKeyboardFocus: _react2['default'].PropTypes.func,
    onMouseEnter: _react2['default'].PropTypes.func,
    onMouseLeave: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object,
    tooltip: _react2['default'].PropTypes.node,
    tooltipPosition: _utilsPropTypes2['default'].cornersAndCenter,
    tooltipStyles: _react2['default'].PropTypes.object,
    touch: _react2['default'].PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      tooltipShown: false,
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
      iconStyle: {},
      tooltipPosition: 'bottom-center'
    };
  },

  getStyles: function getStyles() {
    var _constructor$getRelevantContextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var iconSize = _constructor$getRelevantContextKeys.iconSize;
    var textColor = _constructor$getRelevantContextKeys.textColor;
    var disabledColor = _constructor$getRelevantContextKeys.disabledColor;

    var styles = {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        transition: _stylesTransitions2['default'].easeOut(),
        padding: iconSize / 2,
        width: iconSize * 2,
        height: iconSize * 2,
        fontSize: 0
      },
      tooltip: {
        boxSizing: 'border-box'
      },
      icon: {
        color: textColor,
        fill: textColor
      },
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: disabledColor
      },
      disabled: {
        color: disabledColor,
        fill: disabledColor
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var iconClassName = _props.iconClassName;
    var tooltip = _props.tooltip;
    var touch = _props.touch;
    var iconStyle = _props.iconStyle;

    var other = _objectWithoutProperties(_props, ['disabled', 'iconClassName', 'tooltip', 'touch', 'iconStyle']);

    var fonticon = undefined;

    var styles = this.getStyles();
    var tooltipPosition = this.props.tooltipPosition.split('-');

    var tooltipElement = tooltip ? _react2['default'].createElement(_tooltip2['default'], {
      ref: 'tooltip',
      label: tooltip,
      show: this.state.tooltipShown,
      touch: touch,
      style: this.mergeStyles(styles.tooltip, this.props.tooltipStyles),
      verticalPosition: tooltipPosition[0],
      horizontalPosition: tooltipPosition[1] }) : null;

    if (iconClassName) {
      var iconHoverColor = iconStyle.iconHoverColor;

      var iconStyleFontIcon = _objectWithoutProperties(iconStyle, ['iconHoverColor']);

      fonticon = _react2['default'].createElement(
        _fontIcon2['default'],
        {
          className: iconClassName,
          hoverColor: disabled ? null : iconHoverColor,
          style: this.mergeStyles(styles.icon, disabled ? styles.disabled : {}, iconStyleFontIcon) },
        this.props.children
      );
    }

    var childrenStyle = disabled ? this.mergeStyles(iconStyle, styles.disabled) : iconStyle;

    return _react2['default'].createElement(
      _enhancedButton2['default'],
      _extends({}, other, {
        ref: 'button',
        centerRipple: true,
        disabled: disabled,
        style: this.mergeStyles(styles.root, this.props.style),
        onBlur: this._handleBlur,
        onFocus: this._handleFocus,
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onKeyboardFocus: this._handleKeyboardFocus }),
      tooltipElement,
      fonticon,
      _utilsChildren2['default'].extend(this.props.children, {
        style: childrenStyle
      })
    );
  },

  setKeyboardFocus: function setKeyboardFocus() {
    this.refs.button.setKeyboardFocus();
  },

  _showTooltip: function _showTooltip() {
    if (this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  },

  _hideTooltip: function _hideTooltip() {
    if (this.props.tooltip) this.setState({ tooltipShown: false });
  },

  _handleBlur: function _handleBlur(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function _handleFocus(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    this._showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(e);
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(e);
    }

    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused);
  }

});

exports['default'] = IconButton;
module.exports = exports['default'];