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
        blkRow = $('<div class="row feature-block-inner"></div>'),
        h2 = $('<h2 class="section-header text-xs-left text-sm-left text-md-center col-xs-8 col-md-12"><span class="font-xl">' + section.label + '</span></h2>'),
        btnSec = $('<div class="section-button text-xs-right text-sm-right text-md-center col-xs-4 col-md-12"></div>'),
        btn = $('<a href="' + ROUTES.exercises.path + '#' + section.name + '" class="btn btn-danger"> Begin <span class="hidden-sm-down">Workout</span> <span class="fa fa-arrow-circle-right" role="presentation"></span></a>');

    // Nest markup
    sec.append(item);
    item.append(blk.append(blkRow));
    item.append(createSectionList(section));
    blkRow.append(h2);
    blkRow.append(btnSec.append(btn));

    blkRow.bind('click', function(e) {
      window.location.href = ROUTES.exercises.path + '#' + section.name;
    });

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