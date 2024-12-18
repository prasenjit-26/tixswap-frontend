import marron5Img from "../assets/images/maroon5.jpg";
import maroon5layout from "../assets/images/maroon5layout.png";
import coldplay from "../assets/images/coldplay.jpg";
import coldplayVenue from "../assets/images/coldplay-venue.jpeg"

export const EVENT_DATA = [
  // {
  //   id: "maroon-5-india-2024",
  //   title: "Maroon 5 India 2024",
  //   subtile: "Pop, Rock | English | 5yrs + | 5hrs",
  //   date: "Tue 03 Dec 2024",
  //   time: "3:00 PM",
  //   venue: "Mahalaxmi Race Course: Mumbai",
  //   city: "Mumbai",
  //   cities: [
  //     {
  //       id: "mumbai",
  //       name: "Mumbai",
  //       dates: [{ id: "tue-03-dec-2024", date: "Tue 03 Dec 2024" }],
  //     },
  //   ],
  //   about:
  //     "<p> GRAMMY® Award-winning multiplatinum powerhouse Maroon 5, one of pop music’s most enduring artists and one of the 21st century’s biggest acts, makes its way to India for the first time ever! <br /> <br /> Coming off their current Las Vegas residency to Mumbai this December, the fans will experience an electrifying performance from one of the most enduring and successful bands of the 21st century, as Maroon 5 prepares to end the year on an unforgettable note. Maroon 5 has continued to captivate audiences world-over with their renowned high-energy performances and fans can expect nothing less in Mumbai. The concert will feature a setlist spanning their greatest hits and fan favourites, offering a once-in-a-lifetime experience. Including hits like ‘This Love’, ‘She Will Be Loved’, ‘Sugar’, ‘Girls Like You’ and more! <br /> <br /> The band’s incredible success includes a total of 50 Grammy and Billboard Music Award nominations and multi-platinum certifications in over 35 countries. Known for hits such as ‘Moves Like Jagger’, ‘Maps’ and ‘Payphone’, Maroon 5's catalogue of blockbuster tracks is eagerly anticipated by Indian fans. <br /> <br /> Book your tickets before they sell out!</p> ",
  //   images: [marron5Img],
  //   isLive: true,
  //   venueLayout: maroon5layout,
  // },
  {
    id: "coldplay-music-of-the-spheres-world-tour",
    title: "Coldplay: Music Of The Spheres World Tour",
    subtile: "Alternative, International, Pop, Rock | English | 5yrs + | 4hrs",
    date: "Sat 25 Jan 2025-Sun 26 Jan 2026",
    time: "3:00 PM",
    venue: "Narendra Modi Stadium Motera Ahemadabad",
    city: "Mumbai",
    cities: [
      {
        id: "mumbai",
        name: "Mumbai",
        dates: [
          { id: "sat-18-jan-2025", date: "Sat 18 Jan 2025" },
          { id: "sun-19-jan-2025", date: "Sun 19 Jan 2025" },
          { id: "tue-21-jan-2025", date: "Tue 21 Jan 2025" },
        ],
      },
      {
        id: "ahmedabad",
        name: "Ahmedabad",
        dates: [
          { id: "sat-25-jan-2025", date: "Sat 25 Jan 2025" },
          { id: "sun-26-jan-2025", date: "Sun 26 Jan 2025" },
        ],
      },
    ],
    about: `<p>Grammy award-winning band Coldplay will be bringing their critically acclaimed Music Of The Spheres World Tour to India in January 2025!<br /><br />Following the sellout success of Coldplay’s summer 2024 European stadium shows, and three shows in Mumbai for January 2025, the band has added a show especially for Ahmedabad at the Narendra Modi Stadium, on 25 January 2025.<br /><br />This promises to deliver an unforgettable experience with mesmerising lights, pyrotechnics, dreamy experiences, and larger-than-life performances that fans have come to love and expect from the band. In addition to performing several hits from their Album of the Year-nominated Music Of The Spheres and new singles “We Pray” and “feels like falling in love” off their upcoming release Moon Music, the group will incorporate anthems from the band’s incredible catalogue, including "Yellow,"  “The Scientist,"  "Clocks,"  “Fix You,"  “Viva La Vida,"  "Paradise,"  “A Sky Full Of Stars,” and “Adventure Of A Lifetime,” into the spectacular stadium show bursting with lasers, fireworks, and LED wristbands. <br /><br />Book your tickets before they sell out!<p>`,
    images: [coldplay],
    isLive: true,
    venueLayout: coldplayVenue,
  },
];
export const SUPPORTED_CITIES = [
  { id: "mumbai", name: "Mumbai" },
  { id: "pune", name: "Pune" },
  { id: "delhi", name: "Delhi" },
  { id: "ahmedabad", name: "Ahmedabad" },
  { id: "banglore", name: "Banglore" },
];

export const HOW_IT_WORKS = {
  buyer: [
    "Fill up the form for your desired event tickets",
    "If we get a seller as per your requirement we'll connect to fullfull your order",
    "100% genuine - verified tickets, in person dealings",
    "We do not supprt or participate in black marketing - we just try to match your offer",
  ],
  seller: [
    "Fill up the form for the tickets you want to sell",
    "If we get a buyer as per your reuirement we'll connect to fullfill your order",
    "We take 100% payment gurantee if tickets provided are genuine",
    "We do not support or participate in black market sells - List at MRP or lower price",
  ],
};
export const API_URL = "https://tixswap-85835cb658bc.herokuapp.com";