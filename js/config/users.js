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
