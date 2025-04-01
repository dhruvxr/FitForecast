"use client";

import { useUserAuth } from "./_utils/auth-context";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <a href="/week-10/shopping-list">Go to Shopping List</a><br></br>
          <button onClick={firebaseSignOut}>Logout</button>
        </>
      ) : (
        <button onClick={gitHubSignIn}>Shopping List : Login with GitHub</button>
      )}
    </div>
  );
}
