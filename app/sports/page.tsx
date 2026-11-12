import SportsView from './view'
import RunClubs from '../../components/RunClubs'

export const metadata = {
  title: 'Sports & Run Clubs | Tribey',
  description: 'Book a turf, join a game, or find a run club nearby'
}

export default function SportsPage({ searchParams }: { searchParams: { club?: string } }) {
  return (
    <div className="py-4 space-y-8">
      <SportsView />
      <RunClubs club={searchParams.club} />
    </div>
  )
}
