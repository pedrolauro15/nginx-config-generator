const fs = require('fs')
const path = require('path')
const program = require('commander')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let upstreamName = ''
let serviceIp = ''
let servicePort = 0
let upstreamUri = ''

function start() {

  readline.question('Qual o nome do upstream que você deseja gerar?\n', (answer) => {
    upstreamName = answer

    readline.question('Qual o IP deste upstream?\n', (answer) => {
      serviceIp = answer

      readline.question('Qual a porta?\n', (answer) => {
        servicePort = answer
        readline.question('Para qual URL você irá redirecionar este upstream?\n', (answer) => {
          upstreamUri = answer
          generate({ upstreamName, serviceIp, servicePort, upstreamUri })
        })
      })
    })
  })

}


function generate({ upstreamName = '', serviceIp = '', servicePort = 8080, upstreamUri = '' }) {
  const template = fs.readFileSync(path.join(__dirname, '..', 'template', 'base.txt'))
  const templateString = template.toString('utf-8')
  const builded = templateString
    .replaceAll('{{upstreamName}}', upstreamName)
    .replaceAll('{{serviceIp}}', serviceIp)
    .replaceAll('{{servicePort}}', servicePort)
    .replaceAll('{{upstreamUri}}', upstreamUri)

  console.log(builded);

  readline.close()
}

program
  .program
  .command('create')
  .description('Adiciona um to-do')
  .action(() => {
    start()
  });

program.program.parse()