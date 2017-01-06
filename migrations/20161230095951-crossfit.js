'use strict';

var dbm,
    type,
    seed,
    async = require('async');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  async.series([
    db.createCollection.bind(db, 'crossfit'),
    db.insert.bind(db, 'crossfit', [
      {
        name: 'spinal',
        label: 'Spinal',
        level: 1,
        order: 1,
        items: [
          {
            "order": 1,
            "exercise": "Head Tilt Ear to Shoulder",
            "duration": 10000
          },
          {
            "order": 2,
            "exercise": "Look Left and Right",
            "duration": 10000
          },
          {
            "order": 3,
            "exercise": "Chin to Chest",
            "duration": 10000
          },
          {
            "order": 4,
            "exercise": "Look Up",
            "duration": 10000
          },
          {
            "order": 5,
            "exercise": "Standing Sidebend Full",
            "duration": 10000
          },
          {
            "order": 6,
            "exercise": "Elbows to Tummy",
            "duration": 10000
          },
          {
            "order": 7,
            "exercise": "Elbows to Sky",
            "duration": 10000
          },
          {
            "order": 8,
            "exercise": "Standing Twist",
            "duration": 10000
          },
          {
            "order": 9,
            "exercise": "Supine Knee to Chest",
            "duration": 10000
          },
          {
            "order": 10,
            "exercise": "Supine Rotation",
            "duration": 10000
          },
          {
            "order": 11,
            "exercise": "Prone Extension",
            "duration": 10000
          },
          {
            "order": 12,
            "exercise": "Prone Scorpion",
            "duration": 10000
          }
        ]
      },
      {
        name: "upperLimbs",
        label: "Upper Limbs",
        level: 1,
        order: 2,
        items: [
          {
            order: 1,
            exercise: "Triceps OH Stretch: Reach same shoulder blade",
            duration: 10000
          },
          {
            order: 2,
            exercise: "OH Abduction Stretch: Reach opposite shoulder blade",
            duration: 10000
          },
          {
            order: 3,
            exercise: "Cross Arm",
            duration: 10000
          },
          {
            order: 4,
            exercise: "Wrist Flexion",
            duration: 10000
          },
          {
            order: 5,
            exercise: "Wrist Extension",
            duration: 10000
          },
          {
            order: 6,
            exercise: "Seated Shoulder Extension",
            duration: 10000
          },
          {
            order: 7,
            exercise: "Supine OH Stretch",
            duration: 10000
          },
          {
            order: 8,
            exercise: "Supine Snow Angel at 90 Degrees",
            duration: 10000
          },
          {
            order: 9,
            exercise: "Supine ER/Pec Stretch",
            duration: 10000
          },
          {
            order: 10,
            exercise: "Sidelying Sleeper Stretch Internal Rotation",
            duration: 10000
          }
        ]
      },
      {
        name: "lowerLimbs",
        label: "Lower Limbs",
        level: 1,
        order: 3,
        items: [
          {
            order: 1,
            exercise: "Standing Quad Stretch",
            duration: 10000
          },
          {
            order: 2,
            exercise: "1st Toe DF Stretch",
            duration: 10000
          },
          {
            order: 3,
            exercise: "Downward Dog",
            duration: 10000
          },
          {
            order: 4,
            exercise: "Sitting on Heels",
            duration: 10000
          },
          {
            order: 5,
            exercise: "Adductor Sitting Straddle Stretch",
            duration: 10000
          },
          {
            order: 6,
            exercise: "Supine Individual Hip Flexion",
            duration: 10000
          },
          {
            order: 7,
            exercise: "Cross Body Hip Stretch",
            duration: 10000
          },
          {
            order: 8,
            exercise: "Hip Internal Rotation",
            duration: 10000
          },
          {
            order: 9,
            exercise: "Figure 4",
            duration: 10000
          },
          {
            order: 10,
            exercise: "Kneeling Hip Flexion For Extension",
            duration: 10000
          },
          {
            order: 11,
            exercise: "Full Squat",
            duration: 10000
          }
        ]
      }
    ])
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.dropCollection.bind(db, 'crossfit')
  ], callback);
};

exports._meta = {
  "version": 1
};