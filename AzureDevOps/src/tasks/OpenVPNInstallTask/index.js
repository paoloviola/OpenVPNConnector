const tl = require('azure-pipelines-task-lib/task');
const { exec } = require('child_process');

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(`Error: ${error.message}`);
      }

      if (stderr) {
        tl.warning(stderr);
      }

      resolve(stdout);
    });
  });
}

async function updateRepositories() {
  tl.debug(await executeCommand('sudo apt-get update'))
}

async function installOpenVPN() {
  const version = tl.getInput('version', false);
    
  const command = version
    ? `sudo apt-get install -y openvpn=${version}`
    : 'sudo apt-get install -y openvpn';

  tl.debug(await executeCommand(command));
}

async function run() {
  try {
    await updateRepositories();
    await installOpenVPN();

    tl.setResult(tl.TaskResult.Succeeded);
  } catch (error) {
    tl.setResult(tl.TaskResult.Failed, error);
  }
}

run();
