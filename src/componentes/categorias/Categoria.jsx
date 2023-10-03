import { useState, useEffect } from 'react';
import CategoriaContext from './CategoriaContext';
import {
    getCategoriasAPI, getCategoriaPorCodigoAPI,
    deleteCategoriaPorCodigoAPI, cadastraCategoriaAPI
} from '../servicos/CategoriaServico';
import Form from './Form';
import Tabela from './Tabela';
import WithAuth from '../../seguranca/WithAuth';
import { useNavigate } from "react-router-dom";

function Categoria() {
    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
	
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    })

    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
    }

    const editarObjeto = async codigo => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setObjeto(await getCategoriaPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }
	
    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);
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
        recuperaCategorias();
    }	

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaCategorias = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getCategoriasAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }
	
    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto')) {
            try {
                let retornoAPI = await deleteCategoriaPorCodigoAPI(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaCategorias();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
                remover,
                objeto,
                editar,
                acaoCadastrar,
                handleChange, novoObjeto, editarObjeto
            }
        }>            
            <Tabela />
            <Form />
        </CategoriaContext.Provider>
    );
}

export default WithAuth(Categoria);