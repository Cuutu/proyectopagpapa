import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'El código del producto es requerido'],
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'La marca es requerida'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'El modelo es requerido'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'El año es requerido']
  },
  image: {
    type: String,
    required: [true, 'La imagen es requerida']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido']
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema); 