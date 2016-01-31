[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)]() [![Dependency Status](https://david-dm.org/haproxyhq/frontend.svg)](https://david-dm.org/haproxyhq/frontend) [![devDependency Status](https://david-dm.org/haproxyhq/frontend/dev-status.svg)](https://david-dm.org/haproxyhq/frontend#info=devDependencies)
#HAProxyHQ
HAProxyHQ is the headquarter for all your HAProxy instances. It allows you to configure and manage different HAProxy instances, while keeping track of they're health status. The project consists of three different repositories:
- [HAProxyHQ/Backend](https://github.com/haproxyhq/backend) - This is the backend, which takes care of managing HAProxy instances and rolling out configs. Implemented in Java Spring.
- [HAProxyHQ/Frontend](https://github.com/haproxyhq/frontend) - This is the frontend, which provides a simple user interface. Implemented in Angular 2.
- [HAProxyHQ/Agent](https://github.com/haproxyhq/agent) - This is the agent, which runs on every HAProxy instance and takes care of communication between the instance and the HAProxyHQ/Backend and applies settings, made by the user. Implemented in Python 2.7.

##HAProxyHQ/Frontend/Introduction
This is the Angular 2 frontend project for HAProxyHQ.

##HAProxyHQ/Frontend/Install & use
Currently it is necessary that you change the variable ```public static SERVER_URL = 'http://localhost:8080';``` in the file ```app/services/general/global-storage.service.ts``` to your HAProxyHQ backend url.
After doing so you can install the dependencies by running ```npm install``` and get live compiling and live serving with ```npm start```.
