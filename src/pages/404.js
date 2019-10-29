import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
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
            Página no encontrada
          </h1>
        </div>

  </Layout>
)

export default NotFoundPage
