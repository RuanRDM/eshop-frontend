import { useState, useEffect } from "react";
import LivroContext from "./LivroContext";
import { getCategoriaServico }
    from '../../../servicos/CategoriaServico';
import {
    getLivroServico, getLivroServicoPorCodigoAPI,
    deleteLivroServico, cadastraLivroServico
}
    from '../../../servicos/LivroServico'
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Livro() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });
    const [carregando, setCarregando] = useState(false);
    const [listaCategorias, setListaCategorias] = useState([]);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: "",
            valor: "",
            ativo: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: ""
        });
    }

    const editarObjeto = async codigo => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setObjeto(await getLivroServicoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraLivroServico(objeto, metodo);
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
        recuperaLivros();
    }

    const recuperaLivros = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getLivroServico());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaCategorias = async () => {
        setListaCategorias(await getCategoriaServico());
    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto')) {
                let retornoAPI = await deleteLivroServico(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaLivros();
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
        recuperaLivros();
        recuperaCategorias();
    }, []);

    return (
        <LivroContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar,
            handleChange, novoObjeto, editarObjeto, listaCategorias
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </LivroContext.Provider>
    )
}

export default WithAuth(Livro);