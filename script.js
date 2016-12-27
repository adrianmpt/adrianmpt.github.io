(function() {
  
  var current,
      runTimeout,
      runTimerTimeout
      currentExercise = 0,
      sections = [
        {
          name: "spinal",
          label: "Spinal",
          last: 'lowerLimbs',
          next: 'upperLimbs',
          items: [
            {
              order: 1,
              exercise: "Head tilt ear to shoulder",
              duration: 10000
            },
            {
              order: 2,
              exercise: "look left and right",
              duration: 10000
            },
            {
              order: 3,
              exercise: "chin to chest",
              duration: 10000
            },
            {
              order: 4,
              exercise: "look up",
              duration: 10000
            },
            {
              order: 5,
              exercise: "standing sidebend full",
              duration: 10000
            },
            {
              order: 6,
              exercise: "elbows to tummy",
              duration: 10000
            },
            {
              order: 7,
              exercise: "elbows to sky",
              duration: 10000
            },
            {
              order: 8,
              exercise: "standing twist",
              duration: 10000
            },
            {
              order: 9,
              exercise: "Supine knee to chest",
              duration: 10000
            },
            {
              order: 10,
              exercise: "supine rotation",
              duration: 10000
            },
            {
              order: 11,
              exercise: "prone extension",
              duration: 10000
            },
            {
              order: 12,
              exercise: "prone scorpion",
              duration: 10000
            }
          ]
        },
        {
          name: "upperLimbs",
          label: "Upper Limbs",
          last: 'spinal',
          next: 'lowerLimbs',
          items: [
            {
              order: 1,
              exercise: "Triceps OH stretch: reach same shoulder blade",
              duration: 10000
            },
            {
              order: 2,
              exercise: "OH Abduction Stretch: reach opposite shoulder blade",
              duration: 10000
            },
            {
              order: 3,
              exercise: "Cross arm",
              duration: 10000
            },
            {
              order: 4,
              exercise: "Wrist flexion",
              duration: 10000
            },
            {
              order: 5,
              exercise: "Wrist extension",
              duration: 10000
            },
            {
              order: 6,
              exercise: "Seated shoulder extension",
              duration: 10000
            },
            {
              order: 7,
              exercise: "Supine OH stretch",
              duration: 10000
            },
            {
              order: 8,
              exercise: "Supine snow angel at 90 degrees",
              duration: 10000
            },
            {
              order: 9,
              exercise: "Supine ER/pec stretch",
              duration: 10000
            },
            {
              order: 10,
              exercise: "Sidelying sleeper stretch internal rotation",
              duration: 10000
            }
          ]
        },
        {
          name: "lowerLimbs",
          label: "Lower Limbs",
          last: 'upperLimbs',
          next: 'spinal',
          items: [
            {
              order: 1,
              exercise: "Standing quad stretch",
              duration: 10000
            },
            {
              order: 2,
              exercise: "1st Toe DF stretch",
              duration: 10000
            },
            {
              order: 3,
              exercise: "Downward dog",
              duration: 10000
            },
            {
              order: 4,
              exercise: "Sitting on heels",
              duration: 10000
            },
            {
              order: 5,
              exercise: "Adductor sitting straddle stretch",
              duration: 10000
            },
            {
              order: 6,
              exercise: "Supine individual hip flexion",
              duration: 10000
            },
            {
              order: 7,
              exercise: "Cross body hip stretch",
              duration: 10000
            },
            {
              order: 8,
              exercise: "Hip internal rotation",
              duration: 10000
            },
            {
              order: 9,
              exercise: "Figure 4",
              duration: 10000
            },
            {
              order: 10,
              exercise: "Kneeling hip flexion for extension",
              duration: 10000
            },
            {
              order: 11,
              exercise: "Full squat",
              duration: 10000
            }
          ]
        }
      ];

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
      ol.append('<li>(' + convertToTime(msToSec(items[i].duration)) + ') ' + items[i].exercise + '</li>');
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
    next.append('<a href="#' + section.name + '">' + section.label + '</a>');
  }

  function setLast() {
    var section = findSection(current.last),
        last = $('#exercise-last');

    last.html('');
    last.append('<a href="#' + section.name + '">' + section.label + '</a>');
  }

  function start(section) {
    setName();
    setItems(section.items);
    currentExercise = 0;
    $('#exercise-timer').text('Ready!');

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

    runTimerTimeout = setTimeout(function() {
      if (currentExercise < current.items.length && 
          currentTime <= current.items[currentExercise].duration) {
        updateTime(currentTime);
        runTimer();
      }
    }, 1000);
  }

  function updateTime(currentTime) {
    var c = msToSec(currentTime),
        d = msToSec(current.items[currentExercise].duration);

    $('#exercise-timer').text(convertToTime(d - c));
  }

  function end() {
    var lis = $('#exercise-list').find('li');

    $(lis[currentExercise - 1]).removeClass('selected').addClass('done');
    $('#exercise-timer').text('Workout Complete!');
  }

  function convertToTime(second) {
    var r = '',
        sec = second % 60;
        min = parseInt(second / 60, 10);

    if (min > 0 && min < 9) {
      r += '0' + min;
    }else if (min <= 0) {
      r += '00';
    }else{
      r += min;
    }
    
    r += ':';

    if (sec < 10) {
      r += '0' + sec;
    }else{
      r += sec;
    }

    return r;

  }

  function msToSec(ms) {
    return parseInt(ms / 1000, 10);
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