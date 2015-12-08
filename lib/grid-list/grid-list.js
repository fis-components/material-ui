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

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var GridList = _react2['default'].createClass({
  displayName: 'GridList',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    cellHeight: _react2['default'].PropTypes.number,
    children: _react2['default'].PropTypes.node,
    cols: _react2['default'].PropTypes.number,
    padding: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object
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

  getDefaultProps: function getDefaultProps() {
    return {
      cols: 2,
      padding: 4,
      cellHeight: 180
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

  getStyles: function getStyles() {
    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: -this.props.padding / 2
      },
      item: {
        boxSizing: 'border-box',
        padding: this.props.padding / 2
      }
    };
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var cols = _props.cols;
    var padding = _props.padding;
    var cellHeight = _props.cellHeight;
    var children = _props.children;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['cols', 'padding', 'cellHeight', 'children', 'style']);

    var styles = this.getStyles();

    var mergedRootStyles = this.mergeStyles(styles.root, style);

    var wrappedChildren = _react2['default'].Children.map(children, function (currentChild) {
      var childCols = currentChild.props.cols || 1;
      var childRows = currentChild.props.rows || 1;
      var itemStyle = _this.mergeStyles(styles.item, {
        width: 100 / cols * childCols + '%',
        height: cellHeight * childRows + padding
      });

      return _react2['default'].createElement(
        'div',
        { style: _this.prepareStyles(itemStyle) },
        currentChild
      );
    });

    return _react2['default'].createElement(
      'div',
      _extends({ style: this.prepareStyles(mergedRootStyles) }, other),
      wrappedChildren
    );
  }
});

exports['default'] = GridList;
module.exports = exports['default'];