import mongoose from 'mongoose';
const { Schema } = mongoose;
import Double from '@mongoosejs/double';


const dashboardSchema = new Schema({
    userID: {
        required: true,
        type: Schema.Types.ObjectId,
        ref:"user"
    },
    total_holdings_value: {
        type: Double,
    },
    total_cost: {
        type: Double,
    },
    past_holdings_value: {
        type: Double,
    },
    holdings_change_24h: {
        type: Double,
    },
    profit_loss: {
        type: Double,
    },
    profit_loss_change: {
        type: Double,
    }
})

const Dashboard = mongoose.model('dashboard', dashboardSchema);

export { Dashboard }