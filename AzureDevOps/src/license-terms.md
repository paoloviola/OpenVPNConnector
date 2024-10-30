# OpenVPN Connector

## Overview

The **OpenVPN Connector** is an Azure Pipelines extension that facilitates the connection of machines to a VPN Gateway using OpenVPN. It allows you to install the OpenVPN service on your target machine and connect to it using certificate-based authentication.

## Features

- Install the OpenVPN service on the target machine.
- Connect to a VPN using OpenVPN configuration files.
- Patch additional routes for traffic tunneling.

## Prerequisites

- An Azure DevOps organization.
- An existing service connection for OpenVPN configured with the required certificate and VPN configuration.
- Node.js installed on the machine where the extension will run.

## Installation

1. **Download from Marketplace:**
   - Go to the [Visual Studio Marketplace](https://marketplace.visualstudio.com/) and search for **OpenVPN Connector**.
   - Click on **Get it free** to install the extension in your Azure DevOps organization.

## Configuration

The extension consists of two main tasks:

1. **OpenVPN Install**
   - Installs the OpenVPN service on the target machine.
   - **Inputs:**
     - **OpenVPN Version** (optional): Specify the version of OpenVPN to install. Leave empty for the latest version.

2. **OpenVPN Connect**
   - Connects to the VPN using the specified configuration.
   - **Inputs:**
     - **OpenVPN Service Connection** (required): Select the configured VPN service connection.
     - **Routes** (optional): List of additional routes to tunnel through (e.g., `10.0.0.0/16`).

### Task Usage

**OpenVPN Install Task:**

```yaml
- task: OpenVPNInstall@0
  inputs:
    version: '2.5.9-0ubuntu0.22.04.3'  # Optional, specify a version to install. Leave empty for latest
```

**OpenVPN Connect Task:**

```yaml
- task: OpenVPNConnect@0
  inputs:
    serviceConnection: '<service-connection-id>'  # Required
    routes: |
      10.0.0.0/16
      10.1.0.0/16
```

## Registering the OpenVPN Service Endpoint

To use the OpenVPN Connector in your Azure DevOps pipelines, you need to register a service endpoint. Follow the steps below to register the OpenVPN service endpoint:

1. **Navigate to Project Settings:**
   - Go to your Azure DevOps project.
   - Click on **Project Settings** at the bottom left corner.

2. **Select Service Connections:**
   - Under the **Pipelines** section, click on **Service connections**.

3. **Add a New Service Connection:**
   - Click on the **New service connection** button.
   - Select **OpenVPN Connection** from the list of available service connection types.

4. **Configure the Service Connection:**
   - You will be prompted to fill in the required inputs:
     - **Configuration:** This is the content of your OpenVPN configuration file. Ensure that you provide the full configuration as this is required for the connection to work properly.
   
5. **Save the Service Connection:**
   - After filling out the required inputs, click on **Save** to register the service endpoint.

**Note:** It is essential to provide all required inputs when registering the service endpoint to ensure successful connectivity and functionality in your Azure Pipelines. Failure to do so may lead to issues when trying to connect to the VPN.

## How It Works

1. **Installation:**
   - The `OpenVPNInstall` task executes the command to install OpenVPN on the target machine. You can specify the version if needed.

2. **Connection:**
   - The `OpenVPNConnect` task writes the provided VPN configuration to a file and starts the OpenVPN service.
   - It waits for the VPN connection to be established, retrying as needed.
   - Any additional routes specified are patched to route traffic through the VPN.

## Troubleshooting

- Ensure that the service connection is correctly configured with valid OpenVPN configuration.
- Check that the target machine has the necessary permissions to install software and run OpenVPN commands.
- Review task logs for detailed error messages in case of failures.

## Contributing

Contributions are welcome! Please submit a pull request or create an issue if you encounter problems or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Paolo V.** - [GitHub](https://github.com/paoloviola)
