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

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _transitionGroupsSlideIn = require('../transition-groups/slide-in');

var _transitionGroupsSlideIn2 = _interopRequireDefault(_transitionGroupsSlideIn);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var DateDisplay = _react2['default'].createClass({
  displayName: 'DateDisplay',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    DateTimeFormat: _react2['default'].PropTypes.func.isRequired,
    disableYearSelection: _react2['default'].PropTypes.bool,
    handleMonthDayClick: _react2['default'].PropTypes.func,
    handleYearClick: _react2['default'].PropTypes.func,
    locale: _react2['default'].PropTypes.string.isRequired,
    mode: _react2['default'].PropTypes.oneOf(['portrait', 'landscape']),
    monthDaySelected: _react2['default'].PropTypes.bool,
    selectedDate: _react2['default'].PropTypes.object.isRequired,
    style: _react2['default'].PropTypes.object,
    weekCount: _react2['default'].PropTypes.number
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
      disableYearSelection: false,
      monthDaySelected: true,
      weekCount: 4
    };
  },

  getInitialState: function getInitialState() {
    return {
      selectedYear: !this.props.monthDaySelected,
      transitionDirection: 'up',
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    var direction = undefined;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }

    if (nextProps.monthDaySelected !== undefined) {
      this.setState({ selectedYear: !nextProps.monthDaySelected });
    }
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.datePicker;
  },

  getStyles: function getStyles() {
    var theme = this.getTheme();
    var isLandscape = this.props.mode === 'landscape';

    var styles = {
      root: {
        backgroundColor: theme.selectColor,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        color: theme.textColor,
        height: 60,
        padding: 20
      },

      monthDay: {
        root: {
          display: 'inline-block',
          fontSize: 36,
          fontWeight: '400',
          lineHeight: '36px',
          height: isLandscape ? 76 : 38,
          opacity: this.state.selectedYear ? 0.7 : 1.0,
          transition: _stylesTransitions2['default'].easeOut(),
          width: '100%'
        },

        title: {
          cursor: !this.state.selectedYear ? 'default' : 'pointer'
        }
      },

      year: {
        root: {
          margin: 0,
          fontSize: 16,
          fontWeight: '400',
          lineHeight: '16px',
          height: 16,
          opacity: this.state.selectedYear ? 1.0 : 0.7,
          transition: _stylesTransitions2['default'].easeOut(),
          marginBottom: 10
        },

        title: {
          cursor: this.state.selectedYear && !this.props.disableYearSelection ? 'pointer' : 'default'
        }
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;
    var selectedDate = _props.selectedDate;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['DateTimeFormat', 'locale', 'selectedDate', 'style']);

    var year = this.props.selectedDate.getFullYear();
    var styles = this.getStyles();

    var dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit'
    }).format(this.props.selectedDate);

    return _react2['default'].createElement(
      'div',
      _extends({}, other, { style: this.prepareStyles(styles.root, this.props.style) }),
      _react2['default'].createElement(
        _transitionGroupsSlideIn2['default'],
        {
          style: styles.year.root,
          direction: this.state.transitionDirection },
        _react2['default'].createElement(
          'div',
          { key: year, style: styles.year.title, onTouchTap: this._handleYearClick },
          year
        )
      ),
      _react2['default'].createElement(
        _transitionGroupsSlideIn2['default'],
        {
          style: styles.monthDay.root,
          direction: this.state.transitionDirection },
        _react2['default'].createElement(
          'div',
          {
            key: dateTimeFormatted,
            style: styles.monthDay.title,
            onTouchTap: this._handleMonthDayClick },
          dateTimeFormatted
        )
      )
    );
  },

  _handleMonthDayClick: function _handleMonthDayClick() {
    if (this.props.handleMonthDayClick && this.state.selectedYear) {
      this.props.handleMonthDayClick();
    }

    this.setState({ selectedYear: false });
  },

  _handleYearClick: function _handleYearClick() {
    if (this.props.handleYearClick && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.handleYearClick();
    }

    if (!this.props.disableYearSelection) {
      this.setState({ selectedYear: true });
    }
  }

});

exports['default'] = DateDisplay;
module.exports = exports['default'];