const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const path = require('path');

// dit is om een dynamic page aan te maken voor elk film
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      wpcontent {
        movies {
          edges {
            node {
              slug
              id
            }
          }
        }
      }
    }
  `).then(result => {
    if(result.errors) {
      result.errors.forEach(e => console.error('Error found within graphql:' + e.toString()));
      return Promise.reject(result.errors);
    }

    const movies = result.data.wpcontent.movies.edges;
    console.log(movies)
    movies.forEach(movie => {
      const { id, slug } = movie.node;
      createPage({
        path: slug,
        component: path.resolve(`src/templates/movie.js`),
        context: {
          id,
          slug,
        },
      })
    })
  })
}

/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
