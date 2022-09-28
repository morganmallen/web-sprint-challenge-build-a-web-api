// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model')
const router = express.Router();

const {
    validateAction,
    validateActionId,
} = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Action.get()
      .then(users => {
        res.json(users)
      })
      .catch(next)
  });

router.get('/:id', validateActionId, async (req, res) => {
    try{
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: 'no ID found'
            })
        } else {
            res.json(action)
        }
    }
    catch(err) {
        res.status(404).json({
            message: 'no actions',
            err: err.message,
            stack: err.stack,
        })
    }
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert({
        notes: req.notes,
        description: req.description,
        project_id: req.project_id 
    })
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
});

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, {
         notes: req.notes,
         description: req.description,
         project_id: req.project_id,
         completed: req.completed
         })
    .then(() => {
      return Action.get(req.params.id)
    })
    .then(user => {
      res.json(user)
    })
      .catch(next)
   });

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
        next(err)
    }
});




module.exports = router

