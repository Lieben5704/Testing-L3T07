const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://Mliebenberg-dev:plvpHHKfPr5XhslX@mliebenberg.3jbikn6.mongodb.net/Cars_FullStack?retryWrites=true&w=majority&collection=cars', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Middleware
app.use(express.json());

// Routes
const carsRouter = require('./routes/cars');
app.use('/api', carsRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
