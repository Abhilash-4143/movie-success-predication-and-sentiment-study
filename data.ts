export interface Movie {
  id: number;
  title: string;
  genre: string;
  budget: number;
  revenue: number;
  runtime: number;
  rating: number;
  votes: number;
  director: string;
  releaseMonth: string;
  language: string;
  country: string;
  marketingBudget: number;
  directorPopularity: number;
  actorPopularity: number;
  success: 'Hit' | 'Average' | 'Flop';
  roi: number;
}

export interface Review {
  id: number;
  movieId: number;
  text: string;
  rating: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  emotion: string;
  date: string;
}

export interface PredictionLog {
  id: number;
  movieName: string;
  genre: string;
  predictedRevenue: number;
  predictedROI: number;
  successProbability: number;
  predictedClass: string;
  confidence: number;
  date: string;
  actualRevenue?: number;
}

export interface ModelMetrics {
  name: string;
  mae: number;
  rmse: number;
  r2: number;
  trainTime: number;
  predictTime: number;
  accuracy: number;
  features: { name: string; importance: number }[];
}

export const GENRES = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance',
  'Thriller', 'Animation', 'Adventure', 'Crime', 'Fantasy', 'Documentary'
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'Mandarin', 'Korean', 'Japanese', 'German'];
export const COUNTRIES = ['USA', 'India', 'UK', 'China', 'South Korea', 'Japan', 'France', 'Germany'];

export const movies: Movie[] = [
  { id: 1, title: 'Avengers: Endgame', genre: 'Action', budget: 356000000, revenue: 2797800564, runtime: 181, rating: 8.4, votes: 1200000, director: 'Russo Brothers', releaseMonth: 'April', language: 'English', country: 'USA', marketingBudget: 200000000, directorPopularity: 95, actorPopularity: 98, success: 'Hit', roi: 6.86 },
  { id: 2, title: 'The Dark Knight', genre: 'Action', budget: 185000000, revenue: 1004558444, runtime: 152, rating: 9.0, votes: 2800000, director: 'Christopher Nolan', releaseMonth: 'July', language: 'English', country: 'USA', marketingBudget: 150000000, directorPopularity: 92, actorPopularity: 90, success: 'Hit', roi: 4.43 },
  { id: 3, title: 'Inception', genre: 'Sci-Fi', budget: 160000000, revenue: 836836967, runtime: 148, rating: 8.8, votes: 2400000, director: 'Christopher Nolan', releaseMonth: 'July', language: 'English', country: 'USA', marketingBudget: 100000000, directorPopularity: 92, actorPopularity: 88, success: 'Hit', roi: 4.23 },
  { id: 4, title: 'Interstellar', genre: 'Sci-Fi', budget: 165000000, revenue: 701729206, runtime: 169, rating: 8.7, votes: 1900000, director: 'Christopher Nolan', releaseMonth: 'November', language: 'English', country: 'USA', marketingBudget: 120000000, directorPopularity: 92, actorPopularity: 85, success: 'Hit', roi: 3.25 },
  { id: 5, title: 'The Shawshank Redemption', genre: 'Drama', budget: 25000000, revenue: 58300000, runtime: 142, rating: 9.3, votes: 2900000, director: 'Frank Darabont', releaseMonth: 'September', language: 'English', country: 'USA', marketingBudget: 12000000, directorPopularity: 70, actorPopularity: 75, success: 'Average', roi: 1.33 },
  { id: 6, title: 'Pulp Fiction', genre: 'Crime', budget: 8000000, revenue: 213900000, runtime: 154, rating: 8.9, votes: 2100000, director: 'Quentin Tarantino', releaseMonth: 'October', language: 'English', country: 'USA', marketingBudget: 8000000, directorPopularity: 88, actorPopularity: 82, success: 'Hit', roi: 25.74 },
  { id: 7, title: 'Forrest Gump', genre: 'Drama', budget: 55000000, revenue: 678200000, runtime: 142, rating: 8.8, votes: 2200000, director: 'Robert Zemeckis', releaseMonth: 'July', language: 'English', country: 'USA', marketingBudget: 40000000, directorPopularity: 80, actorPopularity: 90, success: 'Hit', roi: 11.33 },
  { id: 8, title: 'The Matrix', genre: 'Sci-Fi', budget: 63000000, revenue: 467600000, runtime: 136, rating: 8.7, votes: 2000000, director: 'Wachowskis', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 35000000, directorPopularity: 78, actorPopularity: 85, success: 'Hit', roi: 6.42 },
  { id: 9, title: 'Goodfellas', genre: 'Crime', budget: 25000000, revenue: 47000000, runtime: 146, rating: 8.7, votes: 1300000, director: 'Martin Scorsese', releaseMonth: 'September', language: 'English', country: 'USA', marketingBudget: 15000000, directorPopularity: 90, actorPopularity: 80, success: 'Average', roi: 0.88 },
  { id: 10, title: 'Fight Club', genre: 'Drama', budget: 63000000, revenue: 101200000, runtime: 139, rating: 8.8, votes: 2300000, director: 'David Fincher', releaseMonth: 'October', language: 'English', country: 'USA', marketingBudget: 25000000, directorPopularity: 85, actorPopularity: 88, success: 'Average', roi: 0.61 },
  { id: 11, title: 'Parasite', genre: 'Thriller', budget: 11400000, revenue: 263500000, runtime: 132, rating: 8.5, votes: 900000, director: 'Bong Joon-ho', releaseMonth: 'May', language: 'Korean', country: 'South Korea', marketingBudget: 20000000, directorPopularity: 75, actorPopularity: 60, success: 'Hit', roi: 22.08 },
  { id: 12, title: 'Spirited Away', genre: 'Animation', budget: 19000000, revenue: 395000000, runtime: 125, rating: 8.6, votes: 850000, director: 'Hayao Miyazaki', releaseMonth: 'July', language: 'Japanese', country: 'Japan', marketingBudget: 15000000, directorPopularity: 82, actorPopularity: 50, success: 'Hit', roi: 19.74 },
  { id: 13, title: 'The Godfather', genre: 'Crime', budget: 6000000, revenue: 291000000, runtime: 175, rating: 9.2, votes: 2000000, director: 'Francis Ford Coppola', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 5000000, directorPopularity: 85, actorPopularity: 88, success: 'Hit', roi: 47.5 },
  { id: 14, title: 'Dune: Part Two', genre: 'Sci-Fi', budget: 190000000, revenue: 714000000, runtime: 166, rating: 8.5, votes: 600000, director: 'Denis Villeneuve', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 130000000, directorPopularity: 80, actorPopularity: 82, success: 'Hit', roi: 2.76 },
  { id: 15, title: 'Oppenheimer', genre: 'Drama', budget: 100000000, revenue: 976000000, runtime: 180, rating: 8.4, votes: 900000, director: 'Christopher Nolan', releaseMonth: 'July', language: 'English', country: 'USA', marketingBudget: 100000000, directorPopularity: 92, actorPopularity: 85, success: 'Hit', roi: 8.76 },
  { id: 16, title: 'Barbie', genre: 'Comedy', budget: 145000000, revenue: 1446000000, runtime: 114, rating: 6.9, votes: 500000, director: 'Greta Gerwig', releaseMonth: 'July', language: 'English', country: 'USA', marketingBudget: 150000000, directorPopularity: 70, actorPopularity: 92, success: 'Hit', roi: 8.97 },
  { id: 17, title: 'John Wick 4', genre: 'Action', budget: 100000000, revenue: 440100000, runtime: 169, rating: 7.7, votes: 350000, director: 'Chad Stahelski', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 80000000, directorPopularity: 65, actorPopularity: 85, success: 'Hit', roi: 3.40 },
  { id: 18, title: 'Spider-Man: No Way Home', genre: 'Action', budget: 200000000, revenue: 1921000000, runtime: 148, rating: 8.2, votes: 800000, director: 'Jon Watts', releaseMonth: 'December', language: 'English', country: 'USA', marketingBudget: 180000000, directorPopularity: 70, actorPopularity: 90, success: 'Hit', roi: 8.61 },
  { id: 19, title: 'Everything Everywhere All at Once', genre: 'Sci-Fi', budget: 25000000, revenue: 141300000, runtime: 139, rating: 7.8, votes: 450000, director: 'Daniels', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 15000000, directorPopularity: 55, actorPopularity: 70, success: 'Hit', roi: 4.65 },
  { id: 20, title: 'The Batman', genre: 'Action', budget: 185000000, revenue: 771200000, runtime: 176, rating: 7.8, votes: 700000, director: 'Matt Reeves', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 120000000, directorPopularity: 72, actorPopularity: 80, success: 'Hit', roi: 3.17 },
  { id: 21, title: 'RRR', genre: 'Action', budget: 72000000, revenue: 160000000, runtime: 187, rating: 7.8, votes: 200000, director: 'S.S. Rajamouli', releaseMonth: 'March', language: 'Hindi', country: 'India', marketingBudget: 30000000, directorPopularity: 80, actorPopularity: 75, success: 'Hit', roi: 1.22 },
  { id: 22, title: 'KGF Chapter 2', genre: 'Action', budget: 50000000, revenue: 180000000, runtime: 168, rating: 8.3, votes: 150000, director: 'Prashanth Neel', releaseMonth: 'April', language: 'Hindi', country: 'India', marketingBudget: 25000000, directorPopularity: 70, actorPopularity: 78, success: 'Hit', roi: 2.60 },
  { id: 23, title: 'La La Land', genre: 'Romance', budget: 30000000, revenue: 446100000, runtime: 128, rating: 8.0, votes: 650000, director: 'Damien Chazelle', releaseMonth: 'December', language: 'English', country: 'USA', marketingBudget: 40000000, directorPopularity: 75, actorPopularity: 82, success: 'Hit', roi: 13.87 },
  { id: 24, title: 'Get Out', genre: 'Horror', budget: 4500000, revenue: 255400000, runtime: 104, rating: 7.8, votes: 600000, director: 'Jordan Peele', releaseMonth: 'February', language: 'English', country: 'USA', marketingBudget: 15000000, directorPopularity: 72, actorPopularity: 60, success: 'Hit', roi: 55.76 },
  { id: 25, title: 'A Quiet Place', genre: 'Horror', budget: 17000000, revenue: 340900000, runtime: 90, rating: 7.5, votes: 550000, director: 'John Krasinski', releaseMonth: 'April', language: 'English', country: 'USA', marketingBudget: 25000000, directorPopularity: 65, actorPopularity: 70, success: 'Hit', roi: 18.93 },
  { id: 26, title: 'Blade Runner 2049', genre: 'Sci-Fi', budget: 150000000, revenue: 259200000, runtime: 164, rating: 8.0, votes: 600000, director: 'Denis Villeneuve', releaseMonth: 'October', language: 'English', country: 'USA', marketingBudget: 100000000, directorPopularity: 80, actorPopularity: 78, success: 'Average', roi: 0.73 },
  { id: 27, title: 'Tenet', genre: 'Sci-Fi', budget: 200000000, revenue: 365300000, runtime: 150, rating: 7.3, votes: 500000, director: 'Christopher Nolan', releaseMonth: 'September', language: 'English', country: 'USA', marketingBudget: 120000000, directorPopularity: 92, actorPopularity: 80, success: 'Average', roi: 0.83 },
  { id: 28, title: 'The Irishman', genre: 'Crime', budget: 159000000, revenue: 8000000, runtime: 209, rating: 7.8, votes: 400000, director: 'Martin Scorsese', releaseMonth: 'November', language: 'English', country: 'USA', marketingBudget: 50000000, directorPopularity: 90, actorPopularity: 85, success: 'Flop', roi: 0.05 },
  { id: 29, title: 'Cats', genre: 'Fantasy', budget: 95000000, revenue: 73800000, runtime: 110, rating: 2.8, votes: 100000, director: 'Tom Hooper', releaseMonth: 'December', language: 'English', country: 'USA', marketingBudget: 80000000, directorPopularity: 60, actorPopularity: 70, success: 'Flop', roi: 0.78 },
  { id: 30, title: 'Morbius', genre: 'Action', budget: 75000000, revenue: 167500000, runtime: 104, rating: 5.2, votes: 120000, director: 'Daniel Espinosa', releaseMonth: 'April', language: 'English', country: 'USA', marketingBudget: 60000000, directorPopularity: 50, actorPopularity: 65, success: 'Flop', roi: 1.23 },
  { id: 31, title: 'The Flash', genre: 'Action', budget: 200000000, revenue: 271300000, runtime: 144, rating: 6.7, votes: 180000, director: 'Andy Muschietti', releaseMonth: 'June', language: 'English', country: 'USA', marketingBudget: 150000000, directorPopularity: 60, actorPopularity: 72, success: 'Flop', roi: 0.36 },
  { id: 32, title: 'Shazam! Fury of the Gods', genre: 'Action', budget: 125000000, revenue: 134100000, runtime: 130, rating: 6.0, votes: 110000, director: 'David F. Sandberg', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 80000000, directorPopularity: 55, actorPopularity: 60, success: 'Flop', roi: 0.07 },
  { id: 33, title: 'Your Name', genre: 'Animation', budget: 4000000, revenue: 382000000, runtime: 106, rating: 8.4, votes: 300000, director: 'Makoto Shinkai', releaseMonth: 'August', language: 'Japanese', country: 'Japan', marketingBudget: 10000000, directorPopularity: 70, actorPopularity: 45, success: 'Hit', roi: 94.5 },
  { id: 34, title: 'Train to Busan', genre: 'Horror', budget: 8500000, revenue: 98500000, runtime: 118, rating: 7.6, votes: 200000, director: 'Yeon Sang-ho', releaseMonth: 'July', language: 'Korean', country: 'South Korea', marketingBudget: 8000000, directorPopularity: 55, actorPopularity: 50, success: 'Hit', roi: 10.59 },
  { id: 35, title: 'Coco', genre: 'Animation', budget: 175000000, revenue: 807100000, runtime: 105, rating: 8.4, votes: 500000, director: 'Lee Unkrich', releaseMonth: 'November', language: 'English', country: 'USA', marketingBudget: 50000000, directorPopularity: 65, actorPopularity: 40, success: 'Hit', roi: 3.61 },
  { id: 36, title: 'Mad Max: Fury Road', genre: 'Action', budget: 150000000, revenue: 375800000, runtime: 120, rating: 8.1, votes: 1000000, director: 'George Miller', releaseMonth: 'May', language: 'English', country: 'USA', marketingBudget: 100000000, directorPopularity: 75, actorPopularity: 78, success: 'Hit', roi: 1.51 },
  { id: 37, title: 'Whiplash', genre: 'Drama', budget: 3300000, revenue: 49000000, runtime: 106, rating: 8.5, votes: 900000, director: 'Damien Chazelle', releaseMonth: 'October', language: 'English', country: 'USA', marketingBudget: 8000000, directorPopularity: 75, actorPopularity: 65, success: 'Hit', roi: 13.85 },
  { id: 38, title: 'The Grand Budapest Hotel', genre: 'Comedy', budget: 25000000, revenue: 174600000, runtime: 99, rating: 8.1, votes: 850000, director: 'Wes Anderson', releaseMonth: 'March', language: 'English', country: 'USA', marketingBudget: 15000000, directorPopularity: 78, actorPopularity: 70, success: 'Hit', roi: 5.98 },
  { id: 39, title: 'Moonlight', genre: 'Drama', budget: 1500000, revenue: 65200000, runtime: 111, rating: 7.4, votes: 350000, director: 'Barry Jenkins', releaseMonth: 'October', language: 'English', country: 'USA', marketingBudget: 5000000, directorPopularity: 60, actorPopularity: 50, success: 'Hit', roi: 42.47 },
  { id: 40, title: 'Hereditary', genre: 'Horror', budget: 10000000, revenue: 82200000, runtime: 127, rating: 7.3, votes: 350000, director: 'Ari Aster', releaseMonth: 'June', language: 'English', country: 'USA', marketingBudget: 12000000, directorPopularity: 55, actorPopularity: 45, success: 'Hit', roi: 7.22 },
  { id: 41, title: 'Midsommar', genre: 'Horror', budget: 9000000, revenue: 48000000, runtime: 148, rating: 7.1, votes: 250000, director: 'Ari Aster', releaseMonth: 'July', language: 'English', country: 'USA', marketingBudget: 10000000, directorPopularity: 55, actorPopularity: 40, success: 'Hit', roi: 4.33 },
  { id: 42, title: 'The Witch', genre: 'Horror', budget: 4000000, revenue: 40800000, runtime: 92, rating: 7.0, votes: 280000, director: 'Robert Eggers', releaseMonth: 'February', language: 'English', country: 'USA', marketingBudget: 5000000, directorPopularity: 50, actorPopularity: 35, success: 'Hit', roi: 9.20 },
  { id: 43, title: 'Ex Machina', genre: 'Sci-Fi', budget: 15000000, revenue: 36800000, runtime: 108, rating: 7.7, votes: 550000, director: 'Alex Garland', releaseMonth: 'April', language: 'English', country: 'UK', marketingBudget: 8000000, directorPopularity: 60, actorPopularity: 55, success: 'Average', roi: 1.45 },
  { id: 44, title: 'Arrival', genre: 'Sci-Fi', budget: 47000000, revenue: 203400000, runtime: 116, rating: 7.9, votes: 750000, director: 'Denis Villeneuve', releaseMonth: 'November', language: 'English', country: 'USA', marketingBudget: 35000000, directorPopularity: 80, actorPopularity: 75, success: 'Hit', roi: 3.33 },
  { id: 45, title: 'Sicario', genre: 'Thriller', budget: 30000000, revenue: 84900000, runtime: 121, rating: 7.7, votes: 450000, director: 'Denis Villeneuve', releaseMonth: 'September', language: 'English', country: 'USA', marketingBudget: 20000000, directorPopularity: 80, actorPopularity: 70, success: 'Hit', roi: 1.83 },
  { id: 46, title: 'Prisoners', genre: 'Thriller', budget: 46000000, revenue: 122100000, runtime: 153, rating: 8.1, votes: 750000, director: 'Denis Villeneuve', releaseMonth: 'September', language: 'English', country: 'USA', marketingBudget: 25000000, directorPopularity: 80, actorPopularity: 78, success: 'Hit', roi: 1.65 },
  { id: 47, title: 'Nightcrawler', genre: 'Thriller', budget: 8500000, revenue: 50300000, runtime: 117, rating: 7.8, votes: 600000, director: 'Dan Gilroy', releaseMonth: 'October', language: 'English', country: 'USA', marketingBudget: 10000000, directorPopularity: 55, actorPopularity: 65, success: 'Hit', roi: 4.92 },
  { id: 48, title: 'Drive', genre: 'Crime', budget: 15000000, revenue: 78000000, runtime: 100, rating: 7.8, votes: 700000, director: 'Nicolas Winding Refn', releaseMonth: 'September', language: 'English', country: 'USA', marketingBudget: 12000000, directorPopularity: 60, actorPopularity: 72, success: 'Hit', roi: 4.20 },
  { id: 49, title: 'Baby Driver', genre: 'Action', budget: 34000000, revenue: 226900000, runtime: 113, rating: 7.6, votes: 550000, director: 'Edgar Wright', releaseMonth: 'June', language: 'English', country: 'USA', marketingBudget: 25000000, directorPopularity: 70, actorPopularity: 68, success: 'Hit', roi: 5.67 },
  { id: 50, title: 'Scott Pilgrim vs. the World', genre: 'Comedy', budget: 60000000, revenue: 48000000, runtime: 112, rating: 7.5, votes: 450000, director: 'Edgar Wright', releaseMonth: 'August', language: 'English', country: 'USA', marketingBudget: 30000000, directorPopularity: 70, actorPopularity: 65, success: 'Flop', roi: 0.80 },
];

export const reviews: Review[] = [
  { id: 1, movieId: 1, text: 'Absolutely incredible finale to the Infinity Saga. The emotional weight and action sequences are unmatched. A perfect conclusion.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-01-15' },
  { id: 2, movieId: 1, text: 'Great action but felt a bit too long in the middle. Still a solid superhero film.', rating: 7, sentiment: 'positive', emotion: 'joy', date: '2024-01-16' },
  { id: 3, movieId: 1, text: 'Overhyped and predictable. The time travel plot made no sense.', rating: 4, sentiment: 'negative', emotion: 'anger', date: '2024-01-17' },
  { id: 4, movieId: 2, text: 'Heath Ledger gives the performance of a lifetime. This is cinema at its absolute best.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-02-01' },
  { id: 5, movieId: 2, text: 'Dark, gripping, and masterfully directed. Nolan created something timeless.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-02-02' },
  { id: 6, movieId: 3, text: 'Mind-bending and visually stunning. Nolan proves again why he is the best.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-02-10' },
  { id: 7, movieId: 3, text: 'Confusing plot but amazing visuals. Needs multiple watches to fully understand.', rating: 7, sentiment: 'neutral', emotion: 'surprise', date: '2024-02-11' },
  { id: 8, movieId: 4, text: 'A beautiful exploration of love, time, and space. Hans Zimmer score is phenomenal.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-02-15' },
  { id: 9, movieId: 4, text: 'Too sentimental and the science is questionable. But visually impressive.', rating: 6, sentiment: 'neutral', emotion: 'sadness', date: '2024-02-16' },
  { id: 10, movieId: 5, text: 'The greatest film ever made. Hope is a good thing, maybe the best of things.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-03-01' },
  { id: 11, movieId: 11, text: 'A masterpiece of social commentary. Bong Joon-ho is a genius.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-03-10' },
  { id: 12, movieId: 11, text: 'Brilliant storytelling with unexpected twists. Deserved every award.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-03-11' },
  { id: 13, movieId: 16, text: 'Fun and colorful but lacked substance. Margot Robbie was great though.', rating: 6, sentiment: 'neutral', emotion: 'joy', date: '2024-04-01' },
  { id: 14, movieId: 16, text: 'Overrated marketing campaign. The movie itself was just okay.', rating: 5, sentiment: 'negative', emotion: 'disgust', date: '2024-04-02' },
  { id: 15, movieId: 24, text: 'Terrifying and thought-provoking. Jordan Peele is the new master of horror.', rating: 9, sentiment: 'positive', emotion: 'fear', date: '2024-04-10' },
  { id: 16, movieId: 24, text: 'Social commentary wrapped in horror. Brilliant and unsettling.', rating: 8, sentiment: 'positive', emotion: 'fear', date: '2024-04-11' },
  { id: 17, movieId: 29, text: 'What a disaster. The CGI was nightmare fuel for all the wrong reasons.', rating: 1, sentiment: 'negative', emotion: 'disgust', date: '2024-05-01' },
  { id: 18, movieId: 29, text: 'Unwatchable. One of the worst films I have ever seen.', rating: 1, sentiment: 'negative', emotion: 'anger', date: '2024-05-02' },
  { id: 19, movieId: 30, text: 'Boring and unnecessary. Sony needs to stop with these spinoffs.', rating: 3, sentiment: 'negative', emotion: 'disgust', date: '2024-05-05' },
  { id: 20, movieId: 33, text: 'Beautiful animation with an emotional story that stays with you.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-05-10' },
  { id: 21, movieId: 15, text: 'Oppenheimer is a towering achievement. Cillian Murphy is extraordinary.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-06-01' },
  { id: 22, movieId: 15, text: 'Three hours flew by. Nolan at his most mature and restrained.', rating: 8, sentiment: 'positive', emotion: 'joy', date: '2024-06-02' },
  { id: 23, movieId: 14, text: 'Visually spectacular but the story felt incomplete. Waiting for part three.', rating: 7, sentiment: 'neutral', emotion: 'joy', date: '2024-06-10' },
  { id: 24, movieId: 36, text: 'Pure adrenaline from start to finish. A modern action masterpiece.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-06-15' },
  { id: 25, movieId: 37, text: 'Intense and inspiring. J.K. Simmons is terrifyingly good.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-06-20' },
  { id: 26, movieId: 40, text: 'Genuinely disturbing. Ari Aster knows how to get under your skin.', rating: 8, sentiment: 'positive', emotion: 'fear', date: '2024-07-01' },
  { id: 27, movieId: 44, text: 'Thoughtful sci-fi that prioritizes emotion over explosions. Beautiful.', rating: 8, sentiment: 'positive', emotion: 'joy', date: '2024-07-05' },
  { id: 28, movieId: 48, text: 'Stylish and atmospheric. Ryan Gosling is perfect as the silent driver.', rating: 8, sentiment: 'positive', emotion: 'joy', date: '2024-07-10' },
  { id: 29, movieId: 31, text: 'Messy and disappointing. DC cannot get its act together.', rating: 3, sentiment: 'negative', emotion: 'anger', date: '2024-07-15' },
  { id: 30, movieId: 32, text: 'Forgettable and bland. A waste of a good character.', rating: 4, sentiment: 'negative', emotion: 'disgust', date: '2024-07-16' },
  { id: 31, movieId: 1, text: 'The final battle gave me chills. Worth every minute of the runtime.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-08-01' },
  { id: 32, movieId: 2, text: 'The Joker scenes are iconic. This film changed superhero movies forever.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-08-05' },
  { id: 33, movieId: 3, text: 'The hallway fight scene is legendary. Nolan crafts dreams within dreams.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-08-10' },
  { id: 34, movieId: 7, text: 'Heartwarming and beautifully acted. Tom Hanks is a national treasure.', rating: 9, sentiment: 'positive', emotion: 'joy', date: '2024-08-15' },
  { id: 35, movieId: 13, text: 'The Godfather defines cinema. Every frame is perfection.', rating: 10, sentiment: 'positive', emotion: 'joy', date: '2024-08-20' },
  { id: 36, movieId: 28, text: 'Too long and the de-aging was distracting. Not Scorsese at his best.', rating: 5, sentiment: 'negative', emotion: 'sadness', date: '2024-09-01' },
  { id: 37, movieId: 26, text: 'Visually breathtaking but the story was too slow for general audiences.', rating: 6, sentiment: 'neutral', emotion: 'sadness', date: '2024-09-05' },
  { id: 38, movieId: 42, text: 'Slow burn horror done right. The ending is haunting.', rating: 8, sentiment: 'positive', emotion: 'fear', date: '2024-09-10' },
  { id: 39, movieId: 45, text: 'Tense and atmospheric. Emily Blunt is fantastic.', rating: 8, sentiment: 'positive', emotion: 'fear', date: '2024-09-15' },
  { id: 40, movieId: 47, text: 'Jake Gyllenhaal is creepy and captivating. A dark look at media.', rating: 8, sentiment: 'positive', emotion: 'joy', date: '2024-09-20' },
];

export const modelMetrics: ModelMetrics[] = [
  {
    name: 'Linear Regression',
    mae: 48700000,
    rmse: 89200000,
    r2: 0.72,
    trainTime: 0.12,
    predictTime: 0.003,
    accuracy: 0.68,
    features: [
      { name: 'Budget', importance: 0.42 },
      { name: 'Marketing Budget', importance: 0.28 },
      { name: 'Rating', importance: 0.15 },
      { name: 'Director Popularity', importance: 0.08 },
      { name: 'Actor Popularity', importance: 0.05 },
      { name: 'Runtime', importance: 0.02 },
    ],
  },
  {
    name: 'Random Forest',
    mae: 32100000,
    rmse: 58700000,
    r2: 0.88,
    trainTime: 2.45,
    predictTime: 0.018,
    accuracy: 0.84,
    features: [
      { name: 'Budget', importance: 0.35 },
      { name: 'Marketing Budget', importance: 0.25 },
      { name: 'Rating', importance: 0.18 },
      { name: 'Director Popularity', importance: 0.12 },
      { name: 'Actor Popularity', importance: 0.07 },
      { name: 'Runtime', importance: 0.03 },
    ],
  },
  {
    name: 'Gradient Boosting',
    mae: 29800000,
    rmse: 51200000,
    r2: 0.91,
    trainTime: 4.82,
    predictTime: 0.025,
    accuracy: 0.87,
    features: [
      { name: 'Budget', importance: 0.32 },
      { name: 'Marketing Budget', importance: 0.27 },
      { name: 'Rating', importance: 0.19 },
      { name: 'Director Popularity', importance: 0.13 },
      { name: 'Actor Popularity', importance: 0.06 },
      { name: 'Runtime', importance: 0.03 },
    ],
  },
  {
    name: 'XGBoost',
    mae: 26700000,
    rmse: 44500000,
    r2: 0.93,
    trainTime: 3.12,
    predictTime: 0.012,
    accuracy: 0.90,
    features: [
      { name: 'Budget', importance: 0.30 },
      { name: 'Marketing Budget', importance: 0.26 },
      { name: 'Rating', importance: 0.20 },
      { name: 'Director Popularity', importance: 0.14 },
      { name: 'Actor Popularity', importance: 0.07 },
      { name: 'Runtime', importance: 0.03 },
    ],
  },
  {
    name: 'LightGBM',
    mae: 25400000,
    rmse: 42100000,
    r2: 0.94,
    trainTime: 1.87,
    predictTime: 0.008,
    accuracy: 0.91,
    features: [
      { name: 'Budget', importance: 0.29 },
      { name: 'Marketing Budget', importance: 0.27 },
      { name: 'Rating', importance: 0.21 },
      { name: 'Director Popularity', importance: 0.13 },
      { name: 'Actor Popularity', importance: 0.07 },
      { name: 'Runtime', importance: 0.03 },
    ],
  },
];

export const predictionLogs: PredictionLog[] = [
  { id: 1, movieName: 'Project Alpha', genre: 'Action', predictedRevenue: 450000000, predictedROI: 2.8, successProbability: 78, predictedClass: 'Hit', confidence: 0.85, date: '2024-12-01', actualRevenue: 480000000 },
  { id: 2, movieName: 'Midnight Dreams', genre: 'Drama', predictedRevenue: 120000000, predictedROI: 1.5, successProbability: 45, predictedClass: 'Average', confidence: 0.72, date: '2024-12-02', actualRevenue: 95000000 },
  { id: 3, movieName: 'Space Odyssey 2', genre: 'Sci-Fi', predictedRevenue: 680000000, predictedROI: 4.2, successProbability: 92, predictedClass: 'Hit', confidence: 0.91, date: '2024-12-03', actualRevenue: 720000000 },
  { id: 4, movieName: 'Laugh Track', genre: 'Comedy', predictedRevenue: 85000000, predictedROI: 0.9, successProbability: 32, predictedClass: 'Flop', confidence: 0.68, date: '2024-12-04' },
  { id: 5, movieName: 'Shadow Hunter', genre: 'Thriller', predictedRevenue: 210000000, predictedROI: 2.1, successProbability: 65, predictedClass: 'Hit', confidence: 0.79, date: '2024-12-05', actualRevenue: 195000000 },
  { id: 6, movieName: 'Love in Paris', genre: 'Romance', predictedRevenue: 95000000, predictedROI: 1.8, successProbability: 52, predictedClass: 'Average', confidence: 0.74, date: '2024-12-06' },
  { id: 7, movieName: 'Nightmare Alley', genre: 'Horror', predictedRevenue: 180000000, predictedROI: 5.5, successProbability: 81, predictedClass: 'Hit', confidence: 0.83, date: '2024-12-07', actualRevenue: 165000000 },
  { id: 8, movieName: 'Kingdom of Fire', genre: 'Fantasy', predictedRevenue: 320000000, predictedROI: 1.6, successProbability: 48, predictedClass: 'Average', confidence: 0.71, date: '2024-12-08' },
  { id: 9, movieName: 'Code Red', genre: 'Action', predictedRevenue: 520000000, predictedROI: 3.5, successProbability: 85, predictedClass: 'Hit', confidence: 0.88, date: '2024-12-09', actualRevenue: 550000000 },
  { id: 10, movieName: 'The Last Laugh', genre: 'Comedy', predictedRevenue: 65000000, predictedROI: 0.7, successProbability: 28, predictedClass: 'Flop', confidence: 0.65, date: '2024-12-10' },
];

export const monthlyRevenue = [
  { month: 'Jan', revenue: 245000000, predicted: 230000000 },
  { month: 'Feb', revenue: 189000000, predicted: 195000000 },
  { month: 'Mar', revenue: 412000000, predicted: 380000000 },
  { month: 'Apr', revenue: 356000000, predicted: 340000000 },
  { month: 'May', revenue: 298000000, predicted: 310000000 },
  { month: 'Jun', revenue: 521000000, predicted: 490000000 },
  { month: 'Jul', revenue: 678000000, predicted: 650000000 },
  { month: 'Aug', revenue: 234000000, predicted: 250000000 },
  { month: 'Sep', revenue: 156000000, predicted: 170000000 },
  { month: 'Oct', revenue: 289000000, predicted: 275000000 },
  { month: 'Nov', revenue: 445000000, predicted: 420000000 },
  { month: 'Dec', revenue: 567000000, predicted: 540000000 },
];

export const genreDistribution = [
  { name: 'Action', value: 18, revenue: 3200000000 },
  { name: 'Drama', value: 12, revenue: 980000000 },
  { name: 'Sci-Fi', value: 10, revenue: 2100000000 },
  { name: 'Horror', value: 8, revenue: 650000000 },
  { name: 'Comedy', value: 7, revenue: 420000000 },
  { name: 'Thriller', value: 6, revenue: 380000000 },
  { name: 'Animation', value: 5, revenue: 890000000 },
  { name: 'Crime', value: 5, revenue: 520000000 },
  { name: 'Romance', value: 3, revenue: 180000000 },
  { name: 'Fantasy', value: 2, revenue: 95000000 },
];

export const sentimentDistribution = [
  { name: 'Positive', value: 62, count: 248 },
  { name: 'Neutral', value: 22, count: 88 },
  { name: 'Negative', value: 16, count: 64 },
];

export const emotionDistribution = [
  { name: 'Joy', value: 45 },
  { name: 'Fear', value: 18 },
  { name: 'Anger', value: 12 },
  { name: 'Sadness', value: 10 },
  { name: 'Disgust', value: 8 },
  { name: 'Surprise', value: 7 },
];

export const correlationData = [
  { x: 25000000, y: 58300000, label: 'Shawshank' },
  { x: 8000000, y: 213900000, label: 'Pulp Fiction' },
  { x: 55000000, y: 678200000, label: 'Forrest Gump' },
  { x: 63000000, y: 467600000, label: 'The Matrix' },
  { x: 356000000, y: 2797800564, label: 'Endgame' },
  { x: 185000000, y: 1004558444, label: 'Dark Knight' },
  { x: 160000000, y: 836836967, label: 'Inception' },
  { x: 165000000, y: 701729206, label: 'Interstellar' },
  { x: 11400000, y: 263500000, label: 'Parasite' },
  { x: 19000000, y: 395000000, label: 'Spirited Away' },
  { x: 6000000, y: 291000000, label: 'Godfather' },
  { x: 190000000, y: 714000000, label: 'Dune 2' },
  { x: 100000000, y: 976000000, label: 'Oppenheimer' },
  { x: 145000000, y: 1446000000, label: 'Barbie' },
  { x: 200000000, y: 1921000000, label: 'No Way Home' },
  { x: 25000000, y: 141300000, label: 'EEAAO' },
  { x: 72000000, y: 160000000, label: 'RRR' },
  { x: 30000000, y: 446100000, label: 'La La Land' },
  { x: 4500000, y: 255400000, label: 'Get Out' },
  { x: 17000000, y: 340900000, label: 'A Quiet Place' },
  { x: 150000000, y: 259200000, label: 'Blade Runner 2049' },
  { x: 200000000, y: 365300000, label: 'Tenet' },
  { x: 159000000, y: 8000000, label: 'The Irishman' },
  { x: 95000000, y: 73800000, label: 'Cats' },
  { x: 75000000, y: 167500000, label: 'Morbius' },
  { x: 200000000, y: 271300000, label: 'The Flash' },
  { x: 125000000, y: 134100000, label: 'Shazam 2' },
  { x: 4000000, y: 382000000, label: 'Your Name' },
  { x: 8500000, y: 98500000, label: 'Train to Busan' },
  { x: 175000000, y: 807100000, label: 'Coco' },
];

export const recentActivity = [
  { id: 1, action: 'Model retrained', detail: 'XGBoost model updated with 50 new samples', time: '2 min ago', type: 'model' },
  { id: 2, action: 'Prediction made', detail: 'Project Alpha — $450M predicted revenue', time: '15 min ago', type: 'prediction' },
  { id: 3, action: 'Dataset uploaded', detail: 'Q4 2024 movie dataset (120 records)', time: '1 hr ago', type: 'data' },
  { id: 4, action: 'NLP analysis', detail: 'Sentiment analysis on 400 new reviews', time: '2 hrs ago', type: 'nlp' },
  { id: 5, action: 'Report generated', detail: 'Monthly analytics report exported to PDF', time: '3 hrs ago', type: 'report' },
  { id: 6, action: 'User added', detail: 'Dr. Sarah Chen joined as Data Scientist', time: '5 hrs ago', type: 'user' },
];

export const wordFrequency = [
  { word: 'incredible', count: 45 },
  { word: 'masterpiece', count: 38 },
  { word: 'boring', count: 32 },
  { word: 'amazing', count: 29 },
  { word: 'terrible', count: 27 },
  { word: 'beautiful', count: 25 },
  { word: 'disappointing', count: 23 },
  { word: 'stunning', count: 21 },
  { word: 'predictable', count: 19 },
  { word: 'emotional', count: 18 },
  { word: 'overrated', count: 17 },
  { word: 'gripping', count: 16 },
  { word: 'confusing', count: 15 },
  { word: 'brilliant', count: 14 },
  { word: 'waste', count: 13 },
];

export const bigrams = [
  { phrase: 'visually stunning', count: 28 },
  { phrase: 'waste of time', count: 22 },
  { phrase: 'must watch', count: 19 },
  { phrase: 'poorly written', count: 17 },
  { phrase: 'great performance', count: 16 },
  { phrase: 'plot holes', count: 15 },
  { phrase: 'mind blowing', count: 14 },
  { phrase: 'slow paced', count: 13 },
  { phrase: 'highly recommend', count: 12 },
  { phrase: 'not worth', count: 11 },
];

export function formatCurrency(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value}`;
}

export function formatNumber(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return `${value}`;
}
