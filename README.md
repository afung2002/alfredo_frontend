# Predictive VC Apps  



## 📚 Overview  

This is a monorepo of the Predictive VC Apps front end, a collection of applications designed to assist venture capitalists. The applications are built using React and TypeScript.    




## 📦 Apps  

- **Company Tracker**: A tool for tracking and managing company information.  

- **Find Intros**: A platform for finding introductions to potential investors or partners.  

- **Fund Manager**: A comprehensive fund management application.  

- **Limited Partner**: A tool for managing relationships with limited partners.  

- **Memo Generator**: A tool for generating memos and reports.  

- **VC Associate**: A platform for managing tasks and responsibilities of VC associates.  






## 💻 Tech Stack  

- **React**: A JavaScript library for building user interfaces.  

- **TypeScript**: A superset of JavaScript that adds static typing.  

- **Redux Toolkit**: A predictable state container for JavaScript apps.  

- **Redux Persist**: A library that allows you to save the Redux state in local storage.  

- **RTK Query**: A powerful data fetching and caching library for Redux.  

- **React Router**: A collection of navigational components that compose declaratively with your application.  

- **Vite**: A fast build tool that provides a development server and a production build.  

- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.  

- **Material UI**: A popular React UI framework that implements Google's Material Design.  

- **React Hook Form**: A performant, flexible, and extensible form library for React.  

- **Zod**: A TypeScript-first schema declaration and validation library.   


## 🛠️ Setup    


Ensure you have the following requirements met to set up the project:  


- Node.js: A recent version is recommended.  

- Yarn: The project uses Yarn as the package manager.  



## 🚀 Installation  


- In terminal be sure you are in the root directory, and to install all used dependencies write:  

```bash
$ yarn install
```  


- After finishing, you can run the project in the dev environment by writing:  

```bash
$ yarn run dev
```  




## 🔑 Configuration (env variables)  


- env.dev  

- env.prod  

## 📂 Folder Structure  

📁 env    
📁 node_modules    
📁 public    
📁 src    
├── 📦 apps    
│   ├── 📦 company-tracker    
│   ├── 📦 find-intros    
│   ├── 📦 fund-manager       
│   ├── 📦 limited-partner    
│   ├── 📦 memo-generator    
│   └── 📦 vc-associate    
├── 📁 assets    
├── 🧩 components    
│   ├── 🧩 AppCard    
│   ├── 🧩 AppSideMenu    
├── 📁 constants    
│   ├── 📄 index.ts    
│   ├── 📄 routes.ts    
│   └── 📄 tags.ts    
📁 hooks    
📁 layouts    
│   ├── 📄 LandingLayout.tsx    
│   └── 📄 MasterLayout.tsx    
├── 📄 pages    
│   ├── 📄 AppsPage.tsx    
│   ├── 📄 LandingPage.tsx    
│   ├── 📄 Page404.tsx    
│   └── 📄 Settings.tsx    
📁 redux    
│   ├── 📁 selectors    
│   ├── 📁 slices    
│   └── 📄 store.ts    
📁 router    
│   ├── 📄 index.tsx    
│   └── 📄 routes.tsx    
📁 schemas    
📁 services    
│   └── 📁 api    
│       └── 📄 index.ts    
📁 types    
│   └── 📄 index.ts    
📁 utils    
│   ├── 📄 dateUtils.ts    
│   ├── 📄 formUtils.ts    
│   ├── 📄 investmentUtils.ts    
│   ├── 📄 uiUtils.ts    
│   └── 📄 validationUtils.ts    
📄 App.css    
📄 App.tsx    
📄 index.css    
📄 index.tsx    
📄 main.tsx    
📄 vite-env.d.ts    
📄 .gitignore    
📄 eslint.config.js    
📄 index.html    
📄 package.json    
📄 README.md    
📄 tsconfig.app.json    
📄 tsconfig.json    
📄 tsconfig.node.json    
📄 vite.config.ts    
📄 yarn.lock  




## 🧩 Reusable Components  



## 🪝 Reusable Hooks  



## 📈 Roadmap  


- ✅ Organize the folder structure for modularity, scalability, and reusability  

- ✅ Install required dependencies and configure the project  

- ✅ Create Postman workspace with the API collection and a mock server  

- 🚧 Relocate existing components to their appropriate modular folders  

- 🚧 Refactor components that require optimization or better structure  

- 🚧 Ensure full UI functionality of Fund Manager AI with mock APIs  

