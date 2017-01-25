(function() {

  var sections = SECTIONS.slice(0);

  function findSection(section) {
    var r;

    for (i=0,ii=sections.length;i<ii;i++) {
      if (sections[i].name.toLowerCase() === section.toLowerCase()) {
        r = sections[i];
        break;
      }
    }

    return r;
  }
  
  function createSection(section) {
    // Create section item with header and content
    var sec = $('<section class="flex-item feature-block"></div>'),
        h2 = $('<h2 class="section-header"></h2>'),
        a = $('<a href="' + ROUTES.exercises.path + '#' + section.name + '" class="font-xxl">' + section.label + '</a>'),
        btn = $('<a href="' + ROUTES.exercises.path + '#' + section.name + '" class="btn"> Begin Workout <span class="fa fa-arrow-circle-right" role="presentation"></span></a>');

    // Nest markup
    sec.append(h2.append(a));
    sec.append(btn);

    return sec;
  }

  function draw() {
    var i, ii,
        container = $('#exercise-items-container');

    // Clear container
    container.html('');

    // Add sections to container
    for (i=0,ii=sections.length;i<ii;i++) {
      container.append(createSection(sections[i]));
    }
  }
  

  function init() {
    draw();
  }

  init();

})();