const inicializar = () => {
    const memoria = [];

    const valores = {
        tamanhoTotal: null,
        tamanhoProcesso: null,
        tipoAlgoritmo: null,
        nomeProcesso: null,
        tamanhoAtual: null,
        ultimaPosicao: null
    };

    const mensagemErro = () => {
        alert("Por favor, preencha todos os campos necessários!");
    };

    const mensagemMemoria = () => {
        alert("Por favor, gere a memória!");
    };

    const mensagemBloco = () => {
        alert("Bloco não inserido!");
    }

    const salvarValoresIniciais = () => {
        valores.tamanhoTotal = document.getElementById("tamanhoTotal").value;
        valores.tipoAlgoritmo = document.getElementById("tipoAlgoritmo").value;
        valores.tamanhoAtual = valores.tamanhoTotal;

        if (!(valores.tamanhoTotal && valores.tipoAlgoritmo)) {
            mensagemErro();
            return;
        }

        geraMemoria();
        console.log("Memoria gerada: ", memoria);
    };

    const geraMemoria = () => {
        memoria.splice(0, memoria.length);
        while (valores.tamanhoAtual > 0) {
            const numeroAleatorio =
                5 +
                Math.floor(
                    Math.random() *
                    ((valores.tamanhoAtual < 50 ? valores.tamanhoAtual : 50) - 5)
                );

            valores.tamanhoAtual = valores.tamanhoAtual - numeroAleatorio;
            memoria.push({
                tamanhoDoBloco: numeroAleatorio,
                tamanhoDisponivel: numeroAleatorio,
                processos: [],
            });
        }
    };

    const novoProcesso = () => {

        if (!(valores.tamanhoTotal && valores.tipoAlgoritmo)) {
            mensagemMemoria();
            return;
        }

        valores.tamanhoProcesso = document.getElementById("tamanhoProcesso").value;
        valores.nomeProcesso = document.getElementById("nomeProcesso").value;

        if (!(valores.nomeProcesso && valores.tamanhoProcesso)) {
            mensagemErro();
            return;
        }

        processarDados();
    };

    const primeiroEncaixe = () => {
        let podeInserir = true;

        memoria.map(bloco => {
            if (bloco.tamanhoDisponivel >= valores.tamanhoProcesso && podeInserir) {

                podeInserir = false;
                bloco.tamanhoDisponivel -= valores.tamanhoProcesso;

                return {
                    tamanhoDoBloco: bloco.tamanhoDoBloco,
                    tamanhoDisponivel: bloco.tamanhoDisponivel,
                    processos: bloco.processos.push({
                        tamanho: valores.tamanhoProcesso,
                        nome: valores.nomeProcesso
                    }),
                }
            }

            return bloco;
        });

        if (podeInserir) {
            mensagemBloco();
        }
    }

    const proximoEncaixe = () => {
        let podeInserir = true;
        let posicaoAux = -1;

        memoria.map(bloco => {
            posicaoAux += 1;

            if (bloco.tamanhoDisponivel >= valores.tamanhoProcesso && podeInserir && (!valores.ultimaPosicao || posicaoAux >= valores.ultimaPosicao)) {
                valores.ultimaPosicao = posicaoAux;
                podeInserir = false;
                bloco.tamanhoDisponivel -= valores.tamanhoProcesso;


                return {
                    tamanhoDoBloco: bloco.tamanhoDoBloco,
                    tamanhoDisponivel: bloco.tamanhoDisponivel,
                    processos: bloco.processos.push({
                        tamanho: valores.tamanhoProcesso,
                        nome: valores.nomeProcesso
                    }),
                }
            }

            if (valores.ultimaPosicao === memoria.length - 1) {
                valores.ultimaPosicao = null;
            }

            return bloco;
        });

        if (podeInserir) {
            mensagemBloco();
        }
    }

    const melhorEncaixe = () => {
        let posicaoMelhorBloco = null;
        let ultimoValor = 0;
        let contadorBloco = 0;
        let valorAtual = 0;

        memoria.forEach(bloco => {
            if (bloco.tamanhoDisponivel >= valores.tamanhoProcesso) {
                valorAtual = bloco.tamanhoDisponivel - valores.tamanhoProcesso; 

                if (ultimoValor >= valorAtual) {
                    posicaoMelhorBloco = contadorBloco;
                }
                ultimoValor = valorAtual; 
            }
            contadorBloco += 1; 
        });

        if (posicaoMelhorBloco !== null) {

            memoria[posicaoMelhorBloco].processos.push({
                tamanho: valores.tamanhoProcesso,
                nome: valores.nomeProcesso
            });

            memoria[posicaoMelhorBloco].tamanhoDisponivel = memoria[posicaoMelhorBloco].tamanhoDisponivel -= valores.tamanhoProcesso;
        } else  {
            mensagemBloco();
        }
    }

    const piorEncaixe = () => {
        let posicaoPiorBloco = null;
        let ultimoValor = 0;
        let contadorBloco = 0;
        let valorAtual = 0;

        memoria.forEach(bloco => {
            console.log(bloco.tamanhoDisponivel, ">=", valores.tamanhoProcesso);
            if (bloco.tamanhoDisponivel >= valores.tamanhoProcesso) {
                valorAtual = bloco.tamanhoDisponivel - valores.tamanhoProcesso; 

                console.log(ultimoValor, "<=", valorAtual);
                if (ultimoValor <= valorAtual) {
                    console.log('pegou essa posicao do array', contadorBloco);
                    posicaoPiorBloco = contadorBloco;
                }
                ultimoValor = valorAtual; 
            }
            contadorBloco += 1; 
        });

        if (posicaoPiorBloco !== null) {

            memoria[posicaoPiorBloco].processos.push({
                tamanho: valores.tamanhoProcesso,
                nome: valores.nomeProcesso
            });

            memoria[posicaoPiorBloco].tamanhoDisponivel = memoria[posicaoPiorBloco].tamanhoDisponivel -= valores.tamanhoProcesso;
        } else  {
            mensagemBloco();
        }
    }

    const processarDados = () => {
        switch (valores.tipoAlgoritmo) {
            case "primeiro":
                primeiroEncaixe();
                break;
            case "proximo":
                proximoEncaixe();
                break;
            case "melhor":
                melhorEncaixe();
                break;
            case "pior":
                piorEncaixe();
                break;
            default:
                break;
        }

        console.log("Processado: ", memoria);
    };

    document
        .getElementById("salvarValoresIniciais")
        .addEventListener("click", salvarValoresIniciais, false);
    document
        .getElementById("novoProcesso")
        .addEventListener("click", novoProcesso, false);
};

document.addEventListener("DOMContentLoaded", inicializar, false);
