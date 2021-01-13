import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      query HomePageQuery {
        page(id: "home", idType: URI) {
          homeMeta {
            homePageHeaderTitle
            homePageHeaderDescription
            homePageDescription
            homePageHeaderPicture {
              altText
            }
            homePageFeaturedMovies {
              ... on Movie {
                id
                movie {
                  titel
                  director
                  producer
                  description
                  rating
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
  `);

  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  );
}

export default IndexPage
