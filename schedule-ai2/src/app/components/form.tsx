"use client"
import { useState } from "react"
import axios from 'axios'

let ingredientsArray: any = []



export default function Form(){

    const [ingredient, setIngredient] = useState("")

    let options = {
        method: "POST",
        url: "https://openai80.p.rapidapi.com/chat/completions",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": "1622177290mshd1a3aea86078fefp18acb1jsnc6caa08d41fa",
          "X-RapidAPI-Host": "openai80.p.rapidapi.com",
          "Accept-Encoding": "gzip", // Kept getting an Axios decompression error with the err code "ERR_CL_SPACE", but this was the fix
        },
        data: {
          model: "gpt-3.5-turbo",
          max_tokens: 3,
          messages: [
            {
              role: "system",
              content: "You are a chef where you will respond to what meals a the user can make when prompting you with their available ingredients.",
            },
      
            {
              role: "user",
              content: `${ingredient}`,
            },
          ],
        },
      };

    axios.defaults.maxContentLength = 100000000;

    let storeIngredient = (ingredientName: any) => {
        ingredientsArray.push(ingredientName)
        console.log(ingredientsArray)
    }

    let handleSubmit = async (event: any) => {
        event.preventDefault() // prevents the page from automatically resetting the DOM, which in turn saves our state
        console.log(ingredient)
        storeIngredient(ingredient)

        try {
            const response = await axios.request(options)
            console.log("Response: " + response.data.choices[0].message.content)
        } catch (err) {
            console.error(err)
        }
    }

   return (
    <div className="text-center">
        <form onSubmit={handleSubmit}>
            <input className="absolute top-1/4 shadow appearance-none border rounded w-fit py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ingredients" type="text" value={ingredient} placeholder="Ingredients" onChange={(item) => setIngredient(item.target.value)}/>
        </form>
    </div>
   )
}
