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
    name: 'Rishin',
    venueName: 'Cardamom',
    spotifyUserId: 'rdoshi023',
    lat: 42.298546,
    lng: -83.721475,
    musicTaste: [],
    currPlaylistId: ""
  },
  {
    type: 'vendor',
    name: 'Chuckry',
    venueName: 'Panda Express',
    spotifyUserId: 'vengadamn',
    lat: 42.290802,
    lng: -83.717655,
    musicTaste: [],
    currPlaylistId: ""
  },
  {
    type: 'vendor',
    name: 'Xinrui',
    venueName: 'Panera Bread',
    spotifyUserId: '1215155004',
    lat: 42.298437,
    lng: -83.719747,
    musicTaste: [],
    currPlaylistId: ""
  },
  {
    type: 'vendor',
    name: 'Allie',
    venueName: 'Nagomi Sushi',
    spotifyUserId: '122624880',
    lat: 42.297929,
    lng: -83.722998,
    musicTaste: [],
    currPlaylistId: ""
  }
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

var coords = [
  {
    name: 'Cardamom',
    lat: 42.298546,
    lng: -83.721475
  },
  {
    name: 'Panera Bread',
    lat: 42.298437,
    lng: -83.719747
  },
  {
    name: 'Nagomi Sushi',
    lat: 42.297929,
    lng: -83.722998
  },
  {
    name: 'Panda Express',
    lat: 42.290802,
    lng: -83.717655
  },
  {
    name: 'pizza house',
    lat: 42.27431,
    lng: -83.73483
  },
  {
    name: 'rays red hots',
    lat: 42.27397,
    lng: -83.73554
  },
  {
    name: 'bubble island',
    lat: 42.27513,
    lng: -83.73558
  },
  {
    name: 'study lounge',
    lat: 42.27477,
    lng: -83.73342
  },
  {
    name: "mighty good coffee",
    lat: 42.27522,
    lng: -83.73194
  },
  {
    name: 'burgerfi',
    lat: 42.27520,
    lng: -83.73328
  },
  {
    name: 'south u pizza',
    lat: 42.27481,
    lng: -83.73532
  },
  {
    "name": "ayaka",
    "lat": 42.27520,
    "lng": -83.73430,
  },
  {
    "name": "Slurping Turtle",
    "lat": 42.27923,
    "lng": -83.74165
  },
  {
    "name": "hopcat",
    "lat": 42.27911,
    "lng": -83.74185,
  },
  {
    "name": "Scorekeepers",
    "lat": 42.27894,
    "lng": -83.74218,
  },
  {
    "name": "Starbucks",
    "lat": 42.27952,
    "lng": -83.74111,
  },
  {
    "name": "Buffalo Wild Wings",
    "lat": 42.28010,
    "lng": -83.74057,
  },
  {
    "name": "Comet Coffee",
    "lat": "42.27839",
    "lng": "-83.74130",
  },
  {
    "name": "Chipotle",
    "lat": 42.27932,
    "lng": -83.74044,
  },
  {
    "name": "panera",
    "lat": 42.27879,
    "lng": -83.73971,
  }
];

exports.getExplorer = function() {
  return explorers[Math.floor(Math.random()*explorers.length)];
}

exports.getVendor = function() {
  return vendors[Math.floor(Math.random()*vendors.length)];
}

exports.getVenue = function() {
  return coords[Math.floor(Math.random()*coords.length)];
}
