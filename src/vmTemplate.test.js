const assert = require('power-assert')
const fs = require('fs')
const path = require('path')
const { template } = require('./vmTemplate')

/* eslint-env jest */
describe('vmTemplate', () => {
  it('async', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fn = template('module.exports = async (ctx) => `timestamp: ${ctx.timestamp}`')
    let timestamp = Date.now()
    let ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
    timestamp = Date.now()
    ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
  })
  it('no async ', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fn = template('module.exports = (ctx) => `timestamp: ${ctx.timestamp}`')
    let timestamp = Date.now()
    let ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
    timestamp = Date.now()
    ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
  })
  it('template string', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fn = template('timestamp: ${data.timestamp}')
    let timestamp = Date.now()
    let ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
    timestamp = Date.now()
    ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
  })
  it('code has function', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const fn = template('const tet = (data) => {return `timestamp: ${data.timestamp}`}; module.exports = (ctx) => `${tet(ctx)}`')
    const timestamp = Date.now()
    const ret = await fn({ timestamp })
    assert(ret === `timestamp: ${timestamp}`)
  })
  it('template command module exports', async () => {
    // eslint-disable-next-line no-template-curly-in-string
    const text = 'module.exports = (data) => `ffmpeg -y -i ${data.audio.path} -i ${data.cover.path}`'
    const fn = template(text)
    const data = {
      audio: {
        path: 'audio/FoWL_zGcLjEgLC_OZrG6JhhDXsNs.mp3'
      },
      cover: {
        path: 'imgs/FhbOJPU2feifsJzBGspsyASxkNy5'
      }
    }
    const ret = await fn(data)
    assert(ret === `ffmpeg -y -i ${data.audio.path} -i ${data.cover.path}`)
  })
  it('template command', async () => {
    const text = fs.readFileSync(path.resolve(__dirname, './templates/tpl1.txt')).toString()
    const fn = template(text)
    const data = {
      tts: { img: 'imgs/img.jpg', pcm: 'tts/wd.pcm', duration: 6 }, audio: { path: 'audio/audio.mp3' }, cover: { path: 'imgs/f.jpg' }, output: 'video/3_2019_11_15_test4.mp4', videos: [{ path: 'video/1.mp4' }, { path: 'video/2.mp4' }, { path: 'video/3.mp4' }], duration: 30
    }
    const ret = await fn(data)
    assert(ret === `ffmpeg -y   -f image2 -loop 1   -i imgs/img.jpg   -f s16le -ac 1 -ar 16k -i tts/wd.pcm   -t 6 -f nut pipe: | ffmpeg -y   -i audio/audio.mp3   -i pipe:   -i video/1.mp4   -i video/2.mp4   -i video/3.mp4   -filter_complex '
    [1:v]scale=720:1280[in1];
    [2:v]scale=720:1280[in2];
    [3:v]scale=720:1280[in3];
    [4:v]scale=720:1280[in4]
    [in1][in2][in3][in4] concat=n=4:v=1:a=0 [v];
    [0:a][1:a] amix=inputs=2 [a]'   -map '[v]' -map '[a]' -c:v libx264 -pix_fmt yuv420p -c:a aac -t 30 video/3_2019_11_15_test4.mp4`)
  })
  it('error', async () => {
    const filename = `${Date.now().toString(36)}.js`
    const fn = template('module.exports = async (ctx) => { throw new Error("test") }', {}, filename)
    let err
    await fn().catch(e => { err = e })
    assert(err)
    assert(err.stack.includes(filename))
  })
})
