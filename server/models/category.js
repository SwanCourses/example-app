/**
 * Created by alex on 21.09.16.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('Category', categorySchema);
