const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://farhangani619:osgilliath@cluster0.2lbgo.mongodb.net/Auth?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
})