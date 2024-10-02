module.exports = {
	apps: [
		{
			name: 'backend',
			script: 'apps/backend/dist/main.js',
			instances: 1,  // Single instance
			exec_mode: 'fork',  // Fork mode for single instance
			env: {
				NODE_ENV: 'production',
			},
		},
		{
			name: 'frontend',
			script: 'apps/frontend/.next/standalone/apps/frontend/server.js',
			instances: 1,  // Single instance
			exec_mode: 'fork',  // Fork mode for single instance
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
