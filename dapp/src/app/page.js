"use client"

import { useState } from "react";
import Head from "next/head";
import { doLogin } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const { push } = useRouter();
  const [message, setMessage] = useState("");

  function btnLoginClick(){
    doLogin()
      .then(account => push("/vote"))
      .catch(err => {
        console.log(err);
        setMessage(err.message);
      });
  } 

  return (
    <>
      <Head>
        <title>Web3 - Votação | Login</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="https://assets-blog.pagseguro.uol.com.br/wp-content/2022/11/comprar-criptomoedas-e-seguro-min.jpg" className="d-block mx-lg-auto img-fluid" width="700" height="500" alt="" />
          </div>
          <div className="col-lg-6">
             <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">WEB3 - Sistema de Votação</h1>
              <p className="lead">Votação on-chain do Sistema de Votação WEB3 </p>
              <p className="lead mb-3">Autentique-se com sua carteira e deixe o seu voto da sua cripto favorita.</p>
              <div className="d-grip gap-2 d-mxflex justify-content-md-start">
                <button type="button" onClick={btnLoginClick} className="btn btn-primary btm-lg px-4 me-md-2">
                  <img src="./metamask.svg" width="64" alt="" className="me-3" />
                  Conectar com a MetaMask
                </button>
               <p className="message">{message}</p> 
              </div>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-contet-between align-items-center py-3 my-4 boder-top">
          <p className="col-md-4 mb-0 text-body-secundary">&copy 2024 Sistema de Votação WEB3 </p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secundary">Home</a>
            </li>
          </ul>
        </footer>
      </div>
    </>
    
  );
}
