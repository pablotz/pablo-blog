import {useEffect, useState} from 'react'
import imageUrlBuilder from '@sanity/image-url'
import styles from '../../styles/Post.module.css'
import BlockContent from '@sanity/block-content-to-react'
import Toolbar from '../../components/toolbar'


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
            <Toolbar />
            <div className={styles.main}>
                <h1>{title}</h1>
                {imageUrl && <img className={styles.mainImage} src={imageUrl} />}
                
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