var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name:{type:String,min:3,max:100,required:true}
})

// virtual to get genre's urlencoded

GenreSchema
.virtual('url')
.get(()=>{
  return '/catalog/genre/' + this._id;
})

module.exports = mongoose.model('Genre',GenreSchema);
