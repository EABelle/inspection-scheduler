
const mongoose = require('mongoose');

const { Schema } = mongoose;

const OwnerSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: String
});

const VehicleSchema = Schema({
  domain: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: Number,
  type: String,
  chassisNumber: String,
  motorNumber: String,
  km: Number,
  fuelType: String
});

const MeetingDetailsSchema = Schema({
  address: { type: String, required: true },
  zipCode: String,
  city: String,
  workingArea: String,
  date: String,
  time: String
});

const InspectionSchema = Schema({
  date: { type: Date, required: true },
  inspectorId: Object,
  candidates: Array,
  owner: { type: OwnerSchema, required: true },
  vehicle:  { type: VehicleSchema, required: true },
  meetingDetails: { type: MeetingDetailsSchema, required: true },
  comments: String,
});

module.exports = mongoose.model('Inspection', InspectionSchema);
