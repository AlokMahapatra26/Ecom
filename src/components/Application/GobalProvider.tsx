"use client"
import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { persistor , store} from "@/store/store"
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '@/components/Application/Loading'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query" 
import {ReactQueryDevtools} from "@tanstack/react-query-devtools" 


const queryClient = new QueryClient()

const GobalProvider = ({children}:any) => {
  return (

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}  loading={<Loading/>}>
        
            {children}
        </PersistGate>
      </Provider>
      <Suspense fallback={null}>
        <ReactQueryDevtools />
      </Suspense>
    </QueryClientProvider>
    

  )
}

export default GobalProvider