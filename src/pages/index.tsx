import { AutoComplete } from '@/components/AutoComplete'
import { useEffect, useState } from 'react'
import desc from '@/static/desc.json'
import { FormModule } from '@/components/FormModule'

export default function Home() {
  const [jokeData, setJokeData] = useState<object[]>([])
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
      initNationData();
  },[])

  // Data Massage Function
  const initJokeData = (data: object[]) => {
    const jokeArr = data.map((item: any) => {
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
      <div className='mt-10 flex-col flex gap-10'>
        <AutoComplete
          nested={false}
          dataList={jokeData}
          inputId={'joke'}
          label={'Select Joke:'}
        />
        <AutoComplete
          nested={true}
          dataList={nationData}
          inputId={'currency'}
          label={'Select Country:'}
        />
        <FormModule />
      </div>
    </main>
  )
}
