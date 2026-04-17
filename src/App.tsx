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
  RefreshCcw,
  MessageCircle,
  Mail,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AboutUs, HelpPage, LegalInfoPage, ReturnsPage, SitemapPage, MechanicPage } from './LegalPages';
import logo from './images/logo.png';
import banner1 from './images/banner1.png';
import banner2 from './images/banner2.png';
import cuchilleriaImg from './images/cuchilleria.png';
import piezasInternasImg from './images/piezas internas.png';
import supervivenciaImg from './images/supervivencia.png';
import hpaImg from './images/hpa.png';
import consumiblesImg from './images/consumibles y accesostios.png';
import equipamientoImg from './images/equipamiento.png';
import marcasImg from './images/marcas.png';

// --- Types ---

type View = 'home' | 'catalog' | 'legal' | 'returns' | 'help' | 'about' | 'sitemap' | 'mechanic' | 'partners';

interface CartItem {
  id: number | string;
  name: string;
  price: string;
  img: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  desc: string;
  longDesc?: string;
  price: string;
  img: string;
  stock: number;
  category: string;
  subcategory: string;
  status: string;
  date: string;
  tags?: string[];
}

// --- Constants & Config ---

const CATEGORY_CONFIG = {
  replicas: {
    label: 'Réplicas',
    subcategories: [
      { id: 'all', label: 'Todas las Réplicas' },
      { id: 'fusiles', label: 'Fusiles' },
      { id: 'replicas gbb', label: 'Réplicas GBB' },
      { id: 'pistolas', label: 'Pistolas' },
      { id: 'escopetas', label: 'Escopetas' },
      { id: 'escopeta perdigon', label: 'Escopeta Perdigón' },
      { id: 'apoyo', label: 'Apoyo' },
      { id: 'francotiradores', label: 'Francotiradores' },
      { id: 'dmr', label: 'DMR' },
      { id: 'lanzagranadas', label: 'Lanzagranadas' },
      { id: 'replicas historicas', label: 'Réplicas Históricas' },
      { id: 'juguetes airsoft', label: 'Juguetes Airsoft' },
    ]
  },
  piezasInternas: {
    label: 'Piezas Internas',
    subcategories: [
      { id: 'all', label: 'Todas las Piezas' },
      { id: 'recambios gbb', label: 'Recambios GBB' },
      { id: 'partes externas', label: 'Partes Externas' },
      { id: 'rodamientos y casquillos', label: 'Rodamientos y Casquillos' },
      { id: 'pistones y cabezas de piston', label: 'Pistones y Cabezas de Pistón' },
      { id: 'upgrade snipers', label: 'Upgrade Snipers' },
      { id: 'gatillos', label: 'Gatillos' },
      { id: 'nozzles', label: 'Nozzles' },
      { id: 'muelles y guias de muelles', label: 'Muelles y Guías de Muelles' },
      { id: 'motores', label: 'Motores' },
      { id: 'mosfets y gatillos electronicos', label: 'Mosfets y Gatillos Electrónicos' },
      { id: 'gomas hop up', label: 'Gomas Hop Up' },
      { id: 'gearboxes y carcasas', label: 'Gearboxes y Carcasas' },
      { id: 'camaras hop up', label: 'Cámaras Hop Up' },
      { id: 'cilindros y cabezas de cilindro', label: 'Cilindros y Cabezas de Cilindro' },
      { id: 'canones de precision', label: 'Cañones de Precisión' },
      { id: 'antireversal y cut off level', label: 'Antireversal y Cut Off Level' },
      { id: 'piezas tokio marui', label: 'Piezas Tokyo Marui' },
      { id: 'piezas internas de pistolas', label: 'Piezas Internas de Pistolas' },
      { id: 'tappet selector plates', label: 'Tappet / Selector Plates' },
    ]
  },
  cuchilleria: {
    label: 'Cuchillería',
    subcategories: [
      { id: 'all', label: 'Toda la Cuchillería' },
      { id: 'machetes', label: 'Machetes' },
      { id: 'katanas', label: 'Katanas' },
      { id: 'navajas', label: 'Navajas' },
      { id: 'cuchillos', label: 'Cuchillos' },
      { id: 'hachas', label: 'Hachas' },
    ]
  },
  supervivencia: {
    label: 'Supervivencia',
    subcategories: [
      { id: 'all', label: 'Toda la Supervivencia' },
      { id: 'condiciones extremas', label: 'Condiciones Extremas' },
      { id: 'kit de supervivencia', label: 'Kit de Supervivencia' },
      { id: 'cubiertos para camping', label: 'Cubiertos para Camping' },
      { id: 'botiquin', label: 'Botiquín' },
      { id: 'bragas baclavas', label: 'Bragas / Baclavas' },
      { id: 'varios para camping outdoor', label: 'Varios Camping Outdoor' },
      { id: 'ponchos y complementos impermeables', label: 'Ponchos e Impermeables' },
    ]
  },
  hpa: {
    label: 'HPA',
    subcategories: [
      { id: 'all', label: 'Todo HPA' },
      { id: 'compresores hpa', label: 'Compresores HPA' },
      { id: 'replicas hpa', label: 'Réplicas HPA' },
      { id: 'unidades hpa', label: 'Unidades HPA' },
      { id: 'botellas hpa', label: 'Botellas HPA' },
      { id: 'accesorios hpa', label: 'Accesorios HPA' },
      { id: 'linea de aire y valvulas', label: 'Línea de Aire y Válvulas' },
    ]
  },
  equipamiento: {
    label: 'Equipamiento',
    subcategories: [
      { id: 'all', label: 'Todo el Equipamiento' },
      { id: 'escudos', label: 'Escudos' },
      { id: 'torniquete y porta torniquete', label: 'Torniquete y Porta Torniquete' },
      { id: 'expositor', label: 'Expositor' },
      { id: 'mascaras airsoft', label: 'Máscaras Airsoft' },
      { id: 'morreras y otras protecciones', label: 'Morreras y Otras Protecciones' },
      { id: 'gorras', label: 'Gorras' },
      { id: 'comunicaciones y accesorios', label: 'Comunicaciones y Accesorios' },
      { id: 'gafas airsoft', label: 'Gafas Airsoft' },
      { id: 'cascos relacionados', label: 'Cascos & Relacionados' },
      { id: 'chalecos tacticos', label: 'Chalecos Tácticos' },
      { id: 'camuflaje airsoft', label: 'Camuflaje Airsoft' },
      { id: 'guantes tacticos', label: 'Guantes Tácticos' },
      { id: 'fundas de pistola', label: 'Fundas de Pistola' },
      { id: 'maletines rigidos airsoft', label: 'Maletines Rígidos' },
      { id: 'botas', label: 'Botas' },
      { id: 'uniformes', label: 'Uniformes' },
      { id: 'pantalones', label: 'Pantalones' },
      { id: 'fundas de transporte mochila', label: 'Mochilas / Transporte' },
      { id: 'parches', label: 'Parches' },
      { id: 'cantimploras y bolsas de hidratacion', label: 'Hidratación' },
      { id: 'correas y enganches', label: 'Correas y Enganches' },
      { id: 'cinturones', label: 'Cinturones' },
      { id: 'pouches', label: 'Pouches' },
      { id: 'camisetas', label: 'Camisetas' },
    ]
  },
  consumibles: {
    label: 'Consumibles',
    subcategories: [
      { id: 'all', label: 'Todos los Consumibles' },
      { id: 'bolas de airsoft', label: 'Bolas de Airsoft' },
      { id: 'baterias y cargadores', label: 'Baterías y Cargadores' },
      { id: 'gas y bombonas co2', label: 'Gas y CO2' },
      { id: 'lubricantes grasas y herramientas', label: 'Mantenimiento / Herramientas' },
      { id: 'pilas', label: 'Pilas' },
      { id: 'tico-tico', label: 'Tico-Tico' },
      { id: 'sprays de pintura', label: 'Sprays de Pintura' },
      { id: 'llaveros', label: 'Llaveros' },
      { id: 'dummy', label: 'Dummy' },
      { id: 'red dots y visores', label: 'Red Dots y Visores' },
      { id: 'monturas y anillas', label: 'Monturas y Anillas' },
      { id: 'lasers linternas e iluminacion', label: 'Iluminación y Lasers' },
      { id: 'guardamanos y railes', label: 'Guardamanos y Raíles' },
      { id: 'grips y bipodes', label: 'Grips y Bípodes' },
      { id: 'extensores', label: 'Extensores' },
      { id: 'culatas', label: 'Culatas' },
      { id: 'cargadores', label: 'Cargadores' },
      { id: 'trazadores', label: 'Trazadores' },
      { id: 'granadas', label: 'Granadas' },
      { id: 'dianas', label: 'Dianas' },
      { id: 'cronografos', label: 'Cronógrafos' },
      { id: 'bocachas', label: 'Bocachas' },
      { id: 'silenciadores', label: 'Silenciadores' },
      { id: 'perdigones', label: 'Perdigones' },
    ]
  }
};

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
  onHelpClick,
  activeTab
}: { 
  onCategoryClick: (cat: keyof typeof CATEGORY_CONFIG, subcat?: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onAboutClick: () => void;
  onMechanicClick: () => void;
  onHelpClick: () => void;
  activeTab: keyof typeof CATEGORY_CONFIG;
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
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[1240px] bg-tactical-black border border-white/10 p-8 shadow-2xl grid grid-cols-5 gap-x-10 gap-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar"
                >
                  <div className="flex flex-col gap-8">
                    <div>
                      <h4 className="text-[10px] font-black text-tactical-orange tracking-[0.3em] mb-4 border-b border-white/5 pb-2 uppercase text-center">RÉPLICAS</h4>
                      <div className="grid grid-cols-1 gap-y-2">
                        {CATEGORY_CONFIG.replicas.subcategories.map(sub => (
                          <button 
                            key={sub.id}
                            onClick={() => { 
                              onCategoryClick('replicas', sub.id); 
                              setShowShopDropdown(false); 
                            }}
                            className="text-[10px] text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-bold uppercase tracking-tight"
                          >
                            <span className="w-1 h-1 bg-tactical-orange/30 group-hover:bg-tactical-orange transition-colors shrink-0"></span>
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-tactical-orange tracking-[0.3em] mb-4 border-b border-white/5 pb-2 uppercase text-center">HPA</h4>
                      <div className="grid grid-cols-1 gap-y-2">
                        {CATEGORY_CONFIG.hpa.subcategories.map(sub => (
                          <button 
                            key={sub.id}
                            onClick={() => { 
                              onCategoryClick('hpa', sub.id); 
                              setShowShopDropdown(false); 
                            }}
                            className="text-[10px] text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-bold uppercase tracking-tight"
                          >
                            <span className="w-1 h-1 bg-tactical-orange/30 group-hover:bg-tactical-orange transition-colors shrink-0"></span>
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-tactical-orange tracking-[0.3em] mb-4 border-b border-white/5 pb-2 uppercase text-center">PIEZAS INTERNAS</h4>
                    <div className="grid grid-cols-1 gap-y-2">
                      {CATEGORY_CONFIG.piezasInternas.subcategories.map(sub => (
                        <button 
                          key={sub.id}
                          onClick={() => { 
                            onCategoryClick('piezasInternas', sub.id); 
                            setShowShopDropdown(false); 
                          }}
                          className="text-[10px] text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-bold uppercase tracking-tight"
                        >
                          <span className="w-1 h-1 bg-tactical-orange/30 group-hover:bg-tactical-orange transition-colors shrink-0"></span>
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div>
                      <h4 className="text-[10px] font-black text-tactical-orange tracking-[0.3em] mb-4 border-b border-white/5 pb-2 uppercase text-center">CUCHILLERÍA</h4>
                      <div className="grid grid-cols-1 gap-y-2">
                        {CATEGORY_CONFIG.cuchilleria.subcategories.map(sub => (
                          <button 
                            key={sub.id}
                            onClick={() => { 
                              onCategoryClick('cuchilleria', sub.id); 
                              setShowShopDropdown(false); 
                            }}
                            className="text-[10px] text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-bold uppercase tracking-tight"
                          >
                            <span className="w-1 h-1 bg-tactical-orange/30 group-hover:bg-tactical-orange transition-colors shrink-0"></span>
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-tactical-orange tracking-[0.3em] mb-4 border-b border-white/5 pb-2 uppercase text-center">SUPERVIVENCIA</h4>
                      <div className="grid grid-cols-1 gap-y-2">
                        {CATEGORY_CONFIG.supervivencia.subcategories.map(sub => (
                          <button 
                            key={sub.id}
                            onClick={() => { 
                              onCategoryClick('supervivencia', sub.id); 
                              setShowShopDropdown(false); 
                            }}
                            className="text-[10px] text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-bold uppercase tracking-tight"
                          >
                            <span className="w-1 h-1 bg-tactical-orange/30 group-hover:bg-tactical-orange transition-colors shrink-0"></span>
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-tactical-orange tracking-[0.3em] mb-4 border-b border-white/5 pb-2 uppercase text-center">EQUIPAMIENTO</h4>
                    <div className="grid grid-cols-1 gap-y-2">
                      {CATEGORY_CONFIG.equipamiento.subcategories.map(sub => (
                        <button 
                          key={sub.id}
                          onClick={() => { 
                            onCategoryClick('equipamiento', sub.id); 
                            setShowShopDropdown(false); 
                          }}
                          className="text-[10px] text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-bold uppercase tracking-tight"
                        >
                          <span className="w-1 h-1 bg-tactical-orange/30 group-hover:bg-tactical-orange transition-colors shrink-0"></span>
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-tactical-orange tracking-[0.3em] mb-4 border-b border-white/5 pb-2 uppercase text-center">CONSUMIBLES</h4>
                    <div className="grid grid-cols-1 gap-y-2">
                      {CATEGORY_CONFIG.consumibles.subcategories.map(sub => (
                        <button 
                          key={sub.id}
                          onClick={() => { 
                            onCategoryClick('consumibles', sub.id); 
                            setShowShopDropdown(false); 
                          }}
                          className="text-[10px] text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-bold uppercase tracking-tight"
                        >
                          <span className="w-1 h-1 bg-tactical-orange/30 group-hover:bg-tactical-orange transition-colors shrink-0"></span>
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
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
            className="absolute top-full left-0 w-full bg-tactical-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden max-h-[85vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">TIENDA</span>
              <div className="flex flex-col gap-2">
                <button onClick={() => { onCategoryClick('replicas'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Réplicas</button>
                {activeTab === 'replicas' && (
                  <div className="flex flex-wrap gap-2 pl-4 mt-2">
                    {CATEGORY_CONFIG.replicas.subcategories.slice(1).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => { onCategoryClick('replicas', sub.id); setIsOpen(false); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-tactical-orange transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => { onCategoryClick('piezasInternas'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Piezas Internas</button>
                {activeTab === 'piezasInternas' && (
                  <div className="flex flex-wrap gap-2 pl-4 mt-2">
                    {CATEGORY_CONFIG.piezasInternas.subcategories.slice(1).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => { onCategoryClick('piezasInternas', sub.id); setIsOpen(false); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-tactical-orange transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => { onCategoryClick('cuchilleria'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Cuchillería</button>
                {activeTab === 'cuchilleria' && (
                  <div className="flex flex-wrap gap-2 pl-4 mt-2">
                    {CATEGORY_CONFIG.cuchilleria.subcategories.slice(1).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => { onCategoryClick('cuchilleria', sub.id); setIsOpen(false); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-tactical-orange transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => { onCategoryClick('supervivencia'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Supervivencia</button>
                {activeTab === 'supervivencia' && (
                  <div className="flex flex-wrap gap-2 pl-4 mt-2">
                    {CATEGORY_CONFIG.supervivencia.subcategories.slice(1).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => { onCategoryClick('supervivencia', sub.id); setIsOpen(false); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-tactical-orange transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => { onCategoryClick('hpa'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">HPA</button>
                {activeTab === 'hpa' && (
                  <div className="flex flex-wrap gap-2 pl-4 mt-2">
                    {CATEGORY_CONFIG.hpa.subcategories.slice(1).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => { onCategoryClick('hpa', sub.id); setIsOpen(false); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-tactical-orange transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => { onCategoryClick('equipamiento'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Equipamiento</button>
                {activeTab === 'equipamiento' && (
                  <div className="flex flex-wrap gap-2 pl-4 mt-2">
                    {CATEGORY_CONFIG.equipamiento.subcategories.slice(1).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => { onCategoryClick('equipamiento', sub.id); setIsOpen(false); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-tactical-orange transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => { onCategoryClick('consumibles'); setIsOpen(false); }} className="text-xl font-display font-bold uppercase text-left pl-4 border-l border-tactical-orange">Consumibles</button>
                {activeTab === 'consumibles' && (
                  <div className="flex flex-wrap gap-2 pl-4 mt-2">
                    {CATEGORY_CONFIG.consumibles.subcategories.slice(1).map(sub => (
                      <button 
                        key={sub.id}
                        onClick={() => { onCategoryClick('consumibles', sub.id); setIsOpen(false); }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-tactical-orange transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
            TIENDA DE <span className="text-tactical-orange">AIRSOFT</span> <br />
            ELITE ONLINE
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-8 leading-relaxed">
            No solo vendemos réplicas. Forjamos guerreros. Equipamiento táctico de élite, upgrades de precisión y envíos rápidos a toda España.
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
            { name: "Marc Rodríguez", text: "La mejor tienda online. El asesoramiento técnico es de otro nivel, mi réplica ahora tira como un láser.", role: "Jugador Milsim" },
            { name: "Santi López", text: "Trato impecable y envío rapidísimo. Tienen stock real y no te intentan vender lo más caro, sino lo que necesitas.", role: "Principiante" },
            { name: "Dani V.", text: "Upgrades rápidos y con garantía. Si quieres competir en serio a nivel nacional, MLQTactics es el sitio.", role: "Veterano" }
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
      title: "Stock Real Garantizado", 
      desc: "Disponibilidad inmediata. Enviamos tu pedido en 24h para que no pares de jugar." 
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
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4">MECÁNICO Y TIENDA DE <span className="text-tactical-orange">AIRSOFT</span></h2>
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
    { id: 'hpa', name: "HPA", img: hpaImg, count: "Sistemas de Aire" },
    { id: 'equipamiento', name: "Equipamiento", img: equipamientoImg, count: "Protección y Táctico" },
    { id: 'consumibles', name: "Consumibles", img: consumiblesImg, count: "Bolas, Gas y Accesorios" },
    { id: 'partners', name: "Marcas", img: marcasImg, count: "Partners de Elite" },
  ];

  return (
    <section id="productos" className="py-24 bg-tactical-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-black">CATÁLOGO DE <br /><span className="text-tactical-orange">PRODUCTOS AIRSOFT</span></h2>
          </div>
          <button 
            onClick={() => onCategoryClick('replicas')}
            className="text-tactical-orange font-display font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
          >
            Ver todas las categorías <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cats.map((cat, i) => (
              <a 
                key={i} 
                href={`#${cat.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (cat.id === 'partners') {
                    onCategoryClick('partners');
                  } else {
                    onCategoryClick(cat.id);
                  }
                }}
                className="relative h-[400px] overflow-hidden group cursor-pointer block"
              >
                <img 
                  src={cat.img} 
                  alt={`${cat.name} - Tienda de Airsoft MLQ Tactics`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                  loading={i > 2 ? "lazy" : "eager"}
                />
              <div className="absolute inset-0 bg-gradient-to-t from-tactical-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-tactical-orange mb-2">
                  {cat.count}
                </div>
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter">{cat.name}</h3>
                <div className="h-1 w-0 bg-tactical-orange group-hover:w-full transition-all duration-500 mt-4"></div>
              </div>
            </a>
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

const PartnersPage = () => {
  const eliteBrands = [
    { name: "Tokyo Marui", desc: "La leyenda del airsoft japonés. Pioneros en el sistema AEG y referentes mundiales en fidelidad y rendimiento.", logo: "https://www.tokyo-marui.co.jp/common/images/logo.png" },
    { name: "Krytac", desc: "Tecnología de vanguardia. Réplicas diseñadas para el máximo rendimiento desde el primer minuto.", logo: "https://krytac.com/wp-content/uploads/2021/05/krytac-logo-white.png" },
    { name: "Gate", desc: "Los maestros de la electrónica. Gatillos electrónicos y sistemas de control que llevan tu réplica al futuro.", logo: "https://gatee.eu/templates/gate/images/logo.png" },
    { name: "5.11 Tactical", desc: "Equipamiento profesional para operadores reales. Durabilidad y funcionalidad sin compromisos.", logo: "https://www.511tactical.com/static/version1712151614/frontend/FiveEleven/enterprise/en_US/images/logo.svg" },
    { name: "VFC", desc: "Realismo extremo. Calidad de construcción externa inigualable y mecánicas de alta gama.", logo: "https://www.vegaforce.com/images/logo.png" },
    { name: "LCT Airsoft", desc: "Acero y robustez. Las replicas de AK más realistas y duras del mercado.", logo: "http://www.lctairsoft.com/images/index/logo.png" }
  ];

  const brandCatalog = {
    "0-9": ["4UANTUM", "5ku"],
    "A": ["ABBEY", "ACTION ARMY", "AIP ARMY INTERNATIONAL PRODUCT", "AIRTECH STUDIOS", "A&K", "Albainox", "Amomax", "Angry Gun", "APS CONCEPTION", "ARCTURUS", "Arsenic", "ASG", "AW CUSTOM"],
    "B": ["BALYSTIK", "Barbaric", "BIG DRAGON", "Blood Heritage", "Bollé", "BO MANUFACTURE"],
    "C": ["COMBAT ZONE TACTICAL", "CONQUER", "Corso", "COWCOW Technology", "CYGNUS ARMORY", "Cyma"],
    "D": ["Delta Tactics", "Dingo", "Duel Code", "Duracell"],
    "E": ["EARMOR", "ELEMENT AIRSOFT", "Emerson", "E-Shooter", "ExtraStar"],
    "F": ["FMA", "FPS SOFTAIR"],
    "G": ["GATE", "GENS ACE", "G&G", "Golden Eagle", "G&P"],
    "I": ["INMORTAL WARRIOR", "IPOWER"],
    "J": ["Jing gong works"],
    "K": ["K25", "KJ works", "Kodak"],
    "L": ["Lancer Tactical", "LAYLAX", "Lct", "Lonex"],
    "M": ["Maple Leaf", "Mastodon", "Maxx Model", "Mechanix", "MG custom", "MILTEC", "MLQ TACTIC", "Modify"],
    "N": ["NIMROD", "NUPROL"],
    "P": ["PALLARES SOLSONA NAVAJA GABACHA", "Panasonic", "Perun Airsoft", "PPS", "PROMETHEUS", "PTS", "PUFF DINO"],
    "R": ["RACCOON", "Ragnar-Raids", "Red Training", "RETRO ARMS", "ROSSI", "RTC", "RWA"],
    "S": ["Saigo Defense", "Secutor Arms", "SHS", "Six MM", "Skywoods", "SLONG", "Soger", "SPECNA", "Spirit Field", "Spitfire", "Steel Mule", "STINGER"],
    "T": ["T238", "Tac", "tokisu", "Tokyo Marui", "tole 10 imperial"],
    "U": ["UMAREX"],
    "V": ["VectorOptic", "VFC", "Victory", "VIGOR", "viper tactical", "VORSK", "Vs studio"],
    "W": ["WADSN", "WE", "WELL", "WOSPORT"],
    "X": ["XCORTECH"],
    "Z": ["ZASDAR"]
  };

  return (
    <div className="pt-32 pb-24 bg-tactical-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-display font-black mb-6 uppercase tracking-tighter italic">NUESTRO <span className="text-tactical-orange">ARSENAL</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto uppercase text-xs font-bold tracking-[0.3em] leading-relaxed">Trabajamos con más de 100 marcas de confianza para garantizar que MLQ Tactics sea tu armería definitiva.</p>
        </motion.div>

        {/* Elite Partners */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <div className="h-px bg-white/10 flex-1 max-w-[100px]"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-tactical-orange">Partners de Elite</h2>
            <div className="h-px bg-white/10 flex-1 max-w-[100px]"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eliteBrands.map((brand, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 flex flex-col items-center text-center group hover:border-tactical-orange/50 transition-all border border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <span className="text-6xl font-display font-black">0{i+1}</span>
                </div>
                <div className="h-16 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                  <span className="text-xl font-display font-black tracking-tighter text-white group-hover:text-tactical-orange">{brand.name}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 italic">{brand.desc}</p>
                <div className="mt-auto pt-6 border-t border-white/5 w-full">
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Official MLQ Partner</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full Brand List - Compact Layout */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <div className="h-px bg-white/10 flex-1 max-w-[100px]"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">Listado Completo de Marcas</h2>
            <div className="h-px bg-white/10 flex-1 max-w-[100px]"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8 text-left bg-white/[0.02] p-12 border border-white/5 rounded-sm">
            {Object.entries(brandCatalog).map(([letter, brands]) => (
              <div key={letter} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-tactical-orange font-display font-black text-2xl">{letter}</span>
                  <div className="h-[2px] flex-1 bg-tactical-orange/20"></div>
                </div>
                <ul className="space-y-1.5 pr-4">
                  {brands.map((brand) => (
                    <li key={brand} className="text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors cursor-default whitespace-nowrap overflow-hidden text-ellipsis">
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-12 bg-tactical-orange text-tactical-black rounded-sm text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Visual pattern in the background */}
            <div className="absolute top-0 left-0 w-full h-full tactical-grid"></div>
          </div>
          <h2 className="text-3xl font-display font-black mb-4 uppercase tracking-tighter italic">¿BUSCAS UNA MARCA ESPECÍFICA?</h2>
          <p className="text-tactical-black font-black uppercase text-[10px] tracking-[0.3em] mb-10 max-w-xl mx-auto">Si no encuentras lo que buscas, nuestro equipo de compras lo localizará por ti.</p>
          <a href="mailto:partners@mlqtactics.com" className="inline-block bg-tactical-black text-white px-12 py-5 font-display font-black uppercase tracking-widest hover:bg-tactical-green transition-all shadow-xl">CONTACTAR CON NOSOTROS</a>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { 
      q: "¿Es seguro comprar réplicas de airsoft online en MLQ Tactics?", 
      a: "Totalmente. En MLQ Tactics garantizamos un proceso de compra 100% seguro. Todas nuestras réplicas pasan un control de calidad antes del envío y cumplen con la normativa vigente en España. Además, ofrecemos soporte post-venta especializado para cualquier duda técnica que puedas tener tras recibir tu pedido." 
    },
    { 
      q: "¿Cuánto tarda el envío de mi pedido?", 
      a: "Realizamos envíos urgentes a toda la península a través de agencias de transporte líderes. Por lo general, los pedidos se entregan en un plazo de 24 a 48 horas laborables siempre que el producto esté en stock. Te proporcionaremos un número de seguimiento para que sepas en todo momento dónde está tu equipamiento." 
    },
    { 
      q: "¿Ofrecéis servicio de upgrade y personalización de réplicas?", 
      a: "Sí, somos especialistas en mecánica de precisión para airsoft. En nuestro taller realizamos desde mantenimientos básicos hasta configuraciones de alto rendimiento (HPA, MOSFETs, cañones de precisión, etc.). Puedes enviarnos tu réplica desde cualquier punto de España para que nuestro equipo técnico realice las mejoras necesarias." 
    },
    { 
      q: "¿Qué tipo de garantía tienen los productos?", 
      a: "Todos nuestros productos cuentan con la garantía legal establecida. Además, las réplicas que pasan por nuestro taller para upgrades cuentan con la garantía de MLQ Tactics sobre la mano de obra y los componentes instalados. Nuestra prioridad es que tu equipo rinda al máximo en cada partida." 
    },
    { 
      q: "¿Cómo puedo saber qué réplica es la adecuada para mí?", 
      a: "Si eres principiante, te recomendamos contactar con nosotros. Analizaremos tu estilo de juego preferido (CQB, bosque, sniper) y tu presupuesto para ofrecerte la mejor opción calidad-precio. Unirte a la comunidad de airsoft con el equipo adecuado marca la diferencia en tu experiencia de juego." 
    }
  ];

  return (
    <section className="py-24 bg-tactical-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* SEO Content Column */}
          <div className="prose prose-invert prose-orange max-w-none">
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter mb-8 italic">
              TU TIENDA DE <span className="text-tactical-orange">AIRSOFT ONLINE</span> DE REFERENCIA
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Bienvenido a <strong>MLQ Tactics</strong>, el epicentro del airsoft online donde la pasión por el realismo y el rendimiento técnico se encuentran. Si estás aquí, es porque no te conformas con cualquier equipo; buscas ventaja táctica, fiabilidad y un soporte profesional que entienda tus necesidades como operador.
            </p>
            
            <h3 className="text-2xl font-display font-bold uppercase text-white mt-10 mb-4 tracking-tight">Expertos en Réplicas de Airsoft de Alto Rendimiento</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              En MLQ Tactics, seleccionamos minuciosamente cada producto de nuestro catálogo. No somos simplemente una tienda; somos jugadores y técnicos. Por eso, solo trabajamos con las marcas líderes del mercado como <strong>Tokyo Marui</strong>, <strong>Krytac</strong>, <strong>VFC</strong> y <strong>Gate</strong>. Ya busques una AEG para partidas largas, una GBB por su realismo extremo o un sistema HPA para la máxima precisión, tenemos la plataforma ideal para ti.
            </p>

            <h3 className="text-2xl font-display font-bold uppercase text-white mt-10 mb-4 tracking-tight">Mucho más que ventas: Nuestro Taller Mecánico Especializado</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              La diferencia entre una réplica estándar y una herramienta de precisión de MLQ Tactics reside en el interior. Nuestro <strong>taller mecánico de airsoft</strong> es reconocido por llevar el rendimiento al límite. Realizamos instalaciones de gatillos electrónicos, mejoras de compresión, ajustes de R-Hop y configuraciones personalizadas para que tu réplica sea la envidia del campo de batalla.
            </p>

            <div className="p-6 bg-white/[0.02] border-l-4 border-tactical-orange my-10">
              <h4 className="text-lg font-bold text-tactical-orange mb-2 uppercase">Beneficios de elegir MLQ Tactics</h4>
              <ul className="list-none space-y-3 text-sm text-gray-400 p-0">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-tactical-orange"></div> <strong>Stock Real:</strong> Lo que ves en la web es lo que tenemos en nuestros almacenes.</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-tactical-orange"></div> <strong>Envío Urgente:</strong> Entregas en 24/48h para que no te pierdas la partida del fin de semana.</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-tactical-orange"></div> <strong>Asesoramiento Pro:</strong> Resolvemos tus dudas de hardware antes de que compres.</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-tactical-orange"></div> <strong>Comunidad Activa:</strong> No somos solo una tienda, somos parte del juego.</li>
              </ul>
            </div>

            <h2 className="text-3xl font-display font-black uppercase text-white mt-12 mb-6 tracking-tight">Equipamiento Táctico y Accesorios de Élite</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Para dominar el campo, la réplica es solo la mitad del equipo. En nuestra sección de <strong>equipamiento táctico</strong> encontrarás desde chalecos porta-placas y uniformes de alta resistencia hasta protección ocular homologada y sistemas de comunicación. Todo probado bajo condiciones de uso real para asegurar que tu inversión soporte el estrés del combate simulado.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Además, contamos con un catálogo extenso de consumibles: bolas biodegradables de alta precisión, gases de diferentes presiones y baterías de alta descarga para que tu réplica nunca te deje tirado en el momento crítico.
            </p>
          </div>

          {/* FAQ Column */}
          <div>
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter mb-12 text-center lg:text-left">
              PREGUNTAS <span className="text-tactical-orange">FRECUENTES</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/10 rounded-sm overflow-hidden bg-tactical-gray/10">
                  <button 
                    className="w-full p-6 flex justify-between items-center text-left hover:bg-tactical-gray/30 transition-all group"
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  >
                    <span className="font-display font-bold uppercase tracking-tight text-sm group-hover:text-tactical-orange transition-colors">{faq.q}</span>
                    <ChevronDown className={`transition-transform flex-shrink-0 ml-4 ${openIdx === i ? 'rotate-180 text-tactical-orange' : 'text-gray-500'}`} />
                  </button>
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 text-gray-500 text-xs leading-relaxed border-t border-white/5 bg-black/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 border border-white/5 bg-tactical-orange/5 rounded-sm">
              <h4 className="text-white font-display font-bold uppercase mb-4 tracking-widest text-sm">Compromiso MLQ Tactics</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Nuestra misión es profesionalizar el airsoft en España. Cada vez que compras en MLQ Tactics, estás apoyando un proyecto que invierte en calidad técnica y en la expansión de nuestra afición común. No somos simplemente un ecommerce; somos tu partner táctico en cada despliegue.
              </p>
            </div>
          </div>
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
        { label: 'MARCAS DE ÉLITE', view: 'partners' as View },
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
                        <a 
                          href={`#${link.view}`}
                          onClick={(e) => { e.preventDefault(); onNavigate(link.view); window.scrollTo(0, 0); }}
                          className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-tactical-orange transition-colors flex items-center gap-2"
                        >
                          <ChevronRight size={10} className="text-tactical-orange/50" />
                          {link.label}
                        </a>
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

  const handleRestockRequest = (product: any, method: 'whatsapp' | 'email') => {
    const message = `Hola, estoy interesado en el producto "${product.name}" (ID: ${product.id}) que actualmente está agotado. ¿Cuándo volverá a estar disponible?`;
    const phone = "346285252696";
    const email = "diszidiamusic@gmail.com";

    if (method === 'whatsapp') {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      const subject = `Interés en producto agotado: ${product.name}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }
  };

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
                  {product.subcategory && (
                    <span className="bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-300">
                      {CATEGORY_CONFIG.replicas.subcategories.find(s => s.id === product.subcategory)?.label || product.subcategory}
                    </span>
                  )}
                  <span className={`border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${product.stock > 0 ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    {product.stock > 0 ? product.status : 'AGOTADO'}
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
                    <div className={`text-sm font-bold uppercase ${product.stock > 0 ? 'text-white' : 'text-red-500'}`}>
                      {product.stock > 0 ? 'Inmediata' : 'Sin Stock'}
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 border border-white/5">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">GARANTÍA</div>
                    <div className="text-sm font-bold uppercase">2 Años MLQ</div>
                  </div>
                </div>

                {product.stock > 0 ? (
                  <button 
                    onClick={() => { onAddToCart(product); onClose(); }}
                    className="w-full bg-white text-tactical-black py-5 font-display font-black uppercase tracking-widest hover:bg-tactical-orange transition-all flex items-center justify-center gap-3 group"
                  >
                    AÑADIR A LA CESTA <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-sm">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-relaxed">
                        Este producto está temporalmente agotado. <br />
                        <span className="text-white">¿Quieres que te avisemos cuando vuelva?</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleRestockRequest(product, 'whatsapp')}
                        className="bg-[#25D366] text-white py-4 px-6 font-display font-black uppercase tracking-widest hover:bg-white hover:text-[#25D366] transition-all flex items-center justify-center gap-2 group border-2 border-[#25D366]"
                      >
                        WHATSAPP <MessageCircle size={18} />
                      </button>
                      <button 
                        onClick={() => handleRestockRequest(product, 'email')}
                        className="bg-transparent border-2 border-white text-white py-4 px-6 font-display font-black uppercase tracking-widest hover:bg-tactical-orange hover:border-tactical-orange hover:text-tactical-black transition-all flex items-center justify-center gap-2 group"
                      >
                        EMAIL <Mail size={18} />
                      </button>
                    </div>
                  </div>
                )}
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
  const [activeTab, setActiveTab] = useState<keyof typeof CATEGORY_CONFIG>('replicas');
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'date-new' | 'date-old'>('date-new');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([]);
  const [showOutOfStock, setShowOutOfStock] = useState(false);

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
              category: (item.categoria || 'General').toLowerCase().trim(),
              subcategory: (item.subcategoria || '').toLowerCase().trim(),
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

  const handleCategoryClick = (cat: keyof typeof CATEGORY_CONFIG, subcat: string = 'all') => {
    setActiveTab(cat);
    setActiveSubTab(subcat);
    setShowCatalog(true);
    setView('catalog');
    window.scrollTo(0, 0);
  };

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

  const getSortedData = () => {
    let data: Product[] = [];
    
    // Filter by main category
    if (activeTab === 'replicas') {
      data = dynamicProducts.filter(p => {
        const cat = p.category.toLowerCase();
        const otherCats = ['interno', 'piezas internas', 'cuchillería', 'supervivencia', 'cuchilleria', 'hpa', 'equipamiento', 'consumibles'];
        return cat.includes('replica') || ['gbbr', 'aeg', 'pistola gbb', 'sniper'].includes(cat) || (!otherCats.includes(cat));
      });
    } else if (activeTab === 'piezasInternas') {
      data = dynamicProducts.filter(p => ['interno', 'piezas internas'].includes(p.category.toLowerCase()));
    } else {
      // Direct match for other categories
      data = dynamicProducts.filter(p => 
        p.category.toLowerCase() === activeTab.toLowerCase() || 
        p.category.toLowerCase() === CATEGORY_CONFIG[activeTab].label.toLowerCase()
      );
    }

    if (activeSubTab !== 'all') {
      data = data.filter(p => p.subcategory === activeSubTab);
    }

    // Filter out of stock based on preference
    if (!showOutOfStock) {
      data = data.filter(p => p.stock > 0);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) ||
        item.subcategory.toLowerCase().includes(query)
      );
    }

    // Apply sorting
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
        onCategoryClick={handleCategoryClick} 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={() => { setView('home'); setShowCatalog(false); }}
        onAboutClick={() => { setView('about'); setShowCatalog(false); }}
        onMechanicClick={() => { setView('mechanic'); setShowCatalog(false); }}
        onHelpClick={() => { setView('help'); setShowCatalog(false); }}
        activeTab={activeTab}
      />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onCatalogClick={() => { setView('catalog'); setShowCatalog(true); }} />
            <SocialProof />
            <ValueProp />
            <Categories onCategoryClick={(cat) => { 
              if (cat === 'partners') {
                setView('partners');
                setShowCatalog(false);
              } else {
                setActiveTab(cat); 
                setShowCatalog(true); 
                setView('catalog'); 
              }
            }} />

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
                  <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">
                    {CATEGORY_CONFIG[activeTab].label}
                  </h2>
                  <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-2">
                    {activeSubTab !== 'all' 
                      ? CATEGORY_CONFIG[activeTab].subcategories.find(s => s.id === activeSubTab)?.label 
                      : 'Equipamiento verificado por operadores reales'}
                  </p>
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
                  <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 border-b border-white/5 no-scrollbar">
                    {(Object.keys(CATEGORY_CONFIG) as (keyof typeof CATEGORY_CONFIG)[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setActiveSubTab('all');
                        }}
                        className={`px-8 py-3 font-display font-black uppercase tracking-widest text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-tactical-orange text-tactical-orange bg-tactical-orange/5' : 'border-transparent text-gray-500 hover:text-white'}`}
                      >
                        {CATEGORY_CONFIG[tab].label}
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

                {/* Subcategories for all categories */}
                {CATEGORY_CONFIG[activeTab].subcategories.length > 1 && (
                  <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-500 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {CATEGORY_CONFIG[activeTab].subcategories.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubTab(sub.id)}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${activeSubTab === sub.id ? 'bg-tactical-orange text-tactical-black border-tactical-orange shadow-[0_0_15px_rgba(242,125,38,0.3)]' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'}`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}

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
                  <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    <label className="flex items-center gap-3 cursor-pointer group bg-tactical-gray/20 border border-white/10 px-5 py-3.5 rounded-sm hover:bg-white/5 transition-all">
                      <div className="relative inline-flex items-center">
                        <input 
                          type="checkbox" 
                          checked={showOutOfStock} 
                          onChange={(e) => setShowOutOfStock(e.target.checked)}
                          className="sr-only" 
                        />
                        <div className={`w-10 h-5 bg-white/10 rounded-full transition-colors ${showOutOfStock ? 'bg-tactical-orange/50' : ''}`}></div>
                        <div className={`absolute left-0.5 top-0.5 w-4 h-4 bg-gray-400 rounded-full transition-transform ${showOutOfStock ? 'translate-x-5 bg-tactical-orange' : ''}`}></div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors whitespace-nowrap italic">¿Ver agotados?</span>
                    </label>
                    <div className="bg-tactical-gray/20 border border-white/10 px-6 py-4 rounded-sm flex items-center gap-3">
                      <span className="text-tactical-orange font-black text-lg leading-none">{getSortedData().length}</span>
                      <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Resultados</span>
                    </div>
                    {(searchQuery || activeSubTab !== 'all') && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveSubTab('all');
                        }}
                        className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 flex items-center gap-2"
                      >
                        <RefreshCcw size={12} /> Limpiar
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
                          alt={`${item.name} - Airsoft Elite`} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-tactical-orange/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-tactical-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-tactical-orange/50">VER DETALLES</span>
                        </div>
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <div className="bg-tactical-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-tactical-orange border border-tactical-orange/30">
                            {item.category}
                          </div>
                          {item.subcategory && (
                            <div className="bg-tactical-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                              {CATEGORY_CONFIG.replicas.subcategories.find(s => s.id === item.subcategory)?.label || item.subcategory}
                            </div>
                          )}
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
                          <div className="flex gap-2">
                            {item.stock > 0 ? (
                              <div className="flex flex-col items-center">
                                <button 
                                  onClick={() => addToCart(item)}
                                  className="px-6 py-2 text-xs font-black uppercase tracking-widest transition-all bg-white text-tactical-black hover:bg-tactical-orange"
                                >
                                  COMPRAR
                                </button>
                                <span className="text-[7px] text-gray-600 font-bold mt-1 uppercase">Envío 24/48h</span>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setSelectedProduct(item)}
                                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all bg-red-600/20 text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white"
                              >
                                AVÍSAME
                              </button>
                            )}
                          </div>
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
        {view === 'partners' && <PartnersPage />}
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
