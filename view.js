var extend = require('v-utils/extend'),
    dom    = require('v-utils/dom');

/**
 * MVC view
 * 
 * This class is responsible for rendering data from models
 * 
 * @param {Node} node
 * @param {Object} data
 */
var View = function (node, data) {
    this.node = node;
    this.data = data;
    
    this.initialize();
};

/**
 * Method that should be extended in subclasses 
 */
View.prototype.initialize = function () {};

/**
 * Find an element by selector
 * 
 * @param {String} selector
 * @return {Node}
 */
View.prototype.find = function (selector) {
    var node = dom.find(selector, this.node);
    
    if (!node) {
        console.warn('Could not find node by selector "' + selector + '"');
    }
    
    return node;
};

/**
 * Bind an event to specific element
 * 
 * @param {String|Node} selector
 * @param {String} event
 * @param {Function} callback
 */
View.prototype.bind = function (selector, event, callback) {
    var node = selector instanceof Node ? selector : this.find(selector);
    
    if (!node) {
        return console.warn('Node is not suitable for attaching events!');
    }
    
    dom.on(node, event, callback.bind(this));
};

View.extend = extend(View);

module.exports = View;