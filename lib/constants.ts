import { Dumbbell, Mountain, PartyPopper, Timer } from 'lucide-react'

export const categories = [
  {
    href: '/sports',
    label: 'Sports & Athletics',
    desc: 'Instant turf slot reservation, open pickup games, badminton, basketball squads, and intramural brackets.',
    emoji: '⚽',
    icon: Dumbbell,
    links: ['Book Outdoor Field 1', 'Find 3v3 Basketball team'],
    stat: '18 Active Pitches',
    cta: 'Browse all 14 clubs'
  },
  {
    href: '/treks',
    label: 'Travel & Treks',
    desc: 'Weekend mountain hikes, camping caravans, coastal road trips, and student travel discounts.',
    emoji: '🥾',
    icon: Mountain,
    links: ['Pine Ridge Fall Trek (Oct 26)', 'Carpool Rideshare Board'],
    stat: '6 Trips Booking',
    cta: 'Explore 8 groups'
  },
  {
    href: '/runs',
    label: 'Run Clubs & Pace',
    desc: 'Track intervals, Sunday long runs, 10k prep, and social coffee jog sessions organized by pace groups.',
    emoji: '🏃',
    icon: Timer,
    links: ['Tuesday Sunrise 5K (Pace 5:30)', 'Campus Half-Marathon Prep'],
    stat: '340 km Logged This Wk',
    cta: 'Join leaderboards'
  },
  {
    href: '/parties',
    label: 'Party & Hangouts',
    desc: 'Dorm mixers, board game socials, outdoor BBQ tailgates, and post-exam blowout dance parties.',
    emoji: '🎉',
    icon: PartyPopper,
    links: ['Senior Block Party Ticket', 'Late Night Catan & Pizza'],
    stat: '9 Parties This Weekend',
    cta: 'View party calendar'
  }
]
