import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import ScrollToTop from "react-scroll-to-top";
import imageUrlBuilder from '@sanity/image-url'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import MetaTags from 'react-meta-tags';

import Navbar from '../components/Navbar';




export default function Home({ posts }) {
  const router = useRouter();
  const [mappedPost, setMappedPost] = useState([]);
  

  


  useEffect(() => {
    if(posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: '80gl8lcr',
        dataset: 'production',
    })

    setMappedPost(
      posts.map(post => {
        let fechaP = new Date(post.publishedAt)
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        return {
          ...post, 
          mainImage: imgBuilder.image(post.mainImage).width(500).height(250),
          dateRelease: `${fechaP.getDate().toString()} de ${meses[fechaP.getMonth().toString()]} de ${fechaP.getFullYear().toString()}`
        }
      })
    )
    } else { 
      setMappedPost([]);
    }
  }, [posts])
 


  return (
    
    <div>

      
          <MetaTags>
            <title>Pablo Hernández Contreras</title>
            <meta property="og:title" content="Pablo Hernández Contreras" />
          </MetaTags>
          <head>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
          </head>
          <ScrollToTop smooth />
          <Navbar />

          <section className={styles.bgSection}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className={styles.cardH}>
                      <div className={styles.content}>
                          <h6 className="text-white">¡Hola!</h6>
                          <h3>Soy Hernandez Contreas</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>

                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 text-center ">
                   <h1 className="text-white">Imagen</h1>
                </div>
            </div>
          </section>
         

          <section className="bg-color">
          <div class="container text-center pt-5">
              <h1 class={styles.subTitle}>Publicaciones recientes</h1>
         </div>
          <div className="container">
          <div className="row text-center">
          {mappedPost.length ? mappedPost.map((post, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 text-center">
          <div onClick={() => router.push(`/post/${post.slug.current}`)} key={index} className={styles.post}>
              <img className={styles.mainImage}  src={post.mainImage} alt="Imeagen de blog"/>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <br/>
              <h3 className={styles.release}>{post.dateRelease}</h3>
              </div>
          </div>
          )) : <>No se encontraron publicaciones </>}


          </div>
          </div>
          </section>

          <footer>

          </footer>

     
       

      

    </div>
  )
}

export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent('*[ _type == "post" ] | order(publishedAt desc)');
  const url = `https://80gl8lcr.api.sanity.io/v1/data/query/production?query=${query}`

  const result = await fetch(url).then(res => res.json())

  if(!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      }
    }
  } else {
    return {
      props: {
        posts: result.result,
      }
    }
  }

}