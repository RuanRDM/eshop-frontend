import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import LivroContext from './LivroContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaEditoras }
        = useContext(LivroContext);

    return (
        <Dialogo id="modalEdicao" titulo="Livro" idformulario="formEdicao"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtTitulo" label="Titulo" tipo="text"
                name="titulo" value={objeto.titulo}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Titulo OK" textoinvalido="Informe o Titulo"
                maximocaracteres={40} />
            <CampoEntrada id="txtAutor" label="Autor" tipo="number"
                name="autor" value={objeto.autor}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Autor OK" textoinvalido="Informe o Autor" 
                maximocaracteres={40}/>
            <CampoEntrada id="txtPreco" label="Preço" tipo="number"
                name="preco" value={objeto.preco}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Preço OK" textoinvalido="Informe o Preço" />
            <CampoEntrada id="txtDescricao" label="Descrição" tipo="text"
                name="descricao" value={objeto.descricao}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Descrição OK" textoinvalido="Informe a descrição"
                maximocaracteres={40} />
            <CampoSelect id="txtEditora" label="Editora"
                name="editora" value={objeto.editora}
                handlechange={handleChange}
                requerido={true}
                textovalido="Editora OK"
                textoinvalido="Informe a Editora">
                {
                    listaEditoras.map((cat) => (
                        <option key={cat.codigo} value={cat.codigo}>
                            {cat.nome}
                        </option>
                    ))
                }
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;
