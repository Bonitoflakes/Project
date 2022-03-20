import mongoose from "mongoose";
import { Double } from '@mongoosejs/double';
const { Schema } = mongoose;

const holdingSchema = new Schema({
    portfolio_coins: [
        {
            qty: Double,
            total_cost: Double,
            total_market_value: Double,
            profit_loss: Double,
            portfolio_coin_id: Schema.Types.ObjectId
        }
    ]
});

const holding = new mongoose.model('holding', holdingSchema);

export { holding }