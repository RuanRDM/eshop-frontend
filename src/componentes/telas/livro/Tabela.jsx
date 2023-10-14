import { useContext } from "react";
import LivroContext from "./LivroContext";
import Alerta from '../../comuns/Alerta';
import { formataMoeda } from "../../comuns/Uteis";

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto }
        = useContext(LivroContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Livros</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum livro encontrado</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Autor</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Editora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        onClick={() => editarObjeto(objeto.codigo)}
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.codigo); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.titulo}</td>
                                <td>{objeto.autor}</td>
                                <td>{formataMoeda(objeto.preco)}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.editora_nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;