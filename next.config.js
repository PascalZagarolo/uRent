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
            "previews.dropbox.com",
            "res.cloudinary.com"
        ]
    }

}

module.exports = nextConfig
