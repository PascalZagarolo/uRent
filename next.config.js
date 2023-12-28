/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental : {
        appDir : true,
        swcPlugins : [
            ["next-superjson-plugin", { }]
        ]
    },

    images : {
        domains : [
            "www.dropbox.com",
            "previews.dropbox.com"
        ]
    }

}

module.exports = nextConfig
