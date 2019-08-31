import React from 'react'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/portada-web-navegante-del-caos.png')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #2a4382, -0.5rem 0 0 #2a4382',
              backgroundColor: '#2a4382',
              color: 'white',
              padding: '1rem',
            }}
          >
            Últimos Post
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
