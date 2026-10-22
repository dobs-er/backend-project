import express from 'express'
import db from '../db.js'

const router = express.Router()


//Get all todos for a specific user
router.get('/', (req, res)=>{

})

//Create a new todo for a specific user
router.post('/', (req, res)=>{

})

//Update a specific todo for a specific user
router.put('/:id', (req, res)=>{

})

//Delete a specific todo for a specific user
router.delete('/:id', (req, res)=>{

})

export default router