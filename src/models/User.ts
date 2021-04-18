import { Schema, model } from 'mongoose'

const userSchema = new Schema({

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

 email: {
  type: String,
  required: true,
  uppercase: true,
  maxLength: 100,
 },

 password: {
  type: String,
  required: true,
  maxLength: 60,
 }
}, {
 timestamps: true
});


export const modelUser = model('User', userSchema, 'users')