import { useState, useEffect } from "react";
import EditoraContext from "./EditoraContext";
import {
    getEditoraServico, getEditoraServicoPorCodigoAPI,
    deleteEditoraServico, cadastraEditoraServico
}
    from '../../../servicos/EditoraServico';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Editora() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: 0, nome: "" });
    }

    const editarObjeto = async codigo => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setObjeto(await getEditoraServicoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraEditoraServico(objeto, metodo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaEditoras();
    }



    const recuperaEditoras = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getEditoraServico());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto')) {
                let retornoAPI = await deleteEditoraServico(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaEditoras();
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaEditoras();
    }, []);

    return (
        <EditoraContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar,
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </EditoraContext.Provider>
    )
}

export default WithAuth(Editora);