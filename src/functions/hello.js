import axios from "axios"

const API_ENDPOINT = "https://strapi-josue.herokuapp.com/posts"

exports.handler = async event => {
  const { id } = event.queryStringParameters
  console.log(id)
  try {
    const response = await axios.get(`${API_ENDPOINT}/${id}`, {
      headers: {
        Accept: "application/json",
      },
    })

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
