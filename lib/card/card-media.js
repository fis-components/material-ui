'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var CardMedia = _react2['default'].createClass({
  displayName: 'CardMedia',

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
  },

  propTypes: {
    actAsExpander: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.node,
    expandable: _react2['default'].PropTypes.bool,
    mediaStyle: _react2['default'].PropTypes.object,
    overlay: _react2['default'].PropTypes.node,
    overlayContainerStyle: _react2['default'].PropTypes.object,
    overlayContentStyle: _react2['default'].PropTypes.object,
    overlayStyle: _react2['default'].PropTypes.object,
    style: _react2['default'].PropTypes.object
  },

  getStyles: function getStyles() {
    return {
      root: {
        position: 'relative'
      },
      overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      },
      overlay: {
        height: '100%',
        position: 'relative'
      },
      overlayContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        background: _styles2['default'].Colors.lightBlack
      },
      media: {},
      mediaChild: {
        verticalAlign: 'top',
        maxWidth: '100%',
        minWidth: '100%',
        width: '100%'
      }
    };
  },

  render: function render() {
    var _this = this;

    var styles = this.getStyles();
    var rootStyle = this.prepareStyles(styles.root, this.props.style);
    var mediaStyle = this.prepareStyles(styles.media, this.props.mediaStyle);
    var overlayContainerStyle = this.prepareStyles(styles.overlayContainer, this.props.overlayContainerStyle);
    var overlayContentStyle = this.prepareStyles(styles.overlayContent, this.props.overlayContentStyle);
    var overlayStyle = this.prepareStyles(styles.overlay, this.props.overlayStyle);

    var children = _react2['default'].Children.map(this.props.children, function (child) {
      return _react2['default'].cloneElement(child, { style: _this.prepareStyles(styles.mediaChild, child.props.style) });
    });

    var overlayChildren = _react2['default'].Children.map(this.props.overlay, function (child) {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return _react2['default'].cloneElement(child, {
          titleColor: _styles2['default'].Colors.darkWhite,
          subtitleColor: _styles2['default'].Colors.lightWhite
        });
      } else if (child.type.displayName === 'CardText') {
        return _react2['default'].cloneElement(child, {
          color: _styles2['default'].Colors.darkWhite
        });
      } else {
        return child;
      }
    });

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { style: rootStyle }),
      _react2['default'].createElement(
        'div',
        { style: mediaStyle },
        children
      ),
      this.props.overlay ? _react2['default'].createElement(
        'div',
        { style: overlayContainerStyle },
        _react2['default'].createElement(
          'div',
          { style: overlayStyle },
          _react2['default'].createElement(
            'div',
            { style: overlayContentStyle },
            overlayChildren
          )
        )
      ) : ''
    );
  }
});

exports['default'] = CardMedia;
module.exports = exports['default'];