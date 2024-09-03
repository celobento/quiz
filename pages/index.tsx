
import QuestaoModel from "@/model/questao";
import { Questao } from "../components/Questao";
import RespostaModel from "@/model/resposta";
import { useState } from "react";

const questaoMock = new QuestaoModel(1, "Melhor Cor? ", [
  RespostaModel.errada("verde"),
  RespostaModel.errada("vermelha"),
  RespostaModel.errada("azul"),
  RespostaModel.certa("preto"),
])

export default function Home() {

  const [questao, setQuestao] = useState(questaoMock)

  function respostaFornecida(indice: number) {
    console.log(indice)
    setQuestao(questao.responderCom(indice))
  }

  function tempoEsgotado() {
    if(questao.naoRespondida) {
      setQuestao(questao.responderCom(-1))
    }
  }

  return (
    <div style={{
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Questao valor={questao} 
               respostaFornecida={respostaFornecida}
               tempoEsgotado={tempoEsgotado} />
    </div>
  )
}
