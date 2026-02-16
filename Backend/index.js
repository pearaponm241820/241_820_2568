const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8000;

app.use(bodyParser.text());

let users = []
let counter = 1;


//path = GET /users
app.get('/users', (req, res) => {
    let user1 = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    };
    res.json(users);
});

//path = POST /user
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({ 
        message: 'User added successfully', 
        user: user });
})

//path = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    //หา user จาก id
    let selectedIndex = users.findIndex(users.findIndex(user => user.id == id))
    //update user  นั้น
    users[selectedIndex] = updatedUser
    //ส่ง response กลับไปว่า update user ที่เลือกสำเร็จแล้ว

    res.json({
        message: 'User updated successfully',
        data : {
            user:updatedUser,
            indexUpdated: selectedIndex
        }
    }) 
})

//Path = DELETE /user/:id
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let selectedIndex = users.findIndex(user => user.id == id)
    if (selectedIndex !== -1) {
        users.splice(selectedIndex, 1);
        res.json({
            message: 'User deleted successfully',
            data: {
                indexDeleted: selectedIndex
            }
        });
    } else {
        res.status(404).json({ 
            message: 'User not found' 
        })
    }
})


app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});