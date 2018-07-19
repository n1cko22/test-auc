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
})({18:[function(require,module,exports) {
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
},{}],17:[function(require,module,exports) {
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
},{"../utils":18}],24:[function(require,module,exports) {
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
},{"./Component":17}],15:[function(require,module,exports) {
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

      logoutButton.className = 'logout button';

      navigationEl.innerHTML = '\n    <ul class="slides">\n    <input type="radio" name="radio-btn" id="img-1" checked />\n    <li class="slide-container">\n\t\t<div class="slide">\n\t\t\t<img src="http://farm9.staticflickr.com/8072/8346734966_f9cd7d0941_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-6" class="prev">&#x2039;</label>\n\t\t\t<label for="img-2" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-2" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-1" class="prev">&#x2039;</label>\n\t\t\t<label for="img-3" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-3" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8068/8250438572_d1a5917072_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-2" class="prev">&#x2039;</label>\n\t\t\t<label for="img-4" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-4" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8061/8237246833_54d8fa37f0_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-3" class="prev">&#x2039;</label>\n\t\t\t<label for="img-5" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-5" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8055/8098750623_66292a35c0_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-4" class="prev">&#x2039;</label>\n\t\t\t<label for="img-6" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <input type="radio" name="radio-btn" id="img-6" />\n    <li class="slide-container">\n        <div class="slide">\n          <img src="http://farm9.staticflickr.com/8195/8098750703_797e102da2_z.jpg" />\n        </div>\n\t\t<div class="nav">\n\t\t\t<label for="img-5" class="prev">&#x2039;</label>\n\t\t\t<label for="img-1" class="next">&#x203a;</label>\n\t\t</div>\n    </li>\n\n    <li class="nav-dots">\n      <label for="img-1" class="nav-dot" id="img-dot-1"></label>\n      <label for="img-2" class="nav-dot" id="img-dot-2"></label>\n      <label for="img-3" class="nav-dot" id="img-dot-3"></label>\n      <label for="img-4" class="nav-dot" id="img-dot-4"></label>\n      <label for="img-5" class="nav-dot" id="img-dot-5"></label>\n      <label for="img-6" class="nav-dot" id="img-dot-6"></label>\n    </li>\n</ul>\n      <a class="auction-link" href="#/auction">Auction</a>\n      <a class="addbid-link" href="#/addbid">Add Bid</a>\n      <a class="contact-link" href="#/contacts">contact</a>\n      <a class="profile-link" href="#/profile">Profile</a>\n      <a class="gallery-link" href="#/gallery">Gallery</a>';
      logoutButton.textContent = 'Log out';

      logoLink.href = '#/queue';
      logoutButton.href = '#/login';

      /* logoutButton.addEventListener('click', () => {
         AUTH_SERVICE.logout();
       });
       */

      navigationEl.appendChild(logoutButton);

      headerWrapper.appendChild(navigationEl);

      return headerWrapper;
    }
  }]);

  return Header;
}(_framework.Component);

exports.default = Header;
},{"../framework":24,"../utils":18}],14:[function(require,module,exports) {
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
},{"../framework":24}],16:[function(require,module,exports) {
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

//import Message from './Message';
//import AUTH_SERVICE from '../service/AuthService'
var List = function (_Component) {
	_inherits(List, _Component);

	function List(props) {
		_classCallCheck(this, List);

		var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

		_this.state = {
			bets: null
		};
		_this.host = document.createElement('div');
		_this.host.classList.add('list__container');
		_this.host.addEventListener('submit', function (ev) {
			return _this.handleSubmit(ev);
		});
		(0, _utils.bindAll)(_this);
		_this.getBets();
		//this.message = new Message();
		return _this;
	}

	_createClass(List, [{
		key: 'getBets',
		value: function getBets() {
			var itemStorage = void 0;
			var fList = localStorage.getItem('itemStorage');
			if (fList !== undefined) {
				itemStorage = JSON.parse(fList);
			}
			this.updateState({ bets: itemStorage });
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(ev) {
			ev.preventDefault();
			var bidD = { bidAdd: ev.target.bid0.value };

			console.log('ok');
		}
	}, {
		key: 'render',
		value: function render() {
			var bets = this.state.bets;

			console.log(localStorage);
			if (!bets) return '\n\t\t\t<p class="message--success">\n\t\t\t\tLoading...\n\t\t\t</p>';

			if (!bets.length) return '\n\t\t\t<p class="message--success">\n\t\t\t\tList is empty\n\t\t\t</p>\n\t\t';

			return bets.map(function (bet, i) {
				var html = '\n\t\t\t\t<article class="list__item">\n\t\t\t\t\t<img src="' + ("data:image/png;base64," + bet.file[0]) + '" class="item__pic">\n\t\t\t\t\t<h3 class="id">\n\t\t\t\t\t\t#' + (i + 1) + '\n\t\t\t\t\t</h3>\n\t\t\t\t\t<span class="item__price">\n\t\t\t\t\t\t' + bet.betname + '\n                    </span>\n                    <span class="item__price">\n\t\t\t\t\t\t' + bet.betname + '\n                    </span>\n                    <span class="item__price">\n\t\t\t\t\t\t' + bet.price + '\n                    </span>\n                    <input type="bid" class="bid__password" name="bid' + i + '" id="bid">\n\t\t\t\t\t<input\n\t\t\t\t\ttype="submit" \n\t\t\t\t\t   class="button create__button \n\t\t\t\t\t\t   create__button--submit" \n\t\t\t\t\t   value="Create Bid">\n\t\t\t\t</article>\n\t\t\t';
				var fragment = (0, _utils.toHtml)(html);
				return fragment;
			});
		}
	}]);

	return List;
}(_framework.Component);

exports.default = List;
},{"../framework":24,"../utils":18}],5:[function(require,module,exports) {
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

var _List = require('./components/List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Auction = function (_Component) {
  _inherits(Auction, _Component);

  function Auction(props) {
    _classCallCheck(this, Auction);

    var _this = _possibleConstructorReturn(this, (Auction.__proto__ || Object.getPrototypeOf(Auction)).call(this, props));

    _this.header = new _Header2.default();
    _this.list = new _List2.default();
    _this.footer = new _Footer2.default();
    _this.host = document.createElement('div');
    _this.host.classList.add('application-container');
    _this.main = document.createElement('main');
    _this.main.classList.add('main');

    return _this;
  }

  _createClass(Auction, [{
    key: 'render',
    value: function render() {
      this.main.append(this.list.update());
      var toRender = [this.header.update(), this.main, this.footer.update()];

      return toRender;
    }
  }]);

  return Auction;
}(_framework.Component);

exports.default = Auction;
},{"./framework":24,"./utils":18,"./components/Header":15,"./components/Footer":14,"./components/List":16}],7:[function(require,module,exports) {
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
},{"./Component":17,"../utils":18}],25:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var store = exports.store = function store(theForm, logStore) {
  logStore.push(theForm);
  var logStoreList = JSON.stringify(logStore);
  localStorage.setItem("logStore", logStoreList);

  console.log(localStorage);
  return false;
};
var logStorage = exports.logStorage = [];
var itemStore = exports.itemStore = [];
var storeData = exports.storeData = function storeData(data, itemStorage) {
  var i = [];

  if (data.file) {
    data.file.then(function (data) {
      i[0] = data;
      return data;
    });
    console.log(itemStorage);
  }
  data.file = i;
  itemStorage.push(data);
  var itemStoreList = JSON.stringify(itemStorage);
  localStorage.setItem("itemStorage", itemStoreList);
};
//function to sign in
function login(theForm) {
  document.getElementById('welcomeMessage').innerHTML = "";
  var inputUsername = theForm["username"];
  var inputPassword = theForm["password"];
  var username = inputUsername.value;
  var password = inputPassword.value;
  if (username == localStorage.getItem('username') && password == localStorage.getItem('password')) {
    document.getElementById('welcomeMessage').innerHTML = "Welcome " + localStorage.getItem('username') + "!";
  } else {
    document.getElementById('welcomeMessage').innerHTML = "Invalid Log-in!";
  }
  return false;
} // end login()
var getBase64Image = exports.getBase64Image = function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};
var getBet = exports.getBet = function getBet() {};
},{}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

var _AuthService = require('./service/AuthService');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateBid = function (_Component) {
    _inherits(CreateBid, _Component);

    function CreateBid(props) {
        _classCallCheck(this, CreateBid);

        var _this = _possibleConstructorReturn(this, (CreateBid.__proto__ || Object.getPrototypeOf(CreateBid)).call(this, props));

        _this.host = document.createElement('div');
        _this.host.classList.add('login-form__container');

        _this.host.addEventListener('submit', function (ev) {
            return _this.handleSubmit(ev);
        });
        _this.banImg = document.getElementById('bannerImg');
        _this.result = document.getElementById('res');
        _this.img = document.getElementById('tableBanner');

        return _this;
    }

    _createClass(CreateBid, [{
        key: 'handleSubmit',
        value: function handleSubmit(ev) {
            ev.preventDefault();
            var bidData = {
                betname: ev.target.betname.value,
                description: ev.target.decription.value,
                price: ev.target.price.value,
                file: this.saveTo(ev.target.bannerImg.files[0])

            };
            console.log(bidData.file);

            return (0, _AuthService.storeData)(bidData, _AuthService.itemStore);
        }
    }, {
        key: 'saveTo',
        value: function saveTo(image) {
            var file = image;
            var fReader = new FileReader();
            var img = document.getElementById('tableBanner');
            return new Promise(function (resolve) {
                fReader.onload = function () {
                    img.src = fReader.result;
                    resolve((0, _AuthService.getBase64Image)(img));
                    localStorage.setItem("imgData", (0, _AuthService.getBase64Image)(img));
                };
                fReader.readAsDataURL(file);
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var form = '\n\t\t<form class="bet-form" method="post">\n\t\t<label for="betname">Item Name</label>\n\t\t<input type="text" class="bet-form__name" name="betname" id="betname" required>\n\t\t<label for="description">Description</label>\n\t\t<input type="decription" class="decription-form" name="decription" id="decription" required>\n\t\t<label for="start">start price</label>\n\t\t<input type="price" class="price-form__start" name="price"\n            id="price" required>\n            <input type="file" id="bannerImg"  />\n            <img src="" id="tableBanner" />\n         \n            <div id="res"></div>\n            <div class="create-pizza__button-wrapper">\n            <a \n                href="#/auction"\n                class="button create-__button \n                    create__button--reset" \n            >Cancel</a>\n            <input\n             type="submit" \n                class="button create__button \n                    create__button--submit" \n                value="Create Bid">\n                \n        </div>\n    </form>\n    \n        ';

            return [(0, _utils.toHtml)(form)];
        }
    }]);

    return CreateBid;
}(_framework.Component);

exports.default = CreateBid;
},{"../framework":24,"../utils":18,"./service/AuthService":25}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _reateBid = require('./components/\u0421reateBid');

var _reateBid2 = _interopRequireDefault(_reateBid);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddBid = function (_Component) {
	_inherits(AddBid, _Component);

	function AddBid(props) {
		_classCallCheck(this, AddBid);

		var _this = _possibleConstructorReturn(this, (AddBid.__proto__ || Object.getPrototypeOf(AddBid)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.loginForm = new _reateBid2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(AddBid, [{
		key: 'render',
		value: function render() {
			this.main.append(this.loginForm.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return AddBid;
}(_framework.Component);

exports.default = AddBid;
},{"./framework":24,"./utils":18,"./components/Header":15,"./components/СreateBid":21,"./components/Footer":14}],20:[function(require,module,exports) {
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
var Gallery = function (_Component) {
	_inherits(Gallery, _Component);

	function Gallery(props) {
		_classCallCheck(this, Gallery);

		var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login-form__container');

		_this.host.addEventListener('submit', function (ev) {
			return _this.handleSubmit(ev);
		});

		//this.message = new Message();
		return _this;
	}

	_createClass(Gallery, [{
		key: 'handleSubmit',
		value: function handleSubmit(ev) {
			ev.preventDefault();

			var userData = {
				username: ev.target.username.value,
				password: ev.target.password.value
			};

			return username;
		}
	}, {
		key: 'render',
		value: function render() {

			var f = '\n<form class="login-form" method="post">\n\t<label for="username">Username:</label>\n\t<input type="text" class="login-form__name" name="username" id="username" required>\n\t<label for="password">Password:</label>\n\t<input type="password" class="login-form__password" name="password"\n\t\tid="password" required>\n\t<div class="login-form__button-wrapper">\n\t\t<input type="submit" class="button login-form__button button--sign-in"\n\t\t\tvalue="Login">\n\t\t<a href="#/register" class="button login-form__button button--sign-up">\n\t\t\tSign up\n\t\t</a>\n\t</div>\n</form>\n\t\t';
			var form = (0, _utils.toHtml)(f);
			return [form];
		}
	}]);

	return Gallery;
}(_framework.Component);

exports.default = Gallery;
},{"../framework":24,"../utils":18}],11:[function(require,module,exports) {
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
},{"./framework":24,"./utils":18,"./components/Header":15,"./components/LoginForm":20,"./components/Footer":14}],19:[function(require,module,exports) {
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
var Contact = function (_Component) {
	_inherits(Contact, _Component);

	function Contact(props) {
		_classCallCheck(this, Contact);

		var _this = _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('contact-form__container');

		//this.message = new Message();
		return _this;
	}

	_createClass(Contact, [{
		key: 'render',
		value: function render() {
			var f = '<iframe\n        width="60%"\n        height="400"\n        frameborder="0" style="border:0"\n        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAulJ782upLgK_Tvrip2rGgzi2BWtFu89o\n          &q=EPAM,Kyiv" allowfullscreen>\n      </iframe>';
			var form = (0, _utils.toHtml)(f);
			return [form];
		}
	}]);

	return Contact;
}(_framework.Component);

exports.default = Contact;
},{"../framework":24,"../utils":18}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Contacts = require('./components/Contacts');

var _Contacts2 = _interopRequireDefault(_Contacts);

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
		_this.loginForm = new _Contacts2.default();
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
},{"./framework":24,"./utils":18,"./components/Header":15,"./components/Contacts":19,"./components/Footer":14}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('../framework');

var _utils = require('../utils');

var _AuthService = require('./service/AuthService');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
			console.log(localStorage);
			return (0, _AuthService.store)(userData, _AuthService.logStorage);
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
},{"../framework":24,"../utils":18,"./service/AuthService":25}],12:[function(require,module,exports) {
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
},{"./framework":24,"./utils":18,"./components/Header":15,"./components/RegisterForm":22,"./components/Footer":14}],23:[function(require,module,exports) {
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

var Gallery = function (_Component) {
  _inherits(Gallery, _Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    (0, _utils.bindAll)(_this);
    _this.host = document.createElement('div');
    _this.host.classList.add('login-form__container');

    return _this;
  }

  _createClass(Gallery, [{
    key: 'render',
    value: function render() {

      var f = '\n        <div class="gallery cf"><div>\n        <img src="http://abload.de/img/a6aawu.jpg" />\n        </div>\n        <div>\n        <img src="http://abload.de/img/a6aawu.jpg" />\n        </div>\n         <div>\n         <img src="http://abload.de/img/a6aawu.jpg" />\n  </div>\n  <div>\n    <img src="http://abload.de/img/a6aawu.jpg" />\n  </div>\n  <div>\n    <img src="http://abload.de/img/a6aawu.jpg" />\n  </div>\n  <div>\n    <img src="http://abload.de/img/a6aawu.jpg" />\n  </div>\n</div>\n\t\t';
      var form = (0, _utils.toHtml)(f);
      return [form];
    }
  }]);

  return Gallery;
}(_framework.Component);

exports.default = Gallery;
},{"../framework":24,"../utils":18}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _framework = require('./framework');

var _utils = require('./utils');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Gallery = require('./components/Gallery');

var _Gallery2 = _interopRequireDefault(_Gallery);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryMain = function (_Component) {
	_inherits(GalleryMain, _Component);

	function GalleryMain(props) {
		_classCallCheck(this, GalleryMain);

		var _this = _possibleConstructorReturn(this, (GalleryMain.__proto__ || Object.getPrototypeOf(GalleryMain)).call(this, props));

		_this.host = document.createElement('div');
		_this.host.classList.add('login__container');

		_this.header = new _Header2.default();
		_this.gallery = new _Gallery2.default();
		_this.footer = new _Footer2.default();

		_this.main = document.createElement('main');
		_this.main.classList.add('main');
		return _this;
	}

	_createClass(GalleryMain, [{
		key: 'render',
		value: function render() {
			this.main.append(this.gallery.update());

			return [this.header.update(), this.main, this.footer.update()];
		}
	}]);

	return GalleryMain;
}(_framework.Component);

exports.default = GalleryMain;
},{"./framework":24,"./utils":18,"./components/Header":15,"./components/Gallery":23,"./components/Footer":14}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Auction = require('./Auction');

var _Auction2 = _interopRequireDefault(_Auction);

var _AddBid = require('./AddBid');

var _AddBid2 = _interopRequireDefault(_AddBid);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _Contact = require('./Contact');

var _Contact2 = _interopRequireDefault(_Contact);

var _Register = require('./Register');

var _Register2 = _interopRequireDefault(_Register);

var _GalleryMain = require('./GalleryMain');

var _GalleryMain2 = _interopRequireDefault(_GalleryMain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { AUTH_SERVICE } from './service/AuthService';
exports.default = [{
  href: '',
  redirectTo: '/'
}, {
  href: '/',
  component: _Auction2.default
  //canActivate: AUTH_SERVICE.isAuthorized
}, {
  href: '/auction',
  component: _Auction2.default
  //canActivate: AUTH_SERVICE.isAuthorized
}, {
  href: '/addbid',
  component: _AddBid2.default
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
}, {
  href: '/gallery',
  component: _GalleryMain2.default
}];
},{"./Auction":5,"./AddBid":9,"./Login":11,"./Contact":10,"./Register":12,"./GalleryMain":13}],3:[function(require,module,exports) {
'use strict';

var _utils = require('./utils');

var _Auction = require('./Auction');

var _Auction2 = _interopRequireDefault(_Auction);

var _Router = require('./framework/Router');

var _Router2 = _interopRequireDefault(_Router);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _Router2.default(_routes2.default);

var root = (0, _utils.clearChildren)(document.getElementById('root'));

root.appendChild(router.host);
},{"./utils":18,"./Auction":5,"./framework/Router":7,"./routes":6}],34:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56874' + '/');
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
},{}]},{},[34,3])
//# sourceMappingURL=/dist/cb56db8165b0b11423ce2204790e74b1.map