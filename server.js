const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample data for parking locations (you can modify this as needed)
const parkingLocations = [
    { id: 1, name: 'Vijay Nagar Parking', address: 'Vijay Nagar, Indore, Madhya Pradesh', capacity: 100, contact: '(123) 456-7890', hours: '24/7' },
    { id: 2, name: 'Khajrana Parking', address: 'Khajrana, Indore, Madhya Pradesh', capacity: 100, contact: '(987) 654-3210', hours: '24/7' },
    { id: 3, name: 'Sangam Nagar Parking', address: 'Sangam Nagar, Indore, Madhya Pradesh', capacity: 100, contact: '(555) 123-4567', hours: '24/7' },
];

// Endpoint to get parking locations
app.get('/api/locations', (req, res) => {
    res.json(parkingLocations);
});

// Endpoint to handle reservations
app.post('/api/reserve', (req, res) => {
    const { firstName, lastName, email, carMake, carModel, licensePlate, startDate, endDate } = req.body;

    // Here you would typically save the reservation to a database
    // For demonstration, we'll just return a success message
    if (firstName && lastName && email && carMake && carModel && licensePlate && startDate && endDate) {
        res.json({ message: 'Reservation successful!', details: req.body });
    } else {
        res.status(400).json({ message: 'Reservation failed. Please check your input.' });
    }
});

// Endpoint to handle payment
app.post('/api/payment', (req, res) => {
    console.log('Received payment data:', req.body);

    const { name, cardNumber, expiry, cvv, email, amount } = req.body;

    // Validation logic
    if (!name || !cardNumber || !expiry || !cvv || !email || !amount) {
        return res.status(400).json({ message: 'Payment failed. Please check your input.' });
    }

    // Additional validation checks
    if (cardNumber.length !== 16) {
        return res.status(400).json({ message: 'Invalid card number length.' });
    }

    if (cvv.length !== 3) {
        return res.status(400).json({ message: 'Invalid CVV length.' });
    }

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than zero.' });
    }

    // Process the payment (mocked here)
    const successMessage = `
    <h1>Payment Successful!</h1>
    <p>Your payment has been processed successfully.</p>
    <button onclick="window.location.href='/contactus.html'">Go to Contact Us</button>
    `;
    res.send(successMessage);
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});