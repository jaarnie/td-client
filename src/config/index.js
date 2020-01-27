const serverApiVersion = 'v1'

const roots = {
  server: `http://localhost:7000/api/${serverApiVersion}`,
  serverHeaders: {
    "Content-Type": "application/json"
  }
}

export const serverRoot = roots.server
export const serverHeaders = roots.serverHeaders
