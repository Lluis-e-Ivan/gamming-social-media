const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        id: {
            type: Number
        },
        title: {
            type: String
        },
        short_description: {
            type: String
        },
        thumbnail: {
            type: String
        },
        main_image: {
            type: String
        },
        article_content: {
            type: String
        },
        article_url: {
            type: String
        }
    },
    { timestamps: true }
);


const News = mongoose.model('News', newsSchema);
module.exports = News;