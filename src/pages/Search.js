import { gql, useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'

const GET_CHARACTER_LOCATIONS = gql`
  query GetCharacterLocation($name: String!) {
    characters(filter: { name: $name }) {
      results {
        location {
          name
        }
      }
    }
  }
`

export default function Search() {
  const [name, setName] = useState('')

  const [getLocations, { loading, error, data, called }] = useLazyQuery(
    GET_CHARACTER_LOCATIONS,
    {
      variables: {
        name,
      },
    }
  )

  console.log(loading, error, data, called)

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault()
          getLocations()
        }}
      >
        Search
      </button>
      {loading && <div>spinner...</div>}
      {error && <div>something went wrong</div>}
      {data && (
        <ul>
          {data.characters.results.map((character) => {
            return (
              <li key={character.location.name}>{character.location.name}</li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
