import Layout from '../components/Layout'
import Link from 'next/Link'

const Home = ({ pokemon }) => {
  return (
    <Layout title="NextJS Pokedex">
      <main>
        <h1 className="mb-8 text-center text-4xl">NextJS Pokedex</h1>
        <ul>
          {pokemon.map((pokeman, index) => (
            <li key="{index">
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className="border-gray my-2 flex items-center rounded-md border bg-gray-200 p-4 text-lg capitalize">
                  <img
                    className="mr-3 h-20 w-20"
                    src={pokeman.image}
                    alt={pokeman.name}
                  />
                  <span className="mr-2 font-bold">{index + 1}.</span>
                  {pokeman.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()
    const pokemon = results.map((result, index) => {
      const paddedIndex = ('00' + (index + 1)).slice(-3)
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
      return {
        ...result,
        image,
      }
    })
    return {
      props: { pokemon },
    }
  } catch (err) {
    console.error(err)
  }
}

export default Home
