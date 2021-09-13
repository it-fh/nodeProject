const mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@localhost/playground?authSource=admin',{useNewUrlParser:true,useUnifiedTopology:true}).then(_=>{
    console.log('Database connection succeeded');
}).catch(_=>{
    console.log('Database connection failure');
})