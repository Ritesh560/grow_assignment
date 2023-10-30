import axios from "axios"

const ENV = {
  BACKEND: "https://www.alphavantage.co/",
}

export const PublicApi = axios.create({
  baseURL: ENV.BACKEND,
  headers: {
    "Content-type": "application/json",
    "User-Agent": "request",
  },
})
