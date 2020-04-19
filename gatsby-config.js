const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  siteMetadata: {
    title: 'The Crypto Guy',
    siteUrl: 'https://thecryptoguy.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
                siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    '/' +
                    edge.node.frontmatter.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    '/' +
                    edge.node.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000
                  filter: { fileAbsolutePath: { regex: "//content/posts//" } }
                  sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                  edges {
                      node {
                        frontmatter {                          
                              title
                              date
                              featuredImage
                              slug
                          }
                        html                
                        excerpt(pruneLength: 140)
                      }
                  }
              }
              }
            `,
            output: '/rss.xml',
            title: 'The Crypto Guy RSS',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/articles/'
            // optional configuration to specify external rss feed, such as feedburner
            //link: "https://feeds.feedburner.com/gatsby/blog",
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        /*id: 'GTM-add_your_tag_here',*/
        id: 'GTM-W7HL9LM',
        includeInDevelopment: false
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        runtimeCaching: [
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `cacheFirst`
          },
          {
            // Add runtime caching of various other page resources
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`
          },
          {
            // uploadcare
            urlPattern: /^https:\/\/ucarecdn.com\/[-a-zA-Z0-9@:%_\+.~#?&//=]*?\/10x\//,
            handler: `staleWhileRevalidate`
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'theCryptoGuy',
        short_name: 'theCryptoGuy',
        start_url: '/',
        background_color: '#0e7dff',
        theme_color: '#0e7dff',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: `${__dirname}/static/images/folkboat.png` // This path is relative to the root of the site.
      }
    },

    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },

    // images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
          `gatsby-remark-responsive-iframe`
        ]
      }
    },

    // css (replace with gatsby-plugin-sass for v2)
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            browsers: '> 0.5%, last 2 versions, ie 11'
          })
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        stylesPath: `${__dirname}/src/cms/admin.css`,
        enableIdentityWidget: true
      }
    },
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
}
