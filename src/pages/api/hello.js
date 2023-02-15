// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const config = {
  runtime: 'edge',
}

export default async function (req) {
  return Response.json({ name: 'John Doe' })
}