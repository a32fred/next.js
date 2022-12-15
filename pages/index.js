import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import api from './api/api'
import { SpinnerCircularFixed } from 'spinners-react'

export default function Home() {

  const [valuesIPs, setValuesIPs] = useState([])
  const [loading, setLoading] = useState(false);
  var error = 0
  useEffect(() => {
    setLoading(true)
    api.get('/ips').then((response) => { 
      setValuesIPs(response.data)
    setLoading(false)
    })
    .catch((err) => {
    console.error('ops! ocorreu um erro :'  + err)
    error = err
    });
    }, []);
    

  return (
    <div className={styles.container}>
      <Head>
        <title>Máquinas CRC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Máquinas CRC
        </h1>
     
        {loading && <SpinnerCircularFixed color='#343941' size={60}/>}

        {
            valuesIPs.map(res => {

            if (res.status == 200) {
            var estadoPC = "ligada"

            } else {
            var estadoPC = "desligada"
                
            }

            return (
                <div className={styles.grid} key={res.ip}>
                <a href="#" className={styles.card}>
                    <h2>({res.hostname})</h2>
                    <p>IP da máquina: {res.ip}</p><br/>
                    <p>{estadoPC}</p>
                </a>
                </div>
            )

            })
        }


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}