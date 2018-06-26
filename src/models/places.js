'use strict';

import mongoose from 'mongoose';

const placesSchema = mongoose.Schema({
  name: { type:String, required:true },
  city: { type:String, uppercase:true, required:true },
});

const skipInit = process.env.NODE_ENV === 'test';

export default mongoose.model('Place', placesSchema, 'places', skipInit);
