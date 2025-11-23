import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Recycle, MapPin, Bell, BarChart3, Mail, Phone, MapPinned, CheckCircle, Users, Sparkles, TrendingUp, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface LandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export function LandingPage({ onLoginClick, onSignupClick }: LandingPageProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img src="/logo.png" alt="EcoCollect Logo" className="w-12 h-12" />
              <span className="text-gray-900">EcoCollect Waste Manager</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-600 hover:text-green-600 transition-colors relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-600 hover:text-green-600 transition-colors relative group"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-green-600 transition-colors relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={onLoginClick}>
                  Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={onSignupClick} className="bg-green-600 hover:bg-green-700">
                  Sign Up
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Smart Waste Management Solution</span>
            </motion.div>
            
            <motion.h1 
              className="text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Building a Cleaner, Greener Future Together
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Join EcoCollect to manage your waste collection efficiently. Check collection schedules,
              report issues in real-time, and contribute to a sustainable urban environment.
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={onSignupClick} className="bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" onClick={onLoginClick}>
                  Citizen Portal
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-600">Real-time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-600">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1617641428728-a8165a486813?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHJlY3ljbGluZyUyMGlsbHVzdHJhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NjM5MDQzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Waste Management Illustration"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-50 -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "99%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
            { value: "5 Stars", label: "Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-gray-900 mb-4">About EcoCollect</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            EcoCollect Waste Manager is an intelligent urban waste management system designed to
            connect citizens, waste management services, and local authorities. Our mission is to
            make waste collection more efficient, transparent, and environmentally friendly.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Recycle,
              title: "Sustainable",
              description: "Promoting eco-friendly practices and reducing environmental impact through smart waste management.",
              color: "green"
            },
            {
              icon: TrendingUp,
              title: "Data-Driven",
              description: "Using real-time data and analytics to optimize collection routes and schedules.",
              color: "blue"
            },
            {
              icon: Users,
              title: "Citizen-Focused",
              description: "Empowering citizens with easy access to schedules, reporting tools, and real-time updates.",
              color: "cyan"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
                <motion.div 
                  className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </motion.div>
                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="bg-white/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive platform that bridges the gap between citizens and waste
              management services, ensuring efficient and reliable waste collection.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: MapPin,
                title: "Zone-Based Schedules",
                description: "Access personalized collection schedules based on your location, with real-time updates and notifications for any changes.",
                color: "green"
              },
              {
                icon: Bell,
                title: "Issue Reporting",
                description: "Report missed collections, overflowing bins, or other waste management issues directly through the platform.",
                color: "blue"
              },
              {
                icon: BarChart3,
                title: "Statistics & Insights",
                description: "Track collection statistics, view your contribution to waste management, and access community-wide insights.",
                color: "cyan"
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Your data is protected with enterprise-grade security while enjoying 99.9% uptime reliability.",
                color: "purple"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex gap-4 group"
              >
                <motion.div 
                  className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </motion.div>
                <div>
                  <h3 className="text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive waste management solutions for modern urban living.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            { icon: Recycle, title: "Waste Collection", description: "Regular scheduled collection for all waste types", color: "green" },
            { icon: MapPin, title: "Recycling Centers", description: "Locate nearby recycling and drop-off points", color: "blue" },
            { icon: Bell, title: "Notifications", description: "Get reminders and updates on your phone", color: "cyan" },
            { icon: BarChart3, title: "Analytics", description: "Track your waste management impact", color: "purple" }
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
                <motion.div 
                  className={`w-12 h-12 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <service.icon className={`w-6 h-6 text-${service.color}-600`} />
                </motion.div>
                <h3 className="text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="bg-gradient-to-br from-green-600 to-cyan-600 text-white py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4">Contact Us</h2>
            <p className="max-w-3xl mx-auto opacity-90">
              Have questions? We're here to help. Reach out to our support team.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Mail, title: "Email", info: "support@ecocollect.com", color: "green" },
              { icon: Phone, title: "Phone", info: "+1 (555) 123-4567", color: "blue" },
              { icon: MapPinned, title: "Address", info: "123 Green Street, City Center", color: "cyan" }
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-all duration-300">
                  <motion.div 
                    className={`w-12 h-12 bg-${contact.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <contact.icon className={`w-6 h-6 text-${contact.color}-600`} />
                  </motion.div>
                  <h3 className="text-gray-900 mb-2">{contact.title}</h3>
                  <p className="text-gray-600">{contact.info}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src="/logo.png" alt="EcoCollect Logo" className="w-8 h-8" />
            <span>EcoCollect Waste Manager</span>
          </motion.div>
          <p className="text-gray-400">
            © 2025 EcoCollect. Building a cleaner, greener future together.
          </p>
        </div>
      </footer>
    </div>
  );
}