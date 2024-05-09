import moongose from 'mongoose';
import colors from '../utils/colors.js'
import config from '../config.js'

const connectDB = async () => {
    try {
        await moongose.connect(config.DB_URL);
        
        colors.success('Database connected successfully')
    } catch (error) {
        colors.error(error)
    }
}

export default connectDB