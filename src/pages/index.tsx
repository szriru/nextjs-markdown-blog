import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { prisma } from '../server/db/client'
import { useState, useEffect } from 'react'

const Home: NextPage = ({ posts }) => {
  // const [posts, setPosts] = useState([])
  // useEffect(() => {
  //   if (initPosts === undefined) return
  //   setPosts(initPosts)
  // }, [initPosts])

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="text-white inline-flex text-end justify-end w-[65%]">
          <h2 className="text-xl font-bold p-2 border-2 rounded-lg border-white/10"><Link href="/post">Post an article</Link></h2>
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Rndm Blog
          </h1>
          <div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              {
                posts.map((post) => (
                  <li key={post.id} className="bg-white/5 p-8 rounded-lg text-white ">
                    <div className="inline-flex flex-col justify-start w-full">
                      <h1 className="text-2xl font-bold">{post.title}</h1>
                      <p className="text-md">{post.content.slice(0,50)}...</p>
                      <p className="text-end underline"><Link href={"/posts/" + post.id}>See details</Link></p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany()
  return {
    props: {
      posts
    }
  }
}

export default Home;
