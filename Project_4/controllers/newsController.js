const axios = require('axios')

exports.getNews = async (req, res) => {
    try{

        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.NEWS_API_KEY}`)
        const articles = response.data.articles.map(article => ({
            title: article.title,
            source: article.source.name,
            publishedAt: article.publishedAt,
            url: article.url
        }))

        res
            .status(200)
            .json({
                status: 'success',
                results: articles.length,
                data: articles
            })
    }
    catch (err){

        res
            .status(500)
            .json({
                status: "fail",
                message: err.message
            })
    }
}