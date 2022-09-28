// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: 'no such action',
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding action',
        })
    }
}

function validateAction(req, res, next) {
    // DO YOUR MAGIC
    let { notes, description, project_id, completed } = req;
    if (!notes || !notes.trim() &&
     !description || !description.trim() &&
      !project_id || !project_id.trim() &&
      !completed) {
      res.status(400).json({
        message: "missing fields",
      })
    } else {
      notes = notes.trim()
      description = description.trim()
      project_id = project_id.trim()
      next()
    }
  }





  module.exports ={
      validateActionId,
      validateAction,
  }