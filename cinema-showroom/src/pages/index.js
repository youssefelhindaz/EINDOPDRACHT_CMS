import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrapper, Image, Movie, BottomEdgeDown, BottomEdgeUp } from './pageStyles/pageStyles'
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageHeaderTitle,
          homePageHeaderDescription,
          homePageDescription,
          homePageHeaderPicture,
          homePageFeaturedMovies
        }
      }
    }
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home" idType: URI) {
          homeMeta {
            homePageHeaderTitle
            homePageHeaderDescription
            homePageDescription
            homePageHeaderPicture {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }    
            }
            homePageFeaturedMovies {
              ... on WPGraphql_Movie {
                slug
                movie {
                  titel
                  director
                  moviePoster {
                    altText
                    sourceUrl
                    imageFile {
                      childImageSharp {
                        fluid(quality: 100) {
                          ...GatsbyImageSharpFluid_withWebp
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
    }
  `);
console.log(homePageFeaturedMovies)
  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image 
            fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} 
            alt={homePageHeaderPicture.altText} 
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div> 
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="artists">
          <h2>Featured Movies</h2>
          <div className="artist-items">
            { homePageFeaturedMovies.map(({ movie, slug }) => (
              <Movie key={slug} to={`/${slug}`} >
                <Image 
                  fluid={movie.moviePoster.imageFile.childImageSharp.fluid}
                  alt={movie.moviePoster.altText}
                />
                <div className="artist-info">
                  <p>
                    {movie.titel}
                  </p>
                  <p>{movie.director}</p>
                </div>
              </Movie>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default IndexPage
