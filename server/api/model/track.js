const mongoose = require('mongoose')


const pointSchema = mongoose.Schema({
   timestamp : Number ,
   cords : {
       latitude : Number,
       longitude : Number,
       altitude : Number,
       accuracy : Number,
       heading : Number,
       speed : Number,
   }
})

const trackShema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    location : [pointSchema]

})

mongoose.model('Track' , trackShema)