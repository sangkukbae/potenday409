module.exports = {
	apps: [
		{
			name: 'backend',
			script: 'apps/backend/dist/main.js',
			instances: 'max',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'production',
			},
		},
		{
			name: 'frontend',
			script: 'apps/frontend/.next/standalone/apps/frontend/server.js',
			instances: 'max',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
