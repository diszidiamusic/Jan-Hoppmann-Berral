import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Shield, 
  Zap, 
  Users, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Package,
  Wrench,
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  ArrowRight,
  CreditCard,
  Wallet,
  SortDesc,
  SortAsc,
  Calendar,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Globe,
  Search,
  RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AboutUs, HelpPage, LegalInfoPage, ReturnsPage, SitemapPage, MechanicPage } from './LegalPages';
import logo from './image-removebg-preview-1.png';
import banner1 from './e9407866-6fcf-4152-92dc-729e46863e0c.png';
import banner2 from './6198d3dc-85be-44d6-82f0-f5c916582a38.png';
import cuchilleriaImg from './cuchilleria.png';
import piezasInternasImg from './piezas-internas.png';
import supervivenciaImg from './supervivencia.png';

// --- Types ---

type View = 'home' | 'catalog' | 'legal' | 'returns' | 'help' | 'about' | 'sitemap' | 'mechanic';

interface CartItem {
  id: number | string;
  name: string;
  price: string;
  img: string;
  quantity: number;
}

// --- App Component ---

// --- Components ---

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity,
  onCheckout
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onRemove: (id: number | string) => void;
  onUpdateQuantity: (id: number | string, delta: number) => void;
  onCheckout: () => void;
}) => {
  const total = items.reduce((acc, item) => acc + (parseFloat(item.price.replace('€', '')) * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-tactical-black border-l border-white/10 z-[120] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-display font-black uppercase tracking-tighter">TU CESTA</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingCart size={64} className="text-gray-700 mb-4" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Tu cesta está vacía</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-tactical-orange font-display font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Volver a la tienda
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-tactical-gray rounded-sm overflow-hidden shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-display font-bold uppercase text-sm leading-tight">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <div className="text-tactical-orange font-display font-black mb-3">{item.price}</div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-tactical-gray/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">TOTAL ESTIMADO</span>
                  <span className="text-3xl font-display font-black text-white">{total.toFixed(2)}€</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-tactical-orange text-tactical-black py-4 font-display font-black uppercase tracking-widest cta-glow hover:bg-white transition-all"
                >
                  FINALIZAR COMPRA
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  items,
  onSuccess
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[];
  onSuccess: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    paymentMethod: 'card' as 'card' | 'paypal',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const total = items.reduce((acc, item) => acc + (parseFloat(item.price.replace('€', '')) * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Simulate order processing
      onSuccess();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-tactical-black/95 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-display font-black uppercase tracking-tighter mb-8">
                {step === 1 ? 'DATOS DE ENVÍO' : step === 2 ? 'MÉTODO DE PAGO' : 'CONFIRMAR PEDIDO'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nombre Completo</label>
                        <input 
                          required
                          type="text" 
                          value={formData.nombre}
                          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                          className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Teléfono</label>
                        <input 
                          required
                          type="tel" 
                          value={formData.telefono}
                          onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                          className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Dirección</label>
                      <input 
                        required
                        type="text" 
                        value={formData.direccion}
                        onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                        className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Ciudad</label>
                        <input 
                          required
                          type="text" 
                          value={formData.ciudad}
                          onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                          className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">C.P.</label>
                        <input 
                          required
                          type="text" 
                          value={formData.codigoPostal}
                          onChange={(e) => setFormData({...formData, codigoPostal: e.target.value})}
                          className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                        className={`p-4 border flex flex-col items-center gap-3 transition-all ${formData.paymentMethod === 'card' ? 'border-tactical-orange bg-tactical-orange/5' : 'border-white/10 hover:bg-white/5'}`}
                      >
                        <CreditCard size={24} className={formData.paymentMethod === 'card' ? 'text-tactical-orange' : 'text-gray-500'} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Tarjeta</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={`p-4 border flex flex-col items-center gap-3 transition-all ${formData.paymentMethod === 'paypal' ? 'border-tactical-orange bg-tactical-orange/5' : 'border-white/10 hover:bg-white/5'}`}
                      >
                        <Wallet size={24} className={formData.paymentMethod === 'paypal' ? 'text-tactical-orange' : 'text-gray-500'} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">PayPal</span>
                      </button>
                    </div>

                    {formData.paymentMethod === 'card' ? (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Número de Tarjeta</label>
                          <input 
                            required
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                            className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Expiración (MM/YY)</label>
                            <input 
                              required
                              type="text" 
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})}
                              className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CVV</label>
                            <input 
                              required
                              type="text" 
                              placeholder="000"
                              value={formData.cardCvv}
                              onChange={(e) => setFormData({...formData, cardCvv: e.target.value})}
                              className="w-full bg-tactical-gray border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-tactical-orange transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 border border-white/10 bg-tactical-gray/20 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Wallet size={48} className="text-tactical-orange mx-auto mb-4 opacity-50" />
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                          Serás redirigido a PayPal para completar el pago de forma segura.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 bg-tactical-gray/30 p-6 border border-white/5">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-tactical-orange mb-2">Resumen de Envío</h4>
                      <p className="text-sm text-white">{formData.nombre}</p>
                      <p className="text-sm text-gray-400">{formData.direccion}, {formData.ciudad} ({formData.codigoPostal})</p>
                      <p className="text-sm text-gray-400">{formData.email} | {formData.telefono}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-tactical-orange mb-2">Método de Pago</h4>
                      <div className="flex items-center gap-3 p-3 border border-tactical-orange/30 bg-tactical-orange/5">
                        {formData.paymentMethod === 'card' ? <CreditCard size={20} className="text-tactical-orange" /> : <Wallet size={20} className="text-tactical-orange" />}
                        <span className="text-sm font-bold uppercase tracking-widest">
                          {formData.paymentMethod === 'card' ? `Tarjeta (**** ${formData.cardNumber.slice(-4)})` : 'PayPal'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <button 
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 border border-white/10 py-4 font-display font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                    >
                      VOLVER
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="flex-[2] bg-tactical-orange text-tactical-black py-4 font-display font-black uppercase tracking-widest cta-glow hover:bg-white transition-all"
                  >
                    {step === 3 ? 'CONFIRMAR PEDIDO' : 'CONTINUAR'}
                  </button>
                </div>
                <button 
                  type="button"
                  onClick={onClose}
                  className="w-full text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-4 hover:text-white transition-colors"
                >
                  Cancelar y volver
                </button>
              </form>
            </div>

            <div className="order-1 md:order-2 bg-tactical-gray/20 p-8 border border-white/5">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter mb-6">RESUMEN DEL PEDIDO</h3>
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-tactical-black rounded-sm overflow-hidden">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-tight">{item.name}</div>
                        <div className="text-[10px] text-gray-500">Cant: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="text-sm font-display font-black">{item.price}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-6 border-t border-white/10">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <span>Envío</span>
                  <span className="text-tactical-orange">GRATIS</span>
                </div>
                <div className="flex justify-between text-xl font-display font-black text-white pt-4">
                  <span>TOTAL</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ 
  onCategoryClick, 
  cartCount, 
  onCartClick,
  onLogoClick,
  onAboutClick,
  onMechanicClick,
  onHelpClick
}: { 
  onCategoryClick: (cat: 'replicas' | 'piezasInternas' | 'cuchilleria' | 'supervivencia') => void;
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onAboutClick: () => void;
  onMechanicClick: () => void;
  onHelpClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-tactical-black/90 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={onLogoClick}>
            <motion.div 
              animate={{ 
                filter: ["hue-rotate(0deg) saturate(1)", "hue-rotate(360deg) saturate(1.5)", "hue-rotate(0deg) saturate(1)"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative w-14 h-14 flex items-center justify-center"
            >
              <img 
                src={logo} 
                alt="MLQ Tactics Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(242,125,38,0.3)]" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
            <div className="flex flex-col -gap-1">
              <span className="text-2xl font-display font-black tracking-tighter leading-none">MLQ<span className="text-tactical-orange">TACTICS</span></span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500">Elite Airsoft Division</span>
            </div>
          </div>
          
          <a href="tel:6285252696" className="hidden sm:flex bg-tactical-orange text-tactical-black px-4 py-1.5 rounded-sm hover:bg-white transition-all cta-glow items-center gap-2 text-[9px] font-black uppercase tracking-widest">
            <Phone size={12} />
            Llámanos ahora
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-display text-sm font-bold uppercase tracking-widest">
          <div 
            className="relative"
            onMouseEnter={() => setShowShopDropdown(true)}
            onMouseLeave={() => setShowShopDropdown(false)}
          >
            <button 
              onClick={() => {
                onCategoryClick('replicas');
                setShowShopDropdown(!showShopDropdown);
              }}
              className="flex items-center gap-1 hover:text-tactical-orange transition-colors py-2"
            >
              TIENDA <ChevronDown size={14} className={`transition-transform ${showShopDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showShopDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-48 bg-tactical-black border border-white/10 p-2 shadow-2xl"
                >
                  <button 
                    onClick={() => { onCategoryClick('replicas'); setShowShopDropdown(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-tactical-orange hover:text-tactical-black transition-all flex items-center justify-between group"
                  >
                    Réplicas <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                  <button 
                    onClick={() => { onCategoryClick('piezasInternas'); setShowShopDropdown(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-tactical-orange hover:text-tactical-black transition-all flex items-center justify-between group"
                  >
                    Piezas Internas <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                  <button 
                    onClick={() => { onCategoryClick('cuchilleria'); setShowShopDropdown(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-tactical-orange hover:text-tactical-black transition-all flex items-center justify-between group"
                  >
                    Cuchillería <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                  <button 
                    onClick={() => { onCategoryClick('supervivencia'); setShowShopDropdown(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-tactical-orange hover:text-tactical-black transition-all flex items-center justify-between group"
                  >
                    Supervivencia <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button onClick={onAboutClick} className="hover:text-tactical-orange transition-colors">QUIÉNES SOMOS</button>
          <button onClick={onMechanicClick} className="hover:text-tactical-orange transition-colors">SERVICIO DE MECÁNICO</button>
          <button onClick={onHelpClick} className="hover:text-tactical-orange transition-colors">AYUDA</button>

          <button 
            onClick={onCartClick}
            className="relative p-2 hover:text-tactical-orange transition-colors group"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-tactical-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-tactical-orange group-hover:bg-tactical-orange transition-colors">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-tactical-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">TIENDA</span>
              <button onClick={() => { onCategoryClick('replicas'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Réplicas</button>
              <button onClick={() => { onCategoryClick('piezasInternas'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Piezas Internas</button>
              <button onClick={() => { onCategoryClick('cuchilleria'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Cuchillería</button>
              <button onClick={() => { onCategoryClick('supervivencia'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Supervivencia</button>
            </div>
            <button onClick={() => { onAboutClick(); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left">QUIÉNES SOMOS</button>
            <button onClick={() => { onMechanicClick(); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left">SERVICIO DE MECÁNICO</button>
            <button onClick={() => { onHelpClick(); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left">AYUDA</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onCatalogClick }: { onCatalogClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
    banner1,
    "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=2000",
    banner2
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${heroImages[currentIndex]})`,
              opacity: 0.4
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-tactical-black via-tactical-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-tactical-black to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-tactical-orange/10 border border-tactical-orange/20 px-4 py-1 rounded-full text-tactical-orange text-xs font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tactical-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tactical-orange"></span>
            </span>
            ESPECIALISTAS EN REPLICAS Y MEJORAS DE AIRSOFT
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] mb-6">
            DOMINA EL <br />
            <span className="text-tactical-orange">CAMPO DE BATALLA</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-8 leading-relaxed">
            No solo vendemos réplicas. Forjamos guerreros. Equipamiento táctico de élite, upgrades de precisión y la comunidad más activa de Barcelona.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onCatalogClick}
              className="bg-tactical-orange text-tactical-black px-8 py-4 rounded-sm font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all cta-glow group"
            >
              VER CATÁLOGO <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://www.google.com/maps/place/MLQ+TACTIC/@41.4875851,2.0339609,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4917210272465:0x66bb45ab0033a36a!8m2!3d41.4875811!4d2.0365358!16s%2Fg%2F11c7641fnv?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white px-8 py-4 rounded-sm font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              VISITAR TIENDA FÍSICA
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i+10}`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-tactical-black"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <div className="flex text-tactical-orange">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter mt-1">
                +2,500 Jugadores confían en nosotros
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tactical UI Elements */}
      <div className="absolute right-10 bottom-20 hidden lg:block">
        <div className="glass-card p-4 rounded-sm border-l-4 border-l-tactical-orange">
          <div className="flex items-center gap-4">
            <div className="text-tactical-orange font-display font-black text-3xl">100%</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Garantía de <br /> calidad
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const stats = [
    { label: 'Clientes Satisfechos', value: '5k+' },
    { label: 'Réplicas Preparadas', value: '1.2k' },
    { label: 'Años de Experiencia', value: '8' },
    { label: 'Eventos Organizados', value: '150+' },
  ];

  return (
    <section className="py-20 bg-tactical-gray/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">{stat.value}</div>
              <div className="text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-tactical-orange">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { name: "Marc Rodríguez", text: "La mejor tienda de Barcelona. El asesoramiento técnico es de otro nivel, mi réplica ahora tira como un láser.", role: "Jugador Milsim" },
            { name: "Santi López", text: "Trato impecable en la tienda de Rubí. Tienen stock real y no te intentan vender lo más caro, sino lo que necesitas.", role: "Principiante" },
            { name: "Dani V.", text: "Upgrades rápidos y con garantía. Si quieres competir en serio, MLQTactics es el sitio.", role: "Veterano" }
          ].map((testimonial, idx) => (
            <div key={idx} className="glass-card p-8 rounded-sm relative group hover:border-tactical-orange/50 transition-all">
              <div className="flex text-tactical-orange mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-tactical-green rounded-full flex items-center justify-center font-bold text-tactical-orange">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-display font-bold text-sm uppercase">{testimonial.name}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{testimonial.role}</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={40} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueProp = () => {
  const features = [
    { 
      icon: <Shield className="text-tactical-orange" />, 
      title: "Garantía Táctica", 
      desc: "Confianza total con soporte post-venta real y garantía en todas tus compras." 
    },
    { 
      icon: <Package className="text-tactical-orange" />, 
      title: "Stock Real en Rubí", 
      desc: "Disponibilidad inmediata en nuestra tienda física. Sin esperas, recogida al momento." 
    },
    { 
      icon: <Wrench className="text-tactical-orange" />, 
      title: "Mecánico Especializado", 
      desc: "Reparación, mantenimiento y ajustes técnicos con experiencia profesional garantizada." 
    },
    { 
      icon: <Zap className="text-tactical-orange" />, 
      title: "Personalización y Upgrades", 
      desc: "Mejoras de rendimiento y estética a medida para adaptar tu réplica a tu estilo de juego." 
    }
  ];

  return (
    <section className="py-24 tactical-grid">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4">¿POR QUÉ <span className="text-tactical-orange">MLQ TACTICS</span>?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto uppercase text-sm tracking-widest font-bold">Diferenciación, autoridad y compromiso con el jugador.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-white/5 bg-tactical-black hover:bg-tactical-green/20 transition-all group">
              <div className="w-12 h-12 bg-tactical-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Categories = ({ onCategoryClick }: { onCategoryClick: (cat: any) => void }) => {
  const cats = [
    { id: 'replicas', name: "Réplicas", img: banner1, count: "120+ Modelos" },
    { id: 'piezasInternas', name: "Piezas Internas", img: piezasInternasImg, count: "Upgrades de Precisión" },
    { id: 'cuchilleria', name: "Cuchillería", img: cuchilleriaImg, count: "Tácticos, Supervivencia" },
    { id: 'supervivencia', name: "Supervivencia", img: supervivenciaImg, count: "Camping, Bushcraft" },
  ];

  return (
    <section id="productos" className="py-24 bg-tactical-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-black">EQUÍPATE PARA EL <br /><span className="text-tactical-orange">ÉXITO</span></h2>
          </div>
          <button 
            onClick={() => onCategoryClick('replicas')}
            className="text-tactical-orange font-display font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
          >
            Ver todas las categorías <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => onCategoryClick(cat.id)}
              className="relative h-[400px] overflow-hidden group cursor-pointer"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tactical-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-tactical-orange mb-2">{cat.count}</div>
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter">{cat.name}</h3>
                <div className="h-1 w-0 bg-tactical-orange group-hover:w-full transition-all duration-500 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UrgencySection = () => {
  return (
    <section className="py-20 bg-tactical-orange text-tactical-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <div className="inline-block bg-tactical-black text-tactical-orange px-4 py-1 font-display font-black text-xs uppercase tracking-widest mb-4">
            OFERTA POR TIEMPO LIMITADO
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black leading-tight mb-6">
            -20% EN TU PRIMER <br /> UPGRADE DE TALLER
          </h2>
          <p className="text-tactical-black/80 font-bold uppercase text-sm tracking-widest">
            Válido solo para las próximas 15 reservas. ¡No te quedes atrás!
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {[
              { label: 'DÍAS', val: '02' },
              { label: 'HORAS', val: '14' },
              { label: 'MIN', val: '55' },
            ].map((t, i) => (
              <div key={i} className="bg-tactical-black text-white w-20 h-20 flex flex-col items-center justify-center rounded-sm">
                <div className="text-2xl font-display font-black">{t.val}</div>
                <div className="text-[8px] font-bold tracking-widest">{t.label}</div>
              </div>
            ))}
          </div>
          <button className="w-full bg-tactical-black text-white py-4 font-display font-black uppercase tracking-widest hover:bg-tactical-green transition-all">
            RESERVAR CITA AHORA
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "¿Hacéis envíos a toda España?", a: "Sí, realizamos envíos urgentes 24/48h a toda la península y Baleares. También puedes recoger tu pedido gratis en nuestra tienda de Rubí." },
    { q: "¿Es legal jugar al airsoft en España?", a: "Totalmente legal siempre que se cumpla la normativa de tarjetas de armas de 4ª categoría. En MLQTactics te asesoramos y ayudamos con todo el papeleo." },
    { q: "Soy principiante, ¿por dónde empiezo?", a: "Te recomendamos nuestro 'Pack Recluta' que incluye réplica fiable, protección ocular homologada y batería. Ven a vernos y te orientaremos sin compromiso." },
  ];

  return (
    <section className="py-24 bg-tactical-black">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-display font-black text-center mb-16 uppercase tracking-tighter">PREGUNTAS <span className="text-tactical-orange">FRECUENTES</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-sm overflow-hidden">
              <button 
                className="w-full p-6 flex justify-between items-center text-left bg-tactical-gray/30 hover:bg-tactical-gray/50 transition-all"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-display font-bold uppercase tracking-tight">{faq.q}</span>
                <ChevronDown className={`transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (view: View) => void }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === id ? null : id);
    }
  };

  const sections = [
    {
      id: 'empresa',
      title: 'Empresa',
      links: [
        { label: 'QUIÉNES SOMOS', view: 'about' as View },
        { label: 'SERVICIO DE MECÁNICO', view: 'mechanic' as View },
      ]
    },
    {
      id: 'ayuda',
      title: 'Ayuda',
      links: [
        { label: 'Ayuda', view: 'help' as View },
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { label: 'Información legal', view: 'legal' as View },
        { label: 'Devoluciones', view: 'returns' as View },
      ]
    }
  ];

  return (
    <footer id="contacto" className="bg-tactical-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {sections.map((section) => (
            <div key={section.id} className="border-b md:border-0 border-white/5 last:border-0">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full md:cursor-default flex justify-between items-center py-4 md:py-0 md:mb-6"
              >
                <h4 className="font-display font-bold uppercase tracking-widest text-[10px] text-gray-500">{section.title}</h4>
                <ChevronDown className={`md:hidden transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : ''}`} size={14} />
              </button>
              
              <AnimatePresence>
                {(openSection === section.id || window.innerWidth >= 768) && (
                  <motion.ul 
                    initial={window.innerWidth < 768 ? { height: 0, opacity: 0 } : false}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-3 pb-6 md:pb-0"
                  >
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <button 
                          onClick={() => { onNavigate(link.view); window.scrollTo(0, 0); }}
                          className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-tactical-orange transition-colors flex items-center gap-2"
                        >
                          <ChevronRight size={10} className="text-tactical-orange/50" />
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 opacity-80 grayscale hover:grayscale-0 transition-all cursor-pointer" onClick={() => onNavigate('home')}>
              <img 
                src={logo} 
                alt="MLQ Tactics Logo" 
                className="w-6 h-6 object-contain" 
                referrerPolicy="no-referrer" 
              />
              <span className="text-xs font-display font-black tracking-tighter">MLQ<span className="text-tactical-orange">TACTICS</span></span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-tactical-orange transition-colors"><Instagram size={16} /></a>
              <a href="#" className="text-gray-600 hover:text-tactical-orange transition-colors"><Facebook size={16} /></a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            <button onClick={() => onNavigate('sitemap')} className="hover:text-white transition-colors flex items-center gap-1">
              <Globe size={10} /> Mapa del sitio
            </button>
            <span className="hidden md:inline opacity-20">|</span>
            <span>© 2026 MLQTactics. Elite Airsoft Division.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ProductDetailModal = ({ 
  isOpen, 
  onClose, 
  product,
  onAddToCart
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  product: any;
  onAddToCart: (item: any) => void;
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[150]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-tactical-black border border-white/10 z-[160] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-tactical-orange text-white hover:text-tactical-black rounded-full transition-all z-10"
            >
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-full bg-tactical-gray relative">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-tactical-black to-transparent md:hidden"></div>
            </div>

            <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-tactical-orange/10 border border-tactical-orange/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-tactical-orange">
                    {product.category}
                  </span>
                  <span className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {product.status}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none mb-4">
                  {product.name}
                </h2>
                <div className="text-3xl font-display font-black text-tactical-orange">
                  {product.price}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
                    <Target size={14} className="text-tactical-orange" /> ESPECIFICACIONES TÉCNICAS
                  </h3>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line font-mono text-sm bg-white/5 p-6 border-l-2 border-tactical-orange">
                    {product.longDesc || product.desc}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 border border-white/5">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">DISPONIBILIDAD</div>
                    <div className="text-sm font-bold uppercase">Inmediata</div>
                  </div>
                  <div className="bg-white/5 p-4 border border-white/5">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">GARANTÍA</div>
                    <div className="text-sm font-bold uppercase">2 Años MLQ</div>
                  </div>
                </div>

                <button 
                  onClick={() => { onAddToCart(product); onClose(); }}
                  className="w-full bg-white text-tactical-black py-5 font-display font-black uppercase tracking-widest hover:bg-tactical-orange transition-all flex items-center justify-center gap-3 group"
                >
                  AÑADIR A LA CESTA <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [showCatalog, setShowCatalog] = useState(false);
  const [activeTab, setActiveTab] = useState<'replicas' | 'piezasInternas' | 'cuchilleria' | 'supervivencia'>('replicas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'date-new' | 'date-old'>('date-new');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://opensheet.elk.sh/1yAw3wHiLcSBAqPGOtfZ7FDiFS4sLV1dZnRcKR8Dsoyk/Hoja1');
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        
        const activeProducts = data
          .filter((item: any) => item.activo === 'TRUE')
          .map((item: any, index: number) => {
            const stock = parseInt(item.stock) || 0;
            return {
              id: item.id || `dynamic-${index}`,
              name: item.nombre || 'Producto sin nombre',
              desc: item.descripcion || 'Sin descripción disponible',
              price: item.precio || '0.00€',
              img: item.imagen || 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=400',
              stock: stock,
              category: item.categoria || 'General',
              status: stock > 0 ? 'EN STOCK' : 'AGOTADO',
              date: new Date().toISOString()
            };
          });
        
        setDynamicProducts(activeProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number | string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number | string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const catalogData = {
    replicas: dynamicProducts.filter(p => {
      const cat = p.category.toLowerCase();
      return cat.includes('replica') || ['gbbr', 'aeg', 'pistola gbb', 'sniper'].includes(cat) || (!['interno', 'piezas internas', 'cuchillería', 'supervivencia'].includes(cat));
    }),
    piezasInternas: dynamicProducts.filter(p => ['interno', 'piezas internas'].includes(p.category.toLowerCase())),
    cuchilleria: dynamicProducts.filter(p => p.category.toLowerCase() === 'cuchillería'),
    supervivencia: dynamicProducts.filter(p => p.category.toLowerCase() === 'supervivencia')
  };

  const getSortedData = () => {
    let data = [...catalogData[activeTab]];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) ||
        (item as any).tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    return data.sort((a, b) => {
      const priceA = parseFloat(a.price.replace('€', ''));
      const priceB = parseFloat(b.price.replace('€', ''));
      
      switch (sortOption) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'date-new': return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-old': return new Date(a.date).getTime() - new Date(b.date).getTime();
        default: return 0;
      }
    });
  };

  return (
    <div className="relative">
      <Navbar 
        onCategoryClick={(cat) => { setActiveTab(cat); setShowCatalog(true); setView('catalog'); }} 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={() => { setView('home'); setShowCatalog(false); }}
        onAboutClick={() => { setView('about'); setShowCatalog(false); }}
        onMechanicClick={() => { setView('mechanic'); setShowCatalog(false); }}
        onHelpClick={() => { setView('help'); setShowCatalog(false); }}
      />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onCatalogClick={() => { setView('catalog'); setShowCatalog(true); }} />
            <SocialProof />
            <ValueProp />
            <Categories onCategoryClick={(cat) => { setActiveTab(cat); setShowCatalog(true); setView('catalog'); }} />
            
            {/* Authority Section */}
            <section className="py-24 bg-tactical-black border-t border-white/5">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-display font-black mb-12 uppercase tracking-tighter">PARTNERS DE <span className="text-tactical-orange">ÉLITE</span></h2>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
                  <div className="font-display font-black text-2xl tracking-tighter">TOKYO MARUI</div>
                  <div className="font-display font-black text-2xl tracking-tighter">KRYTAC</div>
                  <div className="font-display font-black text-2xl tracking-tighter">GATE</div>
                  <div className="font-display font-black text-2xl tracking-tighter">5.11 TACTICAL</div>
                  <div className="font-display font-black text-2xl tracking-tighter">VFC</div>
                </div>
              </div>
            </section>

            <FAQ />

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden bg-tactical-green">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=2000" 
                  alt="Final CTA" 
                  className="w-full h-full object-cover opacity-20"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-tactical-black/60"></div>
              </div>
              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-5xl md:text-8xl font-display font-black mb-8 leading-none uppercase">¿LISTO PARA EL <br /><span className="text-tactical-orange">SIGUIENTE NIVEL?</span></h2>
                <p className="text-xl text-gray-300 mb-12 font-bold uppercase tracking-widest">No esperes a que te lo cuenten. Equípate con los mejores.</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => { setView('catalog'); setShowCatalog(true); }}
                    className="bg-tactical-orange text-tactical-black px-12 py-6 font-display font-black uppercase tracking-[0.2em] text-lg cta-glow hover:bg-white transition-all"
                  >
                    IR AL CATÁLOGO
                  </button>
                  <button 
                    onClick={() => { setView('mechanic'); setShowCatalog(false); }}
                    className="bg-transparent border-2 border-white text-white px-12 py-6 font-display font-black uppercase tracking-[0.2em] text-lg hover:bg-white hover:text-tactical-black transition-all"
                  >
                    RESERVAR UPGRADE
                  </button>
                </div>
                <div className="mt-12 flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  <Shield size={16} className="text-tactical-orange" /> Pago 100% Seguro
                  <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                  <Package size={16} className="text-tactical-orange" /> Envío 24h
                  <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                  <Wrench size={16} className="text-tactical-orange" /> Soporte Técnico Pro
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'catalog' && showCatalog && (
          <div className="pt-24 pb-12 bg-tactical-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">CATÁLOGO <span className="text-tactical-orange">COMPLETO</span></h2>
                  <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-2">Equipamiento verificado por operadores reales</p>
                </div>
                <button 
                  onClick={() => { setShowCatalog(false); setView('home'); }}
                  className="w-12 h-12 bg-white/5 hover:bg-tactical-orange transition-all flex items-center justify-center rounded-full group self-end md:self-center"
                >
                  <X size={24} className="group-hover:text-tactical-black transition-colors" />
                </button>
              </div>

              {/* Tab Navigation & Search */}
              <div className="flex flex-col gap-8 mb-12">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/10 pb-6 gap-8">
                  <div className="flex flex-wrap gap-4">
                    {(['replicas', 'piezasInternas', 'cuchilleria', 'supervivencia'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-3 font-display font-black uppercase tracking-widest text-sm transition-all border-b-2 ${activeTab === tab ? 'border-tactical-orange text-tactical-orange bg-tactical-orange/5' : 'border-transparent text-gray-500 hover:text-white'}`}
                      >
                        {tab === 'cuchilleria' ? 'Cuchillería' : tab === 'supervivencia' ? 'Supervivencia' : tab === 'piezasInternas' ? 'Piezas Internas' : tab}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 bg-tactical-gray/20 p-2 rounded-sm border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-2">Ordenar por:</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSortOption(sortOption === 'name-asc' ? 'name-desc' : 'name-asc')}
                        className={`p-2 rounded-sm transition-all ${sortOption.includes('name') ? 'bg-tactical-orange text-tactical-black' : 'hover:bg-white/5 text-gray-400'}`}
                        title="Alfabético"
                      >
                        {sortOption === 'name-asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                      </button>
                      <button 
                        onClick={() => setSortOption(sortOption === 'date-new' ? 'date-old' : 'date-new')}
                        className={`p-2 rounded-sm transition-all ${sortOption.includes('date') ? 'bg-tactical-orange text-tactical-black' : 'hover:bg-white/5 text-gray-400'}`}
                        title="Reciente"
                      >
                        <Calendar size={18} />
                      </button>
                      <button 
                        onClick={() => setSortOption(sortOption === 'price-asc' ? 'price-desc' : 'price-asc')}
                        className={`p-2 rounded-sm transition-all ${sortOption.includes('price') ? 'bg-tactical-orange text-tactical-black' : 'hover:bg-white/5 text-gray-400'}`}
                        title="Precio"
                      >
                        {sortOption === 'price-asc' ? <ArrowUpWideNarrow size={18} /> : <ArrowDownWideNarrow size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search Bar Block */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Search size={18} className={`transition-colors duration-300 ${searchQuery ? 'text-tactical-orange' : 'text-gray-500 group-focus-within:text-tactical-orange'}`} />
                    </div>
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar réplicas, accesorios, upgrades..."
                      className="w-full bg-tactical-gray/20 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-tactical-orange/50 focus:bg-tactical-gray/30 transition-all font-bold uppercase tracking-widest text-xs"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="bg-tactical-gray/20 border border-white/10 px-6 py-4 rounded-sm flex items-center gap-3">
                      <span className="text-tactical-orange font-black text-lg leading-none">{getSortedData().length}</span>
                      <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Resultados</span>
                    </div>
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border border-white/10"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {getSortedData().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getSortedData().map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`glass-card group overflow-hidden border-white/5 hover:border-tactical-orange/30 transition-all ${item.stock === 0 ? 'opacity-60' : ''}`}
                    >
                      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(item)}>
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-tactical-orange/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-tactical-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-tactical-orange/50">VER DETALLES</span>
                        </div>
                        <div className="absolute top-4 left-4 bg-tactical-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-tactical-orange border border-tactical-orange/30">
                          {item.category}
                        </div>
                        <div className={`absolute top-4 right-4 px-3 py-1 text-[10px] font-black uppercase tracking-widest ${item.stock > 0 ? 'bg-tactical-orange text-tactical-black' : 'bg-red-600 text-white'}`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-display font-black uppercase tracking-tighter mb-2 group-hover:text-tactical-orange transition-colors">{item.name}</h3>
                        <p className="text-gray-500 text-xs mb-6 leading-relaxed h-8 overflow-hidden">{item.desc}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="text-2xl font-display font-black text-white">{item.price}</div>
                          <button 
                            onClick={() => item.stock > 0 && addToCart(item)}
                            disabled={item.stock === 0}
                            className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all ${item.stock > 0 ? 'bg-white text-tactical-black hover:bg-tactical-orange' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                          >
                            {item.stock > 0 ? 'COMPRAR' : 'AGOTADO'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center bg-tactical-gray/10 border border-white/5 rounded-sm">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-white mb-2">No se han encontrado productos</h3>
                  <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-8">Intenta con otros términos o limpia los filtros</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="bg-tactical-orange text-tactical-black px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white transition-all"
                  >
                    LIMPIAR BÚSQUEDA
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'legal' && <LegalInfoPage />}
        {view === 'returns' && <ReturnsPage />}
        {view === 'help' && <HelpPage />}
        {view === 'about' && <AboutUs />}
        {view === 'mechanic' && <MechanicPage />}
        {view === 'sitemap' && <SitemapPage onNavigate={setView} />}
      </main>

      <Footer onNavigate={setView} />

      <ProductDetailModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct}
        onAddToCart={addToCart}
      />

      {/* Catalog Modal - Removed as it's now a view */}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onSuccess={() => {
          setIsCheckoutOpen(false);
          setOrderSuccess(true);
          setCart([]);
        }}
      />

      <AnimatePresence>
        {orderSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-tactical-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center">
              <div className="w-20 h-20 bg-tactical-orange text-tactical-black rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-display font-black uppercase tracking-tighter mb-4">¡PEDIDO RECIBIDO!</h2>
              <p className="text-gray-400 mb-8 font-bold uppercase tracking-widest text-sm">
                Tu arsenal está en camino. Te hemos enviado un email con los detalles del pedido.
              </p>
              <button 
                onClick={() => setOrderSuccess(false)}
                className="w-full bg-tactical-orange text-tactical-black py-4 font-display font-black uppercase tracking-widest cta-glow hover:bg-white transition-all"
              >
                VOLVER A LA TIENDA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Button (Mobile) */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 md:hidden w-16 h-16 bg-tactical-orange text-tactical-black rounded-full flex items-center justify-center shadow-2xl z-40 cta-glow"
      >
        <ShoppingCart size={28} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-tactical-black text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-tactical-orange">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
