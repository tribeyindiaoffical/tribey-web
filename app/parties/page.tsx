import PartiesView from './view'

export const metadata = {
  title: 'Parties & Gigs | Tribey',
  description: 'Campus parties, mixers, and live gigs'
}

export default function PartiesPage({ searchParams }: { searchParams: { type?: string } }) {
  return <PartiesView initialMode={searchParams.type === 'headliners' ? 'headliners' : 'kickbacks'} />
}
