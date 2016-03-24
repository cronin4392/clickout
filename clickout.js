/*
 * Plugin to attach a callback when an element is clicked out of
 * Author: Stephen Cronin @sscooba
 */

(function(window, factory) {
	// universal module definition

	/*global define: false, module: false, require: false */

	if ( typeof module == 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window
		);
	} else {
		// browser global
		window.buffer = factory(
			window
		);
	}
})(window, function factory(window) {
	function Clickout(el, callback) {
		if(!el) {
			return false;
		}

		this.el = el;
		this.callback = callback;

		this.clickoutHander = null;
	}

	Clickout.prototype.activate = function() {
		this.clickoutHander = detectClickout.bind(this);

		document.addEventListener('click', this.clickoutHander, true);
	}

	Clickout.prototype.deactivate = function() {
		document.removeEventListener('click', this.clickoutHander, true);
	}

	function isDescendant(parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}

	function detectClickout(e) {
		if( !isDescendant(this.el, e.target) ) {
			this.callback && this.callback();
		}
	}

	return Clickout;
});