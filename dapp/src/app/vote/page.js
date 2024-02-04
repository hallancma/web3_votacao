"use client"

import { useState, useEffect } from "react";
import Head from "next/head";
import { getCurrentVoting } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

export default function Vote() {
  const {push} = useRouter();

  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState({maxDate: Date.now() });

  useEffect(()=>{
    if(!localStorage.getItem("wallet")) return push("/");
    
    getCurrentVoting()
      .then(voting => {
        console.log(voting);
        setVoting(voting);
       // setOption1(getOption(voting.option1));
      //  setOption2(getOption(voting.option2));
    })
    .catch(err => {
      console.error(err);
      setMessage(err.message);
    });
  }, [])

  function btnLoginClick(){
    doLogin()
      .then(account => setMessage(account))
      .catch(err => {
        console.log(err);
        setMessage(err.message);
      });
  } 

  return (
    <>
      <Head>
        <title>Web3 - Votação | Votação</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row align-items-center">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">WEB3 - Sistema de Votação</h1>
          <p className="lead">Votação on-chain do Sistema de Votação WEB3 </p>
        </div>
        <footer className="d-flex flex-wrap justify-contet-between align-items-center py-3 my-4 boder-top">
          <p className="col-md-4 mb-0 text-body-secundary">&copy 2024 Sistema de Votação WEB3 </p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secundary">Home</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link px-2 text-body-secundary">About</a>
            </li>
          </ul>
        </footer>
      </div>
    </>
    
  );
}
