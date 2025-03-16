
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  ShieldAlert, Lock, Mail, Eye, EyeOff, ChevronRight, 
  Globe, User, LogIn, Fingerprint, ShieldCheck, 
  BarChart3, Laptop, Briefcase, Star, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';

const LandingPage = () => {
  // State for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState(true); // true for login, false for signup
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  
  // Refs for DOM elements
  const headerRef = useRef<HTMLElement>(null);
  const loginFormRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated } = useAuth();
  
  // Animation values
  const scrollYProgress = useMotionValue(0);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const mapScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.5], [0.3, 0.5, 0.4, 0.2]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effects
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollY = e.currentTarget.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = e.currentTarget.scrollHeight;
    scrollYProgress.set(scrollY / (scrollHeight - windowHeight || 1));
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }
  };

  // Hero section animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Feature animation variants
  const featureVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  // Feature cards data
  const features = [
    {
      title: "Global Military Analysis",
      description: "Compare military strengths of countries worldwide with detailed metrics and visualizations.",
      icon: <Globe className="h-10 w-10 text-primary" />
    },
    {
      title: "Equipment Visualizer",
      description: "Explore military equipment capabilities and quantities with interactive 3D models.",
      icon: <Briefcase className="h-10 w-10 text-primary" />
    },
    {
      title: "Strategic Storytelling",
      description: "Generate geopolitical scenarios and analyze potential outcomes based on current data.",
      icon: <Laptop className="h-10 w-10 text-primary" />
    },
    {
      title: "Comparative Charts",
      description: "Visualize strengths and weaknesses across multiple dimensions with advanced charting.",
      icon: <BarChart3 className="h-10 w-10 text-primary" />
    }
  ];

  // Pricing plans data
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$24",
      period: "monthly",
      features: [
        "5 country comparisons",
        "Basic military metrics",
        "Equipment listings",
        "Monthly data updates"
      ],
      highlighted: false
    },
    {
      id: "pro",
      name: "Pro",
      price: "$79",
      period: "monthly",
      features: [
        "Unlimited country comparisons",
        "Advanced metrics & projections",
        "Equipment visualizer",
        "Storytelling mode",
        "Weekly data updates",
        "Downloadable reports"
      ],
      highlighted: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "annual",
      features: [
        "Everything in Pro",
        "API access",
        "Custom data integration",
        "Advanced security features",
        "Dedicated support",
        "Daily data updates"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-auto" onScroll={handleScroll}>
      {/* World map background with parallax effect */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: "url('https://raw.githubusercontent.com/lovable-labs/world-map/main/world-map-dots.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: parallaxY,
          scale: mapScale,
          opacity: mapOpacity
        }}
      />
      
      {/* Header */}
      <motion.header 
        ref={headerRef}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <ShieldAlert className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold tracking-tight">GEO.WARRIOR</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:inline-flex"
              onClick={() => loginFormRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Log In
            </Button>
            <Button 
              size="sm" 
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                setLoginMode(false);
                loginFormRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              className="md:hidden"
              aria-label="Menu"
            >
              <LogIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.header>
      
      {/* Hero Section */}
      <motion.section 
        className="relative py-16 md:py-32 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Hero Content */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            variants={itemVariants}
            style={{ y: titleY }}
          >
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              <span>Military Intelligence Platform</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
              variants={itemVariants}
            >
              Global Military<br /> 
              Data & Analysis
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-lg"
              variants={itemVariants}
            >
              Advanced comparisons, insights, and visualizations of military capabilities across nations.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  setLoginMode(false);
                  loginFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Free Trial
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Features
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex items-center justify-center md:justify-start space-x-3"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">2,500+</span> analysts trust GEO.WARRIOR
              </span>
            </motion.div>
          </motion.div>
          
          {/* Login/Signup Form */}
          <motion.div 
            ref={loginFormRef}
            className="w-full md:w-5/12 lg:w-5/12"
            variants={itemVariants}
          >
            <Card className="border border-border shadow-xl overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{loginMode ? "Log In" : "Create Account"}</h2>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`${loginMode ? 'bg-muted/50' : ''}`}
                      onClick={() => setLoginMode(true)}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`${!loginMode ? 'bg-muted/50' : ''}`}
                      onClick={() => setLoginMode(false)}
                    >
                      Signup
                    </Button>
                  </div>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="email" 
                        id="email"
                        placeholder="you@example.com" 
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        id="password"
                        placeholder="Enter your password" 
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {!loginMode && (
                    <div className="space-y-2">
                      <Label>Authentication Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div 
                          className="flex items-center gap-2 p-2.5 rounded-md border border-primary bg-primary/5 cursor-pointer"
                        >
                          <Fingerprint className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Biometric</span>
                        </div>
                        <div 
                          className="flex items-center gap-2 p-2.5 rounded-md border border-border cursor-pointer"
                        >
                          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">2FA</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    {loginMode && (
                      <div className="text-sm">
                        <a href="#" className="text-primary hover:text-primary/80">
                          Forgot password?
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Processing...</>
                    ) : (
                      <>{loginMode ? "Log In" : "Create Account"}</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive suite of tools for military analysis and intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={featureVariants}
              >
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-32 bg-muted/10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the right plan for your analysis needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className={`
                  bg-card border rounded-xl overflow-hidden transition-all duration-300
                  ${plan.highlighted ? 'border-primary shadow-lg shadow-primary/10 scale-105' : 'border-border hover:shadow-md'}
                `}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: plan.id === "pro" ? 0 : plan.id === "basic" ? 0.1 : 0.2, duration: 0.5 }}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className={`w-full ${plan.highlighted ? 'bg-primary text-primary-foreground' : ''}`}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setLoginMode(false);
                      loginFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About GEO.WARRIOR</h2>
              <p className="text-xl text-muted-foreground">
                The ultimate platform for military intelligence and analysis.
              </p>
            </div>
            
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                GEO.WARRIOR is built by a team of military analysts, data scientists, and software engineers with decades of combined experience in defense intelligence. Our mission is to provide the most accurate and comprehensive military data analysis platform available to analysts, researchers, and decision makers worldwide.
              </p>
              <p>
                Our data is sourced from public records, research institutions, and verified intelligence reports, ensuring the highest level of accuracy and reliability for your strategic planning and analysis needs.
              </p>
              <p>
                With continuous updates and cutting-edge visualization tools, GEO.WARRIOR remains at the forefront of military intelligence technology, helping you make informed decisions based on the latest global developments.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <ShieldAlert className="w-6 h-6 text-primary mr-2" />
              <span className="font-bold tracking-tight">GEO.WARRIOR</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GEO.WARRIOR. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
