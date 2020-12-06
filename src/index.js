#!/usr/bin/env node

import Hapi from '@hapi/hapi'

import { create as createServer } from './server'

import { name as appName, version } from '../package.json'
const aboutStr = `${appName} v${version}`
console.log(aboutStr)
const { start } = createServer({
    Hapi,
    port: process.env.PORT || 8081,
    // tls,
    aboutData: {
        appName,
        version,
        aboutStr
    }
})
start().then(() => console.log('server up'))