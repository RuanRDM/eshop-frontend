import { getToken } from "../seguranca/Autenticacao";

export const getLivroServico = async () => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/livro`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getLivroServicoPorCodigoAPI = async codigo => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/livro/${codigo}`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const deleteLivroServico = async codigo => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/livro/${codigo}`,
    {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}


export const cadastraLivroServico = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/livro`, {
        method: metodo,
        headers: { "Content-Type": "application/json",
        "authorization" : getToken() },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}