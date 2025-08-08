import ogs from 'open-graph-scraper'

const handler = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const urlParam = searchParams.get('url')
  if (!urlParam) return Response.json({ message: 'Missing url query!' }, { status: 400 })
  const options = { url: urlParam as string }
  try {
    const data = await ogs(options)
    return Response.json({ result: data.result })
  } catch (error) {
    return Response.json({ message: error.result }, { status: 400 })
  }
}

export { handler as GET, handler as POST }
