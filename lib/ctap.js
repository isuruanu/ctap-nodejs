/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */
module.exports = {
  hello: function(name) {
    return "Hello " + name;
  },

  /**
   * Unescape special characters in the given string of html.
   *
   * @param  {String} html
   * @return {String}
   */
  bye: function(name) {    
      return "Bye " + name;
  }
};
