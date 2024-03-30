//firebase não inicializado

let express = require('express'); 
let app = express();
let pug = require('pug');


const port = 3000; //Escolha um valor que esteja entre 1025 e 65535

// Configurações do Express
app.set('view engine', 'pug');
app.set('views', './views');

//Recursos estáticos da aplicação
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Rota principal
app.get('/',(req,res)=>{
    res.render('index');
});

//Rota de tela para autenticação
app.get('/login',(req, res)=>{ 
    res.render('login');
});   

// Rota para autenticação
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Autenticação bem-sucedida
            req.session.user = userCredential.user;
            res.redirect('/produtos');
        })
        .catch((error) => {
            // Tratamento de erro
            res.render('login', { error: error.message });
        });
});

// Rota para exibir a lista de produtos
app.get('/produtos', (req, res) => {
    // Verifica se o usuário está autenticado
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    // Aqui você pode buscar os produtos do Firestore e renderizar a página de produtos
    res.render('produtos');
});


// Rota para o formulário de cadastro de produtos
app.get('/cadastro-produtos', (req, res) => {
    res.render('cadastro');
});

// Rota para lidar com o envio do formulário de cadastro de produtos
app.post('/cadastro-produtos', (req, res) => {
    const { nomeProduto, descricao, preco } = req.body;
    
    // Objeto do produto para inserção no Firestore
    const produto = {
        nome: nomeProduto,
        descricao: descricao,
        preco: parseFloat(preco) // Garantir que o preço é armazenado como um número
    };

    // Inserir o produto no Firestore
    db.collection('produtos').add(produto)
        .then(() => {
            console.log('Produto adicionado com sucesso!');
            res.redirect('/produtos'); // Redirecionar para a lista de produtos após a inserção
        })
        .catch(error => {
            console.error('Erro ao adicionar produto:', error);
            res.render('cadastro', { error: error.message });
        });
});



// Rota para logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

