const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

  id:{type:String},
  imageURL:{type:String},
  name:{type:String},
  isPicked:{type:Boolean},
  entryDate: {type:Date, default:Date.now}

})

const contactSchema = new Schema({

  id:{type:String},
  imageURL:{type:String, required: true},
  name:{type:String, required: true},
  isPicked:{type:Boolean},
  entryDate: {type:Date, default:Date.now}

})

const Users = mongoose.model('Users', userSchema, 'girlsData')
const Contact = mongoose.model('Contact', contactSchema, 'contact_form')
const mySchemas = {'Users': Users, 'Contact': Contact}

module.exports = mySchemas


// id: randomCards.length + 1,
// imageURL: url,
// name: name,
// isPicked: false,