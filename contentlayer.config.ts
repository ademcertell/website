import {
  defineComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";

const computedFields = defineComputedFields<"Post">({
  slug: {
    type: "string",
    resolve: (doc: any) => doc._raw.flattenedPath,
  },
  readingTime: {
    type: "json",
    resolve: (doc) => {
      return readingTime(doc.body.raw);
    },
  },
});

const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `**/*.mdx`,
  fields: {
    date: { type: "date", required: true },
    title: { type: "string", required: true },
    tweetUrl: { type: "string", required: false },
    subtitle: { type: "string", required: false },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "post",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

149315