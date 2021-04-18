import mongoose from 'mongoose'

export const database = (): void => {
 mongoose.connect('mongodb://localhost/library-typescript-node-graphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

 mongoose.set('useFindAndModify', false);

 const db: mongoose.Connection = mongoose.connection;

 db.on('error', console.error.bind(
  console, 'connection error:'
 ))

 db.once('open', () => {
  console.log(`Database is connected`)
 })
}
