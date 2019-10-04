import mongoose from '../index'

export default mongoose.model('Game', new mongoose.Schema({
	name: String,
	description: String,
	author: String,
	scenes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Scene'
	}]
}))