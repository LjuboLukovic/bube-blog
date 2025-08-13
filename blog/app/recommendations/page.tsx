import BlogPage from '../[...slug]/page'

export default function PreporukePage() {
  const slugPromise = Promise.resolve({ slug: ['recommendations'] })
  return <BlogPage params={slugPromise} />
}
