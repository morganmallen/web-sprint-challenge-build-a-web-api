// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model')

const router = express.Router();
const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware')
   

router.get('/', (req, res, next) => {
    Project.get()
      .then(users => {
        res.json(users)
      })
      .catch(next)
  });

router.get('/:id', validateProjectId, async (req, res) => {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: 'no ID found'
            })
        } else {
            res.json(project)
        }
    }
    
    catch(err)  {
        res.status(404).json({
            message: "no projects",
            err: err.message,
            stack: err.stack,
        })
    }
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(() => {
            return Project.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
    });

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
});

module.exports = router


