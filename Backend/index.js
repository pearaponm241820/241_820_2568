const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;

app.use(bodyParser.text());

let users = []
let counter = 1;

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'testdb',
        port: 8820
    })
}
        //path = GET /users
try {
let user = req.body;
const result = await conn.query('INSERT INTO users SET ?', user);
 res.json({
    message: 'User created successfully',
    data: result[0]
})
}catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({
        message: 'Error creating user',
        error: err.message
    })
}
        //path = GET /user/:id
app.get('/user/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(results[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({
            message: 'Error fetching user',
            error: err.message
        })
    }
})
        //path = PUT /user/:id
        app.put('/user/:id', (req, res) => {
            let id = req.params.id;
            let updatedUser = req.body;
            //หา user จาก id
            let selectedIndex = users.findIndex(user => user.id == id)
            //update user  นั้น
            if (selectedIndex !== -1) {
                users[selectedIndex] = updatedUser
                //ส่ง response กลับไปว่า update user ที่เลือกสำเร็จแล้ว
                res.json({
                    message: 'User updated successfully',
                    data: {
                        user: updatedUser,
                        indexUpdated: selectedIndex
                    }
                })
            } else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        })

        //Path = DELETE /user/:id
app.delete('/user/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        if (result[0].affectedRows > 0) {
            res.json({
                message: 'User deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({
            message: 'Error deleting user',
            error: err.message
        })
    }
})