"use client";

import { useEffect, useState } from "react";

export default function useFetchData(listName, listUrl) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedListUrl = localStorage.getItem(listUrl);
      const savedlist = localStorage.getItem(`${listName}`);

      if (savedlist !== "undefined" && savedListUrl === listUrl) {
        setList(JSON.parse(savedlist));
      } else {
        const fetchData = async () => {
          try {
            const response = await fetch(listUrl);
            const listData = await response.json();
            localStorage.setItem(listName, JSON.stringify(listUrl[listName]));
            localStorage.setItem(listUrl, listUrl);
            setList(listData[listName]);
          } catch (error) {
            console.error("Failed to fetch data", error);
          }
        };
        fetchData();
      }
    }
  }, [listUrl]);

  return { list, setList };
}
