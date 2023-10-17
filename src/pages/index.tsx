import { AutoComplete } from '@/components/AutoComplete'
import { useEffect, useState } from 'react'
import desc from '@/static/desc.json'

export default function Home() {
  const [jokeData, setJokeData] = useState<string[]>([])
  const [nationData, setNationData] = useState<object[]>([])

  const getData = async (url: string) => {
    const result = await fetch(url, {
      headers: {
        Accept: 'application/json',
      }
    })
    return await result.json()
  }

  useEffect(() => {
    getData('https://icanhazdadjoke.com/search?term&page=2')
      .then(res => (initJokeData(res.results)))
      initNationData(desc);
  },[])

  // Data Massage Function
  const initJokeData = (data) => {
    const jokeArr = data.map(item => {
      return {
        id: item.id,
        parent: item.joke
      }
    });
    setJokeData(jokeArr);
  }

  const initNationData = () => {
    const nationArr = desc.map(item => {
      return {
        id: item.id,
        parent: item.desc,
        sub: item.sub.map(nation => {
            return {
              id: nation.id,
              child : nation.desc
            }
          })
        }
      })
      setNationData(nationArr)
  }

  return (
    <main>
      <div className=''>
        <AutoComplete
          dataList={jokeData}
          inputId={'joke'}
        />
        <AutoComplete
          nested={true}
          dataList={nationData}
          inputId={'currency'}
        />
      </div>
    </main>
  )
}
