(function(options) {

  var current,
      startRunTimer,
      startDelayTimer,
      progressTimer,
      chain = true,
      chainTimeout,
      runEndDelayTimer,
      currentIndex = 0,
      totalDuration = 0,
      lastExercise = 0,
      currentExercise = 0,
      sections = [];

  var CONFIG = {
    chain: true,
    chainTimeoutInterval: 3,
    startDelayInterval: 3,
    runEndDelayInterval: 3,
    tickInterval: 1,
    startDelayMessaging: [
      'Ready',
      'Set',
      'Go!'
    ],
    runEndDelayMessage: 'Cooldown',
    endMessage: 'Workout Complete!'
  };

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

  function getNextSectionIndex() {
    var r = currentIndex + 1;

    if (r === sections.length) {
      r = 0;
    }

    return r;
  }

  function getLastSectionIndex() {
    var r = currentIndex - 1;

    if (r < 0) {
      r = sections.length - 1;
    }

    return r;
  }

  function getSectionByOrder(direction) {

    var r = getEmptySection(),
        nextIndex,
        lastIndex;

      if (direction === 'next') {
        nextIndex = getNextSectionIndex();
        if (sections[nextIndex]) {
          r = sections[nextIndex];
        }
      }else if (direction === 'last') {
        lastIndex = getLastSectionIndex();
        if (sections[lastIndex]) {
          r = sections[lastIndex];
        }
      }

    return r;

  }

  function setName() {
    $('#flow-name').text(current.label);
  }

  function setStepCount() {
    $('#flow-count').text(': ' + (currentExercise + 1) + ' of ' + current.items.length);
    $('#exercise-name').text(current.items[lastExercise].exercise);
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
    next.append('<a class="btn btn-danger" href="#' + section.name + '"><span class="hidden-sm-down">' + section.label + '</span> <span class="fa fa-arrow-circle-right" role="presentation"></span></a>');
  }

  function setLast() {
    var section = getSectionByOrder('last'),
        last = $('#exercise-last');

    last.html('');
    last.append('<a class="btn btn-danger" href="#' + section.name + '"><span class="fa fa-arrow-circle-left" role="presentation"></span> <span class="hidden-sm-down">' + section.label + '</span></a>');
  }

  function setTotalDuration() {
    var i, ii,
        total = 0;

    for (i=0,ii=current.items.length;i<ii;i++) {
      total += UTILS.secToMs(CONFIG.startDelayInterval) +
        UTILS.secToMs(CONFIG.runEndDelayInterval) +
        current.items[i].duration;
    }

    return totalDuration = total;
  }

  function start(section, init) {
    setName();
    setItems(section.items);
    lastExercise = 0;
    currentExercise = 0;

    run(init);
  }

  function startDelay(seconds, count) {
    var _count = count || 0,
        interval = UTILS.secToMs(seconds) / 3,
        exerciseTimer = $('#exercise-timer'),
        exerciseTimer2 = $('#exercise-timer-2');

    exerciseTimer.text(CONFIG.startDelayMessaging.slice(0)[_count]);

    // Cleanup any old timer
    if (startDelayTimer) {
      clearTimeout(startDelayTimer);
    }

    if (_count < CONFIG.startDelayMessaging.length) {
      startDelayTimer = setTimeout(function () {
        startDelay(seconds, ++_count);
      }, interval);
    }else{

      exerciseTimer.bind('TIMER::Tick', function(e, data) {
        exerciseTimer.text(data.time);
      });

      exerciseTimer.bind('TIMER::COMPLETE', function(e, data) {
        runEndDelay(CONFIG.runEndDelayInterval);
      });

      new TIMER({
        delegate: exerciseTimer,
        timesync: false,
        tickInterval: CONFIG.tickInterval,
        duration: UTILS.msToSec(current.items[lastExercise].duration)
      }).start(true, true);

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

    if (typeof(CONFIG.runEndDelayMessage) === 'string' &&
        CONFIG.runEndDelayMessage.length) {
      $('#exercise-timer').text(CONFIG.runEndDelayMessage + ' (' + CONFIG.runEndDelayInterval + 's)');
    }

    runEndDelayTimer = setTimeout(function() {
      run();
    }, interval);

  }

  /**
   * Pick up next exercise in sequence and begin anew
   */
  function run(init) {

    var i, ii,
        lis = $('#exercise-list').find('li');

    lis.removeClass('selected');
    for (i=0,ii=currentExercise;i<ii;i++) {
      $(lis[i]).addClass('done');
    }
    $(lis[currentExercise]).addClass('selected');

    setStepCount();

    // Clean up any old timer
    if (startRunTimer) {
      clearTimeout(startRunTimer);
    }

    if (currentExercise < current.items.length) {
      startDelay(CONFIG.startDelayInterval);
      if (init) {
        if (progressTimer) {
          clearInterval(progressTimer);
        }
        startProgress();
      }
    }else{
      end();
    }

    lastExercise = currentExercise;
    currentExercise++;

  }

  function startProgress() {
    var progressStartTime = (new Date()).getTime();

    setTotalDuration();

    progressTimer = setInterval(function() {
      var progressCurrentTime = (new Date()).getTime(),
          progressDeltaTime = progressCurrentTime - progressStartTime;

      if (progressDeltaTime < totalDuration) {
        checkProgress(progressDeltaTime);
      }

    }, 1);
  }

  function endProgress() {
    if (progressTimer) {
      clearInterval(progressTimer);
    }
    checkProgress(totalDuration);
  }

  function checkProgress(time) {
    var progress = (time / totalDuration) * 100;
    $('#exercise-progress').val(progress);
  }

  function end() {
    var lis = $('#exercise-list').find('li'),
        timer = $('#exercise-timer'),
        nextSection = sections[getNextSectionIndex()];

    $(lis[lastExercise]).removeClass('selected').addClass('done');
    timer.text(CONFIG.endMessage);
    if (chainTimeout) {
      clearTimeout(chainTimeout);
    }
    if (chain) {
      timer.after($('<p id="exercise-continue" class="font-md text-xs-center">Continuing on to ' + nextSection.label + ' in ' + CONFIG.chainTimeoutInterval + ' seconds</p>'));
      chainTimeout = setTimeout(function() {
        window.location.hash = nextSection.name;
      }, UTILS.secToMs(CONFIG.chainTimeoutInterval));
    }else{
      timer.after($('<p id="exercise-continue" class="text-xs-center"><a class="btn btn-danger" href="#' + nextSection.name + '">Continue on to ' + nextSection.label + ' <span class="fa fa-arrow-circle-right" role="presentation"></span></a></p>'));
    }
    endProgress();
  }

  function resetApp() {

    $('#exercise-steps').html('');
    $('#exercise-continue').remove();

  }

  function startApp(sections) {

    var found = getSection();

    UTILS.sortOrder(sections);
    current = found.section;
    currentIndex = found.index;
    setNav();
    start(current || getEmptySection(), true);
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

  function init(options) {

    CONFIG = $.extend(CONFIG, options);

    resetApp();
    if (!sections.length) {
      API.tenants.flows().then(onFlowsComplete);
    }else{
      startApp(sections);
    }
  }

  init(options);

})({
  chain: false,
  chainTimeoutInterval: 1,
  startDelayInterval: 0,
  runEndDelayInterval: 1,
  tickInterval: 1,
  startDelayMessaging: [],
  runEndDelayMessage: '',
  endMessage: 'You Done Good!'
});
