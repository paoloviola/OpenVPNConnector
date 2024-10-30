const tl = require('azure-pipelines-task-lib/task');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHECK_INTERVAL = 5000;
const MAX_ATTEMPTS = 12;

async function run() {
  await openVPNConnection();
  await waitForVPNConnection();
  await patchRoutes();
}

async function openVPNConnection() {
  const serviceConnectionId = tl.getInputRequired('serviceConnection');
  const configurationStr = tl.getEndpointAuthorizationParameterRequired(serviceConnectionId, 'configuration');

  if (!configurationStr) {
    throw new Error('VPN configuration is missing in the service connection.');
  }

  const configurationPath = path.join(__dirname, 'vpn.conf');
  fs.writeFileSync(configurationPath, configurationStr);

  tl.debug('Starting OpenVPN...');
  await executeCommand(`sudo openvpn --config ${configurationPath} --daemon`);
}

async function waitForVPNConnection() {
  tl.debug('Waiting for VPN connection...');
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      await executeCommand('ifconfig tun0');
      tl.debug(`VPN connection established on attempt ${attempt + 1}.`);
      return;
    } catch (error) {
      tl.warning(`Attempt ${attempt + 1} failed: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
    }
  }
  throw new Error('VPN connection failed to establish within the expected time.');
}

async function patchRoutes() {
  let routes = tl.getInput('routes', false);
  if (routes) {
    routes = routes.split('\n')
      .map(route => route.trim())
      .filter(route => route !== '');

    for (const route of routes) {
      await patchRoute(route);
    }
  }

  await executeCommand('sudo ip route flush cache');
}

async function patchRoute(route) {
  const [address, cidr] = route.split('/');

  if (!address || !cidr) {
    throw new Error(`Invalid route format: ${route}`);
  }

  try {
    await executeCommand(`sudo ip route del ${address}/${cidr} dev eth0`);
    await executeCommand(`sudo ip route add ${address}/${cidr} dev tun0`);
    tl.debug(`Patched route: ${route}`);
  } catch (error) {
    tl.warning(`Failed to patch route ${route}: ${error.message}`);
  }
}

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

(async () => {
  try {
    await run();
    tl.setResult(tl.TaskResult.Succeeded);
  } catch (error) {
    tl.setResult(tl.TaskResult.Failed, error.message);
  }
})();
