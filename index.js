import { Router } from 'itty-router'

const router = Router()

const allowedOrigin = 'https://csci-526-spring-2025.github.io'

router.all('*', (req, res) => {
  res.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  return res
})

router.all('/', async (req) => {
  const url = new URL(req.url)
  url.hostname = 'docs.google.com'
  const proxyReq = await fetch(url.toString(), req)
  return new Response(proxyReq.body, {
    status: proxyReq.status,
    statusText: proxyReq.statusText,
    headers: proxyReq.headers,
  })
})

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request))
})
