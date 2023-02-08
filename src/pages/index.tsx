import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Input } from "@mantine/core";

import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

import { useClipboard } from "@mantine/hooks";

import useSWR from "swr";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>EZSGen</title>
        <meta name="description" content="Create simple passwords" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={inter.className}>EZSgen</h1>
        <Demo />
      </main>
    </>
  );
}

// Main generator for the password from API.
function Demo() {
  const clipboard = useClipboard({ timeout: 500 });
  // const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
  // const { data } = useSWR('http://127.0.0.1:9090/genpass', fetcher)

  // const [omegadata, setData] = useState()
  // const [isLoading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)

  //       setLoading(false)
  //     })
  // }, [])

  // if (isLoading) return <p>Loading...</p>

  // const fetchData = () => {

  //   setData(data.genereated_password)
  // }

  // useEffect(() => {

  // }, [omegadata])

  //https://bobbyhadz.com/blog/react-fetch-data-on-button-click
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:9090/genpass", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Generator</h1>
      <Button
        color={clipboard.copied ? "orange" : "violet"}
        onClick={() => clipboard.copy(data)}
      >
        {clipboard.copied ? "Copied" : data.genereated_password}
      </Button>
      <Button onClick={handleClick} color="red" size="xl" compact>
        Generate
      </Button>
    </>
  );
}
