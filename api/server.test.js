const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

// testleri buraya yazın
test('[0] Testler çalışır durumda]', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})

// describe("server.js",()=>{
//   it("[1] tüm userler geliyor",async()=>{
//     const res = await request(server).get('/api/auth/')
//     expect(res.body.message).toHaveLength(1)
//   })
// })

describe("server.js",()=>{
  it("[1] kayıt olan user geliyor",async()=>{
    const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
    expect(res.body).toMatchObject({ username: 'devon' })
  })
  it("[2] aynı username ile kayıt olunamıyor",async()=>{
    const res = await request(server).post('/api/auth/register').send({ username: 'onur', password: '1234' })
    expect(res.body.message).toMatch(/username alınmış/)
  })
  it("[3] bilgiler olmadan login olunamıyor",async()=>{
    await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
    const res =await request(server).post('/api/auth/login')
    expect(res.body.message).toMatch(/username ve şifre gereklidir/)
  })
  it("[4] login olunabiliyor",async()=>{
    await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
    const res =await request(server).post('/api/auth/login').send({ username: 'devon', password: '1234' })
    expect(res.body.message).toMatch(/Welcome/)
  })
})