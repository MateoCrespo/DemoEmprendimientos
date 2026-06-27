import { NavigationOptions } from '../navigation';
import { UserExperience } from '../types';

export const initialUserExperiences: UserExperience[] = [
  {
    id: 'demo-upcoming',
    title: 'Sorpresa gastronómica',
    description: 'Una experiencia secreta con sabores cordobeses.',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800',
    location: 'Güemes, Córdoba',
    date: '28/06/2026',
    timeRange: '20:00 a 23:00',
    activityType: 'Gastronomía regional',
    status: 'upcoming',
    revealLabel: 'Se revela 24hs antes',
    destinationTitle: 'Cena regional en patio secreto',
    destinationImage: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800',
    destinationLocation: 'Güemes, Córdoba',
    exactAddress: 'Belgrano 867, Güemes, Córdoba',
    hints: ['Aromas intensos y luz tenue', 'Un rincón con mucha historia', 'Ideal para ir con hambre'],
    preparation: ['Usá ropa cómoda y casual', 'Cargá tu celular al 100%', 'Llegá con ganas de descubrir algo nuevo'],
  },
  {
    id: 'demo-revealed',
    title: 'Plan revelado',
    description: 'Tu destino ya está listo para visitar.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    location: 'Nueva Córdoba, Córdoba',
    date: '25/06/2026',
    timeRange: '19:30 a 21:30',
    activityType: 'Cultura local',
    status: 'revealed',
    revealLabel: 'Destino revelado',
    destinationTitle: 'Cata de vinos en cava secreta',
    destinationImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    destinationLocation: 'Nueva Córdoba, Córdoba',
    exactAddress: 'Obispo Trejo 1045, Nueva Córdoba, Córdoba',
    hints: ['Copas listas', 'Ambiente íntimo', 'Sabores de autor'],
    preparation: ['Llevá DNI', 'Reservá 2 horas libres', 'Usá calzado cómodo'],
  },
  {
    id: 'demo-feedback',
    title: 'Experiencia completada',
    description: 'Contanos cómo salió para mejorar tus próximas sorpresas.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    location: 'Cerro de las Rosas, Córdoba',
    date: '18/06/2026',
    timeRange: '21:00 a 23:30',
    activityType: 'Música en vivo',
    status: 'feedback',
    revealLabel: 'Pendiente de feedback',
    destinationTitle: 'Jazz y coctelería',
    destinationImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    destinationLocation: 'Cerro de las Rosas, Córdoba',
    exactAddress: 'Luis de Tejeda 4560, Cerro de las Rosas, Córdoba',
    hints: ['Luces bajas', 'Música en vivo', 'Mesa reservada'],
    preparation: ['Compartí tu opinión', 'Marcá qué te gustó', 'Dejá un tip para el anfitrión'],
  },
];

export function createPurchasedExperience(purchase: NavigationOptions): UserExperience {
  const title = purchase.experienceTitle ?? 'Experiencia sorpresa';
  const activityType = purchase.activityType ?? 'Sorpresa';
  const timeRange = purchase.timeFrom || purchase.timeTo
    ? `${purchase.timeFrom || 'Sin inicio'} a ${purchase.timeTo || 'Sin fin'}`
    : undefined;

  return {
    id: `purchase-${Date.now()}`,
    title,
    description: purchase.experienceDescription ?? 'Plan curado según tus preferencias.',
    image:
      purchase.experienceImage ??
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
    location: purchase.location || 'Sin seleccionar',
    date: purchase.date || 'Sin fecha seleccionada',
    timeRange,
    activityType,
    status: 'upcoming',
    revealLabel: 'Se revela 24hs antes',
    destinationTitle: title,
    destinationImage:
      purchase.experienceImage ??
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800',
    destinationLocation: purchase.location || 'Sin seleccionar',
    exactAddress: 'Dirección exacta asignada: Av. Hipólito Yrigoyen 320, Córdoba',
    hints: [`Va a tener foco en ${activityType}`, 'El lugar se revela cerca del evento', 'Prepará algo de tiempo libre'],
    preparation: ['Revisá la fecha elegida', 'Llevá documento', 'Tené el celular con batería'],
  };
}
