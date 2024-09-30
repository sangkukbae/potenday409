# Soul Friends Application

Welcome to **Soul Friends Application**, a robust and scalable full-stack project built using modern technologies and best practices. This monorepo leverages **TurboRepo** for efficient build management, **pnpm** for package management, and integrates a suite of tools for seamless development, testing, and deployment.

## Table of Contents

- [Soul Friends Application](#soul-friends-application)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Folder Structure](#folder-structure)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Install Dependencies](#2-install-dependencies)
  - [Running the Application Locally](#running-the-application-locally)
    - [Starting the MySQL Database](#starting-the-mysql-database)
    - [Running Frontend and Backend](#running-frontend-and-backend)
  - [Building the Project](#building-the-project)
  - [Testing](#testing)
    - [Running Tests for a Specific Package](#running-tests-for-a-specific-package)
  - [Linting](#linting)
    - [Linting a Specific Package](#linting-a-specific-package)
  - [Deployment](#deployment)
    - [Provisioning the VM on Naver Cloud Platform](#provisioning-the-vm-on-naver-cloud-platform)
    - [Setting Up the Server](#setting-up-the-server)
    - [Environment Variables](#environment-variables)
      - [Backend (`apps/backend/.env`)](#backend-appsbackendenv)
      - [Frontend (`apps/frontend/.env.local`)](#frontend-appsfrontendenvlocal)
    - [Setting Up NGINX as a Reverse Proxy](#setting-up-nginx-as-a-reverse-proxy)
    - [Configuring SSL with Let's Encrypt](#configuring-ssl-with-lets-encrypt)
  - [CI/CD Pipeline](#cicd-pipeline)
    - [GitHub Actions](#github-actions)
  - [Environment Variables](#environment-variables-1)
    - [Backend (`apps/backend/.env`)](#backend-appsbackendenv-1)
    - [Frontend (`apps/frontend/.env.local`)](#frontend-appsfrontendenvlocal-1)
  - [Contributing](#contributing)
    - [Steps to Contribute](#steps-to-contribute)
  - [License](#license)
  - [Additional Resources](#additional-resources)

---

## Project Overview

This project is a full-stack application with the following tech stack:

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Nest.js, TypeORM
- **Database**: MySQL (managed via Docker)
- **Monorepo Management**: TurboRepo
- **Package Manager**: pnpm
- **CI/CD**: GitHub Actions following Gitflow workflow
- **Hosting**: Virtual Machine on Naver Cloud Platform
- **Process Management**: PM2

TurboRepo optimizes build and development workflows, while pnpm ensures efficient dependency management. The project adheres to best practices for scalability, security, and maintainability.

---

## Folder Structure

```
/my-fullstack-app
├── apps
│   ├── frontend
│   │   ├── public
│   │   ├── src
│   │   ├── styles
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── backend
│       ├── src
│       ├── test
│       ├── nest-cli.json
│       ├── ormconfig.ts
│       ├── tsconfig.json
│       └── package.json
├── packages
│   └── shared (optional)
│       ├── src
│       └── package.json
├── docker
│   └── docker-compose.yml
├── .github
│   └── workflows
│       └── ci-cd.yml
├── ecosystem.config.js
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- **Node.js** (v18.x or later)
- **pnpm** (v8.x or later)
- **Docker** (for managing MySQL)
- **Git**
- **PM2** (for process management)
- **SSH Access** (for deploying to the VM)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/my-fullstack-app.git
cd my-fullstack-app
```

### 2. Install Dependencies

```bash
pnpm install
```

This command installs all dependencies for the frontend, backend, and shared packages as defined in the `pnpm-workspace.yaml`.

---

## Running the Application Locally

### Starting the MySQL Database

Ensure Docker is installed and running on your machine.

1. Navigate to the `docker` directory:

   ```bash
   cd docker
   ```

2. Start the MySQL service using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   This command will pull the official MySQL image and start the container with the specified environment variables.

### Running Frontend and Backend

Return to the root directory and start the development servers:

```bash
cd ..
pnpm dev
```

TurboRepo will run both the frontend and backend in parallel. By default:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:4000/api](http://localhost:4000/api)

---

## Building the Project

To build both frontend and backend applications:

```bash
pnpm build
```

TurboRepo optimizes the build process by caching and parallelizing tasks.

---

## Testing

Run tests for all packages:

```bash
pnpm test
```

### Running Tests for a Specific Package

For example, to run tests only for the frontend:

```bash
pnpm --filter frontend test
```

---

## Linting

Ensure code quality by running linting:

```bash
pnpm lint
```

### Linting a Specific Package

For example, to lint only the backend:

```bash
pnpm --filter backend lint
```

---

## Deployment

Deployment involves provisioning a VM, setting up the server environment, deploying the application, and configuring a reverse proxy with SSL.

### Provisioning the VM on Naver Cloud Platform

1. **Create a VM Instance:**

   - Choose an OS (e.g., Ubuntu 22.04 LTS).
   - Allocate sufficient resources based on your application's needs.

2. **Configure Security Groups:**

   - Open necessary ports:
     - **SSH**: Port 22
     - **HTTP**: Port 80
     - **HTTPS**: Port 443
     - **Application Ports**: E.g., 4000 for backend

3. **Set Up SSH Access:**
   - Generate SSH keys if not already done.
   - Add your public key to the VM's authorized keys.

### Setting Up the Server

1. **SSH into the VM:**

   ```bash
   ssh your_username@your_vm_ip
   ```

2. **Update and Install Dependencies:**

   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y git curl build-essential
   ```

3. **Install Node.js and pnpm:**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pnpm
   ```

4. **Install PM2 Globally:**

   ```bash
   sudo npm install -g pm2
   ```

5. **Clone Your Repository:**

   ```bash
   git clone https://github.com/yourusername/my-fullstack-app.git
   cd my-fullstack-app
   ```

6. **Install Dependencies:**

   ```bash
   pnpm install
   ```

7. **Set Up Environment Variables:**
   - Create `.env` files for frontend and backend based on the sample below.

### Environment Variables

#### Backend (`apps/backend/.env`)

```env
PORT=4000
DB_HOST=db
DB_PORT=3306
DB_USERNAME=myapp_user
DB_PASSWORD=myapp_password
DB_NAME=myapp_db
JWT_SECRET=your_jwt_secret
```

#### Frontend (`apps/frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://your-backend-api-url/api
```

**Note:** Ensure `.env` files are added to `.gitignore` to prevent sensitive information from being committed.

8. **Build the Application:**

   ```bash
   pnpm build
   ```

9. **Run Database Migrations:**

   ```bash
   pnpm --filter backend typeorm migration:run
   ```

10. **Start Applications with PM2:**

    ```bash
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    ```

    **Note:** The `pm2 startup` command will output a command that you need to run with `sudo` to configure PM2 to start on system boot.

### Setting Up NGINX as a Reverse Proxy

1. **Install NGINX:**

   ```bash
   sudo apt install -y nginx
   ```

2. **Configure NGINX:**

   ```bash
   sudo nano /etc/nginx/sites-available/myapp
   ```

   **Example NGINX Configuration:**

   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       location /api/ {
           proxy_pass http://localhost:4000/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location / {
           proxy_pass http://localhost:3000/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable the Configuration and Restart NGINX:**

   ```bash
   sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Configuring SSL with Let's Encrypt

1. **Install Certbot:**

   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Obtain and Install SSL Certificates:**

   ```bash
   sudo certbot --nginx -d your_domain.com
   ```

   Follow the prompts to complete the SSL setup.

---

## CI/CD Pipeline

Automate your build, test, and deployment processes using GitHub Actions following the Gitflow workflow.

### GitHub Actions

The CI/CD pipeline is defined in `.github/workflows/ci-cd.yml`. It performs the following steps:

1. **Build and Test:**

   - Checks out the code.
   - Sets up Node.js and pnpm.
   - Installs dependencies.
   - Runs linting, testing, and building for both frontend and backend.

2. **Deploy:**
   - Triggered only on the `main` branch.
   - Builds the application.
   - Copies files to the VM via SSH.
   - Runs database migrations.
   - Restarts PM2 processes for zero-downtime deployment.

**Sample Workflow Configuration:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
      - develop
      - 'feature/**'
      - 'release/**'
  pull_request:
    branches:
      - main
      - develop

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        package: [frontend, backend]
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install Dependencies
        run: pnpm install

      - name: Lint
        run: pnpm --filter ${{ matrix.package }} lint

      - name: Test
        run: pnpm --filter ${{ matrix.package }} test

      - name: Build
        run: pnpm --filter ${{ matrix.package }} build

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install Dependencies
        run: pnpm install

      - name: Build Frontend and Backend
        run: pnpm build

      - name: Copy Files via SSH
        uses: appleboy/scp-action@v0.1.3
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          source: '.'
          target: '/path/to/deployment/directory'

      - name: Restart PM2 Processes
        uses: appleboy/ssh-action@v0.1.3
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            cd /path/to/deployment/directory
            pnpm install --prod
            pnpm --filter backend typeorm migration:run
            pm2 reload ecosystem.config.js
```

**Secrets Required:**

- `VM_HOST`: IP address or hostname of your Naver Cloud VM.
- `VM_USER`: SSH username.
- `VM_SSH_KEY`: Private SSH key for authentication.

**Notes:**

- Ensure that the SSH key has the necessary permissions to access the VM.
- Adjust the `source` and `target` paths based on your deployment strategy.

---

## Environment Variables

Manage environment-specific variables using `.env` files for both frontend and backend.

### Backend (`apps/backend/.env`)

```env
PORT=4000
DB_HOST=db
DB_PORT=3306
DB_USERNAME=myapp_user
DB_PASSWORD=myapp_password
DB_NAME=myapp_db
JWT_SECRET=your_jwt_secret
```

### Frontend (`apps/frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://your-backend-api-url/api
```

**Note:** Add `.env` files to `.gitignore` to prevent committing sensitive information.

---

## Contributing

Contributions are welcome! Please follow the [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/) workflow for managing branches and submitting pull requests.

### Steps to Contribute

1. **Fork the Repository**
2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**

   Navigate to the repository on GitHub and open a pull request against the `develop` branch.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Additional Resources

- [TurboRepo Documentation](https://turbo.build/)
- [pnpm Documentation](https://pnpm.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Nest.js Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

By following this guide, you'll have a fully functional full-stack application with optimized build processes, efficient dependency management, and automated CI/CD pipelines. Customize configurations as needed to fit the specific requirements of your project.

Happy Coding! 🚀
