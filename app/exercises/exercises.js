(function() {

  var current,
      runTimeout,
      runTimerTimeout,
      initRunTimer,
      startRunTimer,
      currentIndex = 0,
      totalDuration = 0,
      currentDuration = 0,
      currentExercise = 0,
      transpiredDuration = 0,
      sections = [];

  function getSection() {
    return findSection(window.location.hash.replace('#', ''));
  }

  function findSection(section) {
    var r,
        i, ii;

    for (i=0,ii=sections.length;i<ii;i++) {
      if (sections[i].name.toLowerCase() === section.toLowerCase()) {
        r = {
          section: sections[i],
          index: i
        };
        break;
      }
    }

    return r;
  }

  function getEmptySectionItem() {
    return {
      order: 1,
      exercise: "No instructions available",
      duration: 0
    };
  }

  function getEmptySection() {

    return {
      items: [getEmptySectionItem()],
      level: 1,
      order: 1,
      label: "No instructions",
      name: "empty"
    }

  }

  function getSectionByOrder(direction) {

    var r = getEmptySection(),
        nextIndex,
        lastIndex;

      if (direction === 'next') {
        if (currentIndex + 1 === sections.length) {
          nextIndex = 0;
        }else{
          nextIndex = currentIndex + 1;
        }
        if (sections[nextIndex]) {
          r = sections[nextIndex];
        }
      }else if (direction === 'last') {
        if (currentIndex - 1 < 0) {
          lastIndex = sections.length - 1;
        }else{
          lastIndex = currentIndex - 1;
        }
        if (sections[lastIndex]) {
          r = sections[lastIndex];
        }
      }

    return r;

  }

  function setName() {
    $('#exercise-name').text(current.label);
  }

  function setStepCount() {
    $('#exercise-count').text(': ' + (currentExercise + 1) + ' of ' + current.items.length);
  }

  function setItems(items) {
    var i, ii,
        ol = $('<ol id="exercise-list"></ol>');

    for (i=0,ii=items.length;i<ii;i++) {
      ol.append('<li>(' + UTILS.secondsToTime(UTILS.msToSec(items[i].duration)) + ') ' + items[i].exercise + '</li>');
    }

    $('#exercise-steps').append(ol);
  }

  function setNav() {
    // Must set last before first
    setLast();
    setNext();
  }

  function setNext() {
    var section = getSectionByOrder('next'),
        next = $('#exercise-next');

    next.html('');
    next.append('<a href="#' + section.name + '">' + section.label + ' <span class="fa fa-arrow-circle-right" role="presentation"></span></a>');
  }

  function setLast() {
    var section = getSectionByOrder('last'),
        last = $('#exercise-last');

    last.html('');
    last.append('<a href="#' + section.name + '"><span class="fa fa-arrow-circle-left" role="presentation"></span> ' + section.label + '</a>');
  }

  function start(section) {
    setName();
    setItems(section.items);
    currentExercise = 0;
    $('#exercise-timer').text('Ready!');

    run();
  }

  function run() {

    var i, ii,
        lis = $('#exercise-list').find('li');

    lis.removeClass('selected');
    for (i=0,ii=currentExercise;i<ii;i++) {
      $(lis[i]).addClass('done');
    }
    $(lis[currentExercise]).addClass('selected');
    setStepCount();

    if (runTimeout) {
      clearTimeout(runTimeout);
    }

    runTimeout = setTimeout(function() {
      lastExercise = currentExercise;
      currentExercise++;
      if (currentExercise < current.items.length) {
        run();
      }else{
        end();
      }
    }, current.items[currentExercise].duration);

    if (currentExercise < current.items.length) {
      if (startRunTimer) {
        clearTimeout(startRunTimer);
      }
      startRunTimer = setTimeout(function() {
        runTimer((new Date()).getTime());
      }, 1000);
    }

  }

  function runTimer(startTime, last) {
    var currentTime = Math.abs(startTime - (new Date()).getTime()),
        recurseTimerFn = function() {
          if (currentExercise < current.items.length) {
            if (currentTime <= current.items[currentExercise].duration) {
              runTimer(startTime);
            }
          }
        };

    if (runTimerTimeout) {    
      clearTimeout(runTimerTimeout);
    }

    if (initRunTimer) {
      clearTimeout(initRunTimer);
    }

    console.log('runTimer', currentTime);
    updateTime(currentTime);
    runTimerTimeout = setTimeout(recurseTimerFn, 1000);

  }

  function updateTime(currentTime) {

    var c = UTILS.msToSec(currentTime),
        d = UTILS.msToSec(current.items[currentExercise].duration),
        time = UTILS.secondsToTime(d - c);

    $('#exercise-timer').text(time);

    return time;

  }

  function end() {
    var lis = $('#exercise-list').find('li');

    $(lis[currentExercise - 1]).removeClass('selected').addClass('done');
    $('#exercise-timer').text('Workout Complete!');
  }

  function resetApp() {
    
    if (runTimerTimeout) {
      clearTimeout(runTimerTimeout);
    }
    
    if (runTimeout) {
      clearTimeout(runTimeout);
    }

    $('#exercise-steps').html('');

  }

  function startApp(sections) {
    var found = getSection();

    UTILS.sortOrder(sections);
    current = found.section;
    currentIndex = found.index;
    setNav();
    start(current || getEmptySection());
    $(window).bind('hashchange', onHashChange);

  }

  function onFlowsComplete(response) {

    sections = response;
    startApp(sections);

  }

  function onHashChange(e) {
    $(window).unbind('hashchange');
    init();
  }

  function init() {
    resetApp();
    if (!sections.length) {
      API.tenants.flows().then(onFlowsComplete);
    }else{
      startApp(sections);
    }
  }

  init();

})();
