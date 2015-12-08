'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tableRowColumn = require('./table-row-column');

var _tableRowColumn2 = _interopRequireDefault(_tableRowColumn);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var TableFooter = _react2['default'].createClass({
  displayName: 'TableFooter',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    adjustForCheckbox: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
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
      adjustForCheckbox: true,
      style: {}
    };
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.tableFooter;
  },

  getStyles: function getStyles() {
    var styles = {
      cell: {
        borderTop: '1px solid ' + this.getTheme().borderColor,
        verticalAlign: 'bottom',
        padding: 20,
        textAlign: 'left',
        whiteSpace: 'nowrap'
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'style']);

    var classes = 'mui-table-footer';
    if (className) classes += ' ' + className;

    var footerRows = this._createRows();

    return _react2['default'].createElement(
      'tfoot',
      _extends({ className: classes, style: this.prepareStyles(style) }, other),
      footerRows
    );
  },

  _createRows: function _createRows() {
    var _this = this;

    var rowNumber = 0;
    return _react2['default'].Children.map(this.props.children, function (child) {
      return _this._createRow(child, rowNumber++);
    });
  },

  _createRow: function _createRow(child, rowNumber) {
    var styles = this.getStyles();
    var props = {
      className: 'mui-table-footer-row',
      displayBorder: false,
      key: 'f-' + rowNumber,
      rowNumber: rowNumber,
      style: this.mergeAndPrefix(styles.cell, child.props.style)
    };

    var children = [this._getCheckboxPlaceholder(props)];
    _react2['default'].Children.forEach(child.props.children, function (child) {
      children.push(child);
    });

    return _react2['default'].cloneElement(child, props, children);
  },

  _getCheckboxPlaceholder: function _getCheckboxPlaceholder(props) {
    if (!this.props.adjustForCheckbox) return null;

    var key = 'fpcb' + props.rowNumber;
    return _react2['default'].createElement(_tableRowColumn2['default'], { key: key, style: { width: 24 } });
  }

});

exports['default'] = TableFooter;
module.exports = exports['default'];