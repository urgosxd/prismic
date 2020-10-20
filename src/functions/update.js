import axios from "axios"

const API_ENDPOINT = "https://strapi-josue.herokuapp.com/posts"

exports.handler = async event => {
  const { id, cont } = event.queryStringParameters

  console.log(cont)
  console.log(id)
  try {
    const response = await axios.put(
      `${API_ENDPOINT}/${id}`,
      {
        claps: cont,
      },
      { headers: { "Content-Type": "application/json" } }
    )

    const data = response.data.claps

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: error.message,
      }),
    }
  }
}
