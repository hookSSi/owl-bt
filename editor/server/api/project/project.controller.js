'use strict';

const path = require('path');
const project = require('../../components/project');

exports.index = function(req, res, next) {
  let currentPath = req.query.path;
  if (!currentPath) {
    res.status(400).send('Missing path');
    return;
  }
  if (!path.isAbsolute(currentPath)) {
    res.status(400).send('Path must be absolute');
    return;
  }

  let pathDir = path.dirname(currentPath);
  project.getProject(pathDir)
    .then(prj => {
      if (!prj) {
        res.status(404).send('No project found');
      } else {
        res.contentType('application/json').send(prj.content)
      }
    })
    .catch(err => {
      next(err);
    });

};
