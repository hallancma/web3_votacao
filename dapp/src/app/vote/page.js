"use client"

import { useState, useEffect } from "react";
import Head from "next/head";
import { getCurrentVoting, addVote } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

export default function Vote() {
  const {push} = useRouter();
  const DEFAULT_OPTION = {name: "Loading....", image: "./carregando.png"};
  
  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState({maxDate: Date.now() });
  const [option1, setOption1] = useState(DEFAULT_OPTION);
  const [option2, setOption2] = useState(DEFAULT_OPTION);
  const [showVotes, setShowVotes] = useState(0);
  

  useEffect(()=>{
    if(!localStorage.getItem("wallet")) return push("/");
    
    getCurrentVoting()
      .then(voting => {
        console.log(voting);
        setVoting(voting);
        setOption1(getOption(voting.option1));
        setOption2(getOption(voting.option2));
    })
    .catch(err => {
      console.error(err);
      setMessage(err.message);
    });
  }, [])

  function getOption(option){
    switch(option){
      case "Bitcoin": return {name: "Bitcoin", image: "./bitcoin.webp"};
      case "Ethereum": return {name: "Ethereum", image: "./ethereum.webp"};
      default: return DEFAULT_OPTION;
    }
  }
 
 function btnVote2Click(){
  setMessage("Conectanto na carteira aguarde...");
  addVote(2)
   .then(()=> {
     setShowVotes(2);
     setMessage("Resultado parciais sujeitos a alterações minuto a minuto.");
     })
     .catch(err => {
       console.log(err);
       setMessage(err.message);
     })
 }

 function btnVote1Click(){
   setMessage("Conectanto na carteira aguarde...");
   addVote(1)
    .then(()=> {
      setShowVotes(1);
      setMessage("Resultado parciais sujeitos a alterações minuto a minuto.");
      })
      .catch(err => {
        console.log(err);
        setMessage(err.message);
      })
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
          {
            voting.maxDate > (Date.now() / 1000)
            ? <p className="load mb-3">Você tem até {new Date(Number(voting.maxDate) * 1000).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false // Use 24-hour format
            })} para deixar seu foto na sua cripto favorita!</p>
            :<p className="load mb-3">Votação encerrada. Confira abaixo os resultados.</p>
          }
        </div>
        <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
          <div className="col-1"></div>
          <div className="col-5">
            <h3 className="my-2 d-block mx-auto" style={{width:250}}>{voting.option2}</h3>
            <img src={option2.image} className="d-block mx-auto img-fluid rounded" width={250} height={250} alt="" />
            {
              showVotes > 0 || voting.maxDate < (Date.now() / 1000)
              ? <button className="btn btn-secondary p-3 my-2 d-block mx-auto" style={{width: 250}} disabled={true}>{showVotes === 2 ? Number(voting.votes2) + 1: Number(voting.votes2) } votos </button>
              :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{width:250}} onClick={btnVote2Click} > Essa é minha cripto favorita! </button>
            }
          </div>
          <div className="col-5">
            <h3 className="my-2 d-block mx-auto" style={{width:250}}>{voting.option1}</h3>
            <img src={option1.image} className="d-block mx-auto img-fluid rounded" width={250} height={250} alt="" />
            {
              showVotes > 0 || voting.maxDate < (Date.now() / 1000)
              ? <button className="btn btn-secondary p-3 my-2 d-block mx-auto" style={{width: 250}} disabled={true}>{showVotes === 1 ? Number(voting.votes1) + 1: Number(voting.votes1) } votos </button>
              :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{width:250}} onClick={btnVote1Click} > Essa é minha cripto favorita! </button>
            }
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
