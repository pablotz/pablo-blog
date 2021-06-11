import {useEffect, useState} from 'react'
import imageUrlBuilder from '@sanity/image-url'
import styles from '../../styles/Post.module.css'
import BlockContent from '@sanity/block-content-to-react'
import MetaTags from 'react-meta-tags';
import Navbar from '../../components/Navbar';
import ScrollToTop from "react-scroll-to-top";
import { FaCalendarAlt } from "react-icons/fa";

export const Post = ({ title, body, image }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        
        const imgBuilder = imageUrlBuilder({
            projectId: '80gl8lcr',
            dataset: 'production'
        })

        setImageUrl(imgBuilder.image(image))
        
    }, [image])


    return (
        <div>


          <MetaTags>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:image" content={imageUrl} />
            <meta name="description" content={<BlockContent blocks={body} projectId="80gl8lcr" dataset="production" imageOptions={{w: 800, h: 600, fit: 'max'}} />} />
            <meta property="og:description" content={body} />
            <meta property="og:url" content={window.location.pathname + window.location.search}/>
          </MetaTags>
         
            <ScrollToTop smooth />
             <Navbar/> 
             <section className={styles.bgBlog}>
                 <div className="container text-center">
                 {imageUrl && <img className={styles.mainImage} src={imageUrl} />}
                 
                <small  class="form-text text-muted pt-5"><FaCalendarAlt /> 09/04/08</small>
                 </div>
             </section> 
             <div className={styles.clearfix}></div>
             

            <div className={styles.main}>
                <div className="text-center">
                    <h1 className={styles.title}>{title}</h1>
                </div>
                
                <div className={styles.body}>
                    <BlockContent 
                        blocks={body} 
                        projectId="80gl8lcr"
                        dataset="production"
                        imageOptions={{w: 800, h: 600, fit: 'max'}}

                    />
                    <h3></h3>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async pageContext => {
    const pageSlug = pageContext.query.slug;
    

    // in case that dosent found the slug, will return 404
    if (!pageSlug) {
        return {
            notFound: true
        }
    }

    const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${pageSlug}" ]`);
    const url = `https://80gl8lcr.api.sanity.io/v1/data/query/production?query=${query}`

    const result = await fetch(url).then(res => res.json());
    const post = result.result[0];

    if (!post) {
        return {
            notFound: true
        }
    } else {
        console.log(post)
        return {
            props: {
                title: post.title,
                body: post.body,
                image: post.mainImage,

            }
        }
    }
}

export default Post;