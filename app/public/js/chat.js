document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io();

    //Oculta janela de iniciar chat
    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    //Mostra janela de chat iniciado
    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    //Recupera informações envidas pelo usuário
    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    //Envia variáveis para servidor
    const params = {
        email,
        text
    }
    socket.on("connect", () => {
        socket.emit("client_first_access", params, (call, err) => {
            if(err){
                console.err(err);
            }else{
                console.log(call);
            }
        });
    })
});
