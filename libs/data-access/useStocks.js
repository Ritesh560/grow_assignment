import { useMutation, useQuery } from "react-query"
import { PublicApi } from "./api"

const useStocks = () => {
  const apikey = "N8QK8MH99NFL7D3F"
  const getAllTopGainers = () => {
    return PublicApi.get(`/query?function=TOP_GAINERS_LOSERS&apikey=${apikey}`)
  }

  const { data: topGainers, refetch: fetchTopGainers, isLoading: topGainersfetching } = useQuery(["getAllTopGainers"], getAllTopGainers)

  return {
    topGainers,
    fetchTopGainers,
    topGainersfetching,
  }
}

export default useStocks
