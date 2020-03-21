var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var AuthorSchema = new Schema({
  first_name:{type:String,required:true,max:100},
  family_name:{type:String,required:true,max:100},
  date_of_birth:{type:Date},
  date_of_death:{type:Date}
});

// creating virtual(concept in mongoose to create temporary fields to use in queries but not persist them in DB)

//virtual for authors full first_name
AuthorSchema
.virtual('name')
.get(function(){
  return this.family_name +","+this.first_name;
});

// virtual for authors lifespan
// modified using date formatting by moment
AuthorSchema
.virtual('lifespan')
.get(function(){
  //this.date_of_death.getYear()-this.date_of_birth.getYear()
  if(this.date_of_death){
    return (this.date_of_death.getYear()-this.date_of_birth.getYear()).toString();
  }
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// virtual for formatted date of d_birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function(){
  return this.date_of_birth?moment(this.date_of_birth).format('YYYY-MM-DD'):'';
})

// virtual for formatted date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function(){
  return this.date_of_death?moment(this.date_of_death).format('YYYY-MM-DD'):'';
})

// export model
module.exports = mongoose.model('Author',AuthorSchema);
