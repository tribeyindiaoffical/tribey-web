import Link from 'next/link'
import { getCommunities } from '../../lib/data'
import { Card, Button, SectionHeader } from '../../components/ui'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Community | Tribey',
  description: 'Build a community, add people, and chat together'
}

export default async function CommunityPage() {
  const communities = await getCommunities()

  return (
    <section className="py-8 space-y-6">
      <SectionHeader
        title="Community"
        action={
          <Link href="/community/create">
            <Button variant="primary">Create a community</Button>
          </Link>
        }
      />
      {communities.length === 0 ? (
        <p className="text-slate-500">No communities yet — be the first to start one.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((c) => (
            <Link key={c.id} href={`/community/${c.id}`}>
              <Card className="p-5 h-full hover:shadow-md transition">
                <div className="font-medium text-lg">{c.name}</div>
                {c.description && <div className="text-sm text-slate-500 mt-1">{c.description}</div>}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
