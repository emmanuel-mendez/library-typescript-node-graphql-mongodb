import { Schema, model } from 'mongoose'

const bookSchema = new Schema({

 title: String,
 description: String,
 quantity: Number,
 price: Number,
 writted_by: {
  type: Schema.Types.ObjectId,
  ref: 'authors'
 },
 register_by: {
  type: Schema.Types.ObjectId,
  ref: 'users'
 },

 createdAt: {
  type: String,
  required: true,
 },

 updatedAt: {
  type: String,
  required: true,
 }
}, {
 timestamps: true
});

export const modelBook = model('Book', bookSchema, 'books')