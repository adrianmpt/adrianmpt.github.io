(function() {
  
  var current,
      runTimeout,
      runTimerTimeout,
      startTime = 0,
      totalDuration = 0,
      currentDuration = 0,
      currentExercise = 0,
      transpiredDuration = 0,
      sections = SECTIONS.slice(0);
      
  function getSection() {
    return findSection(window.location.hash.replace('#', ''));
  }

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

  function setName() {
    $('#exercise-name').text(current.label);
  }

  function setStepCount() {
    $('#exercise-count').text(': ' + (currentExercise + 1) + ' of ' + current.items.length);
  }

  function setItems(items) {
    var ol = $('<ol id="exercise-list"></ol>');

    for (i=0,ii=items.length;i<ii;i++) {
      ol.append('<li><span class="exercise-list-item-time">' + UTILS.secondsToTime(UTILS.msToSec(items[i].duration)) + '</span><span class="exercise-list-item-name"> ' + items[i].exercise + '</span></li>');
    }

    $('#exercise-steps').append(ol);
  }

  function setNav() {
    setNext();
    setLast();
  }

  function setNext() {
    var section = findSection(current.next),
        next = $('#exercise-next');

    next.html('');
    next.append('<a href="#' + section.name + '">' + section.label + ' <span class="fa fa-arrow-circle-right" role="presentation"></span></a>');
  }

  function setLast() {
    var section = findSection(current.last),
        last = $('#exercise-last');

    last.html('');
    last.append('<a href="#' + section.name + '"><span class="fa fa-arrow-circle-left" role="presentation"></span> ' + section.label + '</a>');
  }

  function start(section) {
    setName();
    setItems(section.items);
    currentExercise = 0;

    run();
  }

  function run() {

    var lis = $('#exercise-list').find('li');

    lis.removeClass('selected');
    for (i=0,ii=currentExercise;i<ii;i++) {
      $(lis[i]).addClass('done');
    }
    $(lis[currentExercise]).addClass('selected');
    setStepCount();

    if (currentExercise < current.items.length) {
      $('#exercise-timer').css({ fontSize: '420%' }).text(current.items[currentExercise].exercise);
    }

    if (runTimeout) {
      clearTimeout(runTimeout);
    }

    lastExercise = currentExercise;

    runTimeout = setTimeout(function() {
      if (currentExercise < current.items.length) {
        startTime = (new Date()).getTime();
        runTimer(true);
      }else{
        end();
      }
    }, 1000);
  }

  function runTimer(init) {
    var currentTime = Math.abs(startTime - (new Date()).getTime());

    if (runTimerTimeout) {
      clearTimeout(runTimerTimeout);
    }

    console.log(currentExercise, currentTime, current.items[currentExercise].duration + 1000);

    runTimerTimeout = setTimeout(function() {
      if (currentExercise < current.items.length) {
        if (currentTime <= current.items[currentExercise].duration + 1000) {
          $('#exercise-timer').css({ fontSize: '620%' });
          updateTime(currentTime);
          runTimer();
        }else{
          currentExercise++;
          run();
        }
      }else{
        end();
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

  function init() {
    resetApp();
    current = getSection();
    setNav();
    start(current);
    $(window).bind('hashchange', onHashChange);
  }

  init();

})();
