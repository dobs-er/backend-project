import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router()


// Register a new user
router.post('/register', (req, res)=>{
    const {username, password} = req.body

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 10)

    // save the new user and hashed password in the database
    try{
        const insertUser = db.prepare(`
            INSERT INTO users(username, password)
            VALUES(?,?) 
            
            `)

            const result = insertUser.run(username, hashedPassword)


            const defaultTodo = `Hello:) Add your first task!`
            const insertTodo = db.prepare(`
                INSERT INTO todos(user_id, task)
                VALUES(?, ?)
            `)
            insertTodo.run(result.lastInsertRowid, defaultTodo)
            
            // create a JWT token for the new user
            const token = jwt.sign({id: result.lastInsertRowid}, 
                process.env.JWT_SECRET, { expiresIn: '24h' })
                res.json({ token })
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)

    }


})

// log in a registered user
router.post('/login', (req, res)=>{
    
    
})

export default router