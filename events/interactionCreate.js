module.exports = async (client, int) => {
    if (!int.isCommand()) return;

    const command = client.commands.get(int.commandName);
    if (!command) return;
  
    try {
      await command.execute(client, int);
    } catch (error) {
      console.error(error);
      return int.reply({
        content: 'Si è verificato un errore durante l\'esecuzione di questo comando!',
        ephemeral: true
      });
    };
}