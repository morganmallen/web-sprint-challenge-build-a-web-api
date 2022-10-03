// add middlewares here related to projects
const Project = require('./projects-model')

function logger(req, res, next) {
    // DO YOUR MAGIC
    const timeStamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timeStamp}] ${method} to ${url}`)
    next()
  }

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: 'no such project',
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding project',
        })
    }
}

function validateProject(req, res, next) {
  // DO YOUR MAGIC
  console.log('req body ', req.body);  
  const { name, description, completed } = req.body
  if (!name || !description || (completed === null || completed === undefined) ) {
      res.status(400).json({
          message: "missing fields"
      })
  } else {
      next()
  }
}


  module.exports ={
      logger,
      validateProjectId,
      validateProject,
  }