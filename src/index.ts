import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.json('Já pode criar sua api.')
})


app.listen(process.env.PORT, () => {
    console.log('API está funcionando.')
})