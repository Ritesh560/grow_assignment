import { useMutation, useQuery } from "react-query"
import { PublicApi } from "./api"

const useStocks = ({ symbol }) => {
  const apikey = "N8QK8MH99NFL7D3F"
  const getTopStocks = () => {
    return PublicApi.get(`/query?function=TOP_GAINERS_LOSERS&apikey=${apikey}`)
  }
  const { data: topStocks, refetch: fetchTopStocks, isLoading: topStocksfetching } = useQuery(["getTopStocks"], getTopStocks)

  const getStockDetails = () => {
    return PublicApi.get(`/query?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`)
  }
  const { data: stockDetails, refetch: fetchStockDetails, isLoading: stockDetailsfetching } = useQuery(["getStockDetails", { symbol }], getStockDetails)

  return {
    stockDetails,
    fetchStockDetails,
    stockDetailsfetching,
    stockDetails,
    fetchStockDetails,
    stockDetailsfetching,
  }
}

export default useStocks
