let socket_admin_id = null;
let email = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
    socket = io();

    //Oculta janela de iniciar chat
    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    //Mostra janela de chat iniciado
    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    //Recupera informações envidas pelo usuário
    email = document.getElementById("email").value;
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

    socket.on("client_list_all_messages", messages => {
        var template_client = document.getElementById("message-user-template").innerHTML;
        var template_admin = document.getElementById("message-admin-template").innerHTML;

        messages.forEach(element => {
            if(element.admin_id == null){
                const rendered = Mustache.render(template_client, {
                    message: element.text,
                    email
                })

                document.getElementById("messages").innerHTML += rendered;
            }else{
                const rendered = Mustache.render(template_admin, {
                    message_admin: element.text
                })

                document.getElementById("messages").innerHTML += rendered;
            }
        });
    })

    //Recebe mensagem do admin
    socket.on("admin_send_to_client", (message) => {
        socket_admin_id = message.socket_id;
    
        const template_admin = document.getElementById("admin-template").innerHTML;
    
        const rendered = Mustache.render(template_admin, {
          message_admin: message.text,
        });
    
        document.getElementById("messages").innerHTML += rendered;
      });
});

//Botão de resposta do usuário
document
  .querySelector("#send_message_button")
  .addEventListener("click", (event) => {
    const text = document.getElementById("message_user");

    const params = {
      text: text.value,
      socket_admin_id,
    };

    socket.emit("client_send_to_admin", params);

    const template_client = document.getElementById("message-user-template")
      .innerHTML;

    const rendered = Mustache.render(template_client, {
      message: text.value,
      email,
    });

    document.getElementById("messages").innerHTML += rendered;

    text.value = "";
  });
