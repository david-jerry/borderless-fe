/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import SearchSubscribers from '@/components/forms/SearchSubscribers';
import { useAuth } from '@/hooks/useAuth';
import apiService from '@/services/apiService';
import React, { useEffect, useState, Suspense } from 'react'
import { Icon } from '@iconify-icon/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetAuthAccessToken from '@/hooks/getAccessToken';
import { useDebouncedCallback } from 'use-debounce';
import TableSkeleton from './loading';
import Table from './Table';
import Activities from './RecentSubscribers';

export default function Subscribers() {
  const [subsCount, setSubsCount] = useState<number>(0)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL; // || "http://localhost:8000/api/v1"


  const downloadCSV = async () => {
    const res = await GetAuthAccessToken()
    const response = await fetch(`${BASE_URL}/validate/export-csv/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${res[0]}`
      }
    });

    console.log(response)

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'waiters.csv');
    toast.success("CSV Downloaded Successfully")
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    // document.body.removeChild(link);

  };

  
  useEffect(() => {

    
  }, [])


  return (
    <section className="w-screen padding-x py-8 text-dark dark:text-light pt-28">
      <h1 className="w-full items-center justify-between flex text-xl pb-6 lg:text-3xl font-bold text-primary dark:text-secondary"><span className="block whitespace-nowrap">Total Sunscribers</span> <span className="block text-xs border rounded-lg p-1.5">#{subsCount} Waitlist</span></h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="h-[calc(100vh_-_13rem)] lg:col-span-2 order-2 lg:order-1 bg-white dark:bg-primary shadow-xl rounded-xl p-4">
          <div className="flex items-center space-x-4 lg:space-x-14 justify-between h-16">
            <strong className="flex items-center justify-between font-semibold text-dark dark:text-light text-base lg:text-xl"><span className="flex">Subscribers</span> </strong>

            <div className="flex items-center space-x-6">
              <SearchSubscribers />

              <button title="Download CSV" onClick={downloadCSV} type="button"><Icon className="w-7 h-7" icon="flowbite:file-csv-solid" width="1.8rem" height="1.8rem" /></button>
            </div>
          </div>

          <div className="h-[calc(100%_-_4rem)] overflow-y-auto">
            <Suspense fallback={<TableSkeleton />}>
              <Table totalSubscribers={setSubsCount}/>
            </Suspense>
          </div>
        </div>
        <div className="lg:h-[calc(100vh_-_7rem)] h-48 p-4 order-1 lg:order-2 gap-4 flex flex-col items-start bg-white dark:bg-primary shadow-xl rounded-xl w-full">
          <strong className="font-bold text-base lg:text-xl w-full">
            Recent Activities
          </strong>
          <div className="flex items-center justify-between p-2 h-[calc(100%_-_2.5rem)] overflow-y-auto w-full">
            <Activities/>
          </div>
        </div>
      </div>
    </section>
  )
}
