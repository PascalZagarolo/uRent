/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental : {
        appDir : true,
        swcPlugins : [
            ["next-superjson-plugin", { }]
        ],
        missingSuspenseWithCSRBailout : false,
    },
    transpilePackages: ['next-auth'],
    
    images : {
        domains : [
            "www.dropbox.com",
            "previews.dropbox.com",
            "res.cloudinary.com",
            "lh3.googleusercontent.com"
        ]
    }

}

module.exports = nextConfig
