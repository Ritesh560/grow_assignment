import { useMutation, useQuery } from "react-query"
import { PublicApi } from "./api"

const useStocks = ({ symbol, interval, functionType }) => {
  const apikey = "RJCJTT8U6KKU3TZ3"

  const getTopStocks = () => {
    return PublicApi.get(`/query?function=TOP_GAINERS_LOSERS&apikey=${apikey}`)
  }
  const { data: topStocks, refetch: fetchTopStocks, isLoading: topStocksfetching } = useQuery(["getTopStocks"], getTopStocks)

  const getStockDetails = () => {
    return PublicApi.get(`/query?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`)
  }
  const { data: stockDetails, refetch: fetchStockDetails, isLoading: stockDetailsfetching } = useQuery(["getStockDetails", { symbol }], getStockDetails)

  const getStockGraph = () => {
    return PublicApi.get(`/query?function=${functionType}&symbol=${symbol}${interval ? `&interval=${interval}min` : ""}&apikey=${apikey}`)
  }
  const { data: stockGraph, refetch: fetchStockGraph, isLoading: stockGraphfetching } = useQuery(["getStockGraph", { symbol, interval, functionType }], getStockGraph)

  return {
    //top stocks
    topStocks,
    fetchTopStocks,
    topStocksfetching,
    //stock details
    stockDetails,
    fetchStockDetails,
    stockDetailsfetching,
    //intraday
    stockGraph,
    fetchStockGraph,
    stockGraphfetching,
  }
}

export default useStocks
