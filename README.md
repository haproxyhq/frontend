[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)]() [![Dependency Status](https://david-dm.org/haproxyhq/frontend.svg)](https://david-dm.org/haproxyhq/frontend) [![devDependency Status](https://david-dm.org/haproxyhq/frontend/dev-status.svg)](https://david-dm.org/haproxyhq/frontend#info=devDependencies)
#HAProxyHQ
HAProxyHQ is the headquarter for all your HAProxy instances. It allows you to configure and manage different HAProxy instances, while keeping track of they're health status. The project consists of three different repositories:
- [HAProxyHQ/Backend](https://github.com/haproxyhq/backend) - This is the backend, which takes care of managing HAProxy instances and rolling out configs. Implemented in Java Spring.
- [HAProxyHQ/Frontend](https://github.com/haproxyhq/frontend) - This is the frontend, which provides a simple user interface. Implemented in Angular 2.
- [HAProxyHQ/Agent](https://github.com/haproxyhq/agent) - This is the agent, which runs on every HAProxy instance and takes care of communication between the instance and the HAProxyHQ/Backend and applys settings, made by the user. Implementes in Python 2.7.

##HAProxyHQ/Frontend/Introduction
This is the Angular 2 frontend project for HAProxyHQ.

##HAProxyHQ/Frontend/Install & use
- Run ```npm install``` to install dependencies.
- Run ```npm start``` to get live compiling for ts files and live serving with gulp serve.
