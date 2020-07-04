const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const urlencodedParser = bodyParser.urlencoded({extended:false})

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodesql'
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected...');
});

app.get('/', (req, res) => {
    res.send('Hello')
});

app.get('/posts', (req,res) => {
    console.log("Trying to fetch posts")
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) =>{
        if(err) {
            res.send(err)
        }else{
            return res.json({
                data: results       
            })
            
        }
    });
});

app.get('/post', (req,res) => {
    const {string} = req.query;
    let sql = `SELECT * FROM posts WHERE title='${string}'`;
    db.query(sql, (err, results) =>{
        if(err) {
            res.send(err)
        }else{
            return res.json({
                data: results       
            })
        }   
    });
});
app.get('/posts/add', (req, res) =>{
    const {title, body} = req.query;
    console.log(req.query)
    var today = new Date();
    var author = 1;
    var imgID = 1;
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let sql = `INSERT INTO posts(authorID, title, body, imgID, date) VALUES('${author}', '${title}', '${body}', '${imgID}', '${date}')`;
    let query = db.query(sql, (err, result)=>{
        console.log(title, body);
    });
    console.log(title, body, date);
    res.send('adding post');
});

app.get('/posts/delete', (req, res) =>{
    const {ID} = req.query;
    let sql = `DELETE FROM posts WHERE postID ='${ID}'`;
    let query = db.query(sql, (err, results)=>{
        console.log("deleting post with ID: "+ID);
    });
    res.send('deleting post');
});

app.get('/posts/fullPost', (req, res) =>{
    const {ID} = req.query;
    let sql = `SELECT * FROM posts WHERE postID = '${ID}'`;
    let query = db.query(sql, (err, results)=>{
        if(err) {
            res.send(err)
        }else{
            return res.json({
                data: results       
            });     
        }
    });
});

app.get('/loggin', (req, res) =>{
    const {username, password} = req.query;
    console.log(username+" "+password)
    let sql = `SELECT * FROM authors WHERE userName ='${username}' AND password = '${password}'`;
    let query = db.query(sql, (err, results)=>{
        if(err) {
            res.send(err)
        }else{         
            console.log(results)
            if(results.length === 0){//user not found
                return res.json({
                    status: "The user was not found"      
                })
            }
            else if(results[0].userName === username && results[0].password === password){//user found
                return res.json({
                    status: "The user was found"      
                })
            }
            else if(results[0].password !== password){//user found
                return res.json({
                    status: "The password does not match our records"      
                })
            }
            else if(results[0].userName !== username && results[0].password === password){//user found
                return res.json({
                    status: "The user was not found"      
                })
            }
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`Backend server listening on port ${PORT}`)
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
}
