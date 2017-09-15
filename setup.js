var util = require('util');
var async = require('async');
var notesdb = require('./notesdb-sqlite3');
//var notesdb = require('./notesdb-mongoose');

notesdb.connect(function (error) {
  if (error) throw error;
});

notesdb.setup(function (error) {
  if (error) {
    util.log('ERROR ' + error);
    throw error;
  }
  async.series([function (cb) {
    notesdb.add('Lorem Ipsum ', "Cras metus sed fdsf .fdsFDS, fdsgfdsgds,erewrew.",
    function (error) {
      if (error) util.log('ERRor' + error);
      cb(error);
    });
  }], function (error, results) {
    if (error) util.log('ERROR ' + error);
    notesdb.disconnect(function (err) {});
  });
});



