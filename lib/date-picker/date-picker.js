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

var _mixinsWindowListenable = require('../mixins/window-listenable');

var _mixinsWindowListenable2 = _interopRequireDefault(_mixinsWindowListenable);

var _utilsDateTime = require('../utils/date-time');

var _utilsDateTime2 = _interopRequireDefault(_utilsDateTime);

var _datePickerDialog = require('./date-picker-dialog');

var _datePickerDialog2 = _interopRequireDefault(_datePickerDialog);

var _textField = require('../text-field');

var _textField2 = _interopRequireDefault(_textField);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var DatePicker = _react2['default'].createClass({
  displayName: 'DatePicker',

  mixins: [_mixinsStylePropable2['default'], _mixinsWindowListenable2['default']],

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

  propTypes: {
    DateTimeFormat: _react2['default'].PropTypes.func,
    autoOk: _react2['default'].PropTypes.bool,
    container: _react2['default'].PropTypes.oneOf(['dialog', 'inline']),
    defaultDate: _react2['default'].PropTypes.object,
    formatDate: _react2['default'].PropTypes.func,
    hideToolbarYearChange: _react2['default'].PropTypes.bool,
    locale: _react2['default'].PropTypes.string,
    maxDate: _react2['default'].PropTypes.object,
    minDate: _react2['default'].PropTypes.object,
    mode: _react2['default'].PropTypes.oneOf(['portrait', 'landscape']),
    onChange: _react2['default'].PropTypes.func,
    onDismiss: _react2['default'].PropTypes.func,
    onFocus: _react2['default'].PropTypes.func,
    onShow: _react2['default'].PropTypes.func,
    onTouchTap: _react2['default'].PropTypes.func,
    shouldDisableDate: _react2['default'].PropTypes.func,
    showYearSelector: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    textFieldStyle: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.any,
    valueLink: _react2['default'].PropTypes.object,
    wordings: _react2['default'].PropTypes.object
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      formatDate: _utilsDateTime2['default'].format,
      autoOk: false,
      showYearSelector: false,
      style: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      date: this._isControlled() ? this._getControlledDate() : this.props.defaultDate,
      dialogDate: new Date(),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this._isControlled()) {
      var newDate = this._getControlledDate(nextProps);
      if (!_utilsDateTime2['default'].isEqualDate(this.state.date, newDate)) {
        this.setState({
          date: newDate
        });
      }
    }
  },

  render: function render() {
    var _props = this.props;
    var container = _props.container;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;
    var wordings = _props.wordings;
    var autoOk = _props.autoOk;
    var defaultDate = _props.defaultDate;
    var formatDate = _props.formatDate;
    var maxDate = _props.maxDate;
    var minDate = _props.minDate;
    var mode = _props.mode;
    var onDismiss = _props.onDismiss;
    var onFocus = _props.onFocus;
    var onShow = _props.onShow;
    var onTouchTap = _props.onTouchTap;
    var showYearSelector = _props.showYearSelector;
    var style = _props.style;
    var textFieldStyle = _props.textFieldStyle;
    var valueLink = _props.valueLink;

    var other = _objectWithoutProperties(_props, ['container', 'DateTimeFormat', 'locale', 'wordings', 'autoOk', 'defaultDate', 'formatDate', 'maxDate', 'minDate', 'mode', 'onDismiss', 'onFocus', 'onShow', 'onTouchTap', 'showYearSelector', 'style', 'textFieldStyle', 'valueLink']);

    return _react2['default'].createElement(
      'div',
      { style: this.prepareStyles(style) },
      _react2['default'].createElement(_textField2['default'], _extends({}, other, {
        style: textFieldStyle,
        ref: 'input',
        value: this.state.date ? formatDate(this.state.date) : undefined,
        onFocus: this._handleInputFocus,
        onTouchTap: this._handleInputTouchTap })),
      _react2['default'].createElement(_datePickerDialog2['default'], {
        container: container,
        ref: 'dialogWindow',
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        wordings: wordings,
        mode: mode,
        initialDate: this.state.dialogDate,
        onAccept: this._handleDialogAccept,
        onShow: onShow,
        onDismiss: onDismiss,
        minDate: minDate,
        maxDate: maxDate,
        autoOk: autoOk,
        showYearSelector: showYearSelector,
        shouldDisableDate: this.props.shouldDisableDate,
        hideToolbarYearChange: this.props.hideToolbarYearChange })
    );
  },

  getDate: function getDate() {
    return this.state.date;
  },

  setDate: function setDate(d) {
    if (true && this._isControlled()) {
      console.error('Cannot call DatePicker.setDate when value or valueLink is defined as a property.');
    }
    this.setState({
      date: d
    });
  },

  /**
   * Open the date-picker dialog programmatically from a parent.
   */
  openDialog: function openDialog() {
    this.setState({
      dialogDate: this.getDate()
    }, this.refs.dialogWindow.show);
  },

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus: function focus() {
    this.openDialog();
  },

  _handleDialogAccept: function _handleDialogAccept(d) {
    if (!this._isControlled()) {
      this.setDate(d);
    }
    if (this.props.onChange) this.props.onChange(null, d);
    if (this.props.valueLink) this.props.valueLink.requestChange(d);
  },

  _handleInputFocus: function _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function _handleInputTouchTap(event) {
    var _this = this;

    if (this.props.onTouchTap) this.props.onTouchTap(event);

    setTimeout(function () {
      _this.openDialog();
    }, 0);
  },

  _handleWindowKeyUp: function _handleWindowKeyUp() {
    //TO DO: open the dialog if input has focus
  },

  _isControlled: function _isControlled() {
    return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
  },

  _getControlledDate: function _getControlledDate() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

    if (_utilsDateTime2['default'].isDateObject(props.value)) {
      return props.value;
    } else if (props.valueLink && _utilsDateTime2['default'].isDateObject(props.valueLink.value)) {
      return props.valueLink.value;
    }
  }

});

exports['default'] = DatePicker;
module.exports = exports['default'];