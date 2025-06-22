import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: { session } };
}

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {session?.user?.name}</h1>
      {session.user.isAdmin ? (
        <p className="text-green-600 font-semibold mt-2">Admin Access ✅</p>
      ) : (
        <p className="text-gray-600 mt-2">User Access</p>
      )}
      <button onClick={() => signOut()} className="text-red-500">
        Sign Out
      </button>
    </div>
  );
}
