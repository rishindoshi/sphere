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
    name: 'Nick',
    spotifyUserId: 'sagganaki',
    musicTaste: [],
    venueId: "ChIJxxmItH-uPIgRDuvzf4RZ4BM"
  },
  {
    name: 'Grace',
    spotifyUserId: '1221020391',
    musicTaste: [],
    venueId: "ChIJr_YT60CuPIgRpIvRX_OkyBc"
  },
  {
    name: 'Nimesha',
    spotifyUserId: '124723383',
    musicTaste: [],
    venueId: "ChIJ2QZ0KTyuPIgRK3wySqT3nrw",
  },
  {
    name: 'Imani',
    spotifyUserId: 'imaniw95',
    musicTaste: [],
    venueId: "ChIJNS6x04euPIgRRy7F08FXI9o",
  },
  {
    name: 'Poop Pap',
    spotifyUserId: 'linol3um',
    musicTaste: [],
    venueId: "ChIJA3q9y0WuPIgRVA6XbahB8Oc",
  },
  {
    name: 'Nikil',
    spotifyUserId: 'nikilpremium',
    musicTaste: [],
    venueId: "ChIJ8W1G1UWuPIgR6Jetrkwtshk",
  },
  {
    name: 'Shivum',
    spotifyUserId: '12144439228',
    musicTaste: [],
    venueId: "ChIJmwnAUESuPIgRtwQCjYGcAT8",
  },
  {
    name: 'Arya',
    spotifyUserId: 'aryataylor',
    musicTaste: [],
    venueId: "ChIJ-3bRg0CuPIgRODtG17yNtCQ",
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
    venueId: "ChIJxxmItH-uPIgRDuvzf4RZ4BM",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'Panera Bread',
    venueId: "ChIJr_YT60CuPIgRpIvRX_OkyBc",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'Nagomi Sushi',
    venueId: "ChIJ2QZ0KTyuPIgRK3wySqT3nrw",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'Panda Express',
    venueId: "ChIJNS6x04euPIgRRy7F08FXI9o",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'pizza house',
    venueId: "ChIJA3q9y0WuPIgRVA6XbahB8Oc",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'rays red hots',
    venueId: "ChIJ8W1G1UWuPIgR6Jetrkwtshk",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'bubble island',
    venueId: "ChIJFcckUUSuPIgR__qKKUdMvO0",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'study lounge',
    venueId: "ChIJa0EaT0SuPIgRVFDfAJrjmig",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "mighty good coffee",
    venueId: "ChIJYTS4bR-vPIgR1r2zNgWQeD4",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'burgerfi',
    venueId: "ChIJmwnAUESuPIgRtwQCjYGcAT8",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: 'south u pizza',
    venueId: "ChIJ7yODLkSuPIgRORvlEONWhq0",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "ayaka",
    venueId: "ChIJtyBXSESuPIgR06jZWywGJJg",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Slurping Turtle",
    venueId: "ChIJu9W4fD-uPIgRKLcd_YjV04s",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "hopcat",
    venueId: "ChIJ-6EpZD-uPIgR0O9Zn3hKH_I",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Scorekeepers",
    venueId: "ChIJnWc9bj-uPIgRWS8eGrYQqjs",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Starbucks",
    venueId: "ChIJ-3bRg0CuPIgRODtG17yNtCQ",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Buffalo Wild Wings",
    venueId: "ChIJ0ddXY0CuPIgRESjalhDyTPk",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Comet Coffee",
    venueId: "ChIJCSsTXD-uPIgRR-gQXE_S2_s",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "Chipotle",
    venueId: "ChIJAcihj0CuPIgRAb2vFb0CuJE",
    musicTaste: [],
    vendorIds: []
  },
  {
    name: "panera",
    venueId: "ChIJr_YT60CuPIgRpIvRX_OkyBc",
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
