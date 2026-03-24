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
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface CartItem {
  id: number;
  name: string;
  price: string;
  img: string;
  quantity: number;
}

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
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
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
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
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
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale" />
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
  onCartClick 
}: { 
  onCategoryClick: (cat: 'replicas' | 'accesorios' | 'extras') => void;
  cartCount: number;
  onCartClick: () => void;
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
          <a href="tel:6285252696" className="hidden lg:flex bg-tactical-orange text-tactical-black px-5 py-2 rounded-sm hover:bg-white transition-all cta-glow items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Phone size={14} />
            Llámanos ahora
          </a>
          
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
              animate={{ 
                filter: ["hue-rotate(0deg) saturate(1)", "hue-rotate(360deg) saturate(1.5)", "hue-rotate(0deg) saturate(1)"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative w-12 h-12 flex items-center justify-center"
            >
              {/* Custom Star Logo inspired by the image */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-tactical-orange drop-shadow-[0_0_8px_rgba(242,125,38,0.5)]">
                <path d="M50 5L61.2 35.5H95L67.6 54.5L78.8 85L50 66L21.2 85L32.4 54.5L5 35.5H38.8L50 5Z" />
                <circle cx="50" cy="50" r="15" className="fill-tactical-black" />
                <path d="M45 45 Q50 40 55 45 M45 55 Q50 60 55 55" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </motion.div>
            <div className="flex flex-col -gap-1">
              <span className="text-2xl font-display font-black tracking-tighter leading-none">MLQ<span className="text-tactical-orange">TACTICS</span></span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500">Elite Airsoft Division</span>
            </div>
          </div>
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
                    onClick={() => { onCategoryClick('accesorios'); setShowShopDropdown(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-tactical-orange hover:text-tactical-black transition-all flex items-center justify-between group"
                  >
                    Accesorios <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                  <button 
                    onClick={() => { onCategoryClick('extras'); setShowShopDropdown(false); }}
                    className="w-full text-left px-4 py-3 hover:bg-tactical-orange hover:text-tactical-black transition-all flex items-center justify-between group"
                  >
                    Consumibles <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <a href="#servicios" className="hover:text-tactical-orange transition-colors">Upgrades</a>
          <a href="#contacto" className="hover:text-tactical-orange transition-colors">Contacto</a>
          
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
              <button onClick={() => { onCategoryClick('accesorios'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Accesorios</button>
              <button onClick={() => { onCategoryClick('extras'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Consumibles</button>
            </div>
            <a href="#servicios" onClick={() => setIsOpen(false)} className="text-xl font-display font-bold uppercase">Upgrades</a>
            <a href="#contacto" onClick={() => setIsOpen(false)} className="text-xl font-display font-bold uppercase">Contacto</a>
            <a href="tel:6285252696" onClick={() => setIsOpen(false)} className="bg-tactical-orange text-tactical-black py-4 font-display font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Phone size={20} />
              Llámanos ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onCatalogClick }: { onCatalogClick: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=2000" 
          alt="Airsoft Tactical Action" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
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
            Especialistas en Milsim & Upgrades
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
            <button className="border border-white/20 hover:border-white px-8 py-4 rounded-sm font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
              VISITAR TIENDA (RUBÍ)
            </button>
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
            <div className="text-tactical-orange font-display font-black text-3xl">98%</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Precisión en <br /> Upgrades Custom
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
      icon: <Zap className="text-tactical-orange" />, 
      title: "Upgrades de Precisión", 
      desc: "Taller especializado en R-Hop, MOSFETs y optimización de FPS para máxima ventaja competitiva." 
    },
    { 
      icon: <Shield className="text-tactical-orange" />, 
      title: "Garantía Táctica", 
      desc: "Todos nuestros productos y servicios técnicos cuentan con garantía real y soporte post-venta." 
    },
    { 
      icon: <Package className="text-tactical-orange" />, 
      title: "Stock Real en Rubí", 
      desc: "Sin esperas. Lo que ves en la web está en nuestra tienda física listo para ser recogido." 
    },
    { 
      icon: <Users className="text-tactical-orange" />, 
      title: "Comunidad Activa", 
      desc: "Únete a nuestro equipo y participa en partidas exclusivas y entrenamientos tácticos." 
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

const Categories = ({ onReplicasClick }: { onReplicasClick: () => void }) => {
  const cats = [
    { name: "Réplicas", img: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=800", count: "120+ Modelos" },
    { name: "Equipamiento", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", count: "Vests, Cascos, Botas" },
    { name: "Accesorios", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=800", count: "Ópticas, Linternas" },
    { name: "Upgrades", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800", count: "Taller Pro" },
  ];

  return (
    <section id="productos" className="py-24 bg-tactical-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-black">EQUÍPATE PARA EL <br /><span className="text-tactical-orange">ÉXITO</span></h2>
          </div>
          <button className="text-tactical-orange font-display font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
            Ver todas las categorías <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((cat, i) => (
            <div 
              key={i} 
              onClick={cat.name === "Réplicas" ? onReplicasClick : undefined}
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
    { q: "¿Qué garantía tienen los upgrades?", a: "Nuestros trabajos de taller tienen una garantía de 3 meses en mano de obra. Usamos solo componentes de primera calidad (Gate, Maxx Model, SHS)." },
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

const Footer = () => {
  return (
    <footer id="contacto" className="bg-tactical-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-tactical-orange flex items-center justify-center rounded-sm transform rotate-45">
                <Target className="text-tactical-black -rotate-45 w-5 h-5" />
              </div>
              <span className="text-xl font-display font-black tracking-tighter ml-2">MLQ<span className="text-tactical-orange">TACTICS</span></span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Tu centro de referencia para airsoft en Barcelona. Especialistas en equipamiento de alto rendimiento y servicios técnicos avanzados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-tactical-gray flex items-center justify-center rounded-sm hover:bg-tactical-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-tactical-gray flex items-center justify-center rounded-sm hover:bg-tactical-orange transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6 text-white">Navegación</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-bold uppercase tracking-tighter">
              <li><a href="#" className="hover:text-tactical-orange transition-colors">Réplicas</a></li>
              <li><a href="#" className="hover:text-tactical-orange transition-colors">Equipamiento</a></li>
              <li><a href="#" className="hover:text-tactical-orange transition-colors">Taller de Upgrades</a></li>
              <li><a href="#" className="hover:text-tactical-orange transition-colors">Eventos & Partidas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6 text-white">Contacto</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-tactical-orange shrink-0" />
                <span>Carrer de la Táctica, 12, <br /> 08191 Rubí, Barcelona</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-tactical-orange shrink-0" />
                <span>+34 93X XX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-tactical-orange shrink-0" />
                <span>Lun - Sáb: 10:00 - 20:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-6 text-white">Newsletter</h4>
            <p className="text-gray-500 text-xs mb-4 uppercase font-bold tracking-widest">Recibe ofertas exclusivas y avisos de partidas.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="TU EMAIL" 
                className="bg-tactical-gray border border-white/10 px-4 py-2 text-xs w-full focus:outline-none focus:border-tactical-orange"
              />
              <button className="bg-tactical-orange text-tactical-black px-4 py-2 font-display font-black uppercase text-xs">OK</button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          <div>© 2026 MLQTactics. Todos los derechos reservados.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [showCatalog, setShowCatalog] = useState(false);
  const [activeTab, setActiveTab] = useState<'replicas' | 'accesorios' | 'extras'>('replicas');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
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
    replicas: [
      { id: 1, name: "Tokyo Marui M4A1 MWS", price: "599.00€", category: "GBBR", img: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Sistema de gas con retroceso realista y cuerpo de metal de alta fidelidad." },
      { id: 2, name: "Krytac Kriss Vector", price: "485.00€", category: "AEG", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=400", status: "Últimas Unidades", desc: "Diseño futurista con gatillo electrónico y ráfaga de 2 disparos integrada." },
      { id: 3, name: "Tokyo Marui Hi-Capa 5.1", price: "165.00€", category: "Pistola GBB", img: "https://images.unsplash.com/photo-1590235438337-97939c36600c?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "La reina de las pistolas para IPSC y CQB. Fiabilidad japonesa legendaria." },
      { id: 4, name: "LCT AK-74M NV", price: "395.00€", category: "AEG", img: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Acero real y robustez extrema. La réplica de AK más realista del mercado." },
      { id: 5, name: "Specna Arms Edge 2.0", price: "289.00€", category: "AEG", img: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=400", status: "Oferta", desc: "Incluye MOSFET GATE ASTER y motor de alto torque para respuesta rápida." },
      { id: 6, name: "Novritsch SSG10 A1", price: "299.00€", category: "Sniper", img: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=400", status: "Bajo Pedido", desc: "Precisión quirúrgica de fábrica. Capaz de manejar muelles de alta potencia." },
    ],
    accesorios: [
      { id: 7, name: "Mira Red Dot T1", price: "45.00€", category: "Óptica", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Punto rojo compacto con múltiples niveles de brillo y montura elevada." },
      { id: 8, name: "Silenciador Tracer Unit", price: "65.00€", category: "Externo", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=400", status: "Nuevo", desc: "Ilumina tus bolas trazadoras para partidas nocturnas y entornos CQB." },
      { id: 9, name: "Linterna Táctica 800lm", price: "38.00€", category: "Iluminación", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Potente haz de luz con montura para raíl Picatinny y pulsador remoto." },
      { id: 10, name: "Grip Vertical Angular", price: "15.00€", category: "Ergonomía", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Mejora el control y la estabilidad de tu réplica en transiciones rápidas." },
      { id: 11, name: "Cargador Mid-Cap 140bbs", price: "12.00€", category: "Magazines", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=400", status: "Pack 5x Oferta", desc: "Sin ruidos de sonajero. Alimentación perfecta incluso en altas cadencias." },
      { id: 12, name: "Correa Táctica 2 Puntos", price: "22.00€", category: "Transporte", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Ajuste rápido para transiciones cómodas entre primaria y secundaria." },
    ],
    extras: [
      { id: 13, name: "Bolas Bio 0.25g 1kg", price: "14.50€", category: "Consumibles", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=400", status: "Top Ventas", desc: "Biodegradables de alta calidad con pulido espejo para evitar atascos." },
      { id: 14, name: "Gas Green 1000ml", price: "11.00€", category: "Consumibles", img: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Presión estable con mezcla de silicona para el mantenimiento de juntas." },
      { id: 15, name: "Batería LiPo 11.1V", price: "25.00€", category: "Energía", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Alta tasa de descarga para una respuesta de gatillo instantánea en AEGs." },
      { id: 16, name: "Gafas Protección Bolle", price: "18.00€", category: "Seguridad", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400", status: "Homologadas", desc: "Protección balística certificada con tratamiento avanzado anti-vaho." },
      { id: 17, name: "Chaleco Táctico JPC", price: "55.00€", category: "Gear", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400", status: "Nuevo", desc: "Diseño ligero, modular y totalmente ajustable para máxima movilidad." },
      { id: 18, name: "Maleta Rígida 100cm", price: "85.00€", category: "Transporte", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400", status: "En Stock", desc: "Protección total contra impactos y agua para el transporte seguro de tu equipo." },
    ]
  };

  return (
    <div className="relative">
      <Navbar 
        onCategoryClick={(cat) => { setActiveTab(cat); setShowCatalog(true); }} 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero onCatalogClick={() => { setActiveTab('replicas'); setShowCatalog(true); }} />
        <SocialProof />
        <ValueProp />
        <Categories onReplicasClick={() => { setActiveTab('replicas'); setShowCatalog(true); }} />
        
        {/* Store Expertise Section */}
        <section id="experiencia" className="py-24 bg-tactical-green/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Elite Arsenal" 
                  className="rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-tactical-orange p-8 rounded-sm hidden lg:block">
                  <div className="text-tactical-black font-display font-black text-4xl">TECH</div>
                  <div className="text-tactical-black font-bold text-[10px] uppercase tracking-widest">Custom Workshop</div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6 uppercase leading-tight">EL ARSENAL DE LOS <br /><span className="text-tactical-orange">PROFESIONALES</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                En MLQTactics no movemos cajas, seleccionamos equipo. Cada réplica que sale de nuestra tienda en Rubí ha sido verificada para cumplir con los estándares más exigentes de rendimiento y fiabilidad.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Asesoramiento técnico por jugadores veteranos",
                  "Upgrades de precisión y MOSFETs de última generación",
                  "Stock real de marcas premium (TM, Krytac, VFC)",
                  "Soporte post-venta y garantía técnica directa"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-display font-bold uppercase text-sm tracking-tight">
                    <CheckCircle2 className="text-tactical-orange" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => { setActiveTab('replicas'); setShowCatalog(true); }}
                className="bg-white text-tactical-black px-8 py-4 font-display font-black uppercase tracking-widest hover:bg-tactical-orange transition-all"
              >
                EXPLORAR ARSENAL
              </button>
            </div>
          </div>
        </section>

        <UrgencySection />
        
        {/* Authority Section */}
        <section className="py-24 bg-tactical-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-black mb-12 uppercase tracking-tighter">PARTNERS DE <span className="text-tactical-orange">ÉLITE</span></h2>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
              {/* Mock logos or icons representing brands */}
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
                onClick={() => { setActiveTab('replicas'); setShowCatalog(true); }}
                className="bg-tactical-orange text-tactical-black px-12 py-6 font-display font-black uppercase tracking-[0.2em] text-lg cta-glow hover:bg-white transition-all"
              >
                IR A LA TIENDA ONLINE
              </button>
              <button className="bg-transparent border-2 border-white text-white px-12 py-6 font-display font-black uppercase tracking-[0.2em] text-lg hover:bg-white hover:text-tactical-black transition-all">
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
      </main>

      <Footer />

      {/* Catalog Modal */}
      <AnimatePresence>
        {showCatalog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-tactical-black/95 backdrop-blur-xl overflow-y-auto pt-24 pb-12"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">CATÁLOGO <span className="text-tactical-orange">COMPLETO</span></h2>
                  <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-2">Equipamiento verificado por operadores reales</p>
                </div>
                <button 
                  onClick={() => setShowCatalog(false)}
                  className="w-12 h-12 bg-white/5 hover:bg-tactical-orange transition-all flex items-center justify-center rounded-full group self-end md:self-center"
                >
                  <X size={24} className="group-hover:text-tactical-black transition-colors" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-6">
                {(['replicas', 'accesorios', 'extras'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 font-display font-black uppercase tracking-widest text-sm transition-all border-b-2 ${activeTab === tab ? 'border-tactical-orange text-tactical-orange bg-tactical-orange/5' : 'border-transparent text-gray-500 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catalogData[activeTab].map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card group overflow-hidden border-white/5 hover:border-tactical-orange/30 transition-all"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-tactical-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-tactical-orange border border-tactical-orange/30">
                        {item.category}
                      </div>
                      <div className="absolute top-4 right-4 bg-tactical-orange text-tactical-black px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                        {item.status}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-display font-black uppercase tracking-tighter mb-2 group-hover:text-tactical-orange transition-colors">{item.name}</h3>
                      <p className="text-gray-500 text-xs mb-6 leading-relaxed h-8 overflow-hidden">{item.desc}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="text-2xl font-display font-black text-white">{item.price}</div>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-white text-tactical-black px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-tactical-orange transition-all"
                        >
                          COMPRAR
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 text-center">
                <p className="text-gray-500 text-sm uppercase font-bold tracking-widest mb-6">¿Buscas algo específico? Lo conseguimos para ti.</p>
                <button className="border border-white/20 hover:border-tactical-orange px-8 py-4 font-display font-black uppercase tracking-widest transition-all">
                  CONSULTAR STOCK PERSONALIZADO
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
