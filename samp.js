const mongoose = require("mongoose");
const Collector = require("./models/Collectors"); // adjust path

async function checkUserCredentials(username, password) {
  try {
    await mongoose.connect(
      "mongodb+srv://anirban:sFYKfWJLkrp349Hb@gargodb.co0m9.mongodb.net/gargo?retryWrites=true&w=majority&appName=gargodb",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    const user = await Collector.findOne({ usern: username, pass: password });
    if (user) {
      console.log("User found:", user);
      return true;
    } else {
      console.log("Invalid username or password");
      return false;
    }
  } catch (err) {
    console.error("Error checking credentials:", err);
    return false;
  } finally {
    mongoose.connection.close();
  }
}

// Example usage:
checkUserCredentials("user15", "1234");
