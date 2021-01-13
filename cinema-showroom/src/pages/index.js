import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      wpcontent {
        pages {
          edges {
            node {
              homeMeta {
                homePageHeaderTitle
                homePageHeaderDescription
                homePageDescription
                homePageHeaderPicture {
                  altText
                }
                homePageFeaturedMovies {
                  ... on WPGraphql_Movie {
                    id
                    movie {
                      titel
                      director
                      moviePoster {
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  );
}

export default IndexPage
