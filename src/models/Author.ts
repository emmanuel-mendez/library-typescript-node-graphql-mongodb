import { Schema, model } from 'mongoose'

const authorSchema = new Schema({
 name: {
  type: String,
  required: true,
  uppercase: true,
  maxLength: 50
 },

 lastname: {
  type: String,
  required: true,
  uppercase: true,
  maxLength: 50
 },

 country: {
  type: String,
  required: true,
  uppercase: true,
  maxLength: 50
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

export const modelAuthor = model('Author', authorSchema, 'authors')