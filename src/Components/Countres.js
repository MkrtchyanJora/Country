import React, { useState } from 'react'
import { useLazyQuery, gql } from "@apollo/client";



const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;




export default function Countres() {
    const [search, setSearchValue] = useState('')
    const [searchCountre, { data }] = useLazyQuery(COUNTRY)




    const enter = (e) => {
        if (search === '') return;


        if (e.key === 'Enter') {
            searchCountre({
                variables: { code: search.toUpperCase() },
            })
            setSearchValue('')
        }

    }

    const submitEnter = () => {
        if (search === '') return;

        searchCountre({
            variables: { code: search.toUpperCase() },
        })
        setSearchValue('');


    }

    const cheingInput = (e) => {
        setSearchValue(e.target.value)

    }



    return (



        <div className='countres-block'>
            <h1>Country search engine</h1>

            <input type='text'
                placeholder='Enter Country Code'
                value={search}
                onChange={cheingInput}
                onKeyDown={enter}
            />
            <button onClick={submitEnter}>Search a country</button>



            <div className='countre-block2'>

                {(data && data.country !== null) &&
                    <div>
                        <h1> {data.country.name}</h1>
                        <p>Code: {data.country.code}</p>
                        <p>Native: {data.country.native} </p>
                        <p>Emoji: {data.country.emoji} </p>
                        <p>Currency: {data.country.currency} </p>
                        {data.country.languages.map((language) => {
                            return (
                                <div>
                                    <p>code:{language.code}</p>
                                    <p>language:{language.name}</p>
                                </div>

                            )

                        })}


                    </div>
                }
            </div>


        </div>



    )
}
