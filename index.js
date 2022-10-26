const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));  

var contactList = [
    // {
    //     name:'Ekansh Gupta',
    //     phone:'9643548658'
    // },
    // {
    //     name:'Divyanshi Gupta',
    //     phone:'7701884661'
    // },
    // {
    //     name:'Meetu Gupta',
    //     phone:'9310340198'
    // }
];

app.get('/' , function(req , res){
    return res.render('home' , {
        title: "My Contacts List",
        contacts_list:contactList
    });
});

// app.get('/practice' , function(req , res){
//     res.render('practice' , {
//         title: "I practice ejs"
//     })
// })

app.post('/create-contact' , function(req , res){
    contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
    return res.redirect('/');
    // return res.redirect('/practice');
});

app.get('/delete-contact' , function(req , res){
    console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if (contactIndex != -1){
        contactList.splice(contactIndex , 1);
    }
    return res.redirect('back');
});

app.listen(port , function(error){
    if (error){
        console.log(error);
        return;
    };
    console.log("The server is running on port: " , 8000);
});
