(function() {

	'use strict';

	function CSSFormating(codeText) {
		this.codeText = codeText;
		this.codeO = codeText.value;
		this.bindHandler();
	}

	CSSFormating.prototype = {
		compress: function(hasNote) {
			if (this.codeO == '')
				this.codeO = this.codeText.value;
			var code = this.codeO;	
			code = code.replace(/(\n|\t|\s)*/ig,'$1');
			code = code.replace(/\n|\t|\s(\{|\}|\,|\:|\;)/ig,'$1');
			code = code.replace(/(\{|\}|\,|\:|\;)\s/ig,'$1');
			if (!hasNote) {
				code = code.replace(/\/\*(\n|\s|\t|.)*\*\//ig, '');
			}
			return code;
		},
		multiLine: function(hasNote) {
			var code = this.compress(hasNote);
			code = code.replace(/(\{)/ig,' $1');
			code = code.replace(/(\{|\;)/ig,'$1\n\t');
			code = code.replace(/\t*(\})/ig,'$1\n');
			code = code.replace(/(\*\/)/ig,'$1\n');
			return code;
		},
		singleLine: function(hasNote) {
			var code = this.compress(hasNote);
			code = code.replace(/(\})/ig,'$1\n');
			code = code.replace(/(\*\/)/ig,'$1\n');
			return code;
		},
		restore: function() {
			return this.codeO;
		},
		bindHandler: function() {
			var _self = this;
			_self.codeText.onkeydown = function() {
				_self.codeO = '';
			}
		}
	};

	window.CSSFormating = CSSFormating;

})();
