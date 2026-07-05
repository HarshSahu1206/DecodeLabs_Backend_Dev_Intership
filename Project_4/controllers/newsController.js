const axios = require('axios')

exports.getNews = async (req, res) => {
    try{
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.NEWS_API_KEY}`,
            { timeout: 5000 }
        )

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

        if(err.response){
            return res
                .status(err.response.status)
                .json({
                    status: "fail",
                    message: "News API error"
                })
        }

        if(err.request){
            return res
                .status(503)
                .json({
                    status: "fail",
                    message: "News service unavailable"
                })
        }

        res
            .status(500)
            .json({
                status: "fail",
                message: err.message
            })
    }
}