const chalk = require('chalk')

let AsciiTable = require('ascii-table');
let table = new AsciiTable();
table.setTitle('Olimpo Bot').setBorder('║', '═');
table.addRow('Status','Online');

let tabletoken = new AsciiTable();
tabletoken.setTitle('Token').setBorder('║', '═');
tabletoken.addRow('successfully checked');

module.exports = async (client) => {
    client.user.setPresence({ activities: [{name: "(LOLI)mpo", type: "WATCHING" }]});
    client.user.setStatus('idle')
    // client.user.setAvatar("./unknown.png").then(user => console.log('avatar set!')).catch(console.error)
    console.log(chalk.green(table.toString()));
    console.log(chalk.green(tabletoken.toString()));
}