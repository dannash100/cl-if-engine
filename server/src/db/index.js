import mongoose from 'mongoose'
import config from 'config'

mongoose.connect(config.get('dbConnString'), {useNewUrlParser: true})

export default mongoose
