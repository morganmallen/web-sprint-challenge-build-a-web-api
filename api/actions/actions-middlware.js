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
    console.log('req body, ', req.body)
   const { notes, description, project_id } = req.body
   if (!notes || !description || !project_id ) {
        res.status(400).json({
            message: 'missing fields'
        })
    } else {
        next()
    }
  }





  module.exports ={
      validateActionId,
      validateAction,
  }