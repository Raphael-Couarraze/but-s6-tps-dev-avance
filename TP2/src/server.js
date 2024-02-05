import {getData} from "./api.js";

import fastify from 'fastify'
import fastify_view from '@fastify/view'
import handlebars from 'handlebars'

const app = fastify()

app.register(fastify_view, {
    engine: {
        handlebars : handlebars
    },
    options: {
        partials: {
            header: '/templates/header.hbs',
            footer: '/templates/footer.hbs'
        }
    }
})

app.get('/', async (req, res) => {
    return res.view('/templates/index.hbs', {charas: await getData("https://gateway.marvel.com:443/v1/public/characters")})
})

app.listen({host: "0.0.0.0", port: 3333 })