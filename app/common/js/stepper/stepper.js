var STEPPER = function() {

  var _stepper = {

    sections: [],
    current: {},
    currentIndex: 0,

    /**
     * Set sections array internally
     * @param sections
     */
    setSections: function(sections) {
      this.sections = (sections instanceof Array) ? sections.slice(0) : [];
    },

    /**
     * Alias for findSection
     * @param name
     * @returns {*}
     */
    getSection: function (name) {
      //window.location.hash.replace('#', '')
      return this.findSection(name);
    },

    /**
     * Find a given section by name
     * @param name
     * @returns {*}
     */
    findSection: function (name) {
      var r,
          i, ii;

      for (i = 0, ii = this.sections.length; i < ii; i++) {
        if (this.sections[i].name.toLowerCase() === name.toLowerCase()) {
          r = {
            section: this.sections[i],
            index: i
          };
          break;
        }
      }

      return r;
    },

    /**
     * Returns an empty section item
     * @returns {{order: number, exercise: string, duration: number}}
     */
    getEmptySectionItem: function () {
      return {
        order: 1,
        exercise: "No instructions available",
        duration: 0
      };
    },

    /**
     * Returns an empty section with an empty section item
     * @returns {{items: [*], level: number, order: number, label: string, name: string}}
     */
    getEmptySection: function () {

      return {
        items: [this.getEmptySectionItem()],
        level: 1,
        order: 1,
        label: "No instructions",
        name: "empty"
      }

    },

    /**
     * Get next index based on current index with loop back
     * @returns {number}
     */
    getNextSectionIndex: function () {
      var r = this.currentIndex + 1;

      if (r === this.sections.length) {
        r = 0;
      }

      return r;
    },

    /**
     * Get last index based on current index with loop back
     * @returns {number}
     */
    getLastSectionIndex: function () {
      var r = this.currentIndex - 1;

      if (r < 0) {
        r = this.sections.length - 1;
      }

      return r;
    },

    /**
     * Get next section in sequence
     */
    nextSection: function() {
      this.currentIndex = this.getNextSectionIndex();
      return this.getCurrent();
    },

    lastSection: function() {
      this.currentIndex = this.getLastSectionIndex();
      return this.getCurrent();
    },

    /**
     * Get the next section in sequence defined by order property
     * @param direction
     * @returns {*|{items: *[], level: number, order: number, label: string, name: string}}
     */
    getSectionByOrder: function (direction) {

      var r = this.getEmptySection();

      if (direction === 'next') {
        r = this.nextSection();
      } else if (direction === 'last') {
        r = this.lastSection();
      }

      return r;

    },

    /**
     * Get current section based on index
     * @returns {*}
     */
    getCurrent: function() {
      return this.current = this.sections[this.currentIndex];
    }

  };

  return _stepper;

};

if (typeof module !== 'undefined' && module.exports != null) {
  exports.STEPPER = STEPPER;
}