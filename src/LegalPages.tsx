import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ArrowRight, 
  Package, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  RefreshCcw,
  HelpCircle,
  Info,
  Wrench,
  Zap
} from 'lucide-react';

// --- Shared Components ---
const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="pt-32 pb-16 bg-tactical-black border-b border-white/5">
    <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-4">{title}</h1>
      {subtitle && <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{subtitle}</p>}
    </div>
  </div>
);

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <section id={id} className="py-12 border-b border-white/5 last:border-0">
    <h2 className="text-2xl font-display font-black uppercase tracking-tight mb-6 text-tactical-orange">{title}</h2>
    <div className="text-gray-400 leading-relaxed space-y-4 text-sm md:text-base">
      {children}
    </div>
  </section>
);

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  key?: React.Key;
}

const AccordionSection = ({ title, children, isOpen, onToggle }: AccordionProps) => (
  <div className="border border-white/10 rounded-sm mb-4 overflow-hidden">
    <button 
      onClick={onToggle}
      className="w-full p-6 flex justify-between items-center text-left bg-tactical-gray/20 hover:bg-tactical-gray/40 transition-all"
    >
      <span className="font-display font-bold uppercase tracking-tight">{title}</span>
      <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="p-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 space-y-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- 1. Quiénes Somos ---
export const AboutUs = () => (
  <div className="bg-tactical-black min-h-screen pb-24">
    <PageHeader title="QUIÉNES SOMOS" subtitle="Nuestra historia y misión" />
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Section title="Nuestra Historia">
        <p>En junio de 2015 abrimos las puertas de nuestra tienda física en Rubí, Barcelona, dedicada a la venta de réplicas y material de airsoft en todas sus categorías. Lo que comenzó como un proyecto local se ha convertido en un referente para la comunidad táctica.</p>
        <p>MLQ Tactics es una empresa pequeña con grandes ideas e inquietudes que no para de renovarse día a día para ofrecerte siempre lo último en tecnología y equipamiento.</p>
      </Section>
      <Section title="Asesoramiento Individualizado">
        <p>Somos especialistas en el asesoramiento personalizado de cada jugador. Entendemos que no todos los operadores tienen las mismas necesidades; por eso, analizamos tu nivel y compromiso con la actividad para recomendarte el equipo que realmente necesitas.</p>
        <p>No te recomendaremos lo más caro, sino lo que mejor se adapte a tu rol y estilo de juego, garantizando que cada inversión en tu arsenal sea la correcta.</p>
      </Section>
      <Section title="Calidad y Compromiso">
        <p>Apostamos por la mejor calidad a precios asequibles. Somos un equipo con grandes cualidades, y nuestra prioridad absoluta es cuidar a nuestros clientes y realizar, en la medida de lo posible, todos sus deseos y configuraciones personalizadas.</p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>Calidad Garantizada: Solo trabajamos con marcas que nosotros mismos usaríamos en el campo.</li>
          <li>Soporte Técnico Especializado: Tu réplica es tu herramienta, la tratamos con el máximo respeto y precisión.</li>
          <li>Atención Omnicanal: Estaremos encantados de atenderte tanto de forma online como visitándonos en nuestra tienda física en Rubí.</li>
        </ul>
      </Section>
    </div>
  </div>
);

// --- 2. Ayuda (Agrupadora) ---
export const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-tactical-black min-h-screen pb-24">
      <PageHeader title="Centro de Ayuda" subtitle="Estamos aquí para apoyarte" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 bg-tactical-gray/20 border border-white/5 hover:border-tactical-orange transition-all group cursor-pointer">
            <Package className="text-tactical-orange mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-display font-bold uppercase mb-2">Estado del Pedido</h3>
            <p className="text-gray-500 text-sm mb-4">Rastrea tu arsenal en tiempo real desde que sale de nuestro almacén.</p>
            <button className="text-tactical-orange text-xs font-black uppercase tracking-widest flex items-center gap-2">Consultar <ArrowRight size={14} /></button>
          </div>
          <div className="p-8 bg-tactical-gray/20 border border-white/5 hover:border-tactical-orange transition-all group cursor-pointer">
            <FileText className="text-tactical-orange mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-display font-bold uppercase mb-2">Descargar Factura</h3>
            <p className="text-gray-500 text-sm mb-4">Accede a tus comprobantes de compra de forma rápida y sencilla.</p>
            <button className="text-tactical-orange text-xs font-black uppercase tracking-widest flex items-center gap-2">Acceder <ArrowRight size={14} /></button>
          </div>
        </div>

        <Section title="Contacto Directo">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Phone className="text-tactical-orange mb-2" size={24} />
              <span className="text-sm font-bold">+34 628 52 52 69</span>
              <span className="text-[10px] text-gray-500 uppercase">Lunes a Sábado</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Mail className="text-tactical-orange mb-2" size={24} />
              <span className="text-sm font-bold">info@mlqtactics.com</span>
              <span className="text-[10px] text-gray-500 uppercase">Respuesta en 24h</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="text-tactical-orange mb-2" size={24} />
              <span className="text-sm font-bold">Rubí, Barcelona</span>
              <span className="text-[10px] text-gray-500 uppercase">Carrer de la Táctica, 12</span>
            </div>
          </div>
        </Section>

        <div className="mt-16">
          <h2 className="text-2xl font-display font-black uppercase tracking-tight mb-8 text-tactical-orange">Preguntas Frecuentes</h2>
          {[
            { q: "¿Cuánto tarda en llegar mi pedido?", a: "Los envíos a la península suelen tardar entre 24 y 48 horas laborables. Recibirás un número de seguimiento en cuanto el paquete sea procesado." },
            { q: "¿Puedo recoger mi pedido en tienda?", a: "¡Claro! Selecciona 'Recogida en Tienda' al finalizar tu compra y podrás pasar por nuestro local en Rubí sin costes adicionales." },
            { q: "¿Ofrecéis garantía en reparaciones?", a: "Todas nuestras intervenciones de taller cuentan con una garantía de 3 meses sobre la mano de obra y la garantía oficial del fabricante en las piezas instaladas." },
            { q: "¿Qué métodos de pago aceptáis?", a: "Aceptamos tarjetas de crédito/débito, PayPal, Bizum y transferencia bancaria directa." }
          ].map((faq, i) => (
            <AccordionSection 
              key={i} 
              title={faq.q} 
              isOpen={openFaq === i} 
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            >
              {faq.a}
            </AccordionSection>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. Información Legal (Agrupadora) ---
export const LegalInfoPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggle = (id: string) => setActiveSection(activeSection === id ? null : id);

  return (
    <div className="bg-tactical-black min-h-screen pb-24">
      <PageHeader title="Información Legal" subtitle="Transparencia y cumplimiento" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12 p-6 bg-tactical-gray/10 border border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Índice de Contenidos</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {['Aviso Legal', 'Política de Privacidad', 'Política de Cookies', 'Condiciones de Venta', 'Formas de Pago'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  const id = item.toLowerCase().replace(/ /g, '-');
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(id);
                }}
                className="text-left text-sm hover:text-tactical-orange transition-colors flex items-center gap-2"
              >
                <ArrowRight size={12} /> {item}
              </button>
            ))}
          </div>
        </div>

        <AccordionSection title="Aviso Legal" isOpen={activeSection === 'aviso-legal'} onToggle={() => toggle('aviso-legal')}>
          <div id="aviso-legal">
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), se exponen los datos identificativos de la empresa:</p>
            <ul className="list-none space-y-1">
              <li><strong>Denominación social:</strong> MLQTactics Airsoft S.L.</li>
              <li><strong>NIF:</strong> B12345678</li>
              <li><strong>Domicilio:</strong> Carrer de la Táctica, 12, 08191 Rubí, Barcelona</li>
              <li><strong>Email:</strong> legal@mlqtactics.com</li>
            </ul>
            <p>Este sitio web tiene por objeto facilitar al público el conocimiento de las actividades que realiza esta organización y los servicios que presta.</p>
          </div>
        </AccordionSection>

        <AccordionSection title="Política de Privacidad" isOpen={activeSection === 'política-de-privacidad'} onToggle={() => toggle('política-de-privacidad')}>
          <div id="política-de-privacidad">
            <p>De conformidad con lo dispuesto en el Reglamento General de Protección de Datos (RGPD), le informamos que sus datos personales serán tratados con la finalidad de gestionar su pedido y mantenerle informado sobre nuestras novedades.</p>
            <p>Usted tiene derecho a acceder, rectificar y suprimir sus datos, así como otros derechos, como se explica en la información adicional que puede solicitar por email.</p>
          </div>
        </AccordionSection>

        <AccordionSection title="Política de Cookies" isOpen={activeSection === 'política-de-cookies'} onToggle={() => toggle('política-de-cookies')}>
          <div id="política-de-cookies">
            <p>Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.</p>
            <p>Si continúa navegando, consideramos que acepta su uso. Puede cambiar la configuración u obtener más información en nuestro panel de ajustes.</p>
          </div>
        </AccordionSection>

        <AccordionSection title="Condiciones de Venta" isOpen={activeSection === 'condiciones-de-venta'} onToggle={() => toggle('condiciones-de-venta')}>
          <div id="condiciones-de-venta">
            <p>Las presentes condiciones regulan la compra de productos a través de MLQTactics. Al realizar un pedido, usted acepta estas condiciones en su totalidad.</p>
            <p>Los precios incluyen IVA pero no gastos de envío, los cuales se detallarán antes de finalizar la compra.</p>
          </div>
        </AccordionSection>

        <AccordionSection title="Formas de Pago" isOpen={activeSection === 'formas-de-pago'} onToggle={() => toggle('formas-de-pago')}>
          <div id="formas-de-pago">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-sm"><CreditCard size={16} /> Tarjeta</div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-sm"><ShieldCheck size={16} /> PayPal</div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-sm"><Truck size={16} /> Contra Reembolso</div>
            </div>
            <p>Garantizamos que cada una de las transacciones realizadas en MLQTactics es 100% segura. Todas las operaciones que implican la transmisión de datos personales o bancarios se realizan utilizando un entorno seguro.</p>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
};

// --- 4. Devoluciones (Agrupadora) ---
export const ReturnsPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const toggle = (id: string) => setActiveSection(activeSection === id ? null : id);

  return (
    <div className="bg-tactical-black min-h-screen pb-24">
      <PageHeader title="Devoluciones" subtitle="Gestión de cambios y reembolsos" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-tactical-orange/10 border border-tactical-orange/20 rounded-sm">
            <RefreshCcw className="text-tactical-orange mb-4" size={24} />
            <h3 className="font-display font-bold uppercase mb-2">14 Días de Plazo</h3>
            <p className="text-xs text-gray-400">Tienes dos semanas para decidir si el producto es para ti.</p>
          </div>
          <div className="p-6 bg-tactical-green/10 border border-tactical-green/20 rounded-sm">
            <ShieldCheck className="text-tactical-green mb-4" size={24} />
            <h3 className="font-display font-bold uppercase mb-2">Garantía Total</h3>
            <p className="text-xs text-gray-400">Todos nuestros productos cuentan con garantía oficial de fabricante.</p>
          </div>
        </div>

        <AccordionSection 
          title="Política de Devoluciones y Reembolsos" 
          isOpen={activeSection === 'policy'} 
          onToggle={() => toggle('policy')}
        >
          <p>Queremos que estés 100% satisfecho con tu compra. Si por cualquier motivo no es así, puedes devolver cualquier artículo en su estado original dentro de los 14 días posteriores a la recepción.</p>
          <p><strong>Condiciones:</strong> El producto debe estar sin usar, en su embalaje original y con todas las etiquetas y accesorios incluidos.</p>
          <p><strong>Proceso:</strong> Contacta con nuestro equipo de soporte para recibir las instrucciones de envío. Una vez verificado el estado del producto, procederemos al reembolso en un plazo máximo de 7 días hábiles.</p>
        </AccordionSection>

        <AccordionSection 
          title="Derecho de Desistimiento" 
          isOpen={activeSection === 'desistimiento'} 
          onToggle={() => toggle('desistimiento')}
        >
          <p>Tiene usted derecho a desistir del presente contrato en un plazo de 14 días naturales sin necesidad de justificación.</p>
          <p>El plazo de desistimiento expirará a los 14 días naturales del día que usted o un tercero por usted indicado, distinto del transportista, adquirió la posesión material de los bienes.</p>
          <p>Para ejercer el derecho de desistimiento, deberá notificarnos su decisión de desistir del contrato a través de una declaración inequívoca (por ejemplo, una carta enviada por correo postal o correo electrónico).</p>
        </AccordionSection>
      </div>
    </div>
  );
};

// --- 5. Mapa del Sitio (Sitemap) ---
export const SitemapPage = ({ onNavigate }: { onNavigate: (view: any) => void }) => (
  <div className="bg-tactical-black min-h-screen pb-24">
    <PageHeader title="Mapa del Sitio" subtitle="Estructura completa de la web" />
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-tactical-orange font-display font-bold uppercase mb-6 flex items-center gap-2"><Info size={16} /> Principal</h3>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-widest">
            <li><button onClick={() => onNavigate('home')} className="hover:text-tactical-orange transition-colors">Inicio</button></li>
            <li><button onClick={() => onNavigate('catalog')} className="hover:text-tactical-orange transition-colors">Tienda Online</button></li>
            <li><button onClick={() => onNavigate('mechanic')} className="hover:text-tactical-orange transition-colors">SERVICIO DE MECÁNICO</button></li>
            <li><a href="#contacto" className="hover:text-tactical-orange transition-colors">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-tactical-orange font-display font-bold uppercase mb-6 flex items-center gap-2"><HelpCircle size={16} /> Soporte</h3>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-widest">
            <li><button onClick={() => onNavigate('help')} className="hover:text-tactical-orange transition-colors">Centro de Ayuda</button></li>
            <li><button onClick={() => onNavigate('returns')} className="hover:text-tactical-orange transition-colors">Devoluciones</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-tactical-orange transition-colors">QUIÉNES SOMOS</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-tactical-orange font-display font-bold uppercase mb-6 flex items-center gap-2"><ShieldCheck size={16} /> Legal</h3>
          <ul className="space-y-3 text-sm font-bold uppercase tracking-widest">
            <li><button onClick={() => onNavigate('legal')} className="hover:text-tactical-orange transition-colors">Información Legal</button></li>
            <li><button onClick={() => onNavigate('legal')} className="hover:text-tactical-orange transition-colors">Privacidad</button></li>
            <li><button onClick={() => onNavigate('legal')} className="hover:text-tactical-orange transition-colors">Cookies</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// --- 6. Servicio de Mecánico ---
const MechanicBanner = () => {
  const [isTransformed, setIsTransformed] = useState(false);

  return (
    <div className="relative w-full h-[420px] md:h-[560px] rounded-sm overflow-hidden border border-white/10 bg-tactical-black mb-16 group shadow-2xl">
      {/* Base Image (Factory) */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
          isTransformed ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
      >
        <img 
          src="/images/replicas.png" 
          alt="Estado de Fábrica" 
          className="w-full h-full object-cover grayscale opacity-60"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Transformed Image (Optimized) */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
          isTransformed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <img 
          src="/images/banner2.png" 
          alt="Arma Optimizada" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-tactical-black via-tactical-black/40 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-tactical-black/60 via-transparent to-transparent z-10"></div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
        {/* Top Right Button Container */}
        <div className="flex justify-end pointer-events-auto">
          <button 
            onClick={() => setIsTransformed(!isTransformed)}
            className={`flex items-center gap-3 px-6 py-3 rounded-sm font-display font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-lg ${
              isTransformed 
                ? 'bg-white text-tactical-black hover:bg-tactical-orange hover:text-white' 
                : 'bg-[#ff6a00] text-white hover:bg-white hover:text-tactical-black'
            }`}
          >
            <Zap size={14} className={isTransformed ? 'text-tactical-orange' : 'text-white'} />
            {isTransformed ? 'VOLVER A CONFIGURACIÓN BASE' : 'HAZ CLIC PARA TRANSFORMAR'}
          </button>
        </div>

        {/* Bottom Left Text Container */}
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className={`w-8 h-[2px] transition-colors duration-500 ${isTransformed ? 'bg-tactical-orange' : 'bg-gray-500'}`}></span>
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${isTransformed ? 'text-tactical-orange' : 'text-gray-500'}`}>
              {isTransformed ? 'CONFIGURACIÓN AVANZADA' : 'CONFIGURACIÓN BASE'}
            </span>
          </div>
          
          <h3 className="text-white font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-4">
            {isTransformed ? 'ARMA OPTIMIZADA' : 'ESTADO DE FÁBRICA'}
          </h3>
          
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] max-w-md leading-relaxed">
            {isTransformed 
              ? 'MÁXIMO RENDIMIENTO, PRECISIÓN Y PERSONALIZACIÓN' 
              : 'COMPONENTES ESTÁNDAR, RENDIMIENTO LIMITADO'}
          </p>
        </div>
      </div>

      {/* Tactical Decorative Border */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none z-30"></div>
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-tactical-orange z-30"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-tactical-orange z-30"></div>
    </div>
  );
};

export const MechanicPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setSubmitted(true);
      // In a real app, this would send the number to a backend
    }
  };

  return (
    <div className="bg-tactical-black min-h-screen pb-24">
      <PageHeader title="SERVICIO DE MECÁNICO" subtitle="Mantenimiento, Upgrades y Personalización" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-16">
          <Section title="¿POR QUÉ ELEGIR NUESTRO TALLER?">
            <p>Tu réplica es tu herramienta más valiosa en el campo. En MLQTactics, tratamos cada marcadora con la precisión de un relojero y la robustez de un ingeniero militar.</p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <ul className="list-disc pl-5 space-y-3 text-gray-400">
                <li><strong className="text-white font-display uppercase tracking-tight">Mantenimiento Preventivo:</strong> Limpieza, engrase y ajuste de compresión para evitar fallos en mitad de la partida.</li>
                <li><strong className="text-white font-display uppercase tracking-tight">Upgrades de Precisión:</strong> Instalación de cañones de precisión, gomas de hop-up de alto rendimiento y cámaras ProWin/Maxx Model.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-3 text-gray-400">
                <li><strong className="text-white font-display uppercase tracking-tight">Potencia y Cadencia:</strong> Configuración de engranajes reforzados, motores High-Torque y sistemas MOSFET/ETU (Gate Titan, Perun).</li>
                <li><strong className="text-white font-display uppercase tracking-tight">Personalización Estética:</strong> Pintura táctica, grabado láser y montaje de accesorios externos.</li>
              </ul>
            </div>
          </Section>
        </div>

        <MechanicBanner />

        <div className="bg-tactical-gray/10 border border-white/5 p-8 md:p-12 rounded-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display font-black uppercase tracking-tighter mb-4">¿QUIERES MEJORAR TU ARSENAL?</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-10">Déjanos tu número y te llamaremos para asesorarte sin compromiso</p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                  type="tel" 
                  placeholder="TU NÚMERO DE TELÉFONO" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="flex-1 bg-tactical-black border border-white/10 px-6 py-4 text-white font-bold tracking-widest focus:border-tactical-orange outline-none transition-all"
                />
                <button 
                  type="submit"
                  className="bg-tactical-orange text-tactical-black px-10 py-4 font-display font-black uppercase tracking-widest hover:bg-white transition-all cta-glow"
                >
                  SOLICITAR LLAMADA
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-tactical-orange/10 border border-tactical-orange/20 p-6 rounded-sm mb-8"
              >
                <p className="text-tactical-orange font-bold uppercase tracking-widest text-sm">¡RECIBIDO! Te llamaremos lo antes posible.</p>
              </motion.div>
            )}

            <div className="flex flex-col items-center gap-4">
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">O si lo prefieres</span>
              <a 
                href="mailto:MLQMECANICA@GMAIL.COM" 
                className="flex items-center gap-3 text-white hover:text-tactical-orange transition-colors font-display font-bold uppercase tracking-widest"
              >
                <Mail className="text-tactical-orange" size={20} />
                MLQMECANICA@GMAIL.COM
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
