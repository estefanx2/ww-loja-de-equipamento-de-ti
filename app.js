let express = require("express"); //cria a ligação com o Express
let app = express(); //Cria uma aplicação web modelo para ser usada

app.use(express.static('public')); //diz para a aplicação web que a pasta contendo código estático está tem o nome "public"

 const port = 3000; //define uma constante com o valor da porta TCP da aplicacao (3000)
 const address = "localhost"; //define o nome do host que contem a aplicação
 
 app.listen(port, address,()=>{
	 console.log(`Servidor executando no endereço http://${address}:${port}`);
 });

	 //Uma string  delimitada por crase (`string`) é chamda de Template String e permite concatenar os caracteres da string com operação ou valores contidos em variáveis Jaascript.