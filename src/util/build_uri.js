const buildURI = uri => new URL(uri, process.env.SERVER_HOST)

export default buildURI