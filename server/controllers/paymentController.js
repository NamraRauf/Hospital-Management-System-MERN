const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51QJZJZQJZJZQJZJZQJZJZQJZJZQJZJZQJZJZQJZJZQJZJZQJZJZQJZJZQJZJZQJZJZ');

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;
    const patientId = req.user.userId;

    // Validate
    if (!appointmentId || !amount) {
      return res.status(400).json({ message: "Appointment ID and amount are required" });
    }

    // Check appointment exists
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient')
      .populate('doctor');
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if patient owns the appointment
    if (appointment.patient._id.toString() !== patientId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        appointmentId: appointmentId.toString(),
        patientId: patientId.toString(),
        doctorId: appointment.doctor._id.toString()
      },
      description: `Payment for appointment with ${appointment.doctor.name}`
    });

    // Create payment record
    const payment = new Payment({
      patient: patientId,
      appointment: appointmentId,
      doctor: appointment.doctor._id,
      amount: amount,
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending'
    });

    await payment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      message: "Error creating payment",
      error: error.message
    });
  }
};

// Confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;
    const patientId = req.user.userId;

    const payment = await Payment.findById(paymentId)
      .populate('appointment')
      .populate('patient')
      .populate('doctor');

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check if patient owns the payment
    if (payment.patient._id.toString() !== patientId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);

    // Update payment status
    if (paymentIntent.status === 'succeeded') {
      payment.status = 'succeeded';
      payment.receiptUrl = paymentIntent.charges.data[0]?.receipt_url || '';
      
      // Update appointment status to confirmed
      if (payment.appointment) {
        payment.appointment.status = 'confirmed';
        await payment.appointment.save();
      }
    } else {
      payment.status = paymentIntent.status;
    }

    await payment.save();

    res.status(200).json({
      message: "Payment confirmed",
      payment: payment,
      appointment: payment.appointment
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({
      message: "Error confirming payment",
      error: error.message
    });
  }
};

// Get payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const patientId = req.user.userId;
    const payments = await Payment.find({ patient: patientId })
      .populate('appointment')
      .populate('doctor')
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({
      message: "Error fetching payment history",
      error: error.message
    });
  }
};

// Get all payments (admin)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name email')
      .populate('appointment')
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      message: "Error fetching payments",
      error: error.message
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId)
      .populate('patient', 'name email')
      .populate('doctor', 'name email')
      .populate('appointment');

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({
      message: "Error fetching payment",
      error: error.message
    });
  }
};

