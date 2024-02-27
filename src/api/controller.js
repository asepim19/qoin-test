const service = require('../services/service');
const model = require('../models/model');


const getById = async (req, res) => {
  const id = req.params.id;
  const data = await model.getById(id);
  res.json(data);
};

const getAll = async (req, res) => {
  const data = await model.getAll(req.query.page);
  res.json(data);
};

const create = (req, res) => {
  const { Nama, Status } = req.body;
  const created = formatDate(new Date());
  const updated = created;

  const data = service.create({ Nama, Status, Created: created, Updated: updated });
  res.json({ message: 'Data creation request sent successfully' });
};

const update = (req, res) => {
  const id = req.params.id;
  const { Nama, Status } = req.body;
  const updated = formatDate(new Date());

  service.update(id, { Nama, Status, Updated: updated });
  res.json({ message: 'Data update request sent successfully' });
};

const del = (req, res) => {
  const id = req.params.id;
  service.del(id);
  res.json({ message: 'Data deletion request sent successfully' });
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}

const formatDate = (date) => {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

module.exports = { getById, getAll, create, update, del };
