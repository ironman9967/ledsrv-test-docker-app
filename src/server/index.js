
export const create =  ({
    Hapi,
    port,
    tls,
    aboutData
} = {}) => {
    const server = Hapi.server({ port, tls })
        
    server.route({
        method: 'GET',
        path: '/api/v1/about',
        handler: (req, h) => h.response({ stamp: Date.now(), ...aboutData })
    })
    server.route({
        method: '*',
        path: '/{p*}',
        handler: (req, h) => h.response().code(404)
    })

    process.once('SIGINT', () => {
        console.log('draining server...')
        server.stop().then(() => {
            console.log('server down')
            process.exit(0)
        })
    })

    return { start: () => server.start() }
}
