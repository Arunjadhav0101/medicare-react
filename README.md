# 🏥 MediCare - Online Pharmacy System

> **Manual Setup Guide**: See [MANUAL_SETUP.md](./MANUAL_SETUP.md) for instructions on how to run without Docker.
> **Docker Guide**: See [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) for detailed Docker commands.

## Project Overview
A modern React TypeScript application converted from the original PHP-based MediCare system. This application provides comprehensive healthcare services including online pharmacy and blood bank management.

## 🚀 Features

### E-Pharmacy System
- **Medicine Catalog**: Browse and search medicines with category filtering
- **Shopping Cart**: Add medicines to cart with quantity management
- **Order Management**: Track orders with real-time status updates
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-first approach for all devices

### Blood Bank System
- **Donor Registration**: Complete donor registration with medical screening
- **Blood Requests**: Submit and track blood requests for hospitals/patients
- **Real-time Inventory**: Live blood stock management with expiry tracking
- **Emergency Services**: 24/7 blood availability checking

### AI Chatbot
- **Intelligent Assistant**: Context-aware responses for healthcare queries
- **Medicine Ordering**: Natural language medicine ordering via chat
- **Blood Bank Queries**: Donation registration and blood request assistance
- **Interactive Interface**: Real-time chat with typing indicators

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: CSS3 with CSS Modules
- **HTTP Client**: Axios for API communication
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   ├── Chatbot.tsx     # AI chatbot component
│   └── *.css           # Component styles
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Catalog.tsx     # Medicine catalog
│   ├── Cart.tsx        # Shopping cart
│   ├── Login.tsx       # User login
│   ├── Signup.tsx      # User registration
│   ├── BloodBank.tsx   # Blood bank services
│   ├── Orders.tsx      # Order management
│   └── *.css           # Page styles
├── services/           # API services
│   └── api.ts          # API client configuration
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── App.tsx             # Main application component
├── App.css             # Global styles
└── index.tsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medicare-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Design Features

### Simple & Clean Theme
- **Modern UI**: Clean, minimalist design with intuitive navigation
- **Consistent Colors**: Purple gradient theme (#667eea to #764ba2)
- **Typography**: Poppins font family for better readability
- **Responsive Layout**: Mobile-first design with CSS Grid and Flexbox
- **Smooth Animations**: Subtle hover effects and transitions

### User Experience
- **Intuitive Navigation**: Clear menu structure with active states
- **Loading States**: Typing indicators and loading animations
- **Error Handling**: User-friendly error messages
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=MediCare
```

### API Integration
The application is ready for backend integration with the provided API service layer. Update the `API_BASE_URL` in `src/services/api.ts` to connect to your backend server.

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar layouts
- **Tablet**: Adapted layouts with touch-friendly interfaces
- **Mobile**: Optimized for small screens with collapsible navigation

## 🔐 Security Features

- **Input Validation**: Client-side form validation
- **Secure Authentication**: Token-based authentication ready
- **HTTPS Ready**: Production-ready security headers
- **XSS Protection**: Sanitized user inputs

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The build folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Original Development Team

**Converted from PHP to React by**: AI Assistant  
**Original PHP Version by**: Arun Jadhav, Yogesh Bhore & Prathviraj Bagli

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the original PHP project for reference

---

**© 2024 MediCare React - Modern Healthcare Platform**  
*Revolutionizing healthcare through modern web technology*
