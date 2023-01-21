const mongoose = require("mongoose");
class Database{
    static async connectDataBase(){
        const dbURI = "mongodb+srv://aldgebu:bdAkW28v4VnbYLf5@aldgebu.0ml5pxz.mongodb.net/?retryWrites=true&w=majority";
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
    }
}

module.exports = Database;