const model = require('../models/model');
const rabbitMQProducer = require('../messages/rabbitMQProducer');

const create = (data) => {
  rabbitMQProducer.sendMessage('create', data);
};

const update = (id, data) => {
  rabbitMQProducer.sendMessage('update', { Id: id, ...data });
};

const del = (id) => {
  rabbitMQProducer.sendMessage('delete', { Id: id });
};

module.exports = { create, update, del };
