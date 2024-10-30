# OpenVPN Connector Overview

## Description

The **OpenVPN Connector** is a powerful Azure DevOps extension designed to simplify the process of connecting your build and release pipelines to a VPN Gateway using OpenVPN. This extension provides two primary tasks: installing the OpenVPN service on target machines and connecting to the VPN using certificate-based authentication.

For more information and access to the source code, visit [the repository](https://github.com/paoloviola/OpenVPNConnector).

## Key Features

- **Easy Installation:** Quickly install the OpenVPN service with an option to specify the version.
- **Flexible Configuration:** Connect to your VPN using a customizable OpenVPN configuration file.
- **Route Management:** Seamlessly manage and patch additional routes for traffic tunneling through the VPN.

## Getting Started

1. **Installation from Marketplace:**
   - Download the OpenVPN Connector from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/) and install it in your Azure DevOps organization.

2. **Configuration:**
   - Set up the OpenVPN service connection in your Azure DevOps project by providing the necessary configuration details.
   - Use the provided tasks in your pipelines to install OpenVPN and connect to your VPN as needed.

## Use Cases

- **Secure CI/CD Pipelines:** Ensure that your build and deployment processes operate within a secure network environment by routing traffic through a VPN.
- **Testing and Development:** Access private resources or services securely during development or testing phases without exposing them to the public internet.

## Support and Contributions

For support, please open an issue in the repository. Contributions are welcome! Feel free to fork the project and submit a pull request with your enhancements or fixes.

## License

This extension is licensed under the MIT License. See the [LICENSE](license-terms.md) file for details.

## Author

**Paolo V.** - [GitHub](https://github.com/paoloviola)

