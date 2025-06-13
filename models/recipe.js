const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

// Add virtual ID
recipeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Enable virtuals in JSON output
recipeSchema.set('toJSON', {
    virtuals: true,
});

// Export the model and schema
exports.Recipe = mongoose.model('Recipe', recipeSchema); 
exports.recipeSchema = recipeSchema;