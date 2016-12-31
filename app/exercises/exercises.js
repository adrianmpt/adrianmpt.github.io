(function() {
  
  var current,
      runTimeout,
      runTimerTimeout,
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
        r = sections[i];
        break;
      }
    }

    return r;
  }

  function findSectionOrder(order, direction) {
    var r,
        i, ii;

    for (i=0,ii=sections.length;i<ii;i++) {
      if (direction === 'next') {
        if (sections[i].order === order + 1) {
          r = sections[i];
          break;
        }
      }else if (direction === 'last') {
        if (sections[i].order === order - 1) {
          r = sections[i];
          break;
        }
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
    //setNext();
    //setLast();
  }

  function setNext() {
    var section = findSectionOrder(current.order, 'next'),
        next = $('#exercise-next');

    next.html('');
    next.append('<a href="#' + section.name + '">' + section.label + ' <span class="fa fa-arrow-circle-right" role="presentation"></span></a>');
  }

  function setLast() {
    var section = findSectionOrder(current.order, 'last'),
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
      startTime = (new Date()).getTime();
      runTimer(true);
    }

  }

  function runTimer(init) {
    var currentTime = Math.abs(startTime - (new Date()).getTime());

    if (runTimerTimeout) {    
      clearTimeout(runTimerTimeout);
    }

    runTimerTimeout = setTimeout(function() {
      if (currentExercise < current.items.length && 
          currentTime <= current.items[currentExercise].duration) {
        updateTime(currentTime);
        runTimer();
      }
    }, 1000);
  }

  function updateTime(currentTime) {
    var c = UTILS.msToSec(currentTime),
        d = UTILS.msToSec(current.items[currentExercise].duration);

    $('#exercise-timer').text(UTILS.secondsToTime(d - c));
  }

  function end() {
    var lis = $('#exercise-list').find('li');

    $(lis[currentExercise - 1]).removeClass('selected').addClass('done');
    $('#exercise-timer').text('Workout Complete!');
  }

  function onHashChange(e) {
    $(window).unbind('hashchange');
    init();
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

  function onFlowsComplete(response) {
    sections = response;
    current = getSection();
    setNav();
    start(current);
    $(window).bind('hashchange', onHashChange);
  }

  function init() {
    resetApp();
    API.tenants.flows().then(onFlowsComplete);
  }

  init();

})();
