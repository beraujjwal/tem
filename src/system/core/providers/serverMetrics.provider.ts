
import { Application } from 'express';
import expressStatusMonitor from 'express-status-monitor';

import { APP_NAME, API_PREFIX } from '../config';

class ServerMetrics {
	public initialize (_express: Application): Application {
        

		const api: string = API_PREFIX;

		// Define your status monitor config
		const monitorOptions: object = {
			title: APP_NAME,
			path: '/status-monitor',
			spans: [
				{
					interval: 1, 		// Every second
					retention: 60		// Keep 60 data-points in memory
				},
				{
					interval: 5,
					retention: 60
				},
				{
					interval: 15,
					retention: 60
				}
			],
			chartVisibility: {
				mem: true,
				rps: true,
				cpu: true,
				load: true,
				statusCodes: true,
				responseTime: true
			},
			healthChecks: [
				{
					protocol: 'http',
					host: 'localhost',
					path: '/',
					port: '8080'
				},
				{
					protocol: 'http',
					host: 'localhost',
					path: `/${api}`,
					port: '8080'
				}
			]
		};

		// Loads the express status monitor middleware
		_express.use(expressStatusMonitor(monitorOptions));

		return _express;
	}
}

export default new ServerMetrics;
