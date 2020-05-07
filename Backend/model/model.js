const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recipeSchema = new schema({
    title: {
        type: String,
        required: [true, 'Title of the recipe'],
    },
    ingredients: {
        type: Array,
        required: [true, 'Ingredients of the reipe'],
    },
    description: String,
    time: String,
    url: String,
    recommend: {
        type: Boolean,
        default: false 
    }
});
recipeSchema.index({'$**': 'text'}); // allow text search on all fields
module.exports = mongoose.model('recipe', recipeSchema);
