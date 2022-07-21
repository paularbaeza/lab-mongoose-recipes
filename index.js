const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((response) => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Migas extremeñas",
      level:"Easy Peasy",
      ingredients:["pan", "agua", "aceite", "pimenton", "ajo"],
      cuisine:"extremeña",
      dishType:"breakfast",
      duration:30,
      creator:"Miguel",
      created:"2022-06-02"
    })
  })
  .then((response)=>{
    //console.log(response.title)
    return Recipe.insertMany(data)
  })
  .then((response)=>{
    
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then((response)=>{
    
    console.log(response.duration)
    return Recipe.deleteOne({title: "Carrot Cake"})

  })
  .then((response)=>{
    
    console.log("Carrot Cake removed!")
    mongoose.disconnect(MONGODB_URI)

  })
  .then((response)=>{
    
    console.log("Semos unas maquinas !!")

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

