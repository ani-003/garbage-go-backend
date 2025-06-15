import mongoose from 'mongoose';

const collectorSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model('Collector', collectorSchema, 'collectors');
