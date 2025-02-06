/*******************************************************************
 * Objetivo: Criar a API para o gerenciamento do arquivo de funções
 * Data: 30/01/2024
 * Autor: Gustavo Rocha Gomes
 * Versão: 1.0
 *******************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

const app = express()


app.use((request, response, next)=>{

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

const contatosFiltros = require('./Modulos/funcoes')

app.get('/v1/whatsapp/usuario/:numero', cors(), async function(request, response) {

    let uf = request.params.numero

    let userNum = contatosFiltros.listaContatoNumero(uf)

    if(userNum){
        response.status(200)
        response.json(userNum)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possivel encontrar nenhum item de retorno.'})
    }
})

app.get ('/v1/whatsapp/alternativas/contato/:numero', cors(), async function (request, response){

    let uf = request.params.numero

    let altInfo = contatosFiltros.listaInfoAlt(uf)

    if(altInfo){
        response.status(200) //Sucesso
        response.json(altInfo)
    }else{
        response.status(404) //Not Found
        response.json({'status': 404, 'message': 'Não foi possivel encontrar nenhum item de retorno.'})
    }
})

app.get('/v1/whatsapp/lista/contatos/:numero', cors(), async function (request, response){
    
    let uf = request.params.numero

    let listaContatos = contatosFiltros.listaDeContatos(uf)

    if(listaContatos){
        response.status(200) //Sucesso
        response.json(listaContatos)
    }else{
        response.status(404) //Not Found
        response.json({'status': 404, 'message': 'Não foi possivel encontrar nenhum item de retorno.'})
    }

})

app.get('/v1/whatsapp/lista/conversas/:numero', cors(), async function(request, response){

    let uf = request.params.numero

    let listaConversas = contatosFiltros.listaDeConversas(uf)

    if(listaConversas){
        response.status(200) //Sucesso
        response.json(listaConversas)
    }else{
        response.status(404) //Not Found
        response.json({'status': 404, 'message': 'Não foi possivel encontrar nenhum item de retorno.'})
    }
})

app.get ('/v1/whatsapp/conversas/numero/contato', cors(), async function(request, response) {
    
    let numeroUsuario = request.query.numero

    let nomeContato = request.query.contato

    let conversasContato = contatosFiltros.listaUsuarioContato(numeroUsuario, nomeContato )

    if(conversasContato){
        response.status(200) //Sucesso
        response.json(conversasContato)
    }else{
        response.status(404) //Not Found
        response.json({'status': 404, 'message': 'Não foi possivel encontrar nenhum item de retorno.'})
    }

})

app.get ('/v1/whatsapp/conversas/usuario/mensagem', cors(), async function(request, response) {
    
    let numero = request.query.numero

    let nomeContato = request.query.contato

    let texto = request.query.mensagem

    let mensagemEspecifica = contatosFiltros.buscaMensagemEspecifica(numero, nomeContato, texto)

    if(mensagemEspecifica){
        response.status(200) //Sucesso
        response.json(mensagemEspecifica)
    }else{
        response.status(404) //Not Found
        response.json({'status': 404, 'message': 'Não foi possivel encontrar nenhum item de retorno.'})
    }

})



app.listen('8080', function(){
    console.log('API aguardando requisições . . .')
})