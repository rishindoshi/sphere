var explorers = [
  {
    type: 'explorer',
    name: 'Steve',
    spotifyUserId: 'sgodbold',
    musicTaste: []
  },
  {
    type: 'explorer',
    name: 'Rosa',
    spotifyUserId: 'rosawu',
    musicTaste: []
  }
];

var vendors = [
  {
    type: 'vendor',
    name: 'Nick',
    venueName: 'Cardamom',
    spotifyUserId: 'sagganaki',
    lat: 42.298546,
    lng: -83.721475,
    musicTaste: [],
    currPlaylistId: "",
    address: "1739 Plymouth Rd, Ann Arbor, MI 48104"
  },
  {
    type: 'vendor',
    name: 'Grace',
    venueName: 'McDonalds',
    spotifyUserId: '1221020391',
    lat: 42.303085,
    lng: -83.707915,
    musicTaste: [],
    currPlaylistId: "",
    address: "Traver Village Shopping Center, 2675 Plymouth Rd, Ann Arbor, MI 48105"
  },
  {
    type: 'vendor',
    name: 'Nimesha',
    venueName: 'Wendys',
    spotifyUserId: '124723383',
    lat: 42.298980,
    lng: -83.722430,
    musicTaste: [],
    currPlaylistId: "",
    address: "1655 Plymouth Rd, Ann Arbor, MI 48105"
  },
  {
    type: 'vendor',
    name: 'Imani',
    venueName: 'Panera Bread',
    spotifyUserId: 'imaniw95',
    lat: 42.298437,
    lng: -83.719747,
    musicTaste: [],
    currPlaylistId: "",
    address: "1773 Plymouth Rd, Ann Arbor, MI 48105"
  },
  {
    type: 'vendor',
    name: 'Poop Pap',
    venueName: 'Nagomi Sushi',
    spotifyUserId: 'linol3um',
    lat: 42.297925,
    lng: -83.722995,
    musicTaste: [],
    currPlaylistId: "",
    address: "1754 Plymouth Rd, Ann Arbor, MI 48105"
  },
  {
    type: 'vendor',
    name: 'Nikil',
    venueName: 'Panda Express',
    spotifyUserId: 'nikilpremium',
    lat: 42.27397,
    lng: -83.73554,
    musicTaste: [],
    currPlaylistId: "",
    address: "2101 Bonisteel Blvd, Ann Arbor, MI 48109"
  },
  {
    type: 'vendor',
    name: 'Shivum',
    venueName: 'No Thai',
    spotifyUserId: '12144439228',
    lat: 42.298400,
    lng: -83.721305,
    musicTaste: [],
    currPlaylistId: "",
    address: "1745 Plymouth Rd, Ann Arbor, MI 48105"
  },
  {
    type: 'vendor',
    name: 'Arya',
    venueName: 'Curry On',
    spotifyUserId: 'aryataylor',
    lat: 42.304055,
    lng: -83.706445,
    musicTaste: [],
    currPlaylistId: "",
    address: "Chinatown Mall, 2711 Plymouth Rd, Ann Arbor, MI 48105"
  },
];

var genres = [
  "Acid Jazz",
  "Alternative Country",
  "Alternative Dance",
  "Classic Jazz",
  "Contemporary R&B",
  "Downtempo",
  "Electronica",
  "Folk",
  "Hard Rock",
  "Indie Pop",
  "Indie Rock",
  "R&B",
  "Rock",
  "Underground Rap",
  "West Coast Rap",
];

var venues = [
  {
    name: 'Cardamom',
    lat: 42.298546,
    lng: -83.721475,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'Panera Bread',
    lat: 42.298437,
    lng: -83.719747,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'Nagomi Sushi',
    lat: 42.297929,
    lng: -83.722998,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'Panda Express',
    lat: 42.290802,
    lng: -83.717655,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'pizza house',
    lat: 42.27431,
    lng: -83.73483,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'rays red hots',
    lat: 42.27397,
    lng: -83.73554,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'bubble island',
    lat: 42.27513,
    lng: -83.73558,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'study lounge',
    lat: 42.27477,
    lng: -83.73342,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "mighty good coffee",
    lat: 42.27522,
    lng: -83.73194,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'burgerfi',
    lat: 42.27520,
    lng: -83.73328,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'south u pizza',
    lat: 42.27481,
    lng: -83.73532,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "ayaka",
    lat: 42.27520,
    lng: -83.73430,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Slurping Turtle",
    lat: 42.27923,
    lng: -83.74165,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "hopcat",
    lat: 42.27911,
    lng: -83.74185,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Scorekeepers",
    lat: 42.27894,
    lng: -83.74218,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Starbucks",
    lat: 42.27952,
    lng: -83.74111,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Buffalo Wild Wings",
    lat: 42.28010,
    lng: -83.74057,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Comet Coffee",
    lat: 42.27839,
    lng: -83.74130,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Chipotle",
    lat: 42.27932,
    lng: -83.74044,
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "panera",
    lat: 42.27879,
    lng: -83.73971,
    musicTaste: [],
    vendorIds: []
  }
];

exports.getExplorer = function() {
  return explorers[Math.floor(Math.random()*explorers.length)];
}

exports.getExplorers = function() {
  return explorers;
}

exports.getVendor = function() {
  return vendors[Math.floor(Math.random()*vendors.length)];
}

exports.getVendors = function() {
  return vendors;
}

exports.getVenue = function() {
  return venues[Math.floor(Math.random()*venues.length)];
}

exports.getVenues = function() {
  return venues;
}
