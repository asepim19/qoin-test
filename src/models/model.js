const connection = require('../database/connection');

const getById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Test01 WHERE Id = ?', [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve({ message: 'Data not found' });
        }
      }
    });
  });
};


const getAll = (page) => {
  return new Promise((resolve, reject) => {
    const limit = 20;
    const offset = (page - 1) * limit;

    connection.query('SELECT * FROM Test01 LIMIT ?, ?', [offset, limit], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const create = (data) => {
  const { Nama, Status, Created, Updated } = data;
  connection.query(
    'INSERT INTO Test01 (Nama, Status, Created, Updated) VALUES (?, ?, ?, ?)',
    [Nama, Status, Created, Updated],
    (error, results) => {
      if (error) {
        return error;
      } else {
        return results.insertId;
      }
    }
  );
};

const update = (id, data) => {
  const { Nama, Status, Updated } = data;
  connection.query(
    'UPDATE Test01 SET Nama = ?, Status = ?, Updated = ? WHERE Id = ?',
    [Nama, Status, Updated, id],
    (error, results) => {
      if (error) {
        return error;
      } else {
        return results.affectedRows;
      }
    }
  );
};

const del = (id) => {
  connection.query('DELETE FROM Test01 WHERE Id = ?', [id], (error, results) => {
    if (error) {
      return error;
    } else {
      return results.affectedRows;
    }
  });
};

module.exports = { getById, getAll, create, update, del };
