'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './hotel.events';

var HotelSchema = new mongoose.Schema({
  name: String,
  info: String,
  stars: Number,
  price: Number,
  image: String,
  amenities: Array
});

registerEvents(HotelSchema);
export default mongoose.model('Hotel', HotelSchema);
