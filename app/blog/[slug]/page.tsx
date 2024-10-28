import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Container from '@/components/common/container';

const contentDirectory = path.join(process.cwd(), 'content');

export async function generateStaticParams() {
    const files = fs.readdirSync(contentDirectory);

    return files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}

const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
};

export default function BlogPost({ params }: { params: { slug: string } }) {
    const filePath = path.join(contentDirectory, `${params.slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(fileContent);

    return (
        <Container
            size="large"
            className="prose prose-zinc 
        text-zinc-200 container animate-enter"
        >
            <h1 className="text-2xl tracking-tighter">{data.title}</h1>
            <div className='flex justify-start items-center mt-2 mb-8'>
                <p className="text-neutral-400"> {data.date} </p>
                <span className="mx-2 text-neutral-500"> — </span>
                <p className="text-neutral-400"> {calculateReadingTime(content)} </p>
            </div>
            <article className="text-justify w-auto">
                <MDXRemote source={content} />
            </article>
        </Container>
    );
}