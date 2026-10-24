const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt');
const mysql=require('mysql2');

const app=express();
 app.use(cors());
 app.use(express.urlencoded({extended:true}));
 require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;

 const connection= mysql.createConnection({
    
        host:'localhost',
        user:'root',
        password:dbPassword,
        database:'myDiary'
    
 });

connection.connect((err)=>{
    if(err){
        console.log('Error connecting to the database: ',err);
        return;
    }
    console.log('Connected to the Mysql database');
});

app.get('/',(req,res)=>{
    console.log(req)
    res.status(200).json({message:'Successfull'})
})

app.post('/registerUser', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO Users (EmailID, HashedPassword)
            VALUES (?, ?)
        `;

        connection.query(sql, [email.trim(), hashedPassword], (err, results) => {
    if (err) {
        console.error('Registration database error:', err.code);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'This email is already registered. Please log in.'
            });
        }

        return res.status(500).json({
            message: 'Registration failed. Please try again.'
        });
    }

    return res.status(201).json({
        message: 'Registration successful!'
    });
});

    } catch (err) {
        console.error('Registration error:', err);

        return res.status(500).json({
            message: 'Error while registering user'
        });
    }
});


app.post('/userLogin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please enter both email and password.'
        });
    }

    const sql = `
        SELECT ID, HashedPassword
        FROM Users
        WHERE EmailID = ?
    `;

    connection.query(sql, [email], async (err, result) => {
        if (err) {
            console.error('Login database error:', err);

            return res.status(500).json({
                message: 'Something went wrong. Please try again.'
            });
        }

        // Check whether the email exists
        if (result.length === 0) {
            return res.status(401).json({
                message: 'Email is not registered.'
            });
        }

        try {
            const isPasswordCorrect = await bcrypt.compare(
                password,
                result[0].HashedPassword
            );

            // Email exists, but password is incorrect
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: 'Incorrect password. Please try again.'
                });
            }

            // Login successful
            return res.status(200).json({
                userID: result[0].ID,
                message: 'Login successful'
            });

        } catch (error) {
            console.error('Password comparison error:', error);

            return res.status(500).json({
                message: 'Something went wrong. Please try again.'
            });
        }
    });
});

 app.post('/newPost',async(req,res)=>{
    console.log('New Post:',req.body);
    const {postTitle,postDesc,userID}=req.body;
    connection.query(`insert into Posts(postTitle,postDescription,userID) values('${postTitle}','${postDesc}',${userID})`,(err,result)=>{
        if(err){
            res.status(500);
            return
        }
        res.status(200).send(result);
    })
 })
app.get('/userPosts/:userID',(req,res)=>{
    const userID=req.params.userID;
    console.log(userID);
    connection.query(`select ID,postTitle,postDescription,userID from Posts where userID=${userID}`,(err,result)=>{
        if(err){
            return res.status(500).json({message:'Unable to fetch posts'});
          
        }
        console.log('Posts fetched:',result);
       return  res.status(200).json(result);
        
    })
})

app.get('/userPosts/:userID/:postID', (req, res) => {
    const { userID, postID } = req.params;

    if (
        !/^\d+$/.test(userID) ||
        !/^\d+$/.test(postID)
    ) {
        return res.status(400).json({
            message: 'Invalid user ID or post ID'
        });
    }

    const sql = `
        SELECT ID, postTitle, postDescription
        FROM Posts
        WHERE ID = ? AND userID = ?
    `;

    connection.query(sql, [postID, userID], (err, results) => {
        if (err) {
            console.error('Error fetching single post:', err);
            return res.status(500).json({
                message: 'Unable to fetch post'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        return res.status(200).json(results[0]);
    });
});

app.listen(3000,()=>{
    console.log('server started on port 3000!!');
})
