// src/data/destinations.ts

// --- Interface Definition ---
export interface Destination {
  id: string;
  name: string;
  image: string; // The type is string because it holds the imported image path
  hoverText: string;
  link: string;
}

// --- Image Imports ---
// NOTE: You may need to adjust these paths depending on your project's folder structure.
// This example assumes your images are in `src/assets/images/`.
import ireland from '/Dublin Ireland.webp';
import france from '/download.webp';
import germany from '/Sydney Opera House Insights.webp';
import canada from '/cANADA.webp';
import australia from '/Welcome to Keep Exploring!.webp';
import uk from '/cANADA.webp'; // Note: UK and USA are using the Canada image in your original code
import usa from '/cANADA.webp';

// --- Data Array ---
export const destinations: Destination[] = [
  { id: 'australia', name: 'STUDY IN AUSTRALIA', image: australia, hoverText: 'Discover world-class education and vibrant cities in Australia. Explore diverse landscapes and a welcoming culture.', link: '#' },
  { id: 'canada', name: 'STUDY IN CANADA', image: canada, hoverText: 'Unlock endless opportunities in Canada with its top-ranked universities and diverse job market.', link: '#' },
  { id: 'germany', name: 'STUDY IN GERMANY', image: germany, hoverText: 'Germany is officially called the Federal Republic of Germany, located in central-western Europe.', link: '#' },
  { id: 'uk', name: 'STUDY IN THE UK', image: uk, hoverText: 'Home to some of the world\'s oldest and most prestigious universities. Experience a rich history and diverse culture.', link: '#' },
  { id: 'ireland', name: 'STUDY IN IRELAND', image: ireland, hoverText: 'Experience the charm of Ireland, a hub for innovation and technology, with a high-quality education system.', link: '#' },
  { id: 'france', name: 'STUDY IN FRANCE', image: france, hoverText: 'Immerse yourself in French culture and world-renowned education. Study in the heart of Europe.', link: '#' },
  { id: 'usa', name: 'STUDY IN THE USA', image: usa, hoverText: 'Explore a vast range of programs and institutions in the USA, a global leader in education and research.', link: '#' },
];