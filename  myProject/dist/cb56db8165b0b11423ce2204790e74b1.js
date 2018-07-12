// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.RequestError = RequestError;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var URL_PARAM_REGEXP = /:\w+/g;

var noop = exports.noop = function noop() {};

var toHtml = exports.toHtml = function toHtml(string) {
  var template = document.createElement('template');
  template.innerHTML = string.trim();

  return template.content;
};

var clearChildren = exports.clearChildren = function clearChildren(node) {
  node.innerHTML = '';
  return node;
};

var append = exports.append = function append(node, child) {
  if (Array.isArray(child)) {
    node.append.apply(node, _toConsumableArray(child));
  } else {
    node.append(child);
  }

  return node;
};

var bindAll = exports.bindAll = function bindAll(context) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  names.forEach(function (name) {
    if (typeof context[name] === 'function') {
      context[name] = context[name].bind(context);
    } else {
      throw Error('Expected function ' + name + '. Instead received: ' + _typeof(context[name]));
    }
  });
};

var getMidnightWeather = exports.getMidnightWeather = function getMidnightWeather(list) {
  return list.filter(function (_ref) {
    var date = _ref.dt_txt;
    return date.includes(MIDNIGHT_HOURS);
  });
};

function RequestError(response) {
  this.status = response.statusText;
  this.code = response.status;
}

RequestError.prototype.toString = function () {
  return this.code + ' - ' + this.status;
};

var isUrlParam = function isUrlParam(path) {
  return URL_PARAM_REGEXP.test(path);
};
var urlToRegExp = function urlToRegExp(url) {
  return RegExp('^' + url.replace(URL_PARAM_REGEXP, '(.*)') + '$');
};
var isEqualPaths = exports.isEqualPaths = function isEqualPaths(template, url) {
  return urlToRegExp(template).test(url);
};

var extractUrlParams = exports.extractUrlParams = function extractUrlParams(template, url) {
  var values = url.split('/');
  var params = {};

  if (!values) {
    return params;
  }

  return template.split('/').reduce(function (acc, param, index) {
    if (!isUrlParam(param)) {
      return acc;
    }
    //We need to remove ':' from param name
    acc[param.slice(1)] = values[index];

    return acc;
  }, params);
};
var getTime = exports.getTime = function getTime() {
  var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var ss = now.getSeconds().toString().padStart(2, '0');
  var mm = now.getMinutes().toString().padStart(2, '0');
  var hh = now.getHours().toString().padStart(2, '0');

  return hh + ':' + mm + ':' + ss;
};
},{}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.state = {};
    this.props = props || {};
    this.host = null;

    (0, _utils.bindAll)(this, 'updateState', 'update');
  }

  _createClass(Component, [{
    key: '_render',
    value: function _render() {
      var html = this.render();

      if (!html && this.host) {
        return this.host;
      }

      if (typeof html === 'string') {
        return (0, _utils.append)((0, _utils.clearChildren)(this.host), (0, _utils.toHtml)(html));
      } else {
        return (0, _utils.append)((0, _utils.clearChildren)(this.host), html);
      }
    }
  }, {
    key: 'onBeforeUpdate',
    value: function onBeforeUpdate(nextProps) {}
  }, {
    key: 'onBeforeUnmount',
    value: function onBeforeUnmount() {}
  }, {
    key: 'unmount',
    value: function unmount() {
      this.onBeforeUnmount();
    }
  }, {
    key: 'update',
    value: function update(nextProps) {
      this.onBeforeUpdate(nextProps);
      this.props = nextProps;
      return this._render();
    }
  }, {
    key: 'updateState',
    value: function updateState(state) {
      var nextState = Object.assign({}, this.state, state);

      this.state = nextState;
      this._render();

      return nextState;
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'name',
    get: function get() {
      return this.constructor.name;
    }
  }]);

  return Component;
}();

exports.default = Component;
},{"../utils":15}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = require('./Component');

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_Component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Component":14}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.host = document.createElement('header');
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var headerWrapper = document.createElement('div');
      var logoLink = document.createElement('a');
      var navigationEl = document.createElement('nav');
      var logoutButton = document.createElement('a');

      headerWrapper.className = 'header-wrapper';
      logoLink.className = 'logo';
      logoutButton.className = 'logout button';

      logoLink.textContent = 'Logo';
      navigationEl.innerHTML = '\n      <a class="queue-link" href="#/auction">Auction</a>\n      <a class="order-link" href="#/contacts">contact</a>\n      <a class="profile-link" href="#/profile">Profile</a>';
      logoutButton.textContent = 'Log out';

      logoLink.href = '#/queue';
      logoutButton.href = '#/login';

      /* logoutButton.addEventListener('click', () => {
         AUTH_SERVICE.logout();
       });
       */
      this.setActiveLink(navigationEl, this.activeLink);

      navigationEl.appendChild(logoutButton);
      headerWrapper.appendChild(logoLink);
      headerWrapper.innerHTML += '\n      <input type="checkbox" id="hamburger-checkbox">\n      <label for="hamburger-checkbox">\n        <span></span>\n        <span></span>\n        <span></span>\n      </label> ';
      headerWrapper.appendChild(navigationEl);

      return headerWrapper;
    }
  }, {
    key: 'setActiveLink',
    value: function setActiveLink(container, activeLink) {
      switch (activeLink) {
        case 'queue':
          container.querySelector('.queue-link').classList.add('active');
          break;
        case 'order':
          container.querySelector('.order-link').classList.add('active');
          break;
        case 'profile':
          container.querySelector('.profile-link').classList.add('active');
          break;
      }
    }
  }]);

  return Header;
}(_framework.Component);

exports.default = Header;
},{"../framework":19,"../utils":15}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
	_inherits(Footer, _Component);

	function Footer(props) {
		_classCallCheck(this, Footer);

		var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('footer__container');
		return _this;
	}

	_createClass(Footer, [{
		key: 'render',
		value: function render() {
			return '\n\t\t\t<footer class="footer">\n\t\t\t\t<address class="footer__address">\n\t\t\t\t\tsome street 1,\n\t\t\t\t\t<a href="tel:5778887">tel. 57-788-87</a>\n\t\t\t\t</address>\n\t\t\t\t<span class="footer__copyright">EPAM Systems&copy; 2018</span>\n\t\t\t</footer>\n\t\t';
		}
	}]);

	return Footer;
}(_framework.Component);

exports.default = Footer;
},{"../framework":19}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      inputValue: '',
      hasError: false,
      todayForecast: null,
      weekForecast: null
    };

    (0, _utils.bindAll)(_this, 'handleHistoryChange', 'handleError', 'updateState');
    _this.header = new _Header2.default();
    _this.footer = new _Footer2.default();
    _this.host = document.createElement('div');
    _this.host.classList.add('application-container');

    window.addEventListener('popstate', function (_ref) {
      var state = _ref.state;

      _this.updateState(state);
    });
    return _this;
  }

  _createClass(App, [{
    key: 'onBeforeUpdate',
    value: function onBeforeUpdate() {
      var city = new URLSearchParams(window.location.search).get('city');

      if (!!city) {
        this.getCityForecast(city).then(function (state) {
          window.history.replaceState(state, null, '?city=' + state.todayForecast.name);
        });
      }
    }
  }, {
    key: 'handleHistoryChange',
    value: function handleHistoryChange(_ref2) {
      var state = _ref2.state;

      this.updateState(state);
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      this.updateState({ hasError: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          todayForecast = _state.todayForecast,
          weekForecast = _state.weekForecast,
          inputValue = _state.inputValue;


      var toRender = [
      /*this._locationSearch.update({
        inputValue,
        onSubmit: this.handleSearchSubmit,
      }),*/
      this.header.update(), this.footer.update()];

      return toRender;
    }
  }]);

  return App;
}(_framework.Component);

exports.default = App;
},{"./framework":19,"./utils":15,"./components/Header":12,"./components/Footer":13}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ANY_PATH = '*';

var Router = function (_Component) {
  _inherits(Router, _Component);

  function Router(routes) {
    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

    _this.state = {
      activeRoute: null,
      activeComponent: null,
      routes: routes
    };

    _this.host = document.createElement('div');

    window.addEventListener('hashchange', function () {
      return _this.handleUrlChange(_this.path);
    });

    _this.handleUrlChange(_this.path);
    return _this;
  }

  _createClass(Router, [{
    key: 'handleUrlChange',
    value: function handleUrlChange(url) {
      var _state = this.state,
          routes = _state.routes,
          activeRoute = _state.activeRoute;

      var nextRoute = routes.find(function (_ref) {
        var href = _ref.href;
        return (0, _utils.isEqualPaths)(href, url);
      });

      if (!nextRoute) {
        nextRoute = routes.find(function (_ref2) {
          var href = _ref2.href;
          return href === ANY_PATH;
        }); //looking for any route
      }

      if (nextRoute && activeRoute !== nextRoute) {
        if (!!nextRoute.redirectTo) {
          return this.handleRedirect(nextRoute.redirectTo);
        }

        if (!!nextRoute.onEnter) {
          return this.handleOnEnter(nextRoute, url);
        }

        this.applyRoute(nextRoute, url);
      }
    }
  }, {
    key: 'handleRedirect',
    value: function handleRedirect(url) {
      window.location.hash = url;
    }
  }, {
    key: 'handleOnEnter',
    value: function handleOnEnter(nextRoute, url) {
      var href = nextRoute.href;

      var params = (0, _utils.extractUrlParams)(href, url);

      nextRoute.onEnter(params, this.handleRedirect, nextRoute);
    }
  }, {
    key: 'applyRoute',
    value: function applyRoute(route, url) {
      var href = route.href,
          Component = route.component;
      var activeComponent = this.state.activeComponent;


      var componentInstance = new Component({
        params: (0, _utils.extractUrlParams)(href, this.path),
        replace: this.handleRedirect
      });

      if (activeComponent) {
        activeComponent.unmount();
      }

      this.updateState({
        activeRoute: route,
        activeComponent: componentInstance
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.activeComponent.update();
    }
  }, {
    key: 'path',
    get: function get() {
      return window.location.hash.slice(1);
    }
  }]);

  return Router;
}(_Component3.default);

exports.default = Router;
},{"./Component":14,"../utils":15}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//
//import Message from './Message';
//import AUTH_SERVICE from '../service/AuthService'
var LoginForm = function (_Component) {
	_inherits(LoginForm, _Component);

	function LoginForm(props) {
		_classCallCheck(this, LoginForm);

		var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login-form__container');

		_this.host.addEventListener('submit', function (ev) {
			return _this.handleSubmit(ev);
		});

		//this.message = new Message();
		return _this;
	}

	_createClass(LoginForm, [{
		key: 'handleSubmit',
		value: function handleSubmit(ev) {
			ev.preventDefault();

			var userData = {
				username: ev.target.username.value,
				password: ev.target.password.value
			};

			return localStorage.getItem(userData);
		}
	}, {
		key: 'render',
		value: function render() {
			var f = '\n<form class="login-form" method="post">\n\t<label for="username">Username:</label>\n\t<input type="text" class="login-form__name" name="username" id="username" required>\n\t<label for="password">Password:</label>\n\t<input type="password" class="login-form__password" name="password"\n\t\tid="password" required>\n\t<div class="login-form__button-wrapper">\n\t\t<input type="submit" class="button login-form__button button--sign-in"\n\t\t\tvalue="Login">\n\t\t<a href="#/register" class="button login-form__button button--sign-up">\n\t\t\tSign up\n\t\t</a>\n\t</div>\n</form>\n\t\t';
			var form = (0, _utils.toHtml)(f);
			return [form];
		}
	}]);

	return LoginForm;
}(_framework.Component);

exports.default = LoginForm;
},{"../framework":19,"../utils":15}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _LoginForm = require('./components/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.loginForm = new _LoginForm2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(Login, [{
		key: 'render',
		value: function render() {
			this.main.append(this.loginForm.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return Login;
}(_framework.Component);

exports.default = Login;
},{"./framework":19,"./utils":15,"./components/Header":12,"./components/LoginForm":16,"./components/Footer":13}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_Component) {
	_inherits(Login, _Component);

	function Login(props) {
		_classCallCheck(this, Login);

		var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();

		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(Login, [{
		key: 'render',
		value: function render() {
			//this.main.append(this.loginForm.update());

			return [this.header.update(),
			//this.main,
			this.footer.update()];
		}
	}]);

	return Login;
}(_framework.Component);

exports.default = Login;
},{"./framework":19,"./utils":15,"./components/Header":12,"./components/Footer":13}],23:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//
//import Message from './Message';
//import AUTH_SERVICE from '../service/AuthService'
var RegisterForm = function (_Component) {
	_inherits(RegisterForm, _Component);

	function RegisterForm(props) {
		_classCallCheck(this, RegisterForm);

		var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login-form__container');

		_this.host.addEventListener('submit', function (ev) {
			return _this.handleSubmit(ev);
		});

		//this.message = new Message();
		return _this;
	}

	_createClass(RegisterForm, [{
		key: 'handleSubmit',
		value: function handleSubmit(ev) {
			ev.preventDefault();

			var userData = {
				username: ev.target.username.value,
				password: ev.target.password.value,
				password_repeat: ev.target.password_repeat.value,
				email: ev.target.email.value

			};

			return localStorage.setItem('userData', userData);
		}
	}, {
		key: 'render',
		value: function render() {
			var f = '\n\t\t<form class="register-form" method="post">\n\t\t<label for="username">Username:</label>\n\t\t<input type="text" class="register-form__name" name="username" id="username" required>\n\t\t<label for="email">Email:</label>\n\t\t<input type="email" class="register-form__email" name="email" id="email" required>\n\t\t<label for="password">Password:</label>\n\t\t<input type="password" class="register-form__password" name="password"\n\t\t\tid="password" required>\n\t\t<label for="password_repeat">Confirm password:</label>\n\t\t<input type="password" class="register-form__password" name="password_repeat"\n\t\t\tid="password_repeat" required>\n\n\t\t<input type="submit" class="button register-form__button button--register"\n\t\t\tvalue="Sign up">\n\t</form>\n\t\t';
			var form = (0, _utils.toHtml)(f);
			return [form];
		}
	}]);

	return RegisterForm;
}(_framework.Component);

exports.default = RegisterForm;
},{"../framework":19,"../utils":15}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _RegisterForm = require('./components/RegisterForm');

var _RegisterForm2 = _interopRequireDefault(_RegisterForm);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = function (_Component) {
	_inherits(Register, _Component);

	function Register(props) {
		_classCallCheck(this, Register);

		var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.registerForm = new _RegisterForm2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(Register, [{
		key: 'render',
		value: function render() {
			this.main.append(this.registerForm.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return Register;
}(_framework.Component);

exports.default = Register;
},{"./framework":19,"./utils":15,"./components/Header":12,"./components/RegisterForm":23,"./components/Footer":13}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _Contact = require('./Contact');

var _Contact2 = _interopRequireDefault(_Contact);

var _Register = require('./Register');

var _Register2 = _interopRequireDefault(_Register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { AUTH_SERVICE } from './service/AuthService';
exports.default = [{
  href: '',
  redirectTo: '/'
}, {
  href: '/',
  component: _App2.default
  //canActivate: AUTH_SERVICE.isAuthorized
}, {
  href: '/auction',
  component: _App2.default
  //canActivate: AUTH_SERVICE.isAuthorized
}, {
  href: '/login',
  component: _Login2.default
}, {
  href: '/contacts',
  component: _Contact2.default
}, {
  href: '/register',
  component: _Register2.default
}];
},{"./App":5,"./Login":9,"./Contact":11,"./Register":10}],3:[function(require,module,exports) {
'use strict';

var _utils = require('./utils');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Router = require('./framework/Router');

var _Router2 = _interopRequireDefault(_Router);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _Router2.default(_routes2.default);

var root = (0, _utils.clearChildren)(document.getElementById('root'));

root.appendChild(router.host);
},{"./utils":15,"./App":5,"./framework/Router":7,"./routes":6}],32:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '65098' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[32,3])
//# sourceMappingURL=/dist/cb56db8165b0b11423ce2204790e74b1.map