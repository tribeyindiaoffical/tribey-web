import ProfileView from './view'

export const metadata = {
  title: 'Profile | Tribey',
  description: 'Your campus profile'
}

export default function ProfilePage({ searchParams }: { searchParams: { edit?: string } }) {
  // key remounts the view so the sidebar's settings link opens the editor even when already on /profile.
  return <ProfileView key={searchParams.edit ?? ''} startEditing={searchParams.edit === '1'} />
}
