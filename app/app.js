(function() {

  var sections = [];

  function findSection(section) {
    var r,
        i, ii;

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
    var sec = $('<section class="feature col-xs-12 col-md col-lg col-xl-12"></section>'),
        item = $('<div class="feature-item"></div>'),
        blk = $('<div class="feature-block col-xl-4"></div>'),
        h2 = $('<h2 class="section-header"></h2>'),
        a = $('<a href="' + ROUTES.exercises.path + '#' + section.name + '" class="font-xl">' + section.label + '</a>'),
        btn = $('<a href="' + ROUTES.exercises.path + '#' + section.name + '" class="btn btn-danger"> Begin Workout <span class="fa fa-arrow-circle-right" role="presentation"></span></a>');

    // Nest markup
    sec.append(item);
    item.append(blk);
    item.append(createSectionList(section));
    blk.append(h2.append(a));
    blk.append(btn);

    return sec;
  }

  function createSectionList(section) {
    var i, ii,
        div = $('<div class="col-xl-8"></div>'),
        ol = $('<ol class="feature-list"></ol>');

    section.items.sort(function(a, b) {
      if (a.order < b.order) {
        return -1;
      }else if (a.order > b.order) {
        return 1;
      }else {
        return 0;
      }
    });

    for (i=0,ii=section.items.length;i<ii;i++) {
      div.append(ol.append($('<li>' + section.items[i].exercise + '</li>')));
    }

    return ol;
  }

  function draw(sections) {
    var i, ii,
        container = $('#exercise-items-container');

    // Clear container
    container.html('');

    // Add sections to container
    for (i=0,ii=sections.length;i<ii;i++) {
      container.append(createSection(sections[i]));
    }
  }

  function onFlowsComplete(response) {
    sections = response;
    draw(sections);
  }

  function init() {
    API.tenants.flows().then(onFlowsComplete);
  }

  init();

})();