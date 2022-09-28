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
  let { name, description, completed } = req;
  if (!name || !name.trim() &&
   !description || !description.trim() &&
   !completed || !completed.trim()) {
    res.status(400).json({
      message: 'missing required fields',
    })
  } else {
    name = name.trim()
    description = description.trim()
    completed = completed.trim()
    next()
  }
}



  module.exports ={
      logger,
      validateProjectId,
      validateProject,
  }