// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import questoes from '../bancoDeQuestoes'
export default (req, res) => {
  const idSelecionado = +req.query.id
  
  const questaoSelecionada = questoes.filter(questao => questao.id === idSelecionado)

  if (questaoSelecionada.length ===1) {
    const unicaQuestaoSelecionada = questaoSelecionada[0].embaralharRespostas()
    res.status(200).json(unicaQuestaoSelecionada.paraObjeto());
  } else {
    res.status(404).send()
  }
}
