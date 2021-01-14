import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Wrapper, Image } from './templateStyles/movieStyles';

const MovieTemplate = ({ data: {wpcontent: {movie: {movie, genres: {edges: genres }}}} }) => {
  return (
    <Layout>
      <SEO title="Movie" />
      <Wrapper >
      <div className="artist-container">
        <div className="artist-image">
          <Image 
            fluid={movie.moviePoster.imageFile.childImageSharp.fluid} 
          />
          <div className="roles">
            {genres.map(({ node: genre }) => (
              <div className="role" key={genre.name}>
                {genre.name}
              </div>
            ))}
          </div>
        </div>
        <div className="artist-info">
          <h2>{movie.titel}</h2>
          <p 
            className='description' 
            style={{ marginTop: 50 }}
          >
            {movie.description}
          </p>
            <p className='info'>
              <strong>Director:</strong> {movie.director}
            </p>
            <p className='info'>
              <strong>Producer(s):</strong> {movie.producer}
            </p>
            <p className='info'>
              <strong>Rating:</strong> {movie.rating}/100
            </p>
        </div>
      </div>
      </Wrapper>
    </Layout>
  );
}

export default MovieTemplate;

export const pageQuery = graphql`
  query ($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        movie {
          titel
          director
          producer
          description
          rating
          moviePoster {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`