const express = require('express')
const redis = require('redis')

const app = express()

const PORT = process.env.PORT || 3000
const REDIS_URL = process.env.REDIS_URL || 'localhost'

const client = redis.createClient({ url: REDIS_URL });

(async () => {
    await client.connect()
})()

app.post('/counter/:id/incr', async (req, res) => {
    const { id } = req.params
    try {
        await client.incr(id)
        res.status(200).send(id.toString())
    } catch (e) {
        res.json({ errmsg: 'Ошибка:', err: e })
    }
})

app.get('/counter/:id', async (req, res) => {
    const { id } = req.params
    try {
        res.status(200).send((await client.get(id)).toString())
    } catch (e) {
        res.json({ errmsg: 'Ошибка :', err: e })
    }
})

app.listen(PORT, () => {
    console.log(`Счётчик запущен, порт: ${PORT}`)
})
