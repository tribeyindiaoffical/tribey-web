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

export const hubs = ['All Hubs', 'Sports & Turf', 'Travel & Treks', 'Run Clubs', 'Party & Socials', 'Hackathons & Tech', 'Creative Arts']

export const events = [
  {
    month: 'OCT',
    day: '12',
    tag: 'Tech & Build',
    when: 'Sat • 09:00 AM - 36h',
    where: 'Student Union Hall B',
    title: 'HackCampus 2024: Next-Gen AI & Climate',
    desc: 'Join 400+ builders, designers, and founders to create breakthrough projects with $15K in bounties and tech mentor reviews.',
    initials: ['IK', 'JD'],
    more: '+84',
    count: '142 joined',
    cta: 'Register',
    photo: img('1522071820081-009f0129c71c')
  },
  {
    month: 'OCT',
    day: '15',
    tag: 'Acoustic & Poetry',
    when: 'Tue • 07:30 PM',
    where: 'The Attic Commons Cafe',
    title: 'Underground Unplugged: Open Mic Night',
    desc: 'Original songs, spoken word, and improv acoustic performances. Warm apple cider and fresh pastries provided by the Arts Guild.',
    initials: ['AL', 'SF'],
    more: '+49',
    count: '58 RSVP',
    cta: 'Free Ticket',
    photo: img('1510915361894-db8b60106cb1')
  },
  {
    month: 'OCT',
    day: '18',
    tag: 'Varsity Cup',
    when: 'Fri • 05:00 PM',
    where: 'South Turf Stadium 2',
    title: 'Inter-College 7v7 Football Derby',
    desc: 'Engineering vs Management in the inaugural Fall Cup. Cheer squads, live DJ, food trucks, and tournament trophy ceremony.',
    initials: ['MG', 'TT'],
    more: '+190',
    count: '210 attending',
    cta: 'Join Squad',
    photo: img('1431324155629-1a6deb1dec8d')
  }
]

export const trending = [
  {
    name: 'Varsity Tennis Club',
    badge: 'Top Active',
    desc: 'Weekly rallies, beginner coaching clinics, and intra-university doubles ladder.',
    members: '1.4k members',
    note: '4 court slots open',
    joined: true
  },
  {
    name: 'Design Thinkers Collective',
    badge: 'Weekly Sprints',
    desc: 'UX/UI design critiques, portfolio teardowns, and design-system deep dives.',
    members: '890 members',
    note: 'Workshop in 2d',
    joined: false
  },
  {
    name: 'Audio Engineering Society',
    badge: 'Studio Pass',
    desc: 'Mixing and mastering masterclasses, synthesizers, and recording studio booking access.',
    members: '620 members',
    note: 'Next meet Thursday',
    joined: false
  },
  {
    name: 'Midnight & Dawn Runners',
    badge: 'Daily 6AM',
    desc: 'Urban 5k campus loops, track sprint intervals, and Sunday river trail recovery jogs.',
    members: '2.1k runners',
    note: 'Route mapped',
    joined: false
  }
]

export const organizers = [
  { initials: 'MK', name: 'Maya Kapoor', role: 'Founder, RunCampus (1.2k)' },
  { initials: 'DA', name: 'David Alvarez', role: 'Captain, 7v7 Intramurals' },
  { initials: 'SL', name: 'Sarah Lin', role: "Lead, HackCampus '24" }
]

// ---------- Treks ----------

export const trekTabs = ['All Routes', 'Weekend Treks', 'Mountain Trails', 'Lakes & Waterfalls', 'Carpool Rides']

export const treks = [
  {
    id: 'lake-blanche',
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
    footer: 'Campus Carpool: Oct 18 • 6:30 AM',
    footerRight: '4 Seats Left',
    photo: '1501785888041-af3ef285b470'
  },
  {
    id: 'chanshal-pass',
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
    tag: 'Day Trip',
    region: 'North Cascade Foothills',
    name: 'Pine Ridge Fall Foliage',
    desc: 'Golden aspens and crisp air, ideal Saturday unwind for busy midterm weeks.',
    rating: '4.7',
    reviews: '92',
    dist: '4.8',
    gain: '1,180',
    time: '3h 15m',
    price: 'Free (Carpool opt)',
    footer: 'Batch Nov 02 • 14 Students Going',
    footerRight: 'View Batch',
    photo: '1441974231531-c6227db76b6e'
  },
  {
    id: 'hampta-pass',
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
    count: '2,140',
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
    cta: 'Joined',
    joined: true
  },
  {
    id: 'trail-pacers',
    name: 'Campus Trail Pacers',
    badge: 'Scenic & Hills',
    when: 'Sundays 8:30 AM • Botanical Gardens North Gate',
    count: '320',
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
    cta: 'Join Club',
    joined: false
  },
  {
    id: 'marathon-prep',
    name: 'Varsity Marathon Prep Squad',
    badge: 'High Intensity',
    when: 'Saturdays 6:30 AM • Outdoor Athletic Stadium Track',
    count: '180',
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
    cta: 'Join Prep',
    joined: false
  }
]

export const paceBoard = [
  { initials: 'LK', name: 'Liam K.', sub: "MechEng '24", km: '64.2', pace: '4:18' },
  { initials: 'SZ', name: 'Sarah Zhao', sub: "Architecture '25", km: '58.8', pace: '4:42' },
  { initials: 'IK', name: 'Insan Kamil (You)', sub: "CS Senior '25", km: '51.4', pace: '4:55', you: true },
  { initials: 'TO', name: "Tara O'Connor", sub: "Economics '26", km: '47.0', pace: '5:10' },
  { initials: 'MR', name: 'Marcus Reyes', sub: "Biochem '27", km: '43.5', pace: '5:02' }
]

// ---------- Parties ----------

export const partyTabs = ['All Socials', 'House Parties & Dorm Mixers', 'Campus Club Nights', 'Live Band & DJ Gigs', 'Acoustic & Rooftop Jam', 'Post-Exam Afterparties']
export const partyDates = ['Tonight (Fri, 24 Oct)', 'Tomorrow (Sat, 25 Oct)', 'Halloween Weekend', 'Next Friday']

export const houseParties = [
  {
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

export const venues = [
  {
    name: 'KickOff Arena HSR',
    area: 'Sector 2 • 1.2 km away',
    price: '₹180',
    rating: '4.8',
    note: '4 Open Games Today',
    cta: 'View Lineup',
    selected: true,
    photo: img('1574629810360-7efbbe195018')
  },
  {
    name: 'Velocity Arena',
    area: 'Koramangala • 2.4 km away',
    price: '₹220',
    rating: '4.6',
    note: 'Rubber Multi-Court',
    cta: '2 Open Slots',
    selected: false,
    photo: img('1554068865-24cecd4e34b8')
  }
]

// x/y are percentages across the pitch; the keeper is at the bottom.
export const lineup = [
  { initials: 'DK', label: 'Dev (GK)', x: 50, y: 82, tone: 'amber' },
  { initials: 'SK', label: 'Sid (CB)', x: 27, y: 58, tone: 'light' },
  { initials: 'RV', label: 'Rahul (CM)', x: 50, y: 40, tone: 'solid' },
  { initials: 'IK', label: 'Insan (LM)', x: 19, y: 36, tone: 'solid' },
  { initials: 'AS', label: 'Arjun (ST)', x: 26, y: 14, tone: 'solid' },
  { initials: '', label: 'Claim ST', x: 74, y: 14, tone: 'open' },
  { initials: '', label: 'Open (RM)', x: 81, y: 36, tone: 'open' },
  { initials: '', label: 'Open (CB)', x: 73, y: 58, tone: 'open' }
]

// ---------- Profile ----------

export const myCommunities = [
  { initials: 'AI', name: 'Hackathon Builders Hub', sub: '840 student hackers' },
  { initials: 'OS', name: 'Open Source Lab', sub: '1.2k developers' },
  { initials: 'RC', name: 'Campus Trail Runners', sub: '320 runners' }
]

export const reviews = [
  {
    text: 'Great team player! Always keeps the morale high during late-night coding sessions.',
    name: 'Mike Thornton',
    role: 'Hackathon Teammate • Senior Design',
    avatar: img('1500648767791-00dcc994a43e', 96)
  },
  {
    text: 'Always brings the best energy to group projects. 10/10 would collab again.',
    name: 'Sarah Chen',
    role: 'Co-lead • Campus Run 5K',
    avatar: img('1494790108377-be9c29b29330', 96)
  }
]
