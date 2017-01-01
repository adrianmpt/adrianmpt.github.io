(function() {
  
  var current,
      runTimeout,
      runTimerTimeout,
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

  function getEmptySection() {

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
        r = sections[nextIndex];
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
      runTimer((new Date()).getTime(), true);
    }

  }

  function runTimer(startTime, init) {
    var currentTime = Math.abs(startTime - (new Date()).getTime());

    if (runTimerTimeout) {    
      clearTimeout(runTimerTimeout);
    }

    console.log('runTimer', currentTime);

    runTimerTimeout = setTimeout(function() {
      if (currentExercise < current.items.length && 
          currentTime <= current.items[currentExercise].duration) {
        updateTime(currentTime);
        runTimer(startTime);
      }
    }, 1000);
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
    start(current);
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
