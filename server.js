const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
const PORT=8000;
const userdata=require('./files/userdata.json');

app.use(express.static(path.join(__dirname,'files')));



app.get('/',(req,res)=>{  
    // res.sendFile(second.html)
    // res.sendFile(path.join(__dirname,'files','index.html'));
    // res.sendFile(path.join(__dirname,'files','second.html'));
    res.send(`<h1>Hello from Express server!</h1>`);
  
});

// app.get('/second',(req,res)=>{
//     res.sendFile(path.join(__dirname,'files','second.html'));
// })

app.get('/user',(req,res)=>{
   const users=`
   <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
   <table>
    <tr>
        <th>Id</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Gender</th>
    </tr>
    ${userdata.map((user)=>`
        <tr>
            <td>${user.id}</td>
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
        </tr>
    `).join('')}    
   </table>`
    res.send(`<h1>Hello from user route!</h1> <br/><br/> ${users}`)
})

app.get('/user/:id',(req,res)=>{
     
    const id=req.params.id;
    const user=userdata.find((user)=>user.id==id);
    if(!user){
        return res.status(404).send('User not found');
    }
    else{
        const userDetails=`<h1>User Details</h1>
        <p><strong>Id:</strong> ${user.id}</p>
        <p><strong>Full Name:</strong> ${user.fullname}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>`

        res.send(userDetails);
    }
})



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})