import Head from 'next/head';
import Link from 'next/link';
import React from 'react'
import { prisma } from '../../server/db/client'
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface User {
    id:    number
    email: string
    name: string
    posts: Post[]
  }
  
interface Post {
    id: number
    title: string
    content: string
    published: boolean
    user: User
    userId: number
}

interface IProps {
    post: Post
    user: User
}


const Article = ({ post, user }: IProps ) => {
    const renderPost = () => {
        const markedPost = marked.parse(post.content)
        const clean = DOMPurify.sanitize(markedPost)
        return parse(clean)
    }

    return (
        <>
            <Head>
                <title>Rndm Blog</title>
                <meta name="description" content="Random blog generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl">
                        <header className="mb-4 lg:mb-6 ">
                            <div className="text-white/80 mb-8">
                                <Link href="/">&#60;&#60; Back to Home</Link>
                            </div>
                            <address className="flex items-center mb-6 ">
                                <div className="inline-flex items-center mr-3 text-sm text-white">
                                    <div>
                                        <a href="#" rel="author" className="text-xl font-bold text-white">Written by {user.name}</a>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white lg:mb-6 lg:text-4xl">{post.title}</h1>
                        </header>
                        <div className="text-white leading-normal">
                            <p>
                                {renderPost()}
                            </p>
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { id } = context.query
    const post = await prisma?.post.findUnique({
        where: { id: parseInt(id) },
    })
    const user = await prisma?.user.findUnique({
        where: { id: post!.userId }
    })
    return {
        props: {
            post,
            user
        }
    }
}

export default Article