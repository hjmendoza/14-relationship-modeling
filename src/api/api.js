'use strict';

import express from 'express';
const router = express.Router();

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.send('Welcome');
  res.end();
});

router.get('/api/v1/:model', (req, res, next) => {
  if (req.model === undefined) {
    res.statusCode = 500;
  } else {
    req.model.find({})
      .then(data => sendJSON(res, data))
      .catch(next);
  }

});

router.get('/api/v1/:model/:id', (req, res, next) => {
  req.model.findById(req.params.id)
    .then(data => {
      if (data === null) {
        res.send('404');
        res.end();
      } else {
        sendJSON(res, data);
      }
    })
    .catch(next);
});


router.post('/api/v1/:model', (req, res, next) => {
  let record = new req.model(req.body);
  record.save()
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  req.model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    .then((data) => {
      sendJSON(res, data);
    })
    .catch(next);
});


router.delete('/api/v1/:model/:id', (req, res, next) => {
  req.model.findByIdAndDelete(req.params.id)
    .then(() => {
      let data = `${req.params.id} deleted`;
      sendJSON(res, data);
    })
    .catch(next);
});


let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default router;