/* =========================================================
   CONFIGURAÇÃO DO JAVASCRIPT
========================================================= */


/* =========================================================
   MODAL DE EMERGÊNCIA
========================================================= */

/*
    Essa função abre a janela de emergência.
*/

function abrirEmergencia() {

    const modal = document.getElementById("modalEmergencia");

    modal.classList.add("ativo");
}


/*
    Essa função fecha a janela de emergência.
*/

function fecharEmergencia() {

    const modal = document.getElementById("modalEmergencia");

    modal.classList.remove("ativo");
}


/* =========================================================
   COMPARTILHAMENTO DE LOCALIZAÇÃO
========================================================= */

/*
    Essa função solicita a localização do usuário.

    IMPORTANTE:
    O navegador pede autorização antes de compartilhar
    a localização.

    Em uma versão real, essa localização deveria ser
    enviada para um servidor seguro e, depois, para
    contatos previamente cadastrados.

    O navegador sozinho NÃO consegue simplesmente
    "alertar a polícia".
*/

function compartilharLocalizacao() {

    // Verifica se o navegador possui geolocalização
    if (!navigator.geolocation) {

        alert(
            "Seu navegador não oferece suporte à localização."
        );

        return;
    }


    // Solicita a localização
    navigator.geolocation.getCurrentPosition(

        function (posicao) {

            // Obtém latitude
            const latitude = posicao.coords.latitude;

            // Obtém longitude
            const longitude = posicao.coords.longitude;


            // Cria um link do Google Maps
            const mapa =
                `https://www.google.com/maps?q=${latitude},${longitude}`;


            /*
                Tenta utilizar o sistema de compartilhamento
                do próprio celular/computador.
            */

            if (navigator.share) {

                navigator.share({

                    title: "Pedido de ajuda",

                    text:
                        "Preciso de ajuda. Minha localização atual é:",

                    url: mapa

                });

            } else {

                /*
                    Caso o navegador não possua Web Share,
                    copiamos o endereço para a área de
                    transferência.
                */

                navigator.clipboard.writeText(mapa)

                    .then(function () {

                        alert(
                            "Localização copiada! " +
                            "Envie o link para uma pessoa de confiança."
                        );

                    })

                    .catch(function () {

                        alert(
                            "Localização obtida:\n\n" +
                            mapa
                        );

                    });

            }

        },


        function (erro) {

            /*
                Caso o usuário negue a localização
                ou aconteça algum problema.
            */

            if (erro.code === 1) {

                alert(
                    "Você não autorizou o acesso à localização."
                );

            } else {

                alert(
                    "Não foi possível obter sua localização."
                );

            }

        }

    );

}


/* =========================================================
   FORMULÁRIO DE DENÚNCIA
========================================================= */

const formulario =
    document.getElementById("formDenuncia");


/*
    Verifica se o formulário existe antes de adicionar
    o evento.
*/

if (formulario) {

    formulario.addEventListener(
        "submit",

        function (evento) {

            // Impede o navegador de recarregar a página
            evento.preventDefault();


            // Pega os dados preenchidos
            const tipo =
                document.getElementById("tipo").value;

            const data =
                document.getElementById("data").value;

            const local =
                document.getElementById("local").value;

            const relato =
                document.getElementById("relato").value;


            /*
                Nesta versão, os dados NÃO são enviados
                para um banco de dados.

                Isso será implementado posteriormente
                usando um backend seguro.
            */


            console.log("DENÚNCIA");

            console.log("Tipo:", tipo);

            console.log("Data:", data);

            console.log("Local:", local);

            console.log("Relato:", relato);


            // Mensagem temporária
            alert(
                "Seu relato foi preparado com sucesso!\n\n" +
                "Nesta versão demonstrativa, ele ainda não " +
                "é enviado para um órgão oficial."
            );


            // Limpa o formulário
            formulario.reset();

        }

    );

}


/* =========================================================
   MENSAGEM DOS CARDS DE APOIO
========================================================= */

function mostrarMensagem() {

    alert(
        "Esta área será conectada posteriormente " +
        "a uma lista de comunidades, instituições " +
        "e espaços de apoio."
    );

}