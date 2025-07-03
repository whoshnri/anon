import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UsersPage from './components/Userpage';

interface PageProps {
  params: Promise<{ user: string }>;
}

export default async function UserPage(props: PageProps) {
  const params = await props.params;
  const user = params.user;
  const authCookie = (await cookies()).get('auth_user');
  if (!authCookie || authCookie.value !== user) {
    redirect('/auth');
  }

  return <UsersPage user={user} />;
}
