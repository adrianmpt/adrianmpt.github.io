var TimeSync = function() {

  // create a timesync instance
  return timesync.create({
    server: '/timesync',
    interval: 10000
  });

  /*
  // get notified on changes in the offset
  ts.on('change', function (offset) {
    document.write('changed offset: ' + offset + ' ms<br>');
  });

  // get synchronized time
  setInterval(function () {
    var now = new Date(ts.now());
    document.write('now: ' + now.toISOString() + ' ms<br>');
  }, 1000);
  */

};

if (typeof module !== 'undefined' && module.exports != null) {
  exports.TimeSync = TimeSync;
}
