
// Importando componentes do bootstrap
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

// Importando o icone da lupa
import { BsSearch } from "react-icons/bs";

// Importanto o hook de produtos
import { useListaProdutos, useDeletaProduto } from '../../hooks/useProdutos' 

import { Link } from "react-router-dom";

import { useState } from "react"

const VerProdutos = () => {

  // variavel para armazenar os Funcionarios, que veio do hook
  const produtos = useListaProdutos();

  // importanto a funcao de deletar Funcionario
  const { deletarProduto } = useDeletaProduto();

  // Funçao para requisitar a exclusao do produto
  const handleDelete = async (idProduto, nome) =>{
    // Após confirmação, utiliza-se o hook de deletar para solicitar a exclusão
    // passando o id do produto
     if(confirm(`Deseja realmente excluir o produto ${nome}?`)){
            const deletado = await deletarProduto(idProduto)
            alert(`Produto ${nome} deletado com sucesso!`)
            window.location.reload()
        }
  }
// PARTE DE FILTROS
  // Variaveis para os filtros
  const [buscaNome, setBuscaNome] = useState("")
  const [buscaTipo, setBuscaTipo] = useState("")

  // Lógica do filtro
  const produtosFiltrados = produtos.filter((pro)=>{
    // Verifica se o que está na caixinha, tem semelhança com algum nome de produto
    const nomeCorresponde = pro.nome.toLowerCase().includes(buscaNome.toLowerCase())

    // Verifica se o que está no filtro do dropdown, tem semelhança com algum tipo de produto
    const tipoCorresponde = buscaTipo 
    ? pro.tipo?.toLowerCase() === buscaTipo.toLowerCase()
    : true

    return nomeCorresponde && tipoCorresponde
  })

  return (
    <div>
      <h1 className="text-center"> Estoque </h1>

      {/* INICIO FILTRO */}
      <div className="w-75 mx-auto d-flex justify-content-center gap-2 flex-wrap">
        {/* Caixinha */}
          <InputGroup className="mb-3" style={{maxWidth:"400px"}}>
            <Form.Control
              placeholder="Procure um produto"
              value={buscaNome}
              onChange={(e) => setBuscaNome(e.target.value)}
            ></Form.Control>
            <Button variant="primary" id="botao-filtrar">
              <BsSearch /> Pesquisar
            </Button>
          </InputGroup>
      </div>
      {/* FIM FILTRO */}

       {/* INICIO TABELA */}
        <Table striped bordered hover>
          {/* Cabeçalho da tabela */}
          <thead>
              <tr>
                <th>Nome</th>
                <th>Código</th>
                <th>Descrição</th>
                <th>Entrada</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th></th>
              </tr>
          </thead>
          {/* Corpo da tabela */}
          <tbody>
          { produtosFiltrados.length > 0 ?
          ( produtosFiltrados.map((pro) => (
              <tr key={pro.id}>
                <td> {pro.id}</td>
                <td> {pro.nome}</td>
                <td> {pro.codigo}</td>
                <td> {pro.descricao}</td>
                <td> {pro.dataEntrada}</td>
                <td> {pro.dataValidade}</td>
                <td> {pro.valor}</td>
                <td>
                  {/* Editar */}
                  <Button as={Link} 
                    to={`/produtos/editar/${pro.id}`}
                    size="sm" 
                    variant="warning" 
                    className="mx-2">
                  Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger" 
                    className="mx-2" 
                    onClick={() => {handleDelete(pro.id, pro.nome)}}>
                  Excluir
                  </Button>
                </td>
              </tr>
            ))) :
          // Caso não haja clientes na lista
          (<tr> <td colSpan={9} className="text-center"> Nenhum cliente encontrado</td> </tr>)}
          </tbody>
        </Table>
      {/* FIM TABELA */}
    </div>
  )
}

export default VerProdutos
