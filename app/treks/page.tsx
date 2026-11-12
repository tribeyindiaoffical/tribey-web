import TreksView from './view'

export const metadata = {
  title: 'Travel & Treks | Tribey',
  description: 'Campus expeditions and weekend treks'
}

export default function TreksPage({ searchParams }: { searchParams: { trek?: string } }) {
  return <TreksView initialTrek={searchParams.trek} />
}
