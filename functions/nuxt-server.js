const { Nuxt, Builder } = require('nuxt')
const app = require('express')()

const port = process.env.PORT || 3000

const config = require('./nuxt.config.js')
config.dev = process.env.NODE_ENV === 'development'
const nuxt = new Nuxt(config)

app.get('/api/ping', (req, res) => {
  res.json({ ping: 'pong' }); 
});

// Build only in dev mode with hot-reloading
async function handleRequest(req, res) {
  if (config.dev) {
    new Builder(nuxt).build()
      .then(listen)
      .catch((error) => {
        console.error(error)
        process.exit(1)
      })
    await builder.build()
  } else {
    await nuxt.ready()
  }

  nuxt.renderRoute('/').then(result => {
    res.send(result.html)
  }).catch(e => {
    res.send(e)
  })
}

// app.use(nuxt.render)
app.get('*', handleRequest)

function listen () {
  console.log('=== listen ===')
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

module.exports = app
