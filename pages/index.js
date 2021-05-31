import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import imageUrlBuilder from '@sanity/image-url'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

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
      
       <div className={styles.main}></div>

       <h1 className={styles.title}>Pablo Hernández Contreras</h1>
       <h3 className={styles.subTitle}>Publicaciones recientes</h3>

       <div className={styles.feed}>
         {mappedPost.length ? mappedPost.map((post, index) => (
           
           <div onClick={() => router.push(`/post/${post.slug.current}`)} key={index} className={styles.post}>
              
              <img className={styles.mainImage} src={post.mainImage}></img>  

              <h3 className={styles.postTitle}>{post.title}</h3>     

              <h3 className={styles.release}>{post.dateRelease}</h3>
              
           </div>
         )) : <>No se encontraron publicaciones </>}
       </div>

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