exports.emptyNote = { "ts": "", author: "", note: "" };
exports.add = function (author, note, callback) {
  db.run("INSERT INTO  notes (ts, author, note) VALUES ( ?,?,?);", [new Date(), author, note],
  function (error) {
    if (error) {
      util.log('FAIL to add ' + error);
      callback(error);
    } else
      callback(null);
  });
};

exports.delete = function (ts, callback) {
  db.run("DELETE FROM notes WHERE ts = ?;", [ts],
  function (err) {
    if (err) {
      util.log('FAIL to delete ' + err);
      callback(err);
    } else
      callback(null);
  });
};

exports.edit = function (ts, author, note, callback) {
  db.run("UPDATE notes " +
      "SET ts = ?, author = ?, note = ? " +
      "WHERE ts = ?",
      [ts, author, note, ts],
      function (err) {
        if (err) {
          util.log('FAIL on updating table ' + err);
          callback(err);
        } else
          callback(null);
      });
};

exports.allNotes = function (callback) {
  util.log(' in allNote');
  db.all("SELECT * FROM notes", callback);
};

exports.forAll = function (doEach, done) {
  db.each("SELECT * FROM notes", function (err, row) {
    if (err) {
      util.log('FAIL to retrieve row ' + err);
      done(err, null)
    } else
      doEach(null, row)
  }, done);
};

exports.findNoteById = function (ts, callback) {
  var didOne = false;
  db.each(
      "SELECT * FROM notes WHERE ts = ?",
      [ts],
      function (err, row) {
        if (err) {
          util.log('FAIL to retrieve row ' + err);
          callback(err, null);
        } else if (!didOne) {
          callback(null, row);
          didOne = true;
        }
      });
};
