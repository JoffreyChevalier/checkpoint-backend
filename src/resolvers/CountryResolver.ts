import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Country } from '../entities/Country'
import { dataSource } from '../db'

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    const countryRepository = dataSource.getRepository(Country)
    return await countryRepository.find()
  }
  
  @Query(() => Country, {nullable: true})
  async getCountryByCode(@Arg('code') code: string): Promise<Country | null> {
    const countryRepository = dataSource.getRepository(Country)
    const country = await countryRepository.findOne({where: {code}})
    return country || null
  }
  
  @Query(() => [Country])
  async getCountriesByContinent(@Arg('continent') continent: string): Promise<Country[]> {
    const countryRepository = dataSource.getRepository(Country)
    return await countryRepository.find({where: {continent}})
  }
  
  @Mutation(() => Country)
  async createCountry(
    @Arg('code') code: string,
    @Arg('name') name: string,
    @Arg('emoji') emoji: string,
    @Arg('continent') continent: string,
  ): Promise<Country> {
    if(!code || !name || !emoji || !continent) {
      throw new Error('Missing required parameters.')
    }
    
    const countryRepository = dataSource.getRepository(Country)
    
    const existingCountry = await countryRepository.findOne({where: {code}})
    if(existingCountry) {
      throw new Error(`A country with "${code}" code already exist.`)
    }
    
    const country = countryRepository.create({code, name, emoji, continent})
    await countryRepository.save(country)
    return country
  }
}
