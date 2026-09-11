const USERS = {
  youri: {
    id: 'youri',
    name: 'Youri',
    displayName: "Youri's Travel Atlas",
    tagline: 'Exploring the world, one trip at a time',
    avatar: null,
    dataSources: {
      trips: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=0&single=true&output=csv',
        fallback: 'data/youri/trips.json',
      },
      trip_items: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=1764665175&single=true&output=csv',
        fallback: 'data/youri/trip_items.json',
      },
      trip_notes: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=493454863&single=true&output=csv',
        fallback: 'data/youri/trip_notes.json',
      },
      countries: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=1297443404&single=true&output=csv',
        fallback: 'data/youri/countries.json',
      },
      trip_destinations: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=1003412636&single=true&output=csv',
        fallback: 'data/youri/trip_destinations.json',
      },
      // Route Builder's Sheet sync — see ROUTE_BUILDER_SYNC.md. Currently empty (the
      // one-time migration out of localStorage hasn't run yet), so getGrandTripsFull()
      // returns [] and Route Builder keeps using localStorage until it does.
      grand_trips: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=132975394&single=true&output=csv',
        fallback: 'data/youri/grand_trips.json',
      },
      grand_trip_regions: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=1160922977&single=true&output=csv',
        fallback: 'data/youri/grand_trip_regions.json',
      },
      grand_trip_blocks: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=984292817&single=true&output=csv',
        fallback: 'data/youri/grand_trip_blocks.json',
      },
      grand_trip_destinations: {
        type: 'google_sheets_csv',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSOk8DnxhAXV3yw9ZuegXNLcvQebAUFdz4mXcE8hjUqPBhlAFkSZ5uf9kSWufmRmOpsocPPbmHQGrvf/pub?gid=2129396458&single=true&output=csv',
        fallback: 'data/youri/grand_trip_destinations.json',
      },
    },
  },
  // Future users can be added here:
  // marlon: { id: 'marlon', dataSources: { ... } }
};

function getUserConfig(userId) {
  return USERS[userId] || USERS['youri'];
}

function getCurrentUser() {
  // Future: read userId from localStorage / URL / auth token
  const stored = (typeof localStorage !== 'undefined') && localStorage.getItem('atlas_user');
  return getUserConfig(stored || 'youri');
}
