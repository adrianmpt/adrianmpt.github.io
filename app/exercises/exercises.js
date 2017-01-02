(function() {

  var current,
      runTimerTimeout,
      startRunTimer,
      startDelayTimer,
      startDelayInterval = 3,
      runEndDelayTimer,
      runEndDelayInterval = 3,
      currentIndex = 0,
      totalDuration = 0,
      currentDuration = 0,
      currentExercise = 0,
      transpiredDuration = 0,
      sections = [],
      startDelayMessaging = [
        'Ready',
        'Set',
        'Go!'
      ],
      runEndDelayMessage = 'Cooldown',
      endMessage = 'Workout Complete!';

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

    run();
  }

  function startDelay(seconds, count) {
    var _count = count || 0,
        interval = UTILS.secToMs(seconds) / 3;

    $('#exercise-timer').text(startDelayMessaging.slice(0)[_count]);

    // Cleanup any old timer
    if (startDelayTimer) {
      clearTimeout(startDelayTimer);
    }

    if (_count < startDelayMessaging.length) {
      startDelayTimer = setTimeout(function () {
        startDelay(seconds, ++_count);
      }, interval);
    }else{
      runTimer((new Date()).getTime());
    }
  }

  /**
   * At the end of every run add a delay with message
   * before beginning next run sequence
   * @param seconds
   */
  function runEndDelay(seconds) {

    var interval = UTILS.secToMs(seconds);

    if (runEndDelayTimer) {
      clearTimeout(runEndDelayTimer);
    }

    $('#exercise-timer').text(runEndDelayMessage + ' (' + runEndDelayInterval + 's)');

    runEndDelayTimer = setTimeout(function() {
      run();
    }, interval);

  }

  /**
   * Pick up next exercise in sequence and begin anew
   */
  function run() {

    var i, ii,
        lis = $('#exercise-list').find('li');

    lis.removeClass('selected');
    for (i=0,ii=currentExercise;i<ii;i++) {
      $(lis[i]).addClass('done');
    }
    $(lis[currentExercise]).addClass('selected');
    setStepCount();

    lastExercise = currentExercise;
    currentExercise++;

    // Clean up any old timer
    if (startRunTimer) {
      clearTimeout(startRunTimer);
    }

    if (currentExercise < current.items.length) {
      startDelay(startDelayInterval);
    }else{
      end();
    }

  }

  /**
   * Runs using the startTime in milliseconds
   * @param startTime
   */
  function runTimer(startTime) {
    var currentTime = Math.abs(startTime - (new Date()).getTime()),
        recurseTimerFn = function() {
          if (currentExercise < current.items.length) {
            // Count down until the duration is up and recurse
            // otherwise restart the entire run sequence
            // to get the next exercise
            if (currentTime <= current.items[currentExercise].duration) {
              runTimer(startTime);
            }else{
              runEndDelay(runEndDelayInterval);
            }
          }
        };

    if (runTimerTimeout) {
      clearTimeout(runTimerTimeout);
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
    $('#exercise-timer').text(endMessage);
  }

  function resetApp() {
    
    if (runTimerTimeout) {
      clearTimeout(runTimerTimeout);
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
