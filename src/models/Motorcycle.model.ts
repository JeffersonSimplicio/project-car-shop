import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: { type: Boolean, required: false },
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, {
  versionKey: false, // remove o campo '__v'
});

class MotorCycles extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('MotorCycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default MotorCycles;