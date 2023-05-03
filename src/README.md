# Código do projeto


# Biblioteca NodeJs para formatação de datas

npm install moment 
Exemplo: const moment = require ('moment')
        function agendamento(data) {
            console.log(moment().format('HH:mm'))
        }


# Criação de remoção de arquivos txt com NodeJs
file.js
    conts fs = require('fs');
    fs.writeFile('text.txt', 'Conteúdo do arquivo', err => { *criar e sobrescrever arquivo de texto*
        console.log(err)  *aviso caso dê algum erro*
    })

    fs.append('text.txt', 'Conteúdo do arquivo', err => { *concatenar nova escrita no arquivo de texto*
        console.log(err)  *aviso caso dê algum erro*
    })

    fs.rename('text.txt', 'text2.txt', err => { *renomear arquivo de texto*
        console.log(err)  *aviso caso dê algum erro*
    })

    fs.unlink('text2.txt', err => { *deletar/remover arquivo de texto*
        console.log(err)  *aviso caso dê algum erro*
    })