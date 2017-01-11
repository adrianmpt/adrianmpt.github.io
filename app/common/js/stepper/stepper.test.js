var stepper,
    sections,
    assert = require('chai').assert,
    STEPPER = require('./stepper.js').STEPPER;

describe('STEPPER', function() {

  before(function() {
    sections = [{
      "_id" : "58707cb95847b00ed27e8769",
      "name" : "spinal",
      "label" : "Spinal",
      "level" : 1,
      "order" : 1,
      "items" : [
        {
          "order" : 1,
          "exercise" : "Head Tilt Ear to Shoulder",
          "duration" : 10000
        },
        {
          "order" : 2,
          "exercise" : "Look Left and Right",
          "duration" : 10000
        },
        {
          "order" : 3,
          "exercise" : "Chin to Chest",
          "duration" : 10000
        },
        {
          "order" : 4,
          "exercise" : "Look Up",
          "duration" : 10000
        },
        {
          "order" : 5,
          "exercise" : "Standing Sidebend Full",
          "duration" : 10000
        },
        {
          "order" : 6,
          "exercise" : "Elbows to Tummy",
          "duration" : 10000
        },
        {
          "order" : 7,
          "exercise" : "Elbows to Sky",
          "duration" : 10000
        },
        {
          "order" : 8,
          "exercise" : "Standing Twist",
          "duration" : 10000
        },
        {
          "order" : 9,
          "exercise" : "Supine Knee to Chest",
          "duration" : 10000
        },
        {
          "order" : 10,
          "exercise" : "Supine Rotation",
          "duration" : 10000
        },
        {
          "order" : 11,
          "exercise" : "Prone Extension",
          "duration" : 10000
        },
        {
          "order" : 12,
          "exercise" : "Prone Scorpion",
          "duration" : 10000
        }
      ]
    },
      {
        "_id" : "58707cb95847b00ed27e876a",
        "name" : "upperLimbs",
        "label" : "Upper Limbs",
        "level" : 1,
        "order" : 2,
        "items" : [
          {
            "order" : 1,
            "exercise" : "Triceps OH Stretch: Reach same shoulder blade",
            "duration" : 10000
          },
          {
            "order" : 2,
            "exercise" : "OH Abduction Stretch: Reach opposite shoulder blade",
            "duration" : 10000
          },
          {
            "order" : 3,
            "exercise" : "Cross Arm",
            "duration" : 10000
          },
          {
            "order" : 4,
            "exercise" : "Wrist Flexion",
            "duration" : 10000
          },
          {
            "order" : 5,
            "exercise" : "Wrist Extension",
            "duration" : 10000
          },
          {
            "order" : 6,
            "exercise" : "Seated Shoulder Extension",
            "duration" : 10000
          },
          {
            "order" : 7,
            "exercise" : "Supine OH Stretch",
            "duration" : 10000
          },
          {
            "order" : 8,
            "exercise" : "Supine Snow Angel at 90 Degrees",
            "duration" : 10000
          },
          {
            "order" : 9,
            "exercise" : "Supine ER/Pec Stretch",
            "duration" : 10000
          },
          {
            "order" : 10,
            "exercise" : "Sidelying Sleeper Stretch Internal Rotation",
            "duration" : 10000
          }
        ]
      },
      {
        "_id" : "58707cb95847b00ed27e876b",
        "name" : "lowerLimbs",
        "label" : "Lower Limbs",
        "level" : 1,
        "order" : 3,
        "items" : [
          {
            "order" : 1,
            "exercise" : "Standing Quad Stretch",
            "duration" : 10000
          },
          {
            "order" : 2,
            "exercise" : "1st Toe DF Stretch",
            "duration" : 10000
          },
          {
            "order" : 3,
            "exercise" : "Downward Dog",
            "duration" : 10000
          },
          {
            "order" : 4,
            "exercise" : "Sitting on Heels",
            "duration" : 10000
          },
          {
            "order" : 5,
            "exercise" : "Adductor Sitting Straddle Stretch",
            "duration" : 10000
          },
          {
            "order" : 6,
            "exercise" : "Supine Individual Hip Flexion",
            "duration" : 10000
          },
          {
            "order" : 7,
            "exercise" : "Cross Body Hip Stretch",
            "duration" : 10000
          },
          {
            "order" : 8,
            "exercise" : "Hip Internal Rotation",
            "duration" : 10000
          },
          {
            "order" : 9,
            "exercise" : "Figure 4",
            "duration" : 10000
          },
          {
            "order" : 10,
            "exercise" : "Kneeling Hip Flexion For Extension",
            "duration" : 10000
          },
          {
            "order" : 11,
            "exercise" : "Full Squat",
            "duration" : 10000
          }
        ]
      }];
  });

  beforeEach(function() {
    stepper = new STEPPER();
    stepper.setSections(sections);
  });

  describe('setSections', function() {
    it('should copy sections into object', function() {
      assert.deepEqual(sections, stepper.sections);
    });
  });

  describe('findSection', function() {
    it('should copy sections into object', function() {
      var s0 = stepper.findSection('spinal'),
          s1 = stepper.findSection('upperLimbs'),
          s2 = stepper.findSection('lowerLimbs');

      assert.deepEqual(sections[0], s0.section);
      assert.equal(0, s0.index);
      assert.deepEqual(sections[1], s1.section);
      assert.equal(1, s1.index);
      assert.deepEqual(sections[2], s2.section);
      assert.equal(2, s2.index);
    });
  });

  describe('getEmptySectionItem', function() {
    it('should return an empty section item', function() {
      assert.deepEqual({
        order: 1,
        exercise: "No instructions available",
        duration: 0
      }, stepper.getEmptySectionItem());
    });
  });

  describe('getEmptySection', function() {
    it('should return an empty section item', function() {
      assert.deepEqual({
        items: [{
          order: 1,
          exercise: "No instructions available",
          duration: 0
        }],
        level: 1,
        order: 1,
        label: "No instructions",
        name: "empty"
      }, stepper.getEmptySection());
    });
  });

  describe('nextSection', function() {
    it('should get next section in order', function() {
      assert.equal('upperLimbs', stepper.nextSection().name);
    });
  });

  describe('lastSection', function() {
    it('should get next section in order', function() {
      assert.equal('lowerLimbs', stepper.lastSection().name);
    });
  });

  describe('getNextSectionIndex', function() {
    it('should get next section in order', function() {
      assert.equal(1, stepper.getNextSectionIndex());
      stepper.nextSection();
      assert.equal(2, stepper.getNextSectionIndex());
      stepper.nextSection();
      assert.equal(0, stepper.getNextSectionIndex());
    });
  });

  describe('getLastSectionIndex', function() {
    it('should get next section in order', function() {
      assert.equal(2, stepper.getLastSectionIndex());
      stepper.nextSection();
      assert.equal(0, stepper.getLastSectionIndex());
      stepper.nextSection();
      assert.equal(1, stepper.getLastSectionIndex());
    });
  });

  describe('getSectionByOrder', function() {
    it('should get next section in order', function() {
      assert.equal(2, stepper.getSectionByOrder('next').order);
      assert.equal(3, stepper.getSectionByOrder('next').order);
      assert.equal(1, stepper.getSectionByOrder('next').order);
    });
  });

  describe('getSectionByOrder', function() {
    it('should get last section in order', function() {
      assert.equal(3, stepper.getSectionByOrder('last').order);
      assert.equal(2, stepper.getSectionByOrder('last').order);
      assert.equal(1, stepper.getSectionByOrder('last').order);
    });
  });

  describe('getCurrent', function() {
    it('should get last section in order', function() {
      assert.equal(1, stepper.getCurrent().order);
      stepper.getSectionByOrder('next');
      assert.equal(2, stepper.getCurrent().order);
      stepper.getSectionByOrder('last');
      assert.equal(1, stepper.getCurrent().order);
    });
  });

});