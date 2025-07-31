
export interface Destination {
  id: string;
  name: string;
  image: string; 
  hoverText: string;
  link: string;
}


import ireland from '/Dublin Ireland.webp';
import france from '/download.webp';
import germany from '/Sydney Opera House Insights.webp';
import canada from '/cANADA.webp';
import australia from '/Welcome to Keep Exploring!.webp';
import uk from '/cANADA.webp'; 
import usa from '/cANADA.webp';

export const destinations: Destination[] = [
  {
    id: 'australia',
    name: 'STUDY IN AUSTRALIA',
    image: australia,
    hoverText:
      'Australia offers world class education, diverse course options, and a welcoming multicultural environment. International students benefit from post-study work visas, part-time job opportunities, high living standards, and strong graduate employability all in a safe, vibrant setting.',
    link: '#',
  },
  {
    id: 'canada',
    name: 'STUDY IN CANADA',
    image: canada,
    hoverText:
      'Canada is a top choice for international students, offering globally recognized education, affordable tuition, and a high quality of life. With post-study work opportunities, diverse programs, and a safe, inclusive environment, Canada sets the stage for academic and career success.',
    link: '#',
  },
  {
    id: 'germany',
    name: 'STUDY IN GERMANY',
    image: germany,
    hoverText:
      'Germany is officially called the Federal Republic of Germany, located in central-western Europe.',
    link: '#',
  },
  {
    id: 'uk',
    name: 'STUDY IN THE UK',
    image: uk,
    hoverText:
      'The UK is home to some of the world’s top universities, offering high-quality education, diverse courses, and global recognition. International students benefit from rich cultural experiences, post-study work options, and strong career prospects worldwide.',
    link: '#',
  },
  {
    id: 'ireland',
    name: 'STUDY IN IRELAND',
    image: ireland,
    hoverText:
      'Ireland offers globally recognized degrees, a vibrant English-speaking environment, and strong programs in technology, science, business, and healthcare. With post-study work opportunities and a welcoming culture, it’s an excellent destination for international students.',
    link: '#',
  },
  {
    id: 'france',
    name: 'STUDY IN FRANCE',
    image: france,
    hoverText:
      'France offers world-class education, especially in arts, fashion, business, and engineering. With affordable tuition, rich cultural experiences, and access to top-ranked institutions, it\'s an ideal destination for international students seeking both academic and personal growth.',
    link: '#',
  },
  {
    id: 'usa',
    name: 'STUDY IN THE USA',
    image: usa,
    hoverText:
      'The USA offers world-renowned universities, innovative programs, and unmatched research opportunities. With diverse campus life, flexible course options, and strong career pathways, it’s a top destination for international students seeking academic excellence and global exposure.',
    link: '#',
  },
  {
    id: 'japan',
    name: 'STUDY IN JAPAN',
    image: usa,
    hoverText:
      'Japan combines academic excellence with cutting-edge technology and rich cultural heritage. International students benefit from high-quality education, global research opportunities, affordable tuition, and a safe, innovative learning environment.',
    link: '#',
  },
  {
    id: 'china',
    name: 'STUDY IN CHINA',
    image: canada,
    hoverText:
      'China is a rising global education hub offering affordable tuition, modern campuses, and strong programs in medicine, engineering, business, and technology. International students enjoy cultural immersion, growing English-taught courses, and expanding career opportunities in Asia’s fastest-growing economy.',
    link: '#',
  },
  {
    id: 'netherlands',
    name: 'STUDY IN THE NETHERLANDS',
    image: canada,
    hoverText:
      'The Netherlands offers high-quality, English-taught programs in a globally recognized education system. With affordable tuition, multicultural campuses, and a strong focus on innovation and research, it’s an ideal choice for international students seeking a European education experience.',
    link: '#',
  },
  {
    id: 'newzealand',
    name: 'STUDY IN NEW ZEALAND',
    image: canada,
    hoverText:
      'New Zealand offers world-class education, a safe and welcoming environment, and stunning natural landscapes. With affordable tuition, post-study work opportunities, and globally recognized qualifications, it\'s an excellent choice for international students.',
    link: '#',
  },
];
