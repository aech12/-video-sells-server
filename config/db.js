// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log(
//     "Please provide the password as an argument: node mongo.js <password>"
//   );
//   process.exit(1);
// }

// const password = process.argv[2];

// const mongourl = `mongodb+srv://pass4:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`;

// mongoose.connect(mongourl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// const metadataSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
// });

// const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is Easy",
//   date: new Date(),
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
