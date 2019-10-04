import mongoose from '../index'

export default mongoose.model('Scene', new mongoose.Schema({
  name: String,
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }
}))

/*
scenes
  conditons
  priority
*/