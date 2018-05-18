class SwitchService {

    listarNaoPaginado(sucesso, erro) {

        let trataFetch = (resultado) => {
            if (resultado.ok) {
                resultado.json().then(sucesso)
            } else {
                resultado.json().then(
                    (resultadoErro) => erro(resultadoErro)
                )
            }
        };

        fetch("/wm/core/controller/switches/json", {
            headers: new Headers({
            }),
            method: "GET"
        }).then(trataFetch);
    }

}

let switchService = new SwitchService();

export default switchService;