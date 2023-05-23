import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import express from 'express'
import { CountryResolver } from './resolvers/CountryResolver'

async function startServer() {
  const app = express()
  
  await createConnection()
  
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  })
  
  const server = new ApolloServer({schema})
  
  await server.start()
  
  server.applyMiddleware({app})
  
  app.listen(4000, () => {
    console.log('Serveur démarré sur http://localhost:4000/graphql')
  })
}

startServer().catch((err) => {
  console.error('Erreur lors du démarrage du serveur :', err)
})
