import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { COLORS } from "../constants"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Movie } from './pageStyles/pageStyles';

const MoviesPage = (props) => {
  const {
    wpcontent: {
      page: {
        moviesMeta: {
          moviesPageDescription,
          moviesPageHeaderPicture
        }
      },
      movies: {
        edges: movies
      }
    }
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "movies", idType: URI) {
          moviesMeta {
            moviesPageDescription
            moviesPageHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        movies {
          edges {
            node {
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
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Movies" />
      <Wrapper artistColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image 
            fluid={moviesPageHeaderPicture.imageFile.childImageSharp.fluid} 
            alt={moviesPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>Movie Mania!</h2>
          <p>{moviesPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="artists">
          <h2>Our Movies</h2>
          <div className="artist-items">
            {movies.map(({ node: {movie, slug} }) => (
              <Movie to={`/${slug}`} key={slug}>
                <Image 
                  fluid={movie.moviePoster.imageFile.childImageSharp.fluid}
                  alt={movie.moviePoster.altText}
                />
                <div className="artist-info">
                  <p>{movie.titel}</p>
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

export default MoviesPage;