import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import EditoraContext from './EditoraContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(EditoraContext);

    return (
        <Dialogo id="modalEdicao" titulo="Editora" idformulario="formEdicao"
        acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome_editora" value={objeto.nome}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Nome OK" textoinvalido="Informe o nome"
                maximocaracteres={40} />
        </Dialogo>
    )
}

export default Form;
