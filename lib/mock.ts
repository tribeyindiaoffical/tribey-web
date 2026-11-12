// Static placeholder content for the campus screens. Nothing here is read from Supabase.

export const img = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`

export const me = {
  name: 'Insan Kamil',
  role: 'CS Senior',
  classOf: "Class of '25",
  major: 'Computer Science Senior',
  university: 'State Tech University',
  handle: 'insankamil',
  bio: 'Living life one line of code at a time 💻✨',
  avatar: img('1507003211169-0a1dd7228f2d', 240)
}

// ---------- Explore ----------

export const hubs = ['All Hubs', 'Sports & Turf', 'Travel & Treks', 'Run Clubs', 'Party & Socials']

export const events = [
  {
    id: 'hackcampus',
    hub: '',
    date: '2026-11-21T09:00:00',
    hours: 36,
    tag: 'Tech & Build',
    when: 'Sat • 09:00 AM - 36h',
    where: 'Student Union Hall B',
    title: 'HackCampus 2026: Next-Gen AI & Climate',
    desc: 'Join 400+ builders, designers, and founders to create breakthrough projects with $15K in bounties and tech mentor reviews.',
    initials: ['IK', 'JD'],
    more: '+84',
    count: 142,
    countLabel: 'joined',
    cta: 'Register',
    photo: img('1522071820081-009f0129c71c')
  },
  {
    id: 'unplugged-open-mic',
    hub: 'Party & Socials',
    date: '2026-11-17T19:30:00',
    hours: 3,
    tag: 'Acoustic & Poetry',
    when: 'Tue • 07:30 PM',
    where: 'The Attic Commons Cafe',
    title: 'Underground Unplugged: Open Mic Night',
    desc: 'Original songs, spoken word, and improv acoustic performances. Warm apple cider and fresh pastries provided by the Arts Guild.',
    initials: ['AL', 'SF'],
    more: '+49',
    count: 58,
    countLabel: 'RSVP',
    cta: 'Free Ticket',
    photo: img('1510915361894-db8b60106cb1')
  },
  {
    id: 'football-derby',
    hub: 'Sports & Turf',
    sport: 'Football 7v7',
    date: '2026-11-20T17:00:00',
    hours: 3,
    tag: 'Varsity Cup',
    when: 'Fri • 05:00 PM',
    where: 'South Turf Stadium 2',
    title: 'Inter-College 7v7 Football Derby',
    desc: 'Engineering vs Management in the inaugural Fall Cup. Cheer squads, live DJ, food trucks, and tournament trophy ceremony.',
    initials: ['MG', 'TT'],
    more: '+190',
    count: 210,
    countLabel: 'attending',
    cta: 'Join Squad',
    photo: img('1431324155629-1a6deb1dec8d')
  },
  {
    id: 'hoops-3v3',
    hub: 'Sports & Turf',
    sport: 'Basketball',
    date: '2026-11-13T19:00:00',
    hours: 2,
    tag: 'Streetball',
    when: 'Fri • 07:00 PM',
    where: 'Velocity Arena, Court 2',
    title: '3v3 Friday Night Hoops',
    desc: 'Fast-paced half-court 3v3 under the lights. Teams balanced on arrival, winners stay on, playlist by the Hoops Society.',
    initials: ['TO', 'MR'],
    more: '+36',
    count: 48,
    countLabel: 'playing',
    cta: 'Join Squad',
    photo: img('1546519638-68e109498ffc')
  },
  {
    id: 'pickleball-mixer',
    hub: 'Sports & Turf',
    sport: 'Pickleball',
    date: '2026-11-14T16:00:00',
    hours: 2,
    tag: 'Beginner Friendly',
    when: 'Sat • 04:00 PM',
    where: 'Velocity Arena, Rubber Courts',
    title: 'Pickleball Social Mixer',
    desc: 'Rotating doubles every 15 minutes so you meet everyone. Paddles and balls provided, quick rules demo for first-timers.',
    initials: ['JD', 'PN'],
    more: '+22',
    count: 32,
    countLabel: 'playing',
    cta: 'Join Squad',
    photo: img('1693142518820-78d7a05f1546')
  },
  {
    id: 'tennis-doubles-ladder',
    hub: 'Sports & Turf',
    sport: 'Tennis',
    date: '2026-11-15T07:00:00',
    hours: 3,
    tag: 'Doubles Ladder',
    when: 'Sun • 07:00 AM',
    where: 'Varsity Tennis Courts',
    title: 'Sunday Doubles Ladder',
    desc: 'Climb the campus doubles ladder with best-of-one-set matches. Partners assigned by level, coffee after at the club house.',
    initials: ['SZ', 'LK'],
    more: '+18',
    count: 24,
    countLabel: 'playing',
    cta: 'Join Squad',
    photo: img('1622279457486-62dcc4a431d6')
  },
  {
    id: 'shuttle-smash-open',
    hub: 'Sports & Turf',
    sport: 'Badminton',
    date: '2026-11-18T18:30:00',
    hours: 3,
    tag: 'Open Tournament',
    when: 'Wed • 06:30 PM',
    where: 'Indoor Sports Complex, Hall A',
    title: 'Shuttle Smash Badminton Open',
    desc: 'Singles, doubles and mixed brackets for all levels. Feather shuttles supplied, medals for every bracket winner.',
    initials: ['PN', 'AR'],
    more: '+40',
    count: 56,
    countLabel: 'playing',
    cta: 'Join Squad',
    photo: img('1626224583764-f87db24ac4ea')
  }
]

// ---------- Treks ----------

export const trekTabs = ['All Routes', 'Weekend Treks', 'Mountain Trails', 'Lakes & Waterfalls']

export const treks = [
  {
    id: 'lake-blanche',
    cats: ['Lakes & Waterfalls', 'Mountain Trails'],
    tag: 'Featured',
    region: 'Twin Peaks Wilderness',
    name: 'Lake Blanche Trail',
    desc: 'Alpine glacial lake beneath Sundial Peak with vivid turquoise waters.',
    rating: '4.8',
    reviews: '340',
    dist: '6.4',
    gain: '2,726',
    time: '4h 45m',
    price: '',
    footer: 'Batch Oct 18 • 6:30 AM',
    footerRight: 'View Batch',
    photo: '1501785888041-af3ef285b470'
  },
  {
    id: 'chanshal-pass',
    cats: ['Weekend Treks', 'Mountain Trails'],
    tag: 'Weekend',
    region: 'Rohru Alpine Valley',
    name: 'Chanshal Pass Ridge Trek',
    desc: 'Dramatic highland pass at 12,300 ft with panoramic views of snowbound ranges.',
    rating: '4.9',
    reviews: '189',
    dist: '11.2',
    gain: '3,450',
    time: '2 Days',
    price: '$45/student',
    footer: 'Batch Oct 25–27 • 9 Students Going',
    footerRight: 'View Batch',
    photo: '1551632811-561732d1e306'
  },
  {
    id: 'pine-ridge',
    cats: ['Weekend Treks'],
    tag: 'Day Trip',
    region: 'North Cascade Foothills',
    name: 'Pine Ridge Fall Foliage',
    desc: 'Golden aspens and crisp air, ideal Saturday unwind for busy midterm weeks.',
    rating: '4.7',
    reviews: '92',
    dist: '4.8',
    gain: '1,180',
    time: '3h 15m',
    price: 'Free',
    footer: 'Batch Nov 02 • 14 Students Going',
    footerRight: 'View Batch',
    photo: '1441974231531-c6227db76b6e'
  },
  {
    id: 'hampta-pass',
    cats: ['Mountain Trails', 'Lakes & Waterfalls'],
    tag: 'Break Special',
    region: 'Pir Panjal Range',
    name: 'Hampta Pass & Chandratal',
    desc: 'Multi-day high altitude corridor across massive glacial moraines and moon lake.',
    rating: '4.95',
    reviews: '512',
    dist: '22.0',
    gain: '4,800',
    time: '4 Days',
    price: '$110/student',
    footer: 'Thanksgiving Break • 6 Spots Available',
    footerRight: 'View Batch',
    photo: '1504280390367-361c6d9f38f4'
  }
]

export const trekGear = ['2.5L Water Reservoir', 'Trekking Poles', 'Windbreaker / Fleece', 'Electrolyte Chews', 'Offline Maps (GPS)', 'Headlamp (Sun sets 6:40 PM)']

// ---------- Runs ----------

export const runTabs = ['All Clubs', 'Morning 5K Loops', 'Track & Intervals', 'Weekend Long Runs', 'Marathon Prep']

export const runClubs = [
  {
    id: 'midnight-dawn',
    name: 'Midnight & Dawn Runners',
    badge: 'Official Chapter',
    when: 'Daily 6:00 AM • University Main Quad to Riverwalk',
    tags: ['Morning 5K Loops'],
    count: 2140,
    countLabel: 'Active Runners',
    desc: 'Pacing every morning from easy recovery jogs (6:30/km) to sub-22 tempo groups. Free hydration and bag drops at the South Quad locker hall.',
    facts: [
      ['Base Pace', '5:00 - 6:30 /km'],
      ['Next Session', 'Tomorrow Sunrise'],
      ['Club Captain', "Maya Lin (Bio '25)"]
    ],
    initials: ['ML', 'JR', 'KT'],
    more: '+94',
    note: 'joined this semester',
    secondary: 'View Routes',
    cta: 'Join Chapter'
  },
  {
    id: 'trail-pacers',
    name: 'Campus Trail Pacers',
    badge: 'Scenic & Hills',
    when: 'Sundays 8:30 AM • Botanical Gardens North Gate',
    tags: ['Weekend Long Runs'],
    count: 320,
    countLabel: 'Trail Runners',
    desc: 'Technical single-tracks, dirt paths, and elevation repeats through University Woods. Elevation gain averages +140m per weekend excursion.',
    facts: [
      ['Target Pace', '5:15 /km'],
      ['Next Run', 'Sun, 8:30 AM'],
      ['Trail Lead', "David Chen (ME '26)"]
    ],
    initials: ['DC', 'AR'],
    more: '+18',
    note: '12 spots left for Sun',
    secondary: 'Elevation Chart',
    cta: 'Join Club'
  },
  {
    id: 'marathon-prep',
    name: 'Varsity Marathon Prep Squad',
    badge: 'High Intensity',
    when: 'Saturdays 6:30 AM • Outdoor Athletic Stadium Track',
    tags: ['Track & Intervals', 'Marathon Prep', 'Weekend Long Runs'],
    count: 180,
    countLabel: 'Endurance Squad',
    desc: 'Structured marathon periodization program targeting Fall 10K, Half-Marathon, and Boston qualifying benchmarks. Weekly 15k to 28k long blocks.',
    facts: [
      ['Distance Band', '15km – 25km'],
      ['Split Target', '4:15 – 4:45 /km'],
      ['Head Coach', 'Coach Eric Vance']
    ],
    initials: ['EV', 'SL'],
    more: '+42',
    note: 'Training week 8 of 12',
    secondary: 'View Syllabus',
    cta: 'Join Prep'
  }
]

export const race = {
  id: 'race:fall-10k',
  title: 'Annual Campus 10K & Half-Marathon',
  start: '2026-11-26T07:30:00',
  where: 'West Gate Oval',
  registered: 840,
  capacity: 1000
}

export const paceBoard = [
  { initials: 'LK', name: 'Liam K.', sub: "MechEng '24", km: '64.2', pace: '4:18' },
  { initials: 'SZ', name: 'Sarah Zhao', sub: "Architecture '25", km: '58.8', pace: '4:42' },
  { initials: 'IK', name: 'Insan Kamil (You)', sub: "CS Senior '25", km: '51.4', pace: '4:55', you: true },
  { initials: 'TO', name: "Tara O'Connor", sub: "Economics '26", km: '47.0', pace: '5:10' },
  { initials: 'MR', name: 'Marcus Reyes', sub: "Biochem '27", km: '43.5', pace: '5:02' }
]

// ---------- Parties ----------

// Kickbacks = informal, student-hosted. Headliners = formal, ticketed big events.
export const partyModes = {
  kickbacks: {
    label: 'Kickbacks',
    sub: 'House parties & chill hangouts',
    tabs: ['All Kickbacks', 'House Parties', 'Dorm Mixers', 'Rooftop Jams', 'Tailgates & BBQs']
  },
  headliners: {
    label: 'Headliners',
    sub: 'Big nights & ticketed events',
    tabs: ['All Headliners', 'Club Nights', 'DJ & Live Gigs', 'Comedy & Open Mic', 'Post-Exam Blowouts']
  }
}
export const partyDates = ['Tonight', 'Tomorrow', 'This Weekend', 'Next Week']

export const headliner = {
  id: 'neon-rave',
  title: 'Annual Fall Semester Neon Rave & Rooftop Mixer',
  when: 'Saturday, Nov 14 • 8:00 PM Onwards',
  day: 'This Weekend',
  kinds: ['DJ & Live Gigs'],
  going: 380,
  friends: ['Liam K.', 'Sarah Zhao', "Tara O'Connor", 'Marcus Reyes', 'Maya Lin', 'David Chen']
}

export const houseParties = [
  {
    id: 'retro-arcade',
    kinds: ['House Parties', 'Dorm Mixers'],
    day: 'Tonight',
    status: '28/40 Filled',
    tag: 'BYOB + Snacks',
    place: 'Sector 3 Penthouse',
    title: 'CS Retro Arcade & Beer Pong Night',
    desc: "Hosted by Liam K. (Mech '24) & CS Council. Classic arcade games, ping pong tournament, and rooftop chill.",
    host: 'Liam K.',
    hostInitials: 'LK',
    cta: 'Join Plan',
    photo: img('1511882150382-421056c89033', 600)
  },
  {
    id: 'rooftop-jam',
    kinds: ['Rooftop Jams'],
    day: 'Tomorrow',
    status: '15 spots left',
    tag: 'Acoustic Chill',
    place: 'Terrace Block C',
    title: 'Rooftop Acoustic Jam & Bonfire Night',
    desc: 'Hosted by Indie Music Club. Bring your guitar, cajon or just warm vibes. Marshmallows and hot chocolate!',
    host: 'Indie Club',
    hostInitials: 'IC',
    cta: 'Join Plan',
    photo: img('1475483768296-6163e08872a1', 600)
  },
  {
    id: 'senior-block-party',
    kinds: ['Tailgates & BBQs'],
    day: 'This Weekend',
    status: '140 Registered',
    tag: 'Free w/ Student ID',
    place: 'North Quad Courtyard',
    title: 'Senior Block Party & Barbecue Tailgate',
    desc: 'Open tailgate for all final year departments. Burgers, mocktails, frisbee showdown, and playlist swap.',
    host: 'Senior Union',
    hostInitials: 'SU',
    cta: 'Claim Wristband',
    photo: img('1529156069898-49953e39b3ac', 600)
  }
]

export const clubNights = [
  {
    id: 'electric-mirage',
    kinds: ['Club Nights', 'DJ & Live Gigs'],
    day: 'Tonight',
    badge: 'Official Partner',
    venue: 'Indigo XP, Koramangala',
    when: 'Tonight, 9:00 PM',
    title: 'Electric Mirage: Sunset Techno & Deep House',
    desc: 'Lineup: DJ Avantika (Campus Alum) + Synthetix. Stags & couples free till 10 PM.',
    offer: '40% OFF with Tribey ID',
    entry: 'Entry: ₹499 (Cover Included)',
    rating: '4.8',
    photo: img('1514525253161-7a46d19cd819', 300)
  },
  {
    id: 'standup-open-mic',
    kinds: ['Comedy & Open Mic'],
    day: 'This Weekend',
    badge: 'Campus Open Mic',
    venue: 'That Comedy Club, Indiranagar',
    when: 'Sat, 7:30 PM',
    title: 'University Standup Open Mic & Afterparty',
    desc: '12 student comics roasting university dorm life followed by terrace social hour.',
    offer: 'Free Mocktail on RSVP',
    entry: 'Entry: ₹199',
    rating: '4.9',
    photo: img('1511671782779-c97d3d27a1d4', 300)
  },
  {
    id: 'bollywood-retro',
    kinds: ['Post-Exam Blowouts', 'Club Nights'],
    day: 'This Weekend',
    badge: 'Post-Exam Special',
    venue: 'High Note Lounge, MG Road',
    when: 'Sun, 8:00 PM',
    title: 'Bollywood Retro Night: Post-Midterm Blowout',
    desc: '90s & 2000s classics all night. VIP student booth reservations available for groups of 6+.',
    offer: 'Group Discount 30%',
    entry: 'Entry: ₹350',
    rating: '4.7',
    photo: img('1492684223066-81342ee5ff30', 300)
  }
]

// ---------- Sports ----------

export const disciplines = ['Football 7v7', 'Pickleball', 'Tennis', 'Basketball', 'Badminton']

// Positions you can post per sport, and who has already posted (placeholder players).
export const sportPositions: Record<string, string[]> = {
  'Football 7v7': ['Goalkeeper', 'Defender', 'Midfielder', 'Winger', 'Striker'],
  Pickleball: ['Singles', 'Doubles – Left side', 'Doubles – Right side'],
  Tennis: ['Singles', 'Doubles – Deuce side', 'Doubles – Ad side'],
  Basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
  Badminton: ['Singles', 'Doubles – Front court', 'Doubles – Back court', 'Mixed Doubles']
}

export const skillLevels = ['Beginner', 'Intermediate', 'Advanced']

export const squadPosts = [
  { sport: 'Football 7v7', initials: 'DK', name: 'Dev K.', position: 'Goalkeeper', level: 'Advanced' },
  { sport: 'Football 7v7', initials: 'SK', name: 'Sid K.', position: 'Defender', level: 'Intermediate' },
  { sport: 'Football 7v7', initials: 'RV', name: 'Rahul V.', position: 'Midfielder', level: 'Advanced' },
  { sport: 'Football 7v7', initials: 'AS', name: 'Arjun S.', position: 'Striker', level: 'Advanced' },
  { sport: 'Basketball', initials: 'TO', name: "Tara O'Connor", position: 'Point Guard', level: 'Intermediate' },
  { sport: 'Basketball', initials: 'MR', name: 'Marcus R.', position: 'Center', level: 'Advanced' },
  { sport: 'Tennis', initials: 'SZ', name: 'Sarah Zhao', position: 'Singles', level: 'Advanced' },
  { sport: 'Tennis', initials: 'LK', name: 'Liam K.', position: 'Doubles – Deuce side', level: 'Intermediate' },
  { sport: 'Badminton', initials: 'PN', name: 'Priya N.', position: 'Doubles – Front court', level: 'Intermediate' },
  { sport: 'Pickleball', initials: 'JD', name: 'Jay D.', position: 'Doubles – Left side', level: 'Beginner' }
]

export const venues = [
  {
    id: 'kickoff-hsr',
    name: 'KickOff Arena HSR',
    area: 'Sector 2 • 1.2 km away',
    km: 1.2,
    sports: ['Football 7v7', 'Basketball'],
    price: 180,
    was: 320,
    rating: '4.8',
    note: '4 Open Games Today',
    cta: 'View Lineup',
    photo: img('1574629810360-7efbbe195018')
  },
  {
    id: 'velocity',
    name: 'Velocity Arena',
    area: 'Koramangala • 2.4 km away',
    km: 2.4,
    sports: ['Pickleball', 'Tennis', 'Basketball', 'Badminton'],
    price: 220,
    was: 300,
    rating: '4.6',
    note: 'Rubber Multi-Court',
    cta: '2 Open Slots',
    photo: img('1554068865-24cecd4e34b8')
  }
]

// x/y are percentages across the pitch; the keeper is at the bottom.
export const lineup = [
  { initials: 'DK', label: 'Dev (GK)', x: 50, y: 82, tone: 'amber' },
  { initials: 'SK', label: 'Sid (CB)', x: 27, y: 58, tone: 'light' },
  { initials: 'RV', label: 'Rahul (CM)', x: 50, y: 40, tone: 'solid' },
  { initials: 'KB', label: 'Kabir (LM)', x: 19, y: 36, tone: 'solid' },
  { initials: 'AS', label: 'Arjun (ST)', x: 26, y: 14, tone: 'solid' },
  { initials: '', label: 'Open (ST)', x: 74, y: 14, tone: 'open' },
  { initials: '', label: 'Open (RM)', x: 81, y: 36, tone: 'open' },
  { initials: '', label: 'Open (CB)', x: 73, y: 58, tone: 'open' }
]

export const turfSlots = ['Today, 07:00 PM – 08:30 PM', 'Today, 08:30 PM – 10:00 PM', 'Tomorrow, 06:00 AM – 07:30 AM']
