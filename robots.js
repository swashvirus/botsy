import config from './config'
import Twit from 'twit'

const twit = new Twit(config)
const tweets = []

const stream = twit.stream('statuses/filter', {
    track: ['#javascript', '#Linux', '#100daysofcode'],
    language: 'en'
})

stream.on('tweet', function(tweett) {
    const tweet = tweett.id_str
    if (tweets.indexOf(tweet) === -1)
        tweets.unshift(tweet)
})

setInterval(interval => {
    const retweetId = tweets.shift()
    if (retweetId)
        twit.post('statuses/retweet/:id', {
            id: retweetId
        }, (err, response) => {
            if (response) console.log(`{'success': ${retweetId}}`)
        })
}, 42000)