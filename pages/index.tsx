
import QuestaoModel from "@/model/questao";
import { Questao } from "../components/Questao";
import RespostaModel from "@/model/resposta";
import { useEffect, useRef, useState } from "react";
import Botao from "@/components/Botao";
import Questionario from "@/components/Questionario";

const questaoMock = new QuestaoModel(1, "Melhor Cor? ", [
  RespostaModel.errada("verde"),
  RespostaModel.errada("vermelha"),
  RespostaModel.errada("azul"),
  RespostaModel.certa("preto"),
])

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {

  const [questao, setQuestao] = useState(questaoMock)
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const questaoRef = useRef<QuestaoModel>()

  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(id: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${id}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    questaoRef.current = questao
  }, [questao])

  function respostaFornecida(indice: number) {
    console.log(indice)
    setQuestao(questao.responderCom(indice))
  }

  function tempoEsgotado() {
    if(questaoRef.current.naoRespondida) {
      setQuestao(questaoRef.current.responderCom(-1))
    }
  }

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
  }

  function idPraproximoPasso() {

  }

  return (
    
      <Questionario 
        questao={questao} 
        ultima={true} 
        questaoRespondida={questaoRespondida} 
        irPraProximoPasso={idPraproximoPasso}/>
   
  )
}
