import ExploreView from './view'

export const metadata = {
  title: 'Explore | Tribey',
  description: 'Find active campus clubs, weekend expeditions, and gatherings'
}

export default function ExplorePage({ searchParams }: { searchParams: { q?: string } }) {
  // key resets the view's search state when the top-nav search changes ?q=.
  return <ExploreView key={searchParams.q ?? ''} initialQuery={searchParams.q ?? ''} />
}
